import React from "react";
import { LanguageContext } from "../utils/LanguageContext.jsx";

class ErrorBoundary extends React.Component {
  static contextType = LanguageContext;

  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an uncaught error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      const t = this.context?.t || ((key) => key);

      return (
        <div className="min-h-screen bg-dark text-text flex items-center justify-center p-6 select-none font-sans">
          <div className="max-w-md w-full bg-dark-100 rounded-3xl p-8 text-center border-0 shadow-2xl shadow-black/60">
            {/* Minimal warning icon */}
            <div className="mx-auto mb-6 size-12 rounded-xl bg-lime/15 flex items-center justify-center border-0">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="size-6 text-lime"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold font-sans tracking-tight mb-3 text-text">
              {t('errorBoundary.title')}
            </h1>
            
            <p className="text-sm text-text-muted leading-relaxed mb-8">
              {t('errorBoundary.desc')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="px-5 py-2.5 rounded-xl bg-btn-bg hover:bg-btn-hover text-btn-text font-semibold text-sm transition-colors duration-200 cursor-pointer shadow-sm border-0"
              >
                {t('common.reload')}
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="px-5 py-2.5 rounded-xl bg-dark-200 hover:bg-dark-300 text-text-muted hover:text-text font-medium text-sm transition-colors duration-200 cursor-pointer border-0"
              >
                {t('common.goHome')}
              </button>
            </div>
            
            <div className="mt-8 pt-6 border-0 text-[10px] text-text-subtle uppercase tracking-widest">
              {t('common.redeviseOps')}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
