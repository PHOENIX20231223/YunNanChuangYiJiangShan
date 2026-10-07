import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Landmark } from 'lucide-react';

interface ClientsWallProps {
  lang: Language;
}

// 去重提炼自 projectsData.ts（serviceEngines.clientsZh 与 yunnanCitiesData.clientZh），
// 仅收录网站已公开披露的单位，未编造名单之外的客户。
const CLIENT_GROUPS: { key: 'provincial' | 'prefecture' | 'county' | 'enterprise'; zh: string[]; en: string[] }[] = [
  {
    key: 'provincial',
    zh: ['云南省投资促进局'],
    en: ['Yunnan Provincial Investment Promotion Bureau'],
  },
  {
    key: 'prefecture',
    zh: [
      '昆明市投资促进局',
      '玉溪市投资促进局',
      '大理州投资促进局',
      '普洱市投资促进局',
      '普洱市文化和旅游局',
      '迪庆州投资促进局',
      '西双版纳州投资促进局',
      '泸水市投资促进局',
    ],
    en: [
      'Kunming Municipal Investment Promotion Bureau',
      'Yuxi Municipal Investment Promotion Bureau',
      'Dali Prefecture Investment Promotion Bureau',
      "Pu'er Municipal Investment Promotion Bureau",
      "Pu'er Municipal Bureau of Culture and Tourism",
      'Diqing Prefecture Investment Promotion Bureau',
      'Xishuangbanna Prefecture Investment Promotion Bureau',
      'Lushui Municipal Investment Promotion Bureau',
    ],
  },
  {
    key: 'county',
    zh: [
      '昆明市西山区商务和投资促进局',
      '勐海县投资促进局',
      '勐腊县投资促进局',
      '思茅区投资促进局',
      '孟连县文化和旅游局',
      '洱源县投资促进局',
      '迪庆香格里拉经开区经济贸易发展局',
      '双柏县投资促进局',
      '寻甸县文化和旅游局',
      '永善县易地扶贫搬迁后续发展服务中心',
      '鲁甸县农业农村局',
    ],
    en: [
      'Xishan District Commerce & Investment Promotion Bureau, Kunming',
      'Menghai County Investment Promotion Bureau',
      'Mengla County Investment Promotion Bureau',
      'Simao District Investment Promotion Bureau',
      'Menglian County Bureau of Culture and Tourism',
      'Eryuan County Investment Promotion Bureau',
      'Diqing Shangri-La Development Zone Economic & Trade Bureau',
      'Shuangbai County Investment Promotion Bureau',
      'Xundian County Bureau of Culture and Tourism',
      'Yongshan County Relocation Support Service Center',
      'Ludian County Bureau of Agriculture and Rural Affairs',
    ],
  },
  {
    key: 'enterprise',
    zh: [
      '云南双龙文化旅游发展有限责任公司',
      '中国美术学院望境创意发展有限公司',
      '普洱慈康医院有限公司',
      '大理州文旅投资平台',
    ],
    en: [
      'Yunnan Shuanglong Culture & Tourism Development Co., Ltd.',
      'Wangjing Creative Development Co., Ltd., China Academy of Art',
      "Pu'er Cikang Hospital Co., Ltd.",
      'Dali Cultural Tourism Investment Platform',
    ],
  },
];

export const ClientsWall: React.FC<ClientsWallProps> = ({ lang }) => {
  const t = translations[lang].clients;
  const groupTitles = t.groups;

  return (
    <section id="clients" className="py-20 bg-stone-950 border-t border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
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

        {/* Grouped client lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CLIENT_GROUPS.map((group) => {
            const title = groupTitles.find((g) => g.key === group.key)?.title || group.key;
            const names = lang === 'zh' ? group.zh : group.en;
            return (
              <div
                key={group.key}
                className="p-6 sm:p-7 rounded-2xl bg-stone-900/50 border border-stone-800"
              >
                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-stone-800">
                  <Landmark className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-stone-100 font-serif-sc tracking-wide">
                    {title}
                  </h3>
                  <span className="ml-auto text-[11px] text-stone-500 font-mono">
                    {names.length}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {names.map((name, idx) => (
                    <li
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-stone-950/80 border border-stone-800 text-xs text-stone-300 hover:border-amber-500/40 hover:text-amber-200 transition-colors"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[11px] text-stone-500 mt-10 font-mono">
          {t.note}
        </p>
      </div>
    </section>
  );
};
