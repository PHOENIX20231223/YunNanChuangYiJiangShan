import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Share2, MapPin, Globe } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onOpenShare: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenShare }) => {
  const t = translations[lang].footer;
  const nav = translations[lang].nav;

  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand Wordmark & Mission */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-lg font-bold text-stone-100 font-serif-sc tracking-tight">
              {lang === 'zh' ? '云南创意江山文化旅游发展有限公司' : 'Yunnan Creative Landscape Culture & Tourism Development Co., Ltd.'}
            </span>
            <p className="text-xs text-stone-400 max-w-md leading-relaxed">
              {t.tagline}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-[11px] text-stone-500 pt-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{t.addressText}</span>
              </div>
              <span aria-hidden="true" className="hidden sm:inline text-stone-700">·</span>
              <a href="mailto:info@chuangyijiangshan.com" className="text-amber-400/90 hover:text-amber-300 font-mono hover:underline">
                info@chuangyijiangshan.com
              </a>
              <span aria-hidden="true" className="hidden sm:inline text-stone-700">·</span>
              <span>{t.icp}</span>
            </div>
          </div>

          {/* Col 2: Navigation Mirror */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-stone-200 font-semibold mb-3">
              {t.linksTitle}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#brand" className="hover:text-amber-400 transition-colors">
                  {nav.brand}
                </a>
              </li>
              <li>
                <a href="#engines" className="hover:text-amber-400 transition-colors">
                  {nav.engines}
                </a>
              </li>
              <li>
                <a href="#cases" className="hover:text-amber-400 transition-colors">
                  {nav.cases}
                </a>
              </li>
              <li>
                <a href="#footprint" className="hover:text-amber-400 transition-colors">
                  {nav.footprint}
                </a>
              </li>
              <li>
                <a href="#news" className="hover:text-amber-400 transition-colors">
                  {nav.news}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">
                  {nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Brand Influence & Share */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-stone-200 font-semibold mb-3">
              {t.socialTitle}
            </h4>
            <p className="text-xs text-stone-400 mb-4 leading-relaxed">
              支持一键分享本站至微信、微博、领英、X等海内外社交平台，助力云南文旅走向世界。
            </p>
            <button
              onClick={onOpenShare}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-stone-200 rounded-lg text-xs font-medium border border-stone-800 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{nav.share}</span>
            </button>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <span>{t.rights}</span>
          <span>创意为魂 · 落地为本 | 奇妙创意 · 快速落地</span>
        </div>
      </div>
    </footer>
  );
};
