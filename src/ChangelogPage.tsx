import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { translations } from './translations';
import { useLanguage } from './i18n/language';
import LanguageSelector from './components/LanguageSelector';
import logoImage from '/splash-icon.png';

interface ChangelogPageProps {
  onBack: () => void;
}

interface ChangelogVersion {
  version: string;
  date?: string;
  changes: string[];
}

const ChangelogPage: React.FC<ChangelogPageProps> = ({ onBack }) => {
  const { language } = useLanguage();
  const t = translations[language];

  // Get changelog data for current language
  const getChangelogData = (): ChangelogVersion[] => {
    if (language === 'es') {
      return [
        {
          version: 'v1.1',
          changes: [
            'Consejos inteligentes y personalizados después de cada comida, según tu objetivo',
            'Análisis de comidas mejorado: los títulos largos ahora se muestran completos',
            'Corrección de botones y flujos en el registro e inicio de sesión',
            'Ajustes visuales y de usabilidad en toda la app'
          ]
        },
        {
          version: 'v1.0',
          changes: [
            'Lanzamiento público inicial de Nutrimetrics',
            'Análisis de comidas con IA a partir de fotos y texto',
            'Registro diario de alimentos con calorías y macronutrientes',
            'Objetivos nutricionales personalizados según el perfil del usuario',
            'Soporte multiidioma y modo offline'
          ]
        }
      ];
    } else if (language === 'fr') {
      return [
        {
          version: 'v1.1',
          changes: [
            'Des conseils intelligents et personnalisés après chaque repas, selon votre objectif',
            'Analyse des repas améliorée : les titres longs s\'affichent désormais correctement',
            'Correction des boutons et des parcours de connexion',
            'Ajustements visuels et ergonomiques dans toute l\'application'
          ]
        },
        {
          version: 'v1.0',
          changes: [
            'Lancement public initial de Nutrimetrics',
            'Analyse des repas par IA à partir de photos et de texte',
            'Journal alimentaire quotidien avec suivi des calories et macronutriments',
            'Objectifs nutritionnels personnalisés selon le profil utilisateur',
            'Support multilingue et mode hors ligne'
          ]
        }
      ];
    } else {
      // English (default)
      return [
        {
          version: 'v1.1',
          changes: [
            'Smart meal insights tailored to your goal after every logged meal',
            'Improved meal analysis: long meal titles now display correctly',
            'Added missing buttons for a smoother onboarding and login flow',
            'Visual and usability refinements across the app'
          ]
        },
        {
          version: 'v1.0',
          changes: [
            'Initial public release of Nutrimetrics',
            'AI-powered meal analysis from photos and text',
            'Daily food logging with calorie and macronutrient tracking',
            'Personalized nutrition goals based on user profile',
            'Multi-language support and offline mode'
          ]
        }
      ];
    }
  };

  const changelogData = getChangelogData();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
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
            
            {/* Language Selector */}
            <div className="flex items-center">
              <LanguageSelector variant="segmented" size="sm" />
            </div>
          </div>
        </div>
      </nav>

      {/* Changelog Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            {t.changelogTitle}
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            {t.changelogSubtitle}
          </p>
        </div>

        <div className="space-y-8 sm:space-y-12">
          {changelogData.map((version, index) => (
            <div
              key={version.version}
              className="relative"
            >
              {/* Version Badge */}
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4FD1C5]">
                      {version.version}
                    </span>
                    {index === 0 && (
                      <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-[#4FD1C5]/10 text-[#4FD1C5] text-xs sm:text-sm font-semibold rounded-full">
                        {t.changelogLatest}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Changes List */}
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100">
                <ul className="space-y-3 sm:space-y-4">
                  {version.changes.map((change, changeIndex) => (
                    <li
                      key={changeIndex}
                      className="flex items-start space-x-3 sm:space-x-4"
                    >
                      <div className="flex-shrink-0 mt-1.5 sm:mt-2">
                        <div className="w-1.5 h-1.5 sm:w-2 h-2 bg-[#4FD1C5] rounded-full"></div>
                      </div>
                      <span className="text-sm sm:text-base text-gray-700 leading-relaxed flex-1">
                        {change}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Separator (except for last item) */}
              {index < changelogData.length - 1 && (
                <div className="mt-8 sm:mt-12 flex justify-center">
                  <div className="w-px h-8 sm:h-12 bg-gray-200"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-gray-200">
          <p className="text-xs sm:text-sm text-gray-500 text-center">
            {t.changelogFooter}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangelogPage;

