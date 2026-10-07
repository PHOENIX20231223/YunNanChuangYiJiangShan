import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { SearchCheck, PenTool, Handshake, Cog, ArrowRight } from 'lucide-react';

interface ProcessSectionProps {
  lang: Language;
}

const STEP_ICONS = [SearchCheck, PenTool, Handshake, Cog];

export const ProcessSection: React.FC<ProcessSectionProps> = ({ lang }) => {
  const t = translations[lang].process;

  return (
    <section id="process" className="py-20 bg-stone-900/50 border-t border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
            {t.kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-sc text-stone-100 mt-2 text-balance">
            {t.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-stone-400 mt-3 leading-relaxed text-balance">
            {t.sectionSubtitle}
          </p>
        </div>

        {/* 4 Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.steps.map((step, idx) => {
            const Icon = STEP_ICONS[idx] || Cog;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-stone-950/80 border border-stone-800 hover:border-amber-500/40 transition-colors flex flex-col"
              >
                {/* Step number watermark */}
                <span className="absolute top-4 right-5 text-4xl font-mono font-extrabold text-stone-800/70 select-none">
                  0{idx + 1}
                </span>
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-serif-sc text-stone-100 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed flex-1">
                  {step.desc}
                </p>
                {idx < t.steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 w-5 h-5 text-amber-500/50 -translate-y-1/2 translate-x-1/2 z-10" />
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-medium text-sm shadow-xl shadow-amber-950/40 transition-all"
          >
            <span>{t.cta}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
