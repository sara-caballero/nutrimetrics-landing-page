import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Clock, ExternalLink } from 'lucide-react';
import { translations } from './translations';
import { useLanguage } from './i18n/language';
import LanguageSelector from './components/LanguageSelector';
import logoImage from '/splash-icon.png';
import nutrimetricsLogo from '/Nutrimetrics.png';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const SupportPage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = t.supportValidationRequired;
    if (!formData.email.trim()) {
      newErrors.email = t.supportValidationRequired;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t.supportValidationEmail;
    }
    if (!formData.subject.trim()) newErrors.subject = t.supportValidationRequired;
    if (!formData.message.trim()) newErrors.message = t.supportValidationRequired;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitStatus('submitting');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('subject', formData.subject);
      data.append('message', formData.message);
      data.append('_subject', `Support request: ${formData.subject}`);
      data.append('language', language);

      const response = await fetch('https://formsubmit.co/ajax/support@nutrimetrics.app', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#4FD1C5] focus:border-[#4FD1C5] transition-colors bg-white ${
      hasError ? 'border-red-400' : 'border-gray-300'
    }`;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                <img src={logoImage} alt="Nutrimetrics Icon" className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <img src={nutrimetricsLogo} alt="Nutrimetrics" className="h-7 sm:h-9" />
            </div>

            {/* Back to Home */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-[#4FD1C5] font-medium transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t.backToHome}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Language Selector */}
      <div className="fixed top-20 right-4 z-50">
        <LanguageSelector variant="segmented" size="sm" />
      </div>

      <main className="pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {t.supportTitle}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.supportIntro}
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-8 items-start">

            {/* Left Column: Contact info + links */}
            <div className="space-y-6">

              {/* Contact card */}
              <div className="bg-gradient-to-br from-[#4FD1C5]/10 to-[#4FD1C5]/5 rounded-2xl p-6 border border-[#4FD1C5]/20">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {t.supportContactTitle}
                </h2>

                <div className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 bg-[#4FD1C5]/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-[#4FD1C5]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">Email</p>
                    <a
                      href="mailto:support@nutrimetrics.app"
                      className="text-[#4FD1C5] font-medium hover:underline break-all"
                    >
                      {t.supportContactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#4FD1C5]/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-[#4FD1C5]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">
                      Response time
                    </p>
                    <p className="text-gray-700 font-medium text-sm">{t.supportResponseTime}</p>
                  </div>
                </div>
              </div>

              {/* Quick links */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {t.supportLinksTitle}
                </h2>
                <div className="space-y-2">
                  <button
                    onClick={() => navigate('/privacy')}
                    className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-left text-gray-700 hover:text-[#4FD1C5] hover:bg-[#4FD1C5]/5 transition-colors group"
                  >
                    <span className="font-medium text-sm">{t.navPrivacy}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#4FD1C5] transition-colors" />
                  </button>
                  <button
                    onClick={() => navigate('/terms')}
                    className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-left text-gray-700 hover:text-[#4FD1C5] hover:bg-[#4FD1C5]/5 transition-colors group"
                  >
                    <span className="font-medium text-sm">{t.navTerms}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#4FD1C5] transition-colors" />
                  </button>
                  <a
                    href="https://nutrimetrics.app/delete-account"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-left text-gray-700 hover:text-[#4FD1C5] hover:bg-[#4FD1C5]/5 transition-colors group"
                  >
                    <span className="font-medium text-sm">{t.navDeleteAccount}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#4FD1C5] transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact form */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">{t.supportFormTitle}</h2>

              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[#4FD1C5]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-[#4FD1C5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.supportSuccessTitle}</h3>
                  <p className="text-gray-600">{t.supportSuccessMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">

                  {/* Name + Email row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        {t.supportNameLabel} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t.supportNamePlaceholder}
                        className={inputClass(!!errors.name)}
                        autoComplete="name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        {t.supportEmailFieldLabel} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t.supportEmailPlaceholder}
                        className={inputClass(!!errors.email)}
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      {t.supportSubjectLabel} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={t.supportSubjectPlaceholder}
                      className={inputClass(!!errors.subject)}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      {t.supportMessageLabel} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t.supportMessagePlaceholder}
                      className={`${inputClass(!!errors.message)} resize-none`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                    )}
                  </div>

                  {/* Error banner */}
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                      {t.supportErrorMessage}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    className="w-full bg-[#4FD1C5] hover:bg-[#4FD1C5]/90 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-semibold text-base transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  >
                    {submitStatus === 'submitting' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        {t.supportSubmitButton}
                      </span>
                    ) : (
                      t.supportSubmitButton
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <img src={logoImage} alt="Nutrimetrics" className="w-6 h-6 opacity-80" />
              <span className="text-sm text-gray-400">{t.footerCopyrightFull}</span>
            </div>
            <a
              href="mailto:support@nutrimetrics.app"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              support@nutrimetrics.app
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SupportPage;
