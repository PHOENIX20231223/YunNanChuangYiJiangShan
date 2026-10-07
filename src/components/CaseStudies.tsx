import React, { useState } from 'react';
import { flagshipCases } from '../data/projectsData';
import { ProjectCase, Language } from '../types';
import { translations } from '../data/translations';
import { ScenicCover } from './VisualAssets';
import { Share2, ArrowUpRight, CheckCircle, MapPin, Calendar, X } from 'lucide-react';
import { ShareModal } from './ShareModal';

interface CaseStudiesProps {
  lang: Language;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ lang }) => {
  const [filter, setFilter] = useState<'all' | 'core' | 'attract' | 'planning' | 'media'>('all');
  const [selectedCase, setSelectedCase] = useState<ProjectCase | null>(null);
  const [sharingCase, setSharingCase] = useState<ProjectCase | null>(null);

  const t = translations[lang].cases;

  const filteredCases = flagshipCases.filter((c) => {
    if (filter === 'all') return true;
    return c.category === filter;
  });

  return (
    <section id="cases" className="py-20 bg-stone-900/50 border-t border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
            EXECUTED FLAGSHIP PROJECTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-sc text-stone-100 mt-2 text-balance">
            {t.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-stone-400 mt-3 leading-relaxed text-balance">
            {t.sectionSubtitle}
          </p>
        </div>

        {/* Filter Tabs (Interactive Segmented Buttons) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {(
            [
              { key: 'all', label: t.tabs.all },
              { key: 'core', label: t.tabs.core },
              { key: 'planning', label: t.tabs.planning },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                filter === tab.key
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-900/30'
                  : 'bg-stone-900 text-stone-300 border border-stone-800 hover:border-stone-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCases.map((item) => (
            <div
              key={item.id}
              className="bg-stone-950 rounded-2xl border border-stone-800/90 overflow-hidden flex flex-col justify-between group hover:border-amber-500/50 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Visual Cover */}
                <div className="relative h-52 w-full overflow-hidden cursor-pointer" onClick={() => setSelectedCase(item)}>
                  <ScenicCover
                    type={item.id}
                    className="w-full h-full"
                    title={lang === 'zh' ? item.titleZh : item.titleEn}
                    badge={lang === 'zh' ? item.tagZh : item.tagEn}
                  />
                  <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Content Area */}
                <div className="p-6">
                  {/* Clean unboxed metadata with bullet separators (anti-slop rule) */}
                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-2.5">
                    <span className="flex items-center gap-1 text-amber-400 font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      {lang === 'zh' ? item.cityZh : item.cityEn}
                    </span>
                    <span aria-hidden="true" className="text-stone-600">·</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-stone-500" />
                      {item.year}
                    </span>
                  </div>

                  <h3
                    onClick={() => setSelectedCase(item)}
                    className="text-lg font-bold font-serif-sc text-stone-100 group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-2"
                  >
                    {lang === 'zh' ? item.titleZh : item.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-400 mt-2.5 line-clamp-3 leading-relaxed">
                    {lang === 'zh' ? item.summaryZh : item.summaryEn}
                  </p>

                  {/* Impact highlight pill/box */}
                  <div className="mt-4 p-3 bg-stone-900/80 rounded-lg border border-stone-800 text-xs text-stone-300">
                    <strong className="text-amber-400 block mb-1">
                      {lang === 'zh' ? '落地成效：' : 'Impact: '}
                    </strong>
                    <span className="line-clamp-2">
                      {lang === 'zh' ? item.impactZh : item.impactEn}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-stone-900">
                <button
                  onClick={() => setSelectedCase(item)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>{t.readMore}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setSharingCase(item)}
                  className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
                  title={t.shareCase}
                >
                  <Share2 className="w-4 h-4 text-emerald-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Details Full Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-950/80 text-stone-300 hover:text-white hover:bg-stone-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 sm:h-80 w-full shrink-0">
              <ScenicCover
                type={selectedCase.id}
                className="w-full h-full"
                title={lang === 'zh' ? selectedCase.titleZh : selectedCase.titleEn}
                badge={lang === 'zh' ? selectedCase.tagZh : selectedCase.tagEn}
              />
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-400 mb-2">
                  <span className="text-amber-400 font-medium">
                    {lang === 'zh' ? selectedCase.cityZh : selectedCase.cityEn}
                  </span>
                  <span>·</span>
                  <span className="font-mono">{selectedCase.year}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif-sc text-stone-100">
                  {lang === 'zh' ? selectedCase.titleZh : selectedCase.titleEn}
                </h2>
                <p className="text-sm text-stone-300 mt-3 leading-relaxed">
                  {lang === 'zh' ? selectedCase.summaryZh : selectedCase.summaryEn}
                </p>
              </div>

              {/* Deliverables checklist */}
              <div className="p-4 bg-stone-950/70 rounded-xl border border-stone-800">
                <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-3">
                  {lang === 'zh' ? '全流程服务交付清单' : 'Project Deliverables'}
                </h4>
                <ul className="space-y-2.5">
                  {(lang === 'zh' ? selectedCase.deliverablesZh : selectedCase.deliverablesEn).map(
                    (del, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-200">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Impact */}
              <div className="p-4 bg-emerald-950/30 rounded-xl border border-emerald-800/40 text-xs sm:text-sm text-emerald-200">
                <strong className="block text-emerald-400 font-bold mb-1">
                  {lang === 'zh' ? '综合实战成果与社会经济效益：' : 'Measured Impact: '}
                </strong>
                <p className="leading-relaxed">
                  {lang === 'zh' ? selectedCase.impactZh : selectedCase.impactEn}
                </p>
              </div>

              {/* Footer Modal Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-800">
                <button
                  onClick={() => {
                    const c = selectedCase;
                    setSelectedCase(null);
                    setSharingCase(c);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-medium transition-colors"
                >
                  <Share2 className="w-4 h-4 text-emerald-400" />
                  <span>{t.shareCase}</span>
                </button>

                <button
                  onClick={() => setSelectedCase(null)}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Social Media Share Modal for Case */}
      {sharingCase && (
        <ShareModal
          isOpen={true}
          onClose={() => setSharingCase(null)}
          lang={lang}
          title={lang === 'zh' ? sharingCase.titleZh : sharingCase.titleEn}
          summary={lang === 'zh' ? sharingCase.summaryZh : sharingCase.summaryEn}
          categoryName={lang === 'zh' ? sharingCase.tagZh : sharingCase.tagEn}
        />
      )}
    </section>
  );
};
