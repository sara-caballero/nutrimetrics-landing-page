import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Camera, BookOpen, Target, Users, Clock, Globe, Zap, Menu, X, Search, Heart, TrendingUp, ChevronDown } from 'lucide-react';
import { translations, Language } from './translations';
import PrivacyPage from './PrivacyPage';
import ComingSoonPage from './ComingSoonPage';
import TermsPage from './TermsPage';
import ResetPasswordPage from './ResetPasswordPage';
import logoImage from '/splash-icon.png';
import nutrimetricsLogo from '/Nutrimetrics.png';
import homeImage from '/home.png';
import statsImage from '/stats.png';
import analyseImage from '/analyse.png';
import journalImage from '/journal.png';

// Componente principal de la página de inicio
function HomePage() {
  const [language, setLanguage] = useState<Language>('en');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    goal: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqItem, setOpenFaqItem] = useState<number | null>(null);
  const [faqSectionOpen, setFaqSectionOpen] = useState(false);
  const navigate = useNavigate();

  const t = translations[language];

  const handleSubmit = () => {
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setFormData({ name: '', email: '', goal: '' });
    setIsSubmitted(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const toggleFaqItem = (itemIndex: number) => {
    setOpenFaqItem(openFaqItem === itemIndex ? null : itemIndex);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
                        {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
                  <img src={logoImage} alt="Nutrimetrics Icon" className="w-6 h-6 sm:w-10 sm:h-10" />
                </div>
                <img src={nutrimetricsLogo} alt="Nutrimetrics" className="h-8 sm:h-10" />
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('features-section')}
                className="text-gray-600 hover:text-emerald-600 font-medium transition-colors"
              >
                {t.navFeatures}
              </button>
              <button
                onClick={() => scrollToSection('testimonials-section')}
                className="text-gray-600 hover:text-emerald-600 font-medium transition-colors"
              >
                {t.navTestimonials}
              </button>
              <button
                onClick={() => scrollToSection('signup-form')}
                className="text-gray-600 hover:text-emerald-600 font-medium transition-colors"
              >
                {t.navContact}
              </button>
              
              <div className="w-px h-6 bg-gray-300"></div>
              
              {/* Download Buttons */}
              <div className="hidden lg:flex items-center space-x-4">
                {/* App Store Button */}
                <button 
                  onClick={() => navigate('/coming-soon')}
                  className="inline-flex items-center bg-black text-white px-3 py-1 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </button>
                
                {/* Google Play Button */}
                <button 
                  onClick={() => navigate('/coming-soon')}
                  className="inline-flex items-center bg-black text-white px-3 py-1 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" fill="#4285F4"/>
                    <path d="M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81Z" fill="#FBBC04"/>
                    <path d="M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12Z" fill="#E94335"/>
                    <path d="M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" fill="#34A852"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection('features-section')}
                  className="text-gray-600 hover:text-emerald-600 font-medium transition-colors text-left"
                >
                  {t.navFeatures}
                </button>
                <button
                  onClick={() => scrollToSection('testimonials-section')}
                  className="text-gray-600 hover:text-emerald-600 font-medium transition-colors text-left"
                >
                  {t.navTestimonials}
                </button>
                <button
                  onClick={() => scrollToSection('signup-form')}
                  className="text-gray-600 hover:text-emerald-600 font-medium transition-colors text-left"
                >
                  {t.navContact}
                </button>
                
                {/* Mobile Download Buttons */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex flex-col space-y-3">
                    {/* App Store Button */}
                    <button 
                      onClick={() => navigate('/coming-soon')}
                      className="inline-flex items-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      <div className="text-left">
                        <div className="text-xs">Download on the</div>
                        <div className="text-sm font-semibold">App Store</div>
                      </div>
                    </button>
                    
                    {/* Google Play Button */}
                    <button 
                      onClick={() => navigate('/coming-soon')}
                      className="inline-flex items-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" fill="#4285F4"/>
                        <path d="M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81Z" fill="#FBBC04"/>
                        <path d="M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12Z" fill="#E94335"/>
                        <path d="M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" fill="#34A852"/>
                      </svg>
                      <div className="text-left">
                        <div className="text-xs">GET IT ON</div>
                        <div className="text-sm font-semibold">Google Play</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Language Switcher */}
      <div className="fixed top-20 right-4 z-50">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2">
          <div className="flex items-center space-x-1">
            <Globe className="w-4 h-4 text-gray-500" />
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value as Language)}
              className="bg-transparent border-none text-sm font-medium text-gray-700 focus:outline-none cursor-pointer"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
            </select>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-[#4FD1C5]/10 text-[#4FD1C5] rounded-full text-sm font-medium mb-8">
              <Users className="w-4 h-4 mr-2" />
              {t.betaBadge}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-gray-800">{t.heroTitle}</span>
            </h1>
            
            <p className="text-xl text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed font-medium">
              {t.heroSubtitle} – {t.heroSubtitleSuffix}
            </p>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t.heroDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#4FD1C5] hover:bg-[#4FD1C5]/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
              >
                {t.ctaPrimary}
              </button>
              
              <div className="flex items-start text-gray-600 text-sm font-medium">
                <Clock className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>{t.betaDuration}</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-4 max-w-lg mx-auto">
              {t.ctaReassurance}
            </p>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-[#4FD1C5]/20 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
      </section>



      {/* Interactive Features Showcase */}
      <section id="features-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.featuresTitle}
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Features List */}
            <div className="space-y-4">
              <div 
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeFeature === 1 
                    ? 'bg-[#4FD1C5]/5 border-2 border-[#4FD1C5]/20 shadow-lg' 
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
                onClick={() => setActiveFeature(1)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    activeFeature === 1 ? 'bg-[#4FD1C5]/10' : 'bg-white'
                  }`}>
                    <Camera className={`w-6 h-6 ${
                      activeFeature === 1 ? 'text-[#4FD1C5]' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-2 ${
                      activeFeature === 1 ? 'text-[#4FD1C5]' : 'text-gray-900'
                    }`}>
                      {t.feature1Title}
                    </h3>
                    <p className={`text-sm ${
                      activeFeature === 1 ? 'text-gray-800' : 'text-gray-600'
                    }`}>
                      {t.feature1Description}
                    </p>
                  </div>
                </div>
              </div>
              
              <div 
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeFeature === 2 
                    ? 'bg-[#4FD1C5]/5 border-2 border-[#4FD1C5]/20 shadow-lg' 
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
                onClick={() => setActiveFeature(2)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    activeFeature === 2 ? 'bg-[#4FD1C5]/10' : 'bg-white'
                  }`}>
                    <BookOpen className={`w-6 h-6 ${
                      activeFeature === 2 ? 'text-[#4FD1C5]' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-2 ${
                      activeFeature === 2 ? 'text-[#4FD1C5]' : 'text-gray-900'
                    }`}>
                      {t.feature2Title}
                    </h3>
                    <p className={`text-sm ${
                      activeFeature === 2 ? 'text-gray-800' : 'text-gray-600'
                    }`}>
                      {t.feature2Description}
                    </p>
                  </div>
                </div>
              </div>
              
              <div 
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeFeature === 3 
                    ? 'bg-[#4FD1C5]/5 border-2 border-[#4FD1C5]/20 shadow-lg' 
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
                onClick={() => setActiveFeature(3)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    activeFeature === 3 ? 'bg-[#4FD1C5]/10' : 'bg-white'
                  }`}>
                    <Target className={`w-6 h-6 ${
                      activeFeature === 3 ? 'text-[#4FD1C5]' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-2 ${
                      activeFeature === 3 ? 'text-[#4FD1C5]' : 'text-gray-900'
                    }`}>
                      {t.feature3Title}
                    </h3>
                    <p className={`text-sm ${
                      activeFeature === 3 ? 'text-gray-800' : 'text-gray-600'
                    }`}>
                      {t.feature3Description}
                    </p>
                  </div>
                </div>
              </div>
              
              <div 
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeFeature === 4 
                    ? 'bg-[#4FD1C5]/5 border-2 border-[#4FD1C5]/20 shadow-lg' 
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
                onClick={() => setActiveFeature(4)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    activeFeature === 4 ? 'bg-[#4FD1C5]/10' : 'bg-white'
                  }`}>
                    <Zap className={`w-6 h-6 ${
                      activeFeature === 4 ? 'text-[#4FD1C5]' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-2 ${
                      activeFeature === 4 ? 'text-[#4FD1C5]' : 'text-gray-900'
                    }`}>
                      {t.feature4Title}
                    </h3>
                    <p className={`text-sm ${
                      activeFeature === 4 ? 'text-gray-800' : 'text-gray-600'
                    }`}>
                      {t.feature4Description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:pl-8">
              <div className="flex justify-center">
                {/* Phone Frame */}
                <div className="relative">
                  {/* Phone Body */}
                  <div className="w-80 h-[40rem] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                    {/* Screen */}
                    <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                      {/* Status Bar */}
                      <div className="absolute top-0 left-0 right-0 h-6 bg-black rounded-t-[2.5rem] flex items-center justify-between px-6 z-10">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div className="text-white text-xs font-medium">9:41</div>
                        <div className="flex items-center space-x-1">
                          <div className="w-4 h-2 border border-white rounded-sm"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* App Content */}
                      <div className="w-full h-full pt-6">
                        {activeFeature === 1 && (
                          <img 
                            src={analyseImage} 
                            alt="AI-Powered Meal Analysis" 
                            className="w-full h-full object-cover"
                          />
                        )}
                        {activeFeature === 2 && (
                          <img 
                            src={homeImage} 
                            alt="Personalized Daily Overview" 
                            className="w-full h-full object-cover"
                          />
                        )}
                        {activeFeature === 3 && (
                          <img 
                            src={journalImage} 
                            alt="Visual Food Journal" 
                            className="w-full h-full object-cover"
                          />
                        )}
                        {activeFeature === 4 && (
                          <img 
                            src={statsImage} 
                            alt="Basic Stats & Trends" 
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gray-900 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Nutrimetrics Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.whyChooseTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.whyChooseSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-[#4FD1C5]/10 rounded-2xl flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-[#4FD1C5]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.whyChoose1Title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.whyChoose1Description}
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.whyChoose2Title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.whyChoose2Description}
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-[#4FD1C5]/10 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-[#4FD1C5]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.whyChoose3Title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.whyChoose3Description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials-section" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.testimonialsTitle}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t.testimonialsSubtitle}
            </p>
            
            <div className="bg-gradient-to-br from-[#4FD1C5]/5 to-white p-12 rounded-2xl border border-[#4FD1C5]/20">
              <div className="flex items-center justify-center mb-6">
                <Users className="w-12 h-12 text-[#4FD1C5]" />
              </div>
              <p className="text-lg text-gray-700 mb-6">
                {t.testimonial1}
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-[#4FD1C5]/10 text-[#4FD1C5] rounded-full text-sm font-medium">
                <Clock className="w-4 h-4 mr-2" />
                {t.betaTester}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sign Up Form Section */}
      <section id="signup-form" className="py-20 bg-gradient-to-b from-[#4FD1C5]/5 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.formTitle}
            </h2>
            <p className="text-xl text-gray-600">
              {t.formSubtitle}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            {!isSubmitted ? (
              <form action="https://formsubmit.co/support@nutrimetrics.app" method="POST" onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="_subject" value="Nueva solicitud de acceso anticipado - Nutrimetrics" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value={window.location.href} />
                <input type="hidden" name="language" value={language} />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t.nameLabel}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4FD1C5] focus:border-[#4FD1C5] transition-colors"
                      placeholder={t.namePlaceholder}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t.emailLabel}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4FD1C5] focus:border-[#4FD1C5] transition-colors"
                      placeholder={t.emailPlaceholder}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="goal" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.goalLabel}
                  </label>
                  <select
                    id="goal"
                    name="goal"
                    required
                    value={formData.goal}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4FD1C5] focus:border-[#4FD1C5] transition-colors bg-white"
                  >
                    <option value="">{t.goalPlaceholder}</option>
                    <option value="lose_weight">{t.goals.lose_weight}</option>
                    <option value="maintain_weight">{t.goals.maintain_weight}</option>
                    <option value="gain_weight">{t.goals.gain_weight}</option>
                    <option value="improve_health">{t.goals.improve_health}</option>
                    <option value="track_habits">{t.goals.track_habits}</option>
                    <option value="just_explore">{t.goals.just_explore}</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#4FD1C5] hover:bg-[#4FD1C5]/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {t.submitButton}
                </button>
                
                <p className="text-sm text-gray-500 text-center mt-4">
                  {t.formDisclaimer}
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#4FD1C5]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-[#4FD1C5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.successTitle}</h3>
                <p className="text-gray-600 mb-6">
                  {t.successMessage}
                </p>
                <p className="text-sm text-gray-500">
                  {t.successNote}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <button
              onClick={() => setFaqSectionOpen(!faqSectionOpen)}
              className="flex items-center justify-center space-x-2 mx-auto text-3xl md:text-4xl font-bold text-gray-900 hover:text-[#4FD1C5] transition-colors"
            >
              <span>{t.faqTitle}</span>
              <ChevronDown className={`w-8 h-8 text-[#4FD1C5] transition-transform ${faqSectionOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {faqSectionOpen && (
            <div className="space-y-4">
              {/* FAQ Item 1 */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFaqItem(1)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{t.faq1Question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaqItem === 1 ? 'rotate-180' : ''}`} />
                </button>
                {openFaqItem === 1 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{t.faq1Answer}</p>
                  </div>
                )}
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFaqItem(2)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{t.faq2Question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaqItem === 2 ? 'rotate-180' : ''}`} />
                </button>
                {openFaqItem === 2 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{t.faq2Answer}</p>
                  </div>
                )}
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFaqItem(3)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{t.faq3Question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaqItem === 3 ? 'rotate-180' : ''}`} />
                </button>
                {openFaqItem === 3 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{t.faq3Answer}</p>
                  </div>
                )}
              </div>

              {/* FAQ Item 3b */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFaqItem(3.5)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{t.faq3bQuestion}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaqItem === 3.5 ? 'rotate-180' : ''}`} />
                </button>
                {openFaqItem === 3.5 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{t.faq3bAnswer}</p>
                  </div>
                )}
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFaqItem(4)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{t.faq4Question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaqItem === 4 ? 'rotate-180' : ''}`} />
                </button>
                {openFaqItem === 4 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{t.faq4Answer}</p>
                  </div>
                )}
              </div>

              {/* FAQ Item 5 */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFaqItem(5)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{t.faq5Question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaqItem === 5 ? 'rotate-180' : ''}`} />
                </button>
                {openFaqItem === 5 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{t.faq5Answer}</p>
                  </div>
                )}
              </div>

              {/* FAQ Item 6 */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFaqItem(6)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{t.faq6Question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaqItem === 6 ? 'rotate-180' : ''}`} />
                </button>
                {openFaqItem === 6 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{t.faq6Answer}</p>
                  </div>
                )}
              </div>

              {/* FAQ Item 7 */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFaqItem(7)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{t.faq7Question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaqItem === 7 ? 'rotate-180' : ''}`} />
                </button>
                {openFaqItem === 7 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{t.faq7Answer}</p>
                  </div>
                )}
              </div>

              {/* FAQ Item 8 */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFaqItem(8)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{t.faq8Question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaqItem === 8 ? 'rotate-180' : ''}`} />
                </button>
                {openFaqItem === 8 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{t.faq8Answer}</p>
                  </div>
                )}
              </div>

              {/* FAQ Item 9 */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFaqItem(9)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{t.faq9Question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaqItem === 9 ? 'rotate-180' : ''}`} />
                </button>
                {openFaqItem === 9 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{t.faq9Answer}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Nutrimetrics</h3>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-400">
              <span>{t.footerCopyright}</span>
              <span className="hidden sm:inline">•</span>
              <span>{t.footerBeta}</span>
              <span className="hidden sm:inline">•</span>
              <span>{t.footerContact}</span>
              <span className="hidden sm:inline">•</span>
              <button
                onClick={() => navigate('/privacy')}
                className="hover:text-white transition-colors underline"
              >
                {t.navPrivacy}
              </button>
              <span className="hidden sm:inline">•</span>
              <button
                onClick={() => navigate('/terms')}
                className="hover:text-white transition-colors underline"
              >
                {t.navTerms}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Componentes wrapper para manejar la navegación
function PrivacyPageWrapper() {
  const navigate = useNavigate();
  return <PrivacyPage language="en" onBack={() => navigate('/')} />;
}

function TermsPageWrapper() {
  const navigate = useNavigate();
  return <TermsPage language="en" onBack={() => navigate('/')} />;
}

function ComingSoonPageWrapper() {
  const navigate = useNavigate();
  return <ComingSoonPage language="en" onBack={() => navigate('/')} />;
}

function ResetPasswordPageWrapper() {
  return <ResetPasswordPage />;
}

// Componente principal App con enrutamiento
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPageWrapper />} />
        <Route path="/terms" element={<TermsPageWrapper />} />
        <Route path="/coming-soon" element={<ComingSoonPageWrapper />} />
        <Route path="/reset-password.html" element={<ResetPasswordPageWrapper />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;