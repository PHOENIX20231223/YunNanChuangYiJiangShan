import { NewsItem } from '../types';

const STORAGE_KEY = 'yunnan_jiangshan_news_v1';

export const initialNews: NewsItem[] = [
  {
    id: 'news-1',
    titleZh: '泸沽湖女儿谷综合文旅度假区进入收官冲刺',
    titleEn: 'Lugu Lake Daughter Valley Resort Enters Final Sprint Ahead of October 2026 Grand Opening',
    category: 'milestone',
    date: '2026-09-18',
    authorZh: '品牌宣传统筹中心',
    authorEn: 'Brand & Communications Center',
    summaryZh: '由云南创意江山文化旅游发展有限公司全程深度策划、招商与运营赋能的“泸沽湖女儿谷”项目工程全面告捷。作为摩梭文化与高山度假融合典范，项目即将于10月正式迎来全球宾客。',
    summaryEn: 'The Lugu Lake Daughter Valley project, planned, packaged, and operated by Yunnan Creative Landscape, has completed main structural construction and will formally debut in October 2026.',
    contentZh: `2026年金秋，云南省重点文旅标杆项目——泸沽湖女儿谷综合文旅度假区正式进入开业倒计时阶段。该项目坐落于风景秀丽的泸沽湖核心景区，占地面积约380亩，由云南创意江山文化旅游发展有限公司承接全周期“策划+规划+招商+运营”一体化服务。

项目自立项以来，秉承陈放先生“奇妙创意，快速落地”的核心思想，摒弃千篇一律的商业化模式，深度挖掘国家级非物质文化遗产——摩梭人母系氏族风俗与甲搓舞艺术，打造了木楞房民俗院落群、高原悬崖半山酒店、静谧猪槽船水上探秘基地等三大主力组团。

目前，首批引入的国际精品度假酒店与特色非遗手造工坊已全部完成内部精装与团队培训演练。该项目的正式运营，将极大拓宽滇西北环线高端度假市场版图，预计年带动周边乡村增收超3000万元。`,
    contentEn: `In Autumn 2026, the benchmark cultural tourism resort - Lugu Lake Daughter Valley officially entered its final countdown for its Grand Opening in October 2026. Yunnan Creative Landscape provided complete planning, design, and operator integration for the 380-acre development.

Deeply honoring the matriarchal traditions of the Mosuo culture, the destination features traditional timber lodge clusters, cliffside eco-resorts, and authentic dugout canoe explorations. The debut will set a new international standard for ethnic cultural tourism.`,
    coverImage: 'preset-lugu',
    tagsZh: ['泸沽湖女儿谷', '开业发布', '半山酒店', '综合文旅'],
    tagsEn: ['Lugu Lake', 'Opening', 'Luxury Lodges', 'Integrated Resort'],
    views: 1840,
    isOfficial: true,
  },
  {
    id: 'news-2',
    titleZh: '深化“绿水青山就是金山银山”：洱海生态廊道智慧文旅运营模式获全省推广',
    titleEn: 'Deepening Eco-Civilization: Erhai Lake Smart Tourism Operations Recognized for Provincial Promotion',
    category: 'milestone',
    date: '2026-08-05',
    authorZh: '文旅运营事业部',
    authorEn: 'Tourism Operations Division',
    summaryZh: '云南创意江山受邀参加全省文旅高质量发展现场推进会，并分享洱海生态廊道如何通过前置商业策划与低碳智慧驿站运营，达成生态效益与社会经济效益的双向共赢。',
    summaryEn: 'Yunnan Creative Landscape delivered a keynote address at the Provincial Cultural Tourism Conference, detailing how Erhai Lake Eco-Corridor balanced stringent preservation with thriving smart low-carbon operations.',
    contentZh: `在日前举办的云南省文旅产业高质量发展现场推进会上，大理洱海生态廊道的运营赋能成果作为典型示范案例获得重点剖析。

云南创意江山团队在项目服务过程中，牢牢守住“生态保护第一”的红线，为129公里的生态绿道量身定制了阶梯式文旅服务驿站体系。团队通过数字化分流、环保低碳骑行线路、非遗白族扎染文创体验点等场景植入，将传统生态工程转型为可造血、可持续的现代化文旅目的地。

据统计，截至2026年夏季，生态廊道累计接待省内外游客超1200万人次，沿线村民通过参与驿站运营、特色手工艺品制作与有机餐饮，人均年收入显著跃升。`,
    contentEn: `During the Provincial High-Quality Tourism Summit, the operation models implemented at the Dali Erhai Ecological Corridor were spotlighted as an exemplary achievement.

By instituting zero-carbon smart rest stations, heritage tie-dye workshops, and scenic cycling flows, the corridor achieved environmental conservation while generating substantial tourism prosperity.`,
    coverImage: 'preset-erhai',
    tagsZh: ['洱海生态廊道', '生态文旅', '智慧驿站', '大理发展'],
    tagsEn: ['Erhai Lake', 'Eco-Tourism', 'Smart Stations', 'Dali'],
    views: 2420,
    isOfficial: true,
  },
  {
    id: 'news-3',
    titleZh: '立足招商全链条：云南创意江山圆满完成多地州市重点文旅招商专案编制与路演推介',
    titleEn: 'Full-Chain Investment Engine: Company Successfully Delivers Multi-Prefecture Investor Prospectuses & Roadshows',
    category: 'announcement',
    date: '2026-06-20',
    authorZh: '招商代理与策划中心',
    authorEn: 'Investment Agency & Strategy Center',
    summaryZh: '围绕沿边产业园区、文旅康养及重点文旅IP，云南创意江山先后承接大理、玉溪、普洱、西双版纳等多地招商专案策划包装，助力地方政府精准锁定长三角与粤港澳大湾区目标资本。',
    summaryEn: 'Covering border industrial corridors and wellness destinations, Yunnan Creative Landscape developed investment prospectuses for Dali, Yuxi, Pu\'er, and Xishuangbanna, connecting local governments with tier-1 capital.',
    contentZh: `招商引资是文旅项目从“纸面规划”走向“实体落地”的核心命脉。云南创意江山依托长期服务云南省、市、县三级投资促进局的政务实操经验，创新构建了“产业作战图谱+定制招商手册+数字化H5+精准路演”的招商四重奏体系。

今年以来，团队先后主导编制了西双版纳口岸经济产业招商作战图谱、普洱云咖小镇重点招商专案、勐海与勐腊县全链条招商引资项目库。在长三角与珠三角招商对接会上，精准匹配对接文旅上市公司、康养基金与高端民宿运营商30余家，意向投资协议额达数十亿元。

公司负责人表示，我们将持续发挥“懂政府、懂资本、懂运营”的独特桥梁纽带优势，协助更多云南优势资源转化为受资本追捧的明星资产。`,
    contentEn: `Investment attraction is the bridge linking blueprints to tangible reality. Yunnan Creative Landscape leveraged its long-term partnership with investment bureaus to deploy its four-part investment framework.

The roadshow attracted over 30 leading listed corporations, wellness investment funds, and hospitality groups, securing multi-billion RMB in letters of intent.`,
    coverImage: 'preset-coffee',
    tagsZh: ['委托招商', '产业专案', '政企合作', '大湾区路演'],
    tagsEn: ['Investment Agency', 'Prospectus', 'Gov Partnerships', 'Roadshow'],
    views: 1530,
    isOfficial: true,
  },
  {
    id: 'news-4',
    titleZh: '国家级智库对话：陈放策划学理念在云南全域文旅与乡村振兴中的生动实践',
    titleEn: 'National Think Tank Dialogue: The Living Practice of Chen Fang\'s Planning Science in Yunnan Rural Revitalization',
    category: 'insight',
    date: '2026-05-12',
    authorZh: '创意研究院学术委员会',
    authorEn: 'Creative Institute Academic Committee',
    summaryZh: '中国策划学创始人陈放先生提出的“奇妙创意，快速落地”在云岭大地结出累累硕果。智库专家深入调研云南创意江山落地项目，系统总结文旅全产业链赋能县域经济的创新范式。',
    summaryEn: 'The core doctrine "Extraordinary Creativity, Rapid Execution" pioneered by Mr. Chen Fang bears rich fruit across Yunnan. Think tank scholars examined the company\'s 35+ implementations.',
    contentZh: `日前，中国创意研究院联合云南创意江山专家组开展为期一周的云南文旅实操复盘研讨。调研组实地考察了罗平九龙瀑布、长江第一湾水上漂流及普洱半山酒店系列规划项目。

研讨指出，云南文旅已全面步入“存量资产提质增效”与“原生文化深度解码”的新周期。传统的单纯设计规划院往往脱离后期施工与运营，导致大量蓝图束之高阁；而云南创意江山始终将“目的地交付”作为策划起点，从方案构思首日便将投入产出、建设周期、客群画像和投资人退出的完整商业闭环前置化设计。

专家组一致认为，这种以国家级智库策划力为底座、以在地化全链条落地能力为抓手的模式，代表了新时期中国文旅服务机构的核心演进方向。`,
    contentEn: `A joint symposium held with the China Creative Institute evaluated the operational longevity of projects across Yunnan. Experts praised the firm\'s destination-delivery doctrine where financial viability and post-launch management are baked in from day one.`,
    coverImage: 'preset-yangtze',
    tagsZh: ['陈放策划学', '国家级智库', '乡村振兴', '范式创新'],
    tagsEn: ['Chen Fang Theory', 'Think Tank', 'Rural Revival', 'Paradigm'],
    views: 3100,
    isOfficial: true,
  },
];

