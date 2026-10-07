import React, { useState } from 'react';

export const REAL_SCENIC_IMAGES: Record<string, { url: string; altZh: string; altEn: string; locationZh: string; locationEn: string }> = {
  'hero-yunnan': {
    url: '/images/jade-dragon-snow-mountain.webp',
    altZh: '云南玉龙雪山及高原风光实景',
    altEn: 'Real scene of Jade Dragon Snow Mountain, Yunnan',
    locationZh: '中国·云南·玉龙雪山',
    locationEn: 'Jade Dragon Snow Mountain, Yunnan',
  },
  'case-erhai': {
    url: '/images/erhai-lake.webp',
    altZh: '大理洱海生态廊道与苍山实景',
    altEn: 'Real scene of Erhai Lake & Ecological Corridor, Dali',
    locationZh: '大理·洱海生态廊道',
    locationEn: 'Erhai Ecological Corridor, Dali',
  },
  'preset-erhai': {
    url: '/images/erhai-lake.webp',
    altZh: '大理洱海生态廊道与苍山实景',
    altEn: 'Real scene of Erhai Lake & Ecological Corridor, Dali',
    locationZh: '大理·洱海生态廊道',
    locationEn: 'Erhai Ecological Corridor, Dali',
  },
  'case-lugu': {
    url: '/images/lugu-lake.webp',
    altZh: '云南泸沽湖女儿谷与猪槽船实景',
    altEn: 'Real scene of Lugu Lake & Mosuo Culture, Yunnan',
    locationZh: '丽江/宁蒗·泸沽湖女儿谷',
    locationEn: 'Lugu Lake Daughter Valley',
  },
  'preset-lugu': {
    url: '/images/lugu-lake.webp',
    altZh: '云南泸沽湖女儿谷与猪槽船实景',
    altEn: 'Real scene of Lugu Lake & Mosuo Culture, Yunnan',
    locationZh: '丽江/宁蒗·泸沽湖女儿谷',
    locationEn: 'Lugu Lake Daughter Valley',
  },
  'case-jiulong': {
    url: '/images/jiulong-waterfalls-luoping.webp',
    altZh: '曲靖罗平九龙瀑布群实景',
    altEn: 'Real scene of Jiulong Waterfalls, Luoping, Yunnan',
    locationZh: '曲靖·罗平九龙十瀑',
    locationEn: 'Jiulong Waterfalls, Luoping',
  },
  'preset-jiulong': {
    url: '/images/jiulong-waterfalls-luoping.webp',
    altZh: '曲靖罗平九龙瀑布群实景',
    altEn: 'Real scene of Jiulong Waterfalls, Luoping, Yunnan',
    locationZh: '曲靖·罗平九龙十瀑',
    locationEn: 'Jiulong Waterfalls, Luoping',
  },
  'case-yangtze': {
    url: '/images/yangtze-first-bend-shigu.webp',
    altZh: '丽江石鼓镇长江第一湾全景实景',
    altEn: 'Real aerial panorama of First Bend of Yangtze River Shigu',
    locationZh: '丽江·石鼓长江第一湾',
    locationEn: 'First Bend of Yangtze River',
  },
  'preset-yangtze': {
    url: '/images/yangtze-first-bend-shigu.webp',
    altZh: '丽江石鼓镇长江第一湾全景实景',
    altEn: 'Real aerial panorama of First Bend of Yangtze River Shigu',
    locationZh: '丽江·石鼓长江第一湾',
    locationEn: 'First Bend of Yangtze River',
  },
  'case-xiasi': {
    // 注：此为贵州古镇风貌示意配图（贵阳青岩古镇），非下司古镇实景；待取得项目实拍图后替换。
    url: '/images/qingyan-ancient-town.webp',
    altZh: '贵州水运古镇商帮码头风貌（示意配图）',
    altEn: 'Guizhou ancient riverport town scenery (illustrative)',
    locationZh: '黔东南·水乡古镇码头',
    locationEn: 'Guizhou Ancient Waterfront Town',
  },
  'preset-xiasi': {
    // 注：此为贵州古镇风貌示意配图（贵阳青岩古镇），非下司古镇实景；待取得项目实拍图后替换。
    url: '/images/qingyan-ancient-town.webp',
    altZh: '贵州水运古镇商帮码头风貌（示意配图）',
    altEn: 'Guizhou ancient riverport town scenery (illustrative)',
    locationZh: '黔东南·水乡古镇码头',
    locationEn: 'Guizhou Ancient Waterfront Town',
  },
  'case-puer-coffee': {
    url: '/images/yuanyang-bada-terraces.webp',
    altZh: '普洱高山茶咖生态与半山酒店风光实景',
    altEn: 'Real scene of Yunnan highland plantations & mountain scenery',
    locationZh: '普洱·高山茶咖生态与半山酒店',
    locationEn: 'Pu\'er Tea & Coffee Highlands',
  },
  'preset-coffee': {
    url: '/images/yuanyang-bada-terraces.webp',
    altZh: '普洱高山茶咖生态与半山酒店风光实景',
    altEn: 'Real scene of Yunnan highland plantations & mountain scenery',
    locationZh: '普洱·高山茶咖生态与半山酒店',
    locationEn: 'Pu\'er Tea & Coffee Highlands',
  },
  'heritage-lijiang': {
    url: '/images/lijiang-old-town.webp',
    altZh: '丽江古城文旅街区实景',
    altEn: 'Real scene of Lijiang Old Town streets',
    locationZh: '丽江·古城水系与纳西建筑',
    locationEn: 'Lijiang Old Town',
  },
  'heritage-sunset': {
    url: '/images/yuanyang-rice-terraces-sunset.webp',
    altZh: '云南高原梯田晚霞实景',
    altEn: 'Sunset over Yunnan terraced mountains',
    locationZh: '云南·哈尼梯田晚霞胜景',
    locationEn: 'Yunnan Terraces Sunset',
  },
};

