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
  /** 所属地区代表性图片（底图） */
  bg: string;
}

interface ClientGroup {
  key: 'provincial' | 'prefecture' | 'county' | 'enterprise';
  featured?: boolean;
  clients: ClientEntry[];
}

const BG = {
  yunnan: '/images/region-yunnan-shilin.webp', // 石林·云南
  kunming: '/images/region-kunming-dianchi.webp', // 滇池·昆明
  yuxi: '/images/region-yuxi-fuxian.webp', // 抚仙湖·玉溪
  dali: '/images/erhai-lake.webp', // 洱海·大理
  puer: '/images/region-puer-tropic.webp', // 北回归线公园·普洱
  diqing: '/images/region-diqing-sumtseling.webp', // 松赞林寺·迪庆
  banna: '/images/region-banna-garden.webp', // 热带植物园·西双版纳
  nujiang: '/images/region-nujiang-canyon.webp', // 怒江大峡谷·泸水
  chuxiong: '/images/region-chuxiong-ailao.webp', // 哀牢山·楚雄
  zhaotong: '/images/region-zhaotong-jinsha.webp', // 金沙江·昭通
  zhejiang: '/images/region-zhejiang-westlake.webp', // 西湖·浙江
  puerOld: '/images/region-puer-chamagucheng.webp', // 茶马古城·普洱
  mengla: '/images/region-mengla-wangtianshu.webp', // 望天树·勐腊
  yongshan: '/images/region-yongshan-xiluodu.webp', // 溪洛渡·永善
  ludian: '/images/region-ludian-dahaizi.webp', // 大海子·昭通
  menglian: '/images/region-menglian-palace.webp', // 宣抚司署·孟连
  eryuan: '/images/region-eryuan-westlake.webp', // 洱源西湖·大理
  napahai: '/images/region-shangrila-napahai.webp', // 纳帕海·香格里拉
  xishan: '/images/region-xishan-longmen.webp', // 西山龙门·昆明
  santasi: '/images/region-dali-santasi.webp', // 崇圣寺三塔·大理
  xundian: '/images/region-xundian-redland.webp', // 红土地·寻甸
};

