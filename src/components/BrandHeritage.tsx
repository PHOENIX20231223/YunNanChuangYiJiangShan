import React from 'react';
import { Award, BookOpen, Layers, CheckCircle, TrendingUp, HelpCircle, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface BrandHeritageProps {
  lang: Language;
}

export const BrandHeritage: React.FC<BrandHeritageProps> = ({ lang }) => {
  const t = translations[lang].brand;

  return (
    <section id="brand" className="py-20 bg-stone-900/60 border-t border-stone-800/80 relative overflow-hidden">
      {/* Subtle real scenery background overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <img
          src="https://commons.wikimedia.org/wiki/Special:FilePath/2007_12_02_yuanyang_rice_terraces_sunset.jpg"
          alt="Yunnan cultural landscape"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter blur-[2px]"
        />
        <div className="absolute inset-0 bg-stone-950/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
            THINK TANK HERITAGE & MISSION
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-sc text-stone-100 mt-2 text-balance">
            {t.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-stone-400 mt-3 leading-relaxed text-balance">
            {t.sectionSubtitle}
          </p>
        </div>

        {/* Brand Foundation Cards (Founder Legacy & Yunnan Core Platform) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Card 1: Founder Chen Fang Legacy */}
          <div className="p-8 rounded-2xl bg-stone-950/80 border border-stone-800 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-amber-400 font-mono tracking-wider">FOUNDER & BRAND BACKING</span>
                <h3 className="text-xl font-bold text-stone-100 font-serif-sc">
                  {t.founderTitle}
                </h3>
              </div>
            </div>
            <p className="text-sm text-stone-300 leading-relaxed">
              {t.founderDesc}
            </p>
            <div className="mt-6 pt-5 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
              <span className="font-serif-sc text-amber-300 font-medium">核心宗旨：奇妙创意 · 快速落地</span>
              <span>国家级智库策划力背书</span>
            </div>
          </div>

          {/* Card 2: Yunnan Core Platform */}
          <div className="p-8 rounded-2xl bg-stone-950/80 border border-stone-800 relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-emerald-400 font-mono tracking-wider">REGIONAL OPERATIONAL HUB</span>
                <h3 className="text-xl font-bold text-stone-100 font-serif-sc">
                  {t.corePlatformTitle}
                </h3>
              </div>
            </div>
            <p className="text-sm text-stone-300 leading-relaxed">
              {t.corePlatformDesc}
            </p>
            <div className="mt-6 pt-5 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
              <span className="text-emerald-300 font-medium">业务链条：策划 + 规划 + 招商 + 运营</span>
              <span>覆盖10余地市实战经验</span>
            </div>
          </div>
        </div>

        {/* Paradigm Shift: From Blueprint to Destination Delivery */}
        <div className="mb-16 bg-stone-950/90 rounded-2xl border border-stone-800 p-8 sm:p-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold font-serif-sc text-stone-100">
              {t.paradigmShiftTitle}
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mt-2">
              打破规划与建设脱节的行业宿命，实现从理念孵化到真实收益的无缝跃迁
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Traditional planning institutions */}
            <div className="p-6 rounded-xl bg-stone-900/60 border border-stone-800/80">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-800">
                <span className="w-2.5 h-2.5 rounded-full bg-stone-500" />
                <h4 className="text-base font-semibold text-stone-300">
                  {t.paradigmContrast.traditional.title}
                </h4>
              </div>
              <ul className="space-y-3.5 text-xs sm:text-sm text-stone-400">
                <li className="flex items-start gap-2.5">
                  <span className="text-stone-500 font-bold">✕</span>
                  <span><strong>核心痛点：</strong>{t.paradigmContrast.traditional.pain}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-stone-500 font-bold">✕</span>
                  <span><strong>业务形式：</strong>{t.paradigmContrast.traditional.form}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-stone-500 font-bold">✕</span>
                  <span><strong>资本考量：</strong>{t.paradigmContrast.traditional.capital}</span>
                </li>
              </ul>
            </div>

            {/* Our integrated ecosystem */}
            <div className="p-6 rounded-xl bg-gradient-to-b from-stone-900 to-amber-950/20 border border-amber-600/40 shadow-xl">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-800">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <h4 className="text-base font-bold text-amber-300 font-serif-sc">
                  {t.paradigmContrast.ourAdvantage.title}
                </h4>
              </div>
              <ul className="space-y-3.5 text-xs sm:text-sm text-stone-200">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>交付导向：</strong>{t.paradigmContrast.ourAdvantage.pain}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>全链闭环：</strong>{t.paradigmContrast.ourAdvantage.form}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>投资前置：</strong>{t.paradigmContrast.ourAdvantage.capital}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Resolving 3 Core Questions & Ladder Steps */}
        <div className="p-8 sm:p-10 rounded-2xl bg-stone-950/80 border border-stone-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>VALUE ENGINE RESOLUTION</span>
            </div>
            <h3 className="text-2xl font-bold font-serif-sc text-stone-100">
              {t.threeQuestionsTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {t.threeQuestions.map((item, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-stone-900/80 border border-stone-800 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-amber-400/90 font-mono font-bold mb-2">
                    FOCUS 0{idx + 1}
                  </div>
                  <h4 className="text-base font-bold text-stone-100 font-serif-sc mb-3">
                    {item.q}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stepping Ladder: Resources -> Strategy -> Packaging -> Agency -> Capital -> Build -> Ops -> Value */}
          <div className="pt-6 border-t border-stone-800">
            <p className="text-xs text-stone-400 font-mono tracking-wider mb-4 text-center">
              全产业链价值转化链条 / THE VALUE CONVERSION PIPELINE
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {t.pathSteps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className={`px-3.5 py-1.5 rounded-lg text-xs font-medium ${
                    idx === t.pathSteps.length - 1
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-500/20'
                      : 'bg-stone-900 border border-stone-800 text-stone-200'
                  }`}>
                    {step}
                  </div>
                  {idx < t.pathSteps.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-stone-600 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
