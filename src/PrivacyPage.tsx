import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { translations, Language } from './translations';
import logoImage from '/splash-icon.png';

interface PrivacyPageProps {
  language: Language;
  onBack: () => void;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ language, onBack }) => {
  const t = translations[language];

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('•')) {
        const parts = line.substring(1).trim().split(' - ');
        if (parts.length >= 4) {
          return (
            <div key={index} className="bg-gray-50 p-4 rounded-lg mb-3">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm">
                <div className="font-medium text-gray-900">{parts[0]}</div>
                <div className="text-gray-700">{parts[1]}</div>
                <div className="text-gray-700">{parts[2]}</div>
                <div className="text-gray-600 text-xs">{parts[3]}</div>
              </div>
            </div>
          );
        } else {
          return <li key={index} className="text-gray-700">{line.substring(1).trim()}</li>;
        }
      } else if (line.trim() === '') {
        return <br key={index} />;
      } else if (line.includes('Data Category Purpose Legal Basis') || line.includes('Datos Categoría Propósito Base Legal') || line.includes('Données Catégorie Objectif Base Légale')) {
        return (
          <div key={index} className="bg-gray-100 p-3 rounded-lg mb-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm font-semibold text-gray-900">
              <div>Data</div>
              <div>Category</div>
              <div>Purpose</div>
              <div>Legal Basis (GDPR Art. 6)</div>
            </div>
          </div>
        );
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

      {/* Privacy Policy Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">{t.privacyPolicyTitle}</h1>
          
          <p className="text-gray-600 mb-8">
            <strong>{t.privacyLastUpdated}</strong>
          </p>

          <div className="space-y-8">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.privacySection1Title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {formatContent(t.privacySection1Content)}
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.privacySection2Title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {formatContent(t.privacySection2Content)}
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.privacySection3Title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {formatContent(t.privacySection3Content)}
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.privacySection4Title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {formatContent(t.privacySection4Content)}
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.privacySection5Title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {formatContent(t.privacySection5Content)}
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.privacySection6Title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {formatContent(t.privacySection6Content)}
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.privacySection7Title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {formatContent(t.privacySection7Content)}
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.privacySection8Title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {formatContent(t.privacySection8Content)}
              </div>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.privacySection9Title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {formatContent(t.privacySection9Content)}
              </div>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.privacySection10Title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {formatContent(t.privacySection10Content)}
              </div>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.privacySection11Title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {formatContent(t.privacySection11Content)}
              </div>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.privacySection12Title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {formatContent(t.privacySection12Content)}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;