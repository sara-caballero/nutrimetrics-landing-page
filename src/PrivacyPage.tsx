import React, { useState, useMemo } from 'react';
import { ArrowLeft, ChevronDown, Shield } from 'lucide-react';
import { translations, Language } from './translations';
import logoImage from '/splash-icon.png';

interface PrivacyPageProps {
  language: Language;
  onBack: () => void;
}

// Component: Privacy Header with hero section and badge
const PrivacyHeader: React.FC<{ title: string; lastUpdated: string }> = ({ title, lastUpdated }) => {
  return (
    <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#4FD1C5]/10 dark:bg-[#4FD1C5]/20 rounded-full">
          <Shield className="w-4 h-4 text-[#4FD1C5]" />
          <span className="text-sm font-semibold text-[#4FD1C5]">Privacy</span>
        </div>
      </div>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
        {title}
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        <strong>{lastUpdated}</strong>
      </p>
    </div>
  );
};

// Component: Table of Contents (TOC)
interface TocProps {
  sections: Array<{ id: string; title: string }>;
  isOpen: boolean;
  onToggle: () => void;
}

const Toc: React.FC<TocProps> = ({ sections, isOpen, onToggle }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Mobile TOC - Collapsible */}
      <div className="lg:hidden mb-8">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors focus:outline-none focus:ring-2 focus:ring-[#4FD1C5] focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          aria-expanded={isOpen}
          aria-controls="mobile-toc"
        >
          <span className="font-semibold text-gray-900 dark:text-white">Table of Contents</span>
          <ChevronDown
            className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div
          id="mobile-toc"
          className={`mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => handleClick(e, section.id)}
                    className="block py-2 px-3 text-sm text-gray-700 dark:text-gray-300 hover:text-[#4FD1C5] dark:hover:text-[#4FD1C5] hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#4FD1C5] focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Desktop TOC - Sticky */}
      <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
        <nav className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
            Table of Contents
          </h2>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(e) => handleClick(e, section.id)}
                  className="block py-2 px-3 text-sm text-gray-700 dark:text-gray-300 hover:text-[#4FD1C5] dark:hover:text-[#4FD1C5] hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#4FD1C5] focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

// Component: Data Table for 4-column bullet points
interface DataTableProps {
  rows: Array<{ data: string; category: string; purpose: string; legalBasis: string }>;
}

const DataTable: React.FC<DataTableProps> = ({ rows }) => {
  return (
    <div className="my-6 overflow-hidden">
      {/* Desktop: Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                Data
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                Purpose
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                Legal Basis (GDPR Art. 6)
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className={`border-b border-gray-200 dark:border-gray-700 transition-colors ${
                  index % 2 === 0
                    ? 'bg-white dark:bg-gray-900'
                    : 'bg-gray-50 dark:bg-gray-800/50'
                } hover:bg-gray-100 dark:hover:bg-gray-800`}
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                  {row.data}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{row.category}</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{row.purpose}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 text-xs">
                  {row.legalBasis}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: Cards */}
      <div className="md:hidden space-y-4">
        {rows.map((row, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm"
          >
            <div className="space-y-3">
              <div>
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Data
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{row.data}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Category
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">{row.category}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Purpose
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">{row.purpose}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Legal Basis (GDPR Art. 6)
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{row.legalBasis}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component: Privacy Section
interface PrivacySectionProps {
  id: string;
  title: string;
  content: string;
  formatContent: (content: string) => React.ReactNode;
}

const PrivacySection: React.FC<PrivacySectionProps> = ({ id, title, content, formatContent }) => {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pt-2">
        {title}
      </h2>
      <div className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
        {formatContent(content)}
      </div>
      <div className="mt-8 mb-8 border-b border-gray-200 dark:border-gray-700"></div>
    </section>
  );
};

// Main Component
const PrivacyPage: React.FC<PrivacyPageProps> = ({ language, onBack }) => {
  const t = translations[language];
  const [tocOpen, setTocOpen] = useState(false);

  // Generate sections for TOC
  const sections = useMemo(
    () => [
      { id: 'section-1', title: t.privacySection1Title },
      { id: 'section-2', title: t.privacySection2Title },
      { id: 'section-3', title: t.privacySection3Title },
      { id: 'section-4', title: t.privacySection4Title },
      { id: 'section-5', title: t.privacySection5Title },
      { id: 'section-6', title: t.privacySection6Title },
      { id: 'section-7', title: t.privacySection7Title },
      { id: 'section-8', title: t.privacySection8Title },
      { id: 'section-9', title: t.privacySection9Title },
      { id: 'section-10', title: t.privacySection10Title },
      { id: 'section-11', title: t.privacySection11Title },
      { id: 'section-12', title: t.privacySection12Title },
    ],
    [t]
  );

  // Enhanced formatContent: detects 4-column bullets and converts to table structure
  const formatContent = (content: string): React.ReactNode => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let tableRows: Array<{ data: string; category: string; purpose: string; legalBasis: string }> = [];
    let inTableSection = false;

    lines.forEach((line, index) => {
      // Detect table header
      if (
        line.includes('Data Category Purpose Legal Basis') ||
        line.includes('Datos Categoría Propósito Base Legal') ||
        line.includes('Données Catégorie Objectif Base Légale')
      ) {
        inTableSection = true;
        return;
      }

      // Process bullet points with 4 columns
      if (line.startsWith('•') && inTableSection) {
        const parts = line.substring(1).trim().split(' - ');
        if (parts.length >= 4) {
          tableRows.push({
            data: parts[0].trim(),
            category: parts[1].trim(),
            purpose: parts[2].trim(),
            legalBasis: parts[3].trim(),
          });
          return;
        }
      }

      // If we have accumulated table rows and hit a non-bullet line, render table
      if (tableRows.length > 0 && (!line.startsWith('•') || line.trim() === '')) {
        elements.push(<DataTable key={`table-${index}`} rows={tableRows} />);
        tableRows = [];
        inTableSection = false;
      }

      // Regular bullet points (non-table)
      if (line.startsWith('•') && !inTableSection) {
        const parts = line.substring(1).trim().split(' - ');
        if (parts.length >= 4) {
          // Still render as table if 4 parts found outside table section
          elements.push(
            <DataTable
              key={`table-inline-${index}`}
              rows={[
                {
                  data: parts[0].trim(),
                  category: parts[1].trim(),
                  purpose: parts[2].trim(),
                  legalBasis: parts[3].trim(),
                },
              ]}
            />
          );
        } else {
          elements.push(
            <li key={index} className="text-gray-700 dark:text-gray-300 mb-2">
              {line.substring(1).trim()}
            </li>
          );
        }
        return;
      }

      // Empty lines
      if (line.trim() === '') {
        elements.push(<br key={`br-${index}`} />);
        return;
      }

      // Regular paragraphs
      if (!line.startsWith('•') && line.trim() !== '') {
        elements.push(
          <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {line}
          </p>
        );
      }
    });

    // Render any remaining table rows
    if (tableRows.length > 0) {
      elements.push(<DataTable key="table-final" rows={tableRows} />);
    }

    return <>{elements}</>;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Sticky Header with backdrop blur */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-[#4FD1C5] dark:hover:text-[#4FD1C5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4FD1C5] focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-md px-2 py-1"
              aria-label={t.backToHome}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">{t.backToHome}</span>
            </button>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
                <img
                  src={logoImage}
                  alt="Nutrimetrics Logo"
                  className="w-6 h-6 sm:w-10 sm:h-10"
                  loading="eager"
                />
              </div>
              <span className="text-lg sm:text-2xl font-bold text-[#4FD1C5]">Nutrimetrics</span>
            </div>

            <div className="w-20"></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
          {/* TOC Sidebar */}
          <Toc sections={sections} isOpen={tocOpen} onToggle={() => setTocOpen(!tocOpen)} />

          {/* Content Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 lg:p-12">
            <PrivacyHeader title={t.privacyPolicyTitle} lastUpdated={t.privacyLastUpdated} />

            <div className="space-y-0">
              <PrivacySection
                id="section-1"
                title={t.privacySection1Title}
                content={t.privacySection1Content}
                formatContent={formatContent}
              />
              <PrivacySection
                id="section-2"
                title={t.privacySection2Title}
                content={t.privacySection2Content}
                formatContent={formatContent}
              />
              <PrivacySection
                id="section-3"
                title={t.privacySection3Title}
                content={t.privacySection3Content}
                formatContent={formatContent}
              />
              <PrivacySection
                id="section-4"
                title={t.privacySection4Title}
                content={t.privacySection4Content}
                formatContent={formatContent}
              />
              <PrivacySection
                id="section-5"
                title={t.privacySection5Title}
                content={t.privacySection5Content}
                formatContent={formatContent}
              />
              <PrivacySection
                id="section-6"
                title={t.privacySection6Title}
                content={t.privacySection6Content}
                formatContent={formatContent}
              />
              <PrivacySection
                id="section-7"
                title={t.privacySection7Title}
                content={t.privacySection7Content}
                formatContent={formatContent}
              />
              <PrivacySection
                id="section-8"
                title={t.privacySection8Title}
                content={t.privacySection8Content}
                formatContent={formatContent}
              />
              <PrivacySection
                id="section-9"
                title={t.privacySection9Title}
                content={t.privacySection9Content}
                formatContent={formatContent}
              />
              <PrivacySection
                id="section-10"
                title={t.privacySection10Title}
                content={t.privacySection10Content}
                formatContent={formatContent}
              />
              <PrivacySection
                id="section-11"
                title={t.privacySection11Title}
                content={t.privacySection11Content}
                formatContent={formatContent}
              />
              <PrivacySection
                id="section-12"
                title={t.privacySection12Title}
                content={t.privacySection12Content}
                formatContent={formatContent}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;