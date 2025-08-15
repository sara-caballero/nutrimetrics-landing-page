import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    supabase: any;
  }
}

const ResetPasswordPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const navigate = useNavigate();

  const SUPABASE_URL = 'https://ssedsxqfinqnkwuejlxx.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzZWRzeHFmaW5xbmt3dWVqbHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4Mjk1OTgsImV4cCI6MjA2ODQwNTU5OH0._RYdxDXBUkg_xwhiwdPxzKDhes8_A1WlSlTN_AmipZM';

  const supabase = window.supabase?.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  useEffect(() => {
    if (!window.supabase) {
      showMessage('error', 'Error: Supabase is not available. Please reload the page.');
      return;
    }
  }, []);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
  };

  const validatePasswords = () => {
    if (password.length < 6) {
      showMessage('error', 'Password must be at least 6 characters long');
      return false;
    }
    
    if (password !== confirmPassword) {
      showMessage('error', 'Passwords do not match');
      return false;
    }
    
    return true;
  };

    const initializeAuth = async () => {
    try {
        if (!window.supabase) {
          showMessage('error', 'Error: Supabase is not available. Please reload the page.');
          return;
        }

        if (!supabase) {
          showMessage('error', 'Error: Could not create Supabase client.');
          return;
        }

        const searchParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        
        const token = searchParams.get('token');
        const type = searchParams.get('type');
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        if (token && type === 'recovery') {
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'recovery'
          });

          if (error) {
            console.error('Supabase auth error:', error);
            showMessage('error', `Authentication error: ${error.message}`);
            return;
          }

          if (data.session) {
            setIsAuthenticated(true);
            showMessage('success', 'Authentication successful. You can now change your password.');
          } else {
            showMessage('error', 'Invalid or expired link. Please request a new reset link.');
          }
        } else if (accessToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || ''
          });

          if (error) {
            console.error('Supabase auth error:', error);
            showMessage('error', `Authentication error: ${error.message}`);
            return;
          }

          if (data.session) {
            setIsAuthenticated(true);
            showMessage('success', 'Authentication successful. You can now change your password.');
          } else {
            showMessage('error', 'Invalid or expired link. Please request a new reset link.');
          }
        } else {
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error('Supabase auth error:', error);
            showMessage('error', `Authentication error: ${error.message}`);
            return;
          }
          
          if (data.session) {
            setIsAuthenticated(true);
            showMessage('success', 'Authentication successful. You can now change your password.');
          } else {
            showMessage('error', 'Invalid or expired link. Please request a new reset link.');
          }
        }
        
     } catch (error) {
       console.error('Unexpected error during auth:', error);
       showMessage('error', 'Unexpected error during authentication.');
     }
   };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!isAuthenticated) {
      showMessage('error', 'You must be authenticated to change your password.');
      return;
    }
    
    if (!validatePasswords()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.updateUser({ 
        password: password 
      });
      
      if (error) {
        showMessage('error', `Error updating password: ${error.message}`);
        return;
      }
      
      if (data.user) {
        showMessage('success', 'Password updated successfully! You can now sign in with your new password.');
        setPassword('');
        setConfirmPassword('');
      }
      
    } catch (error) {
      showMessage('error', 'Unexpected error updating password.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-[#4FD1C5]/10">
              <svg className="h-8 w-8 text-[#4FD1C5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Reset Password
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your new password to complete the process
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="mt-1 relative">
                  <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#4FD1C5] focus:border-[#4FD1C5] focus:z-10 sm:text-sm"
                    placeholder="Enter your new password"
                    minLength={6}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    type="password" 
                    required 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#4FD1C5] focus:border-[#4FD1C5] focus:z-10 sm:text-sm ${
                      confirmPassword && password !== confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Confirm your new password"
                    minLength={6}
                  />
                </div>
              </div>
            </div>

            {message && (
              <div className={`rounded-md p-4 ${
                message.type === 'success' ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <div className="flex">
                  <div className="flex-shrink-0">
                    {message.type === 'success' ? (
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      message.type === 'success' ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {message.text}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button 
                type="submit" 
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#4FD1C5] hover:bg-[#4FD1C5]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4FD1C5] transition-colors duration-200 disabled:opacity-50"
              >
                                 <span>{loading ? 'Processing...' : 'Reset Password'}</span>
                {loading && (
                  <span className="ml-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </form>

                     <div className="text-center">
                          <p className="text-xs text-gray-500">
                Back to 
                <button
                  onClick={() => navigate('/')}
                  className="font-medium text-[#4FD1C5] hover:text-[#4FD1C5]/80 ml-1"
                >
                  Nutrimetrics
                </button>
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
