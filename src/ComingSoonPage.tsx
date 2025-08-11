import React from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import { translations, Language } from './translations';
import logoImage from '/splash-icon.png';

interface ComingSoonPageProps {
  language: Language;
  onBack: () => void;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ language, onBack }) => {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4FD1C5]/5 to-white">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-[#4FD1C5] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t.backToHome}
            </button>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
                <img src={logoImage} alt="Nutrimetrics Logo" className="w-6 h-6 sm:w-10 sm:h-10" />
              </div>
              <span className="text-lg sm:text-2xl font-bold text-[#4FD1C5]">Nutrimetrics</span>
            </div>
            
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </nav>

      {/* Coming Soon Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-[#4FD1C5]/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Clock className="w-10 h-10 text-[#4FD1C5]" />
          </div>
          
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            {t.comingSoonTitle}
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-lg mx-auto">
            {t.comingSoonSubtitle}
          </p>
          
          {/* CTA */}
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm mx-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {t.comingSoonCTA}
            </h3>
            <p className="text-gray-600 mb-6 text-sm">
              {t.comingSoonCTADescription}
            </p>
            <button
              onClick={onBack}
              className="w-full bg-[#4FD1C5] hover:bg-[#4FD1C5]/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              {t.comingSoonBackButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage; 