export function getStoredNews(): NewsItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Sanitize every item to ensure all fields are safely defined
        return parsed.map((item, idx) => ({
          id: String(item.id || `news-stored-${idx}-${Date.now()}`),
          titleZh: String(item.titleZh || '新闻资讯'),
          titleEn: String(item.titleEn || item.titleZh || 'News Update'),
          category: (['group', 'milestone', 'insight', 'announcement'].includes(item.category)
            ? item.category
            : 'group') as NewsItem['category'],
          date: String(item.date || new Date().toISOString().slice(0, 10)),
          authorZh: String(item.authorZh || '云南创意江山统筹中心'),
          authorEn: String(item.authorEn || 'Creative Landscape Team'),
          summaryZh: String(item.summaryZh || ''),
          summaryEn: String(item.summaryEn || ''),
          contentZh: String(item.contentZh || ''),
          contentEn: String(item.contentEn || ''),
          coverImage: String(item.coverImage || 'preset-erhai'),
          videoUrl: item.videoUrl ? String(item.videoUrl) : undefined,
          tagsZh: Array.isArray(item.tagsZh) && item.tagsZh.length > 0 ? item.tagsZh.map(String) : ['云南文旅'],
          tagsEn: Array.isArray(item.tagsEn) && item.tagsEn.length > 0 ? item.tagsEn.map(String) : ['Yunnan Tourism'],
          views: typeof item.views === 'number' ? item.views : 1,
          isOfficial: !!item.isOfficial,
        }));
      }
    }
  } catch (err) {
    console.error('Failed to parse stored news:', err);
  }
  return initialNews;
}

export function saveNewsToStorage(newsList: NewsItem[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newsList));
    return true;
  } catch (err) {
    console.warn('Failed to save full news to localStorage (possible quota limit):', err);
    // If quota exceeded, compress and keep items safely without massive data URLs
    try {
      const streamlined = newsList.slice(0, 20).map((item) => ({
        ...item,
        // If an image dataURL is overly huge (>400KB), replace with preset to prevent quota crash
        coverImage:
          item.coverImage && item.coverImage.length > 400000
            ? 'preset-erhai'
            : item.coverImage || 'preset-erhai',
        // Strip huge local video dataURL from localStorage (video still plays in current session)
        videoUrl:
          item.videoUrl && item.videoUrl.length > 100000
            ? undefined
            : item.videoUrl,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(streamlined));
      return true;
    } catch (fallbackErr) {
      console.error('Failed fallback storage:', fallbackErr);
      return false;
    }
  }
}

export function resetNewsToDefault(): NewsItem[] {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear storage:', err);
  }
  return initialNews;
}
