# Nutrimetrics Landing Page

A modern, responsive landing page for the Nutrimetrics nutrition tracking application. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🌍 **Multi-language Support**: English, Spanish, and French
- 📱 **Responsive Design**: Optimized for all devices
- ⚡ **Fast Performance**: Built with Vite for optimal loading times
- 🎨 **Modern UI**: Clean, professional design with smooth animations
- 📝 **Contact Form**: Integrated form submission for beta access
- 🔒 **Privacy & Terms**: Comprehensive legal pages

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Deployment**: GitHub Pages ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nutrimetrics-landing-page.git
cd nutrimetrics-landing-page
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Deployment

The project is configured for GitHub Pages deployment:

```bash
npm run deploy
```

## Project Structure

```
src/
├── App.tsx              # Main application component
├── translations.ts      # Multi-language translations
├── PrivacyPage.tsx      # Privacy policy page
├── TermsPage.tsx        # Terms of use page
├── ComingSoonPage.tsx   # Coming soon page
├── main.tsx            # Application entry point
├── index.css           # Global styles
└── vite-env.d.ts       # Vite type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Email**: support@nutrimetrics.app
- **Website**: https://nutrimetrics.app

## Acknowledgments

- [Open Food Facts](https://openfoodfacts.org) for nutritional data
- [Lucide](https://lucide.dev) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com) for utility-first CSS