interface ScenicCoverProps {
  type: string;
  className?: string;
  title?: string;
  badge?: string;
}

export const ScenicCover: React.FC<ScenicCoverProps> = ({ type, className = '', title, badge }) => {
  const [imgError, setImgError] = useState(false);

  // Look up matched real scenic photograph first
  const scenicConfig = REAL_SCENIC_IMAGES[type];
  const isCustomDirectUrl = (type.startsWith('data:image') || type.startsWith('http')) && !imgError;
  const targetPhotoUrl = isCustomDirectUrl ? type : scenicConfig?.url;

  // If we have a verified real photo URL and it hasn't errored
  if (targetPhotoUrl && !imgError) {
    return (
      <div className={`relative overflow-hidden bg-stone-900 group ${className}`}>
        <img
          src={targetPhotoUrl}
          alt={title || scenicConfig?.altZh || '云南文旅真实场景实景图'}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Measured scrim overlay for text contrast and premium feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent pointer-events-none" />

        {/* Top badge */}
        {badge && (
          <span className="absolute top-3 left-3 text-xs tracking-wider font-medium text-amber-300 bg-stone-950/85 backdrop-blur-md px-2.5 py-1 rounded border border-amber-500/30 z-10">
            {badge}
          </span>
        )}

        {/* Real scene location watermark */}
        {scenicConfig?.locationZh && (
          <span className="absolute bottom-2.5 right-3 text-[10px] text-stone-300/80 bg-stone-950/60 backdrop-blur-sm px-2 py-0.5 rounded font-mono border border-white/10 z-10 pointer-events-none">
            实景拍摄 · {scenicConfig.locationZh}
          </span>
        )}
      </div>
    );
  }

  // Graceful fallback to rich SVG landscape artwork if image fails or is offline
  switch (type) {
    case 'case-erhai':
    case 'preset-erhai':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-sky-900 via-teal-950 to-stone-950 ${className}`}>
          <svg className="w-full h-full absolute inset-0 object-cover" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" fill="none">
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0c2340" />
                <stop offset="60%" stopColor="#0f4c5c" />
                <stop offset="100%" stopColor="#1e3a47" />
              </linearGradient>
              <linearGradient id="mtnGrad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e3d59" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0a192f" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#145365" />
                <stop offset="50%" stopColor="#0c3243" />
                <stop offset="100%" stopColor="#081c24" />
              </linearGradient>
            </defs>
            <rect width="800" height="500" fill="url(#skyGrad)" />
            <circle cx="640" cy="110" r="45" fill="#fef08a" fillOpacity="0.85" filter="blur(8px)" />
            <circle cx="640" cy="110" r="30" fill="#fffbeb" fillOpacity="0.95" />
            <path d="M0 260 L90 200 L180 230 L270 170 L380 240 L500 160 L620 220 L730 180 L800 210 L800 500 L0 500 Z" fill="url(#mtnGrad1)" />
            <path d="M250 183 L270 170 L290 185 Z" fill="#e2e8f0" fillOpacity="0.6" />
            <path d="M480 175 L500 160 L520 178 Z" fill="#e2e8f0" fillOpacity="0.7" />
            <path d="M0 290 Q400 280 800 290 L800 500 L0 500 Z" fill="url(#waterGrad)" />
            <ellipse cx="640" cy="360" rx="90" ry="12" fill="#fef08a" fillOpacity="0.15" />
            <path d="M0 450 Q280 380 800 420 L800 500 L0 500 Z" fill="#042f2e" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent pointer-events-none" />
          {badge && (
            <span className="absolute top-3 left-3 text-xs tracking-wider font-medium text-emerald-300 bg-stone-950/85 backdrop-blur-md px-2.5 py-1 rounded border border-emerald-500/30">
              {badge}
            </span>
          )}
        </div>
      );

    case 'case-lugu':
    case 'preset-lugu':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-stone-950 ${className}`}>
          <svg className="w-full h-full absolute inset-0 object-cover" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" fill="none">
            <defs>
              <linearGradient id="luguSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e1b4b" />
                <stop offset="70%" stopColor="#312e81" />
                <stop offset="100%" stopColor="#4338ca" />
              </linearGradient>
            </defs>
            <rect width="800" height="500" fill="url(#luguSky)" />
            <circle cx="160" cy="90" r="26" fill="#fde68a" fillOpacity="0.9" />
            <circle cx="170" cy="85" r="23" fill="#1e1b4b" />
            <path d="M0 240 Q160 140 340 180 T680 160 L800 230 L800 500 L0 500 Z" fill="#0f172a" fillOpacity="0.85" />
            <path d="M0 320 L800 320 L800 500 L0 500 Z" fill="#082f49" fillOpacity="0.95" />
            <path d="M480 390 C540 405 600 405 660 390 C620 408 520 408 480 390 Z" fill="#b45309" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent pointer-events-none" />
          {badge && (
            <span className="absolute top-3 left-3 text-xs tracking-wider font-medium text-amber-300 bg-stone-950/85 backdrop-blur-md px-2.5 py-1 rounded border border-amber-500/30">
              {badge}
            </span>
          )}
        </div>
      );

    case 'case-jiulong':
    case 'preset-jiulong':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-emerald-950 via-teal-950 to-stone-950 ${className}`}>
          <svg className="w-full h-full absolute inset-0 object-cover" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" fill="none">
            <rect width="800" height="500" fill="#064e3b" />
            <path d="M0 200 Q80 80 160 200 T320 200 T480 160 T640 190 T800 170 L800 500 L0 500 Z" fill="#022c22" />
            <path d="M220 200 L250 310 L370 310 L400 200 Z" fill="#a7f3d0" fillOpacity="0.45" />
            <path d="M160 310 L190 410 L460 410 L480 310 Z" fill="#6ee7b7" fillOpacity="0.55" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent pointer-events-none" />
          {badge && (
            <span className="absolute top-3 left-3 text-xs tracking-wider font-medium text-emerald-300 bg-stone-950/85 backdrop-blur-md px-2.5 py-1 rounded border border-emerald-500/30">
              {badge}
            </span>
          )}
        </div>
      );

    case 'case-yangtze':
    case 'preset-yangtze':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-amber-950 via-stone-900 to-stone-950 ${className}`}>
          <svg className="w-full h-full absolute inset-0 object-cover" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" fill="none">
            <rect width="800" height="500" fill="#451a03" />
            <path d="M0 0 L260 260 L0 500 Z" fill="#292524" />
            <path d="M800 0 L560 280 L800 500 Z" fill="#1c1917" />
            <path d="M180 0 C300 240 500 260 620 0 L720 0 C580 340 220 340 80 0 Z" fill="#eab308" fillOpacity="0.75" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent pointer-events-none" />
          {badge && (
            <span className="absolute top-3 left-3 text-xs tracking-wider font-medium text-amber-300 bg-stone-950/85 backdrop-blur-md px-2.5 py-1 rounded border border-amber-500/30">
              {badge}
            </span>
          )}
        </div>
      );

    case 'case-puer-coffee':
    case 'preset-coffee':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-stone-900 via-amber-950 to-stone-950 ${className}`}>
          <svg className="w-full h-full absolute inset-0 object-cover" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" fill="none">
            <rect width="800" height="500" fill="#1c1917" />
            <circle cx="680" cy="120" r="50" fill="#ea580c" fillOpacity="0.7" filter="blur(16px)" />
            <path d="M0 290 Q220 260 480 300 T800 270 L800 500 L0 500 Z" fill="#14532d" />
            <path d="M0 350 Q260 320 520 360 T800 330 L800 500 L0 500 Z" fill="#166534" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent pointer-events-none" />
          {badge && (
            <span className="absolute top-3 left-3 text-xs tracking-wider font-medium text-amber-300 bg-stone-950/85 backdrop-blur-md px-2.5 py-1 rounded border border-amber-500/30">
              {badge}
            </span>
          )}
        </div>
      );

    default:
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-stone-900 via-emerald-950/40 to-stone-950 ${className}`}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif-sc text-3xl font-bold tracking-widest text-amber-500/20 select-none">
              创意江山
            </span>
          </div>
          {badge && (
            <span className="absolute top-3 left-3 text-xs tracking-wider font-medium text-amber-300 bg-stone-950/85 backdrop-blur-md px-2.5 py-1 rounded border border-amber-500/30">
              {badge}
            </span>
          )}
        </div>
      );
  }
};
