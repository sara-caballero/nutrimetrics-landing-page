import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { translations, Language } from './translations';
import logoImage from '/splash-icon.png';

interface TermsPageProps {
  language: Language;
  onBack: () => void;
}

const TermsPage: React.FC<TermsPageProps> = ({ language, onBack }) => {
  const t = translations[language];

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('•')) {
        return <li key={index} className="text-gray-700">{line.substring(1).trim()}</li>;
      } else if (line.trim() === '') {
        return <br key={index} />;
      } else {
        return <p key={index} className="text-gray-700 leading-relaxed mb-4">{line}</p>;
      }
    });
  };

  return (
    <div className="min-h-screen bg-white">
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

      {/* Terms of Use Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">{t.termsOfUseTitle}</h1>
          
          <p className="text-gray-600 mb-8">
            <strong>{t.termsLastUpdated}</strong>
          </p>

          <div className="space-y-8">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.termsSection1Title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {formatContent(t.termsSection1Content)}
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.termsSection2Title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {formatContent(t.termsSection2Content)}
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.termsSection3Title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {formatContent(t.termsSection3Content)}
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.termsSection4Title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {formatContent(t.termsSection4Content)}
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.termsSection5Title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {formatContent(t.termsSection5Content)}
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.termsSection6Title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {formatContent(t.termsSection6Content)}
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.termsSection7Title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {formatContent(t.termsSection7Content)}
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.termsSection8Title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {formatContent(t.termsSection8Content)}
              </div>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.termsSection9Title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {formatContent(t.termsSection9Content)}
              </div>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.termsSection10Title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {formatContent(t.termsSection10Content)}
              </div>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.termsSection11Title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {formatContent(t.termsSection11Content)}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage; 