// 客户名单与合作内容均来自网站已公开数据（projectsData.ts / yunnanCitiesData / newsData.ts），未编造。
const CLIENT_GROUPS: ClientGroup[] = [
  {
    key: 'provincial',
    featured: true,
    clients: [
      { zh: '云南省投资促进局', en: 'Yunnan Provincial Investment Promotion Bureau', servicesZh: ['委托招商'], servicesEn: ['Investment Agency'], bg: BG.yunnan },
    ],
  },
  {
    key: 'prefecture',
    clients: [
      { zh: '昆明市投资促进局', en: 'Kunming Municipal Investment Promotion Bureau', servicesZh: ['委托招商'], servicesEn: ['Investment Agency'], bg: BG.kunming },
      { zh: '玉溪市投资促进局', en: 'Yuxi Municipal Investment Promotion Bureau', servicesZh: ['委托招商', '策划包装', '影视传播'], servicesEn: ['Investment Agency', 'Planning & Packaging', 'Film & Media'], bg: BG.yuxi },
      { zh: '大理州投资促进局', en: 'Dali Prefecture Investment Promotion Bureau', servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'], bg: BG.dali },
      { zh: '普洱市投资促进局', en: "Pu'er Municipal Investment Promotion Bureau", servicesZh: ['策划包装', '影视传播'], servicesEn: ['Planning & Packaging', 'Film & Media'], bg: BG.puer },
      { zh: '普洱市文化和旅游局', en: "Pu'er Municipal Bureau of Culture and Tourism", servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'], bg: BG.puerOld },
      { zh: '迪庆州投资促进局', en: 'Diqing Prefecture Investment Promotion Bureau', servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'], bg: BG.diqing },
      { zh: '西双版纳州投资促进局', en: 'Xishuangbanna Prefecture Investment Promotion Bureau', servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'], bg: BG.banna },
      { zh: '泸水市投资促进局', en: 'Lushui Municipal Investment Promotion Bureau', servicesZh: ['影视传播'], servicesEn: ['Film & Media'], bg: BG.nujiang },
    ],
  },
  {
    key: 'county',
    clients: [
      { zh: '昆明市西山区商务和投资促进局', en: 'Xishan District Commerce & Investment Promotion Bureau, Kunming', servicesZh: ['委托招商'], servicesEn: ['Investment Agency'], bg: BG.xishan },
      { zh: '勐海县投资促进局', en: 'Menghai County Investment Promotion Bureau', servicesZh: ['委托招商'], servicesEn: ['Investment Agency'], bg: BG.banna },
      { zh: '勐腊县投资促进局', en: 'Mengla County Investment Promotion Bureau', servicesZh: ['委托招商'], servicesEn: ['Investment Agency'], bg: BG.mengla },
      { zh: '思茅区投资促进局', en: 'Simao District Investment Promotion Bureau', servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'], bg: BG.puer },
      { zh: '孟连县文化和旅游局', en: 'Menglian County Bureau of Culture and Tourism', servicesZh: ['策划包装', '影视传播'], servicesEn: ['Planning & Packaging', 'Film & Media'], bg: BG.menglian },
      { zh: '洱源县投资促进局', en: 'Eryuan County Investment Promotion Bureau', servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'], bg: BG.eryuan },
      { zh: '迪庆香格里拉经开区经济贸易发展局', en: 'Diqing Shangri-La Development Zone Economic & Trade Bureau', servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'], bg: BG.napahai },
      { zh: '双柏县投资促进局', en: 'Shuangbai County Investment Promotion Bureau', servicesZh: ['影视传播'], servicesEn: ['Film & Media'], bg: BG.chuxiong },
      { zh: '寻甸县文化和旅游局', en: 'Xundian County Bureau of Culture and Tourism', servicesZh: ['策划包装', '委托招商'], servicesEn: ['Planning & Packaging', 'Investment Agency'], bg: BG.xundian },
      { zh: '永善县易地扶贫搬迁后续发展服务中心', en: 'Yongshan County Relocation Support Service Center', servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'], bg: BG.yongshan },
      { zh: '鲁甸县农业农村局', en: 'Ludian County Bureau of Agriculture and Rural Affairs', servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'], bg: BG.ludian },
    ],
  },
  {
    key: 'enterprise',
    clients: [
      { zh: '云南双龙文化旅游发展有限责任公司', en: 'Yunnan Shuanglong Culture & Tourism Development Co., Ltd.', servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'], bg: BG.kunming },
      { zh: '中国美术学院望境创意发展有限公司', en: 'Wangjing Creative Development Co., Ltd., China Academy of Art', servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'], bg: BG.zhejiang },
      { zh: '普洱慈康医院有限公司', en: "Pu'er Cikang Hospital Co., Ltd.", servicesZh: ['策划包装'], servicesEn: ['Planning & Packaging'], bg: BG.puer },
      { zh: '大理州文旅投资平台', en: 'Dali Cultural Tourism Investment Platform', servicesZh: ['运营赋能'], servicesEn: ['Operation Empowerment'], bg: BG.santasi },
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
    <div className="group relative overflow-hidden rounded-xl border border-stone-700/60 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/60 hover:shadow-[0_12px_40px_-8px_rgba(217,119,6,0.4)]">
      {/* 地区代表性底图 */}
      <img
        src={client.bg}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
      />
      {/* 压暗渐变，保证文字可读 */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/15" />
      <div className="relative p-5 flex flex-col min-h-[218px]">
        <div className="flex items-start justify-between gap-3">
          <div className="w-10 h-10 rounded-lg bg-stone-950/55 backdrop-blur-sm border border-white/15 flex items-center justify-center text-amber-300 shrink-0">
            <Icon className="w-4 h-4" strokeWidth={1.75} />
          </div>
          <span className="text-[10px] tracking-[0.25em] text-stone-200/90 uppercase pt-1">
            {levelTag}
          </span>
        </div>
        <div className="mt-auto pt-10">
          <h4 className="font-serif-sc text-[15px] leading-snug font-bold text-white text-balance [text-shadow:0_2px_8px_rgba(0,0,0,0.75)]">
            {name}
          </h4>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {services.map((s) => (
              <span
                key={s}
                className="px-2.5 py-1 rounded-full text-[10px] tracking-wide border border-amber-300/40 text-amber-200 bg-stone-950/55 backdrop-blur-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
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
    <div className="group relative overflow-hidden rounded-xl border border-amber-500/30 transition-all duration-300 hover:border-amber-400/70 hover:shadow-[0_12px_44px_-8px_rgba(217,119,6,0.4)]">
      <img
        src={client.bg}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/60 to-stone-950/20" />
      <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5 min-h-[190px]">
        <div className="w-12 h-12 rounded-xl bg-stone-950/55 backdrop-blur-sm border border-amber-300/30 flex items-center justify-center text-amber-300 shrink-0">
          <Landmark className="w-5 h-5" strokeWidth={1.75} />
        </div>
        <div className="flex-1">
          <p className="text-[10px] tracking-[0.3em] text-amber-300/90 uppercase mb-1.5">
            {levelTag}
          </p>
          <h4 className="font-serif-sc text-xl sm:text-2xl font-bold text-white text-balance [text-shadow:0_2px_10px_rgba(0,0,0,0.8)]">
            {name}
          </h4>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:justify-end">
          {services.map((s) => (
            <span
              key={s}
              className="px-3 py-1 rounded-full text-[11px] tracking-wide border border-amber-300/40 text-amber-200 bg-stone-950/55 backdrop-blur-sm"
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
