import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../i18n/language';
import { Language } from '../translations';

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'segmented';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'segmented',
  size = 'md',
  className = ''
}) => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
    { code: 'fr', label: 'FR' }
  ];

  // Size classes
  const sizeClasses = {
    sm: {
      container: 'p-1',
      button: 'px-2 py-1 text-xs',
      icon: 'w-3 h-3',
      select: 'text-xs'
    },
    md: {
      container: 'p-1.5',
      button: 'px-3 py-1.5 text-sm',
      icon: 'w-3.5 h-3.5',
      select: 'text-sm'
    },
    lg: {
      container: 'p-2',
      button: 'px-4 py-2 text-base',
      icon: 'w-4 h-4',
      select: 'text-base'
    }
  };

  const sizes = sizeClasses[size];

  // Segmented control (mobile-friendly, no native picker)
  if (variant === 'segmented') {
    return (
      <div className={`inline-flex items-center bg-white rounded-lg shadow-sm border border-gray-200 ${sizes.container} ${className}`}>
        <Globe className={`${sizes.icon} text-gray-500 mr-1.5 flex-shrink-0`} />
        <div className="flex items-center space-x-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`
                ${sizes.button}
                font-medium rounded-md transition-all duration-200
                ${language === lang.code
                  ? 'bg-[#4FD1C5] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
              aria-label={`Switch to ${lang.label}`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Dropdown variant (for desktop, but still custom to avoid native picker)
  return (
    <div className={`inline-flex items-center bg-white rounded-lg shadow-sm border border-gray-200 ${sizes.container} ${className}`}>
      <Globe className={`${sizes.icon} text-gray-500 mr-1.5 flex-shrink-0`} />
      <div className="relative">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className={`
            ${sizes.select}
            bg-transparent border-none font-medium text-gray-700 
            focus:outline-none cursor-pointer appearance-none pr-6
            focus:ring-0
          `}
          aria-label="Select language"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
        {/* Custom dropdown arrow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;

