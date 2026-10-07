import React, { useState } from 'react';
import { yunnanCitiesData, YunnanCityData } from '../data/projectsData';
import { Language } from '../types';
import { translations } from '../data/translations';
import { MapPin, CheckCircle, Building, Layers, Sparkles } from 'lucide-react';

interface YunnanMapExplorerProps {
  lang: Language;
}

export const YunnanMapExplorer: React.FC<YunnanMapExplorerProps> = ({ lang }) => {
  const [selectedCityId, setSelectedCityId] = useState<string>('kunming');
  const t = translations[lang].footprint;

  const currentCity = yunnanCitiesData.find((c) => c.id === selectedCityId) || yunnanCitiesData[0];

  return (
    <section id="footprint" className="py-20 bg-stone-950 border-t border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
            PROVINCE-WIDE TRACK RECORD
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-sc text-stone-100 mt-2 text-balance">
            {t.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-stone-400 mt-3 leading-relaxed text-balance">
            {t.sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Cols: Interactive Map Visualization of Yunnan */}
          <div className="lg:col-span-7 bg-stone-900/60 border border-stone-800/90 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{t.selectCity}</span>
              </div>
              <div className="text-xs text-stone-500 font-mono">
                DATA VERIFIED · 2026
              </div>
            </div>

            {/* Interactive SVG Map container */}
            <div className="relative w-full aspect-[4/3] bg-stone-950/80 rounded-xl border border-stone-800/80 overflow-hidden flex items-center justify-center">
              {/* Yunnan Topographical Vector Silhouette */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full p-4 select-none"
                fill="none"
              >
                <defs>
                  <linearGradient id="ynProvinceGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#1e3a47" stopOpacity="0.7" />
                    <stop offset="60%" stopColor="#0f4c5c" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0a2533" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Stylized Yunnan province boundary contour */}
                <path
                  d="M20 18 L34 14 L42 22 L52 24 L68 20 L78 28 L84 38 L80 48 L72 54 L68 62 L64 74 L54 88 L44 94 L38 88 L36 76 L26 72 L22 62 L18 50 L14 42 L18 28 Z"
                  fill="url(#ynProvinceGrad)"
                  stroke="#38bdf8"
                  strokeWidth="1.2"
                  strokeOpacity="0.4"
                  strokeDasharray="2 2"
                />

                {/* Connecting lines from Kunming (provincial center) to all prefectures */}
                {yunnanCitiesData
                  .filter((c) => c.id !== 'kunming' && c.id !== 'provincial')
                  .map((city) => (
                    <line
                      key={city.id}
                      x1={57}
                      y1={53}
                      x2={city.coords.x}
                      y2={city.coords.y}
                      stroke={selectedCityId === city.id ? '#f59e0b' : '#334155'}
                      strokeWidth={selectedCityId === city.id ? '1.5' : '0.6'}
                      strokeDasharray={selectedCityId === city.id ? 'none' : '2 2'}
                      opacity={selectedCityId === city.id ? 0.9 : 0.4}
                    />
                  ))}

                {/* City node markers */}
                {yunnanCitiesData
                  .filter((c) => c.id !== 'provincial')
                  .map((city) => {
                    const isSelected = city.id === selectedCityId;
                    return (
                      <g
                        key={city.id}
                        className="cursor-pointer transition-all duration-200"
                        onClick={() => setSelectedCityId(city.id)}
                      >
                        {/* Radar pulse for active city */}
                        {isSelected && (
                          <circle
                            cx={city.coords.x}
                            cy={city.coords.y}
                            r="5.5"
                            fill="#f59e0b"
                            fillOpacity="0.25"
                            className="animate-ping"
                          />
                        )}

                        <circle
                          cx={city.coords.x}
                          cy={city.coords.y}
                          r={isSelected ? 3.5 : 2.2}
                          fill={isSelected ? '#f59e0b' : '#0284c7'}
                          stroke="#ffffff"
                          strokeWidth="0.8"
                        />

                        {/* City Label */}
                        <text
                          x={city.coords.x + 3.5}
                          y={city.coords.y + 1.2}
                          fill={isSelected ? '#fbbf24' : '#cbd5e1'}
                          fontSize={isSelected ? '3.8' : '3.2'}
                          fontWeight={isSelected ? 'bold' : 'normal'}
                          fontFamily="sans-serif"
                        >
                          {lang === 'zh' ? city.nameZh : city.nameEn}
                        </text>
                      </g>
                    );
                  })}
              </svg>

              {/* City Pill Selectors Bar at Bottom */}
              <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1 justify-center bg-stone-950/80 p-1.5 rounded-lg border border-stone-800">
                {yunnanCitiesData.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCityId(c.id)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                      c.id === selectedCityId
                        ? 'bg-amber-600 text-white font-bold'
                        : 'text-stone-400 hover:text-white hover:bg-stone-800'
                    }`}
                  >
                    {lang === 'zh' ? c.nameZh : c.nameEn}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right 5 Cols: City Executed Projects Detail List */}
          <div className="lg:col-span-5 bg-stone-900/60 border border-stone-800 rounded-2xl p-6 sm:p-7 shadow-xl">
            <div className="pb-4 border-b border-stone-800">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-bold">
                  {lang === 'zh' ? currentCity.nameZh : currentCity.nameEn} · 实战记录
                </span>
                <span className="text-xs text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                  {currentCity.projectsCount}+ 个实战项目
                </span>
              </div>
              <h3 className="text-xl font-bold font-serif-sc text-stone-100 mt-1">
                {lang === 'zh' ? currentCity.highlightZh : currentCity.highlightEn}
              </h3>
            </div>

            {/* List of executed projects in this city */}
            <div className="mt-5 space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {currentCity.projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-stone-950/80 rounded-xl border border-stone-800/80 hover:border-amber-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
                    <span className="text-amber-400/90 font-mono font-medium">
                      {proj.typeZh}
                    </span>
                    <span className="font-mono">{proj.year}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-stone-200">
                    {lang === 'zh' ? proj.titleZh : proj.titleEn}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-stone-400">
                    <Building className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                    <span>委托单位：{proj.clientZh}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800 text-xs text-stone-400 flex items-center justify-between">
              <span>实地驻场 · 专案落地 · 全流程协同</span>
              <a href="#contact" className="text-amber-400 hover:underline">
                咨询本项目类型 →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
