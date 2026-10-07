import React, { useState } from 'react';
import { ArrowRight, Compass, ShieldCheck, MapPin, Building2, Sparkles, Camera, Image as ImageIcon } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { REAL_SCENIC_IMAGES } from './VisualAssets';

interface HeroProps {
  lang: Language;
}

const HERO_SCENIC_OPTIONS = [
  {
    id: 'hero-yunnan',
    nameZh: '玉龙雪山',
    nameEn: 'Jade Dragon Mountain',
    locationZh: '丽江·玉龙雪山国家级景区',
    locationEn: 'Jade Dragon Snow Mountain',
    url: '/images/jade-dragon-snow-mountain.webp',
  },
  {
    id: 'case-erhai',
    nameZh: '洱海生态廊道',
    nameEn: 'Erhai Eco-Corridor',
    locationZh: '大理·洱海生态廊道与苍山',
    locationEn: 'Erhai Ecological Corridor, Dali',
    url: '/images/erhai-lake.webp',
  },
  {
    id: 'case-lugu',
    nameZh: '泸沽湖女儿谷',
    nameEn: 'Lugu Lake Valley',
    locationZh: '丽江/宁蒗·泸沽湖母系文化地貌',
    locationEn: 'Lugu Lake Daughter Valley',
    url: '/images/lugu-lake.webp',
  },
  {
    id: 'case-yangtze',
    nameZh: '长江第一湾',
    nameEn: 'First Bend of Yangtze',
    locationZh: '丽江·石鼓长江第一湾航运胜境',
    locationEn: 'First Bend of Yangtze River',
    url: '/images/yangtze-first-bend-shigu.webp',
  },
];

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = translations[lang].hero;
  const [selectedBgIndex, setSelectedBgIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  const currentBg = HERO_SCENIC_OPTIONS[selectedBgIndex];

  return (
    <section className="relative min-h-[96vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-stone-950">
      {/* Real Scenic Landscape Photographic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          key={currentBg.url}
          src={currentBg.url}
          alt={lang === 'zh' ? currentBg.locationZh : currentBg.locationEn}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover object-center scale-100 transition-all duration-700 ease-out contrast-[1.08] saturate-[1.12] brightness-[0.92] ${
            imgLoaded ? 'opacity-75' : 'opacity-30'
          }`}
        />

        {/* Measured Cinematic Scrims: Crisp view of mountains/lakes with high text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/75 via-stone-950/45 to-stone-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/65 via-transparent to-stone-950/65" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-stone-950 to-transparent" />

        {/* Ambient Subtle Golden Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-amber-500/10 via-emerald-500/5 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Editorial Trust Kicker (Unboxed text with subtle separator) */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-400 uppercase mb-5 bg-stone-950/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/20 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.kicker1}</span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span>{t.kicker2}</span>
        </div>

        {/* Monumental Slogan Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif-sc tracking-tight text-stone-100 text-balance mb-4 leading-tight drop-shadow-[0_6px_24px_rgba(0,0,0,0.85)]">
          <span className="bg-gradient-to-r from-stone-100 via-amber-100 to-amber-300 bg-clip-text text-transparent">
            {t.slogan}
          </span>
        </h1>

        {/* Bilingual Latin Subtitle */}
        <p className="font-display text-lg sm:text-2xl text-amber-300 tracking-wider font-semibold mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
          {t.sloganEn}
        </p>

        {/* Value Proposition Description */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-stone-100 leading-relaxed font-normal mb-10 text-balance drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          {t.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#engines"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-medium text-sm shadow-xl shadow-amber-950/40 hover:shadow-amber-500/20 transition-all duration-200"
          >
            <Compass className="w-4 h-4" />
            <span>{t.primaryBtn}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <a
            href="#cases"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-700 font-medium text-sm transition-all duration-200 hover:border-stone-500 shadow-md backdrop-blur-sm"
          >
            <span>{t.secondaryBtn}</span>
          </a>
        </div>

        {/* Proof of Rigor / Verified Stats Grid (Clean tabular numerals, claim-to-proof adjacency) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-stone-800/80">
          <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800/80 backdrop-blur-md shadow-lg">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono tabular-nums">
              {t.stats.projects}
            </div>
            <p className="text-xs text-stone-300 mt-1.5 leading-snug">
              {t.stats.projectsLabel}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800/80 backdrop-blur-md shadow-lg">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono tabular-nums">
              {t.stats.regions}
            </div>
            <p className="text-xs text-stone-300 mt-1.5 leading-snug">
              {t.stats.regionsLabel}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800/80 backdrop-blur-md shadow-lg">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono tabular-nums">
              {t.stats.satisfaction}
            </div>
            <p className="text-xs text-stone-300 mt-1.5 leading-snug">
              {t.stats.satisfactionLabel}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800/80 backdrop-blur-md shadow-lg">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono tabular-nums">
              {t.stats.engines}
            </div>
            <p className="text-xs text-stone-300 mt-1.5 leading-snug">
              {t.stats.enginesLabel}
            </p>
          </div>
        </div>

        {/* Real Scenic Location Switcher / Attribution Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400 pt-4 border-t border-stone-800/60">
          <div className="flex items-center gap-2">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-[11px] text-stone-300">
              {t.bgPrefix}{lang === 'zh' ? currentBg.locationZh : currentBg.locationEn}
            </span>
          </div>

          {/* Quick Scene Switcher Buttons */}
          <div className="flex items-center gap-1.5 bg-stone-900/80 p-1 rounded-lg border border-stone-800">
            <span className="text-[10px] text-stone-400 px-1.5">{t.switchBg}:</span>
            {HERO_SCENIC_OPTIONS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setImgLoaded(false);
                  setSelectedBgIndex(idx);
                }}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                  selectedBgIndex === idx
                    ? 'bg-amber-600 text-white font-medium shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                }`}
              >
                {lang === 'zh' ? item.nameZh : item.nameEn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
