import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Landmark, Building2 } from 'lucide-react';

interface ClientsWallProps {
  lang: Language;
}

interface ClientEntry {
  zh: string;
  en: string;
  /** 合作内容标签（提炼自网站已公开披露的合作信息，未编造） */
  servicesZh: string[];
  servicesEn: string[];
}

interface ClientGroup {
  key: 'provincial' | 'prefecture' | 'county' | 'enterprise';
  featured?: boolean;
  clients: ClientEntry[];
}

// 客户名单与合作内容均来自网站已公开数据（projectsData.ts / yunnanCitiesData / newsData.ts），未编造。
const CLIENT_GROUPS: ClientGroup[] = [
  {
    key: 'provincial',
    featured: true,
    clients: [
      { zh: '云南省投资促进局', en: 'Yunnan Provincial Investment Promotion Bureau', servicesZh: ['委托招商'], servicesEn: ['Investment Agency'] },
    ],
  },
  {
    key: 'prefecture',
    clients: [
      { zh: '昆明市投资促进局', en: 'Kunming Municipal Investment Promotion Bureau', servicesZh: ['委托招商'], servicesEn: ['Investment Agency'] },
      { zh: '玉溪市投资促进局', en: 'Yuxi Municipal Investment Promotion Bureau', servicesZh: ['委托招商', '策划包装', '影视传播'], servicesEn: ['Investment Agency', 'Planning & Packaging', 'Film & Media'] },
      { zh: '大理州投资促进局', en: 'Dali Prefecture Investment Promotion Bureau', servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'] },
      { zh: '普洱市投资促进局', en: "Pu'er Municipal Investment Promotion Bureau", servicesZh: ['策划包装', '影视传播'], servicesEn: ['Planning & Packaging', 'Film & Media'] },
      { zh: '普洱市文化和旅游局', en: "Pu'er Municipal Bureau of Culture and Tourism", servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'] },
      { zh: '迪庆州投资促进局', en: 'Diqing Prefecture Investment Promotion Bureau', servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'] },
      { zh: '西双版纳州投资促进局', en: 'Xishuangbanna Prefecture Investment Promotion Bureau', servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'] },
      { zh: '泸水市投资促进局', en: 'Lushui Municipal Investment Promotion Bureau', servicesZh: ['影视传播'], servicesEn: ['Film & Media'] },
    ],
  },
  {
    key: 'county',
    clients: [
      { zh: '昆明市西山区商务和投资促进局', en: 'Xishan District Commerce & Investment Promotion Bureau, Kunming', servicesZh: ['委托招商'], servicesEn: ['Investment Agency'] },
      { zh: '勐海县投资促进局', en: 'Menghai County Investment Promotion Bureau', servicesZh: ['委托招商'], servicesEn: ['Investment Agency'] },
      { zh: '勐腊县投资促进局', en: 'Mengla County Investment Promotion Bureau', servicesZh: ['委托招商'], servicesEn: ['Investment Agency'] },
      { zh: '思茅区投资促进局', en: 'Simao District Investment Promotion Bureau', servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'] },
      { zh: '孟连县文化和旅游局', en: 'Menglian County Bureau of Culture and Tourism', servicesZh: ['策划包装', '影视传播'], servicesEn: ['Planning & Packaging', 'Film & Media'] },
      { zh: '洱源县投资促进局', en: 'Eryuan County Investment Promotion Bureau', servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'] },
      { zh: '迪庆香格里拉经开区经济贸易发展局', en: 'Diqing Shangri-La Development Zone Economic & Trade Bureau', servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'] },
      { zh: '双柏县投资促进局', en: 'Shuangbai County Investment Promotion Bureau', servicesZh: ['影视传播'], servicesEn: ['Film & Media'] },
      { zh: '寻甸县文化和旅游局', en: 'Xundian County Bureau of Culture and Tourism', servicesZh: ['策划包装', '委托招商'], servicesEn: ['Planning & Packaging', 'Investment Agency'] },
      { zh: '永善县易地扶贫搬迁后续发展服务中心', en: 'Yongshan County Relocation Support Service Center', servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'] },
      { zh: '鲁甸县农业农村局', en: 'Ludian County Bureau of Agriculture and Rural Affairs', servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'] },
    ],
  },
  {
    key: 'enterprise',
    clients: [
      { zh: '云南双龙文化旅游发展有限责任公司', en: 'Yunnan Shuanglong Culture & Tourism Development Co., Ltd.', servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'] },
      { zh: '中国美术学院望境创意发展有限公司', en: 'Wangjing Creative Development Co., Ltd., China Academy of Art', servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'] },
      { zh: '普洱慈康医院有限公司', en: "Pu'er Cikang Hospital Co., Ltd.", servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'] },
      { zh: '大理州文旅投资平台', en: 'Dali Cultural Tourism Investment Platform', servicesZh: ['运营赋能'], servicesEn: ['Operation Empowerment'] },
    ],
  },
];

const LEVEL_TAG: Record<ClientGroup['key'], { zh: string; en: string }> = {
  provincial: { zh: '省级单位', en: 'Provincial' },
  prefecture: { zh: '州市单位', en: 'Prefecture & City' },
  county: { zh: '县区单位', en: 'County & District' },
  enterprise: { zh: '文旅企业', en: 'Tourism Enterprise' },
};

const ClientCard: React.FC<{ client: ClientEntry; lang: Language; levelTag: string; isGov: boolean }> = ({
  client,
  lang,
  levelTag,
  isGov,
}) => {
  const name = lang === 'zh' ? client.zh : client.en;
  const services = lang === 'zh' ? client.servicesZh : client.servicesEn;
  const Icon = isGov ? Landmark : Building2;
  return (
    <div className="group relative overflow-hidden rounded-xl border border-stone-800 bg-gradient-to-b from-stone-900/90 to-stone-950 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-[0_10px_36px_-8px_rgba(217,119,6,0.28)]">
      {/* 顶部金线 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/70 to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-3">
        <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0 transition-colors duration-300 group-hover:text-amber-300 group-hover:border-amber-500/60">
          <Icon className="w-4.5 h-4.5" strokeWidth={1.75} />
        </div>
        <span className="text-[10px] tracking-[0.25em] text-stone-500 uppercase pt-1">
          {levelTag}
        </span>
      </div>
      <h4 className="mt-4 font-serif-sc text-[15px] leading-snug font-bold text-stone-100 text-balance">
        {name}
      </h4>
      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {services.map((s) => (
          <span
            key={s}
            className="px-2.5 py-1 rounded-full text-[10px] tracking-wide border border-amber-500/30 text-amber-300/90 bg-amber-500/[0.06]"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
};

const FeaturedCard: React.FC<{ client: ClientEntry; lang: Language; levelTag: string }> = ({
  client,
  lang,
  levelTag,
}) => {
  const name = lang === 'zh' ? client.zh : client.en;
  const services = lang === 'zh' ? client.servicesZh : client.servicesEn;
  return (
    <div className="group relative overflow-hidden rounded-xl border border-amber-500/25 bg-gradient-to-r from-stone-900 via-stone-900/95 to-stone-950 p-6 sm:p-7 transition-all duration-300 hover:border-amber-500/60 hover:shadow-[0_10px_40px_-8px_rgba(217,119,6,0.3)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
      {/* 背景大字水印 */}
      <span
        aria-hidden
        className="absolute -right-4 -bottom-7 font-serif-sc text-[110px] leading-none font-black text-amber-500/[0.05] select-none pointer-events-none"
      >
        {lang === 'zh' ? '信' : 'TRUST'}
      </span>
      <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="w-12 h-12 rounded-xl bg-amber-500/12 border border-amber-500/35 flex items-center justify-center text-amber-300 shrink-0">
          <Landmark className="w-5 h-5" strokeWidth={1.75} />
        </div>
        <div className="flex-1">
          <p className="text-[10px] tracking-[0.3em] text-amber-400/80 uppercase mb-1.5">
            {levelTag}
          </p>
          <h4 className="font-serif-sc text-xl sm:text-2xl font-bold text-stone-50 text-balance">
            {name}
          </h4>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:justify-end">
          {services.map((s) => (
            <span
              key={s}
              className="px-3 py-1 rounded-full text-[11px] tracking-wide border border-amber-500/40 text-amber-200 bg-amber-500/10"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ClientsWall: React.FC<ClientsWallProps> = ({ lang }) => {
  const t = translations[lang].clients;
  const groupTitles = t.groups;
  const total = CLIENT_GROUPS.reduce((n, g) => n + g.clients.length, 0);

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

        {/* Grouped card walls */}
        <div className="space-y-10">
          {CLIENT_GROUPS.map((group) => {
            const title = groupTitles.find((g) => g.key === group.key)?.title || group.key;
            const levelTag = LEVEL_TAG[group.key][lang];
            const isGov = group.key !== 'enterprise';
            return (
              <div key={group.key}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent to-stone-800" />
                  <h3 className="text-sm font-bold text-stone-200 font-serif-sc tracking-[0.2em] whitespace-nowrap">
                    {title}
                  </h3>
                  <span className="text-[11px] text-amber-400/80 font-mono border border-amber-500/25 rounded-full px-2.5 py-0.5">
                    {group.clients.length}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-l from-transparent to-stone-800" />
                </div>
                {group.featured ? (
                  <FeaturedCard
                    client={group.clients[0]}
                    lang={lang}
                    levelTag={levelTag}
                  />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.clients.map((client) => (
                      <ClientCard
                        key={client.zh}
                        client={client}
                        lang={lang}
                        levelTag={levelTag}
                        isGov={isGov}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-center text-[11px] text-stone-500 mt-12 font-mono">
          {t.note} · {total}
        </p>
      </div>
    </section>
  );
};
