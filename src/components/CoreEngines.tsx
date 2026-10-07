import React, { useState } from 'react';
import { serviceEngines } from '../data/projectsData';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Handshake, Target, Video, Briefcase, CheckCircle2, ChevronRight, Building } from 'lucide-react';

interface CoreEnginesProps {
  lang: Language;
}

export const CoreEngines: React.FC<CoreEnginesProps> = ({ lang }) => {
  const [selectedEngineId, setSelectedEngineId] = useState<string>('engine-1');
  const t = translations[lang].engines;
  const p = translations[lang].pillars;

  const currentEngine = serviceEngines.find((e) => e.id === selectedEngineId) || serviceEngines[0];

  const getEngineIcon = (num: string) => {
    switch (num) {
      case '01':
        return <Handshake className="w-5 h-5" />;
      case '02':
        return <Target className="w-5 h-5" />;
      case '03':
        return <Video className="w-5 h-5" />;
      case '04':
      default:
        return <Briefcase className="w-5 h-5" />;
    }
  };

  return (
    <section id="engines" className="py-20 bg-stone-950 border-t border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
            FULL VALUE CHAIN CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-sc text-stone-100 mt-2 text-balance">
            {t.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-stone-400 mt-3 leading-relaxed text-balance">
            {t.sectionSubtitle}
          </p>
        </div>

        {/* 4 Engine Selector Grid (Interactive Tabs / Segmented controls) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {serviceEngines.map((engine) => {
            const isSelected = engine.id === selectedEngineId;
            return (
              <button
                key={engine.id}
                onClick={() => setSelectedEngineId(engine.id)}
                className={`text-left p-5 rounded-xl border transition-all duration-200 cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-stone-900 border-amber-500/80 shadow-lg shadow-amber-950/30'
                    : 'bg-stone-900/40 border-stone-800 hover:bg-stone-900/80 hover:border-stone-700'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 to-amber-400" />
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-mono font-bold text-amber-400">
                    {engine.num}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {getEngineIcon(engine.num)}
                  </div>
                </div>
                <h3 className="text-base font-bold text-stone-100 font-serif-sc">
                  {lang === 'zh' ? engine.titleZh : engine.titleEn}
                </h3>
                <p className="text-xs text-stone-400 mt-1 line-clamp-1">
                  {lang === 'zh' ? engine.subtitleZh : engine.subtitleEn}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Engine Deep Detail Showcase Box */}
        <div className="bg-stone-900/70 border border-stone-800 rounded-2xl p-6 sm:p-10 mb-20 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 7 Cols: Overview & Scope */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono tracking-wider text-amber-400 font-semibold">
                  ENGINE {currentEngine.num} · {lang === 'zh' ? currentEngine.subtitleZh : currentEngine.subtitleEn}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif-sc text-stone-100 mt-1">
                  {lang === 'zh' ? currentEngine.titleZh : currentEngine.titleEn}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                {lang === 'zh' ? currentEngine.descriptionZh : currentEngine.descriptionEn}
              </p>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{t.viewDeliverables}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(lang === 'zh' ? currentEngine.highlightsZh : currentEngine.highlightsEn).map(
                    (item, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-stone-950/80 rounded-lg border border-stone-800 text-xs sm:text-sm text-stone-200 flex items-start gap-2"
                      >
                        <span className="text-amber-400 font-bold">›</span>
                        <span>{item}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Track Record / Client List (Real records from government documents) */}
            <div className="lg:col-span-5 bg-stone-950/90 rounded-xl border border-stone-800 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-4 pb-2 border-b border-stone-800">
                  <Building className="w-4 h-4" />
                  <span>{t.clientsServed}</span>
                </div>
                <ul className="space-y-3">
                  {(lang === 'zh' ? currentEngine.clientsZh : currentEngine.clientsEn).map(
                    (client, idx) => (
                      <li
                        key={idx}
                        className="text-xs sm:text-sm text-stone-300 flex items-start gap-2.5 pb-2 border-b border-stone-900/80 last:border-0"
                      >
                        <span className="text-amber-500/80 text-xs mt-0.5 font-mono">0{idx + 1}</span>
                        <span>{client}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800/80 text-[11px] text-stone-500 font-mono flex items-center justify-between">
                <span>ESTABLISHED GOVERNMENT TRUST</span>
                <span className="text-amber-400">100% EXECUTED</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Pillars: Why Choose Creative Landscape (Slides Page 11 & PDF) */}
        <div>
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
              FIVE CORE STRENGTHS
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif-sc text-stone-100 mt-1">
              {p.sectionTitle}
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mt-2">
              {p.sectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {p.items.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-stone-900/40 border border-stone-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-mono font-bold text-amber-400/90 mb-3">
                    0{idx + 1}
                  </div>
                  <h4 className="text-base font-bold text-stone-100 font-serif-sc mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
