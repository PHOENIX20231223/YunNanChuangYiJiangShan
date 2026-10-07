import React, { useState, useEffect } from 'react';
import { Globe, PlusCircle, Share2, Menu, X } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenShareSite: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  onOpenShareSite,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#brand', label: t.brand },
    { href: '#engines', label: t.engines },
    { href: '#cases', label: t.cases },
    { href: '#footprint', label: t.footprint },
    { href: '#news', label: t.news },
    { href: '#contact', label: t.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 shadow-lg py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Brand Wordmark (Single text element wordmark as mandated by design constitution) */}
          <a
            href="#"
            className="text-lg sm:text-xl font-bold tracking-tight text-stone-100 font-serif-sc hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'zh' ? '云南创意江山' : 'Creative Landscape'}
          </a>

          {/* Zone 2: 4-6 Clean text navigation links with subtle hover underlines */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-amber-400 transition-colors whitespace-nowrap relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-amber-400 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 Primary actions (Language toggle, Publish News, Share) */}
          <div className="flex items-center gap-2.5">
            {/* Bilingual Switcher */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-300 bg-stone-900/80 border border-stone-700/80 hover:bg-stone-800 hover:text-white transition-all whitespace-nowrap cursor-pointer"
              title="切换语言 / Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'zh' ? 'EN' : '中'}</span>
            </button>

            {/* Share Trigger */}
            <button
              onClick={onOpenShareSite}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-300 bg-stone-900/80 border border-stone-700/80 hover:bg-stone-800 hover:text-white transition-all whitespace-nowrap cursor-pointer"
              title={t.share}
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.share}</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950/95 border-b border-stone-800 px-6 py-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3 py-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-stone-300 hover:text-amber-400 py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-stone-800 flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenShareSite();
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-stone-300 bg-stone-900 rounded-lg border border-stone-800"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.share}</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
