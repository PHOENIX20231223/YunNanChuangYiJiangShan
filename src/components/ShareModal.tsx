import React, { useState } from 'react';
import { X, Copy, Check, Share2, Download, ExternalLink, QrCode } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  title: string;
  summary?: string;
  url?: string;
  categoryName?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  lang,
  title,
  summary = '',
  url = typeof window !== 'undefined' ? window.location.href : '',
  categoryName,
}) => {
  const [copied, setCopied] = useState(false);
  const [showWechatQr, setShowWechatQr] = useState(false);
  const [showPoster, setShowPoster] = useState(false);
  const t = translations[lang].share;

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(url);
  const shareText = `${title} | 云南创意江山文化旅游发展有限公司 ${summary ? ' - ' + summary.slice(0, 80) + '...' : ''}`;
  const encodedText = encodeURIComponent(shareText);

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        const input = document.createElement('input');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const platforms = [
    {
      id: 'wechat',
      name: t.wechat,
      color: 'bg-emerald-600 hover:bg-emerald-500',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M8.5 2C4.36 2 1 4.91 1 8.5c0 1.99 1.02 3.77 2.62 4.96l-.67 2.47 2.74-1.37c.86.28 1.79.44 2.81.44.25 0 .5-.01.75-.03-.23-.62-.35-1.28-.35-1.97 0-3.59 3.36-6.5 7.5-6.5.37 0 .73.03 1.09.07C16.48 4.6 12.82 2 8.5 2zm-2.2 4.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25S5.05 8.19 5.05 7.5s.56-1.25 1.25-1.25zm4.4 0c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25zm7.3 3.75c-3.59 0-6.5 2.46-6.5 5.5s2.91 5.5 6.5 5.5c.82 0 1.6-.13 2.32-.37l2.25 1.13-.55-2.03c1.47-1.02 2.48-2.55 2.48-4.23 0-3.04-2.91-5.5-6.5-5.5zm-2.2 3.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4.4 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
        </svg>
      ),
      action: () => setShowWechatQr(true),
    },
    {
      id: 'weibo',
      name: t.weibo,
      color: 'bg-rose-600 hover:bg-rose-500',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M10.08 19.86c-4.7 0-8.52-2.88-8.52-6.42 0-3.4 3.55-5.46 7.63-5.46 4.69 0 8.53 2.89 8.53 6.43 0 3.4-3.56 5.45-7.64 5.45zm11.23-9.52c-.39-.13-.65-.48-.6-.88.16-1.3-.4-2.6-1.48-3.41-1.09-.81-2.48-1.01-3.76-.55-.38.14-.8-.08-.94-.46-.14-.38.08-.8.46-.94 1.7-.6 3.55-.34 5 1.01 1.45 1.09 2.19 2.82 1.98 4.56-.05.41-.39.73-.8.73-.06 0-.12 0-.18-.06zm-2.44 2.14c-.26-.1-.44-.34-.44-.62.01-.89-.48-1.72-1.25-2.14-.78-.42-1.71-.4-2.47.07-.33.2-.76.1-.96-.23-.2-.33-.1-.76.23-.96 1.13-.7 2.51-.73 3.67-.1 1.15.63 1.88 1.86 1.86 3.19 0 .38-.29.71-.68.78l-.06.01z" />
        </svg>
      ),
      action: () => {
        window.open(`https://service.weibo.com/share/share.php?url=${encodedUrl}&title=${encodedText}`, '_blank');
      },
    },
    {
      id: 'linkedin',
      name: t.linkedin,
      color: 'bg-sky-700 hover:bg-sky-600',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28M7.86 18.5V10.13H5.07V18.5h2.79z" />
        </svg>
      ),
      action: () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank');
      },
    },
    {
      id: 'twitter',
      name: t.twitter,
      color: 'bg-stone-800 hover:bg-stone-700',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      action: () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`, '_blank');
      },
    },
    {
      id: 'facebook',
      name: t.facebook,
      color: 'bg-blue-600 hover:bg-blue-500',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
      },
    },
    {
      id: 'qq',
      name: t.qq,
      color: 'bg-amber-600 hover:bg-amber-500',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 2.12.67 4.08 1.82 5.69-.16.89-.58 2.58-.61 2.7-.04.16.02.32.16.41.13.08.3.06.41-.03.11-.09 2.05-1.55 2.91-1.78C8.19 20.35 10.02 21 12 21c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 15c-1.66 0-3-1.12-3-2.5S10.34 12 12 12s3 1.12 3 2.5-1.34 2.5-3 2.5z" />
        </svg>
      ),
      action: () => {
        window.open(`https://connect.qq.com/widget/shareqq/index.html?url=${encodedUrl}&title=${encodedText}`, '_blank');
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-stone-900 border border-stone-700/60 rounded-xl shadow-2xl p-6 overflow-hidden">
        {/* Subtle decorative gold gradient glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-emerald-600" />

        <div className="flex items-start justify-between pb-4 border-b border-stone-800">
          <div>
            <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
              {categoryName || 'SHARE & EXPAND INFLUENCE'}
            </span>
            <h3 className="text-xl font-bold text-stone-100 font-serif-sc mt-0.5">
              {t.title}
            </h3>
            <p className="text-xs text-stone-400 mt-1">{t.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected content preview card */}
        <div className="my-4 p-3.5 bg-stone-950/70 rounded-lg border border-stone-800">
          <p className="text-sm font-semibold text-stone-200 line-clamp-2">{title}</p>
          {summary && (
            <p className="text-xs text-stone-400 mt-1 line-clamp-2">{summary}</p>
          )}
          <span className="inline-block mt-2 text-[11px] text-amber-400/90 font-mono truncate max-w-full">
            {url}
          </span>
        </div>

        {/* Main Share Grid */}
        <div className="grid grid-cols-3 gap-2.5 my-4">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={p.action}
              className={`flex flex-col items-center justify-center p-3 rounded-lg text-white font-medium text-xs transition-all duration-200 shadow-sm ${p.color}`}
            >
              <div className="mb-1.5">{p.icon}</div>
              <span className="whitespace-nowrap">{p.name}</span>
            </button>
          ))}
        </div>

        {/* Utility Actions: Copy Link & Generate Poster */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-stone-800">
          <button
            onClick={handleCopyLink}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-medium transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">{t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{t.copyLink}</span>
              </>
            )}
          </button>

          <button
            onClick={() => setShowPoster(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white rounded-lg text-xs font-medium transition-all shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>{t.generatePoster}</span>
          </button>
        </div>

        {/* WeChat QR Code Sub-Modal */}
        {showWechatQr && (
          <div className="absolute inset-0 bg-stone-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 animate-in fade-in">
            <button
              onClick={() => setShowWechatQr(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-4 bg-white rounded-xl shadow-xl flex flex-col items-center">
              {/* Stylized QR Code SVG */}
              <svg className="w-44 h-44" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="white" />
                {/* 3 Corner Markers */}
                <rect x="10" y="10" width="24" height="24" fill="#0c0a09" rx="3" />
                <rect x="14" y="14" width="16" height="16" fill="white" rx="2" />
                <rect x="18" y="18" width="8" height="8" fill="#0c0a09" rx="1" />

                <rect x="66" y="10" width="24" height="24" fill="#0c0a09" rx="3" />
                <rect x="70" y="14" width="16" height="16" fill="white" rx="2" />
                <rect x="74" y="18" width="8" height="8" fill="#0c0a09" rx="1" />

                <rect x="10" y="66" width="24" height="24" fill="#0c0a09" rx="3" />
                <rect x="14" y="70" width="16" height="16" fill="white" rx="2" />
                <rect x="18" y="74" width="8" height="8" fill="#0c0a09" rx="1" />

                {/* QR Data Grid Dots */}
                <rect x="42" y="12" width="6" height="6" fill="#0c0a09" />
                <rect x="52" y="18" width="6" height="6" fill="#0c0a09" />
                <rect x="44" y="28" width="8" height="6" fill="#0c0a09" />
                <rect x="14" y="42" width="6" height="6" fill="#0c0a09" />
                <rect x="26" y="48" width="6" height="6" fill="#0c0a09" />
                <rect x="40" y="40" width="20" height="20" fill="#d97706" rx="4" />
                <path d="M46 50 L54 50 M50 46 L50 54" stroke="white" strokeWidth="2.5" />
                <rect x="68" y="44" width="6" height="6" fill="#0c0a09" />
                <rect x="78" y="52" width="8" height="6" fill="#0c0a09" />
                <rect x="42" y="68" width="6" height="6" fill="#0c0a09" />
                <rect x="52" y="76" width="6" height="6" fill="#0c0a09" />
                <rect x="68" y="72" width="12" height="6" fill="#0c0a09" />
                <rect x="78" y="82" width="6" height="8" fill="#0c0a09" />
              </svg>
              <span className="text-[11px] font-bold text-stone-800 mt-2 tracking-wider">
                云南创意江山 · 官方链接
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-4 text-center max-w-xs">{t.wechatScan}</p>
          </div>
        )}

        {/* Poster Card Modal */}
        {showPoster && (
          <div className="absolute inset-0 bg-stone-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 z-30 animate-in fade-in">
            <button
              onClick={() => setShowPoster(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Aesthetic Poster Preview Frame */}
            <div className="w-full max-w-sm bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 p-5 rounded-xl border border-amber-600/30 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <span className="text-xs font-serif-sc tracking-widest text-amber-400 font-bold">
                  云南创意江山
                </span>
                <span className="text-[10px] text-stone-400 font-mono">
                  CREATIVITY & EXECUTION
                </span>
              </div>

              <div className="my-4">
                <span className="text-[10px] tracking-widest text-emerald-400 uppercase font-semibold">
                  {categoryName || 'CULTURAL TOURISM INSIGHT'}
                </span>
                <h4 className="text-base font-bold text-stone-100 font-serif-sc mt-1 leading-snug">
                  {title}
                </h4>
                {summary && (
                  <p className="text-xs text-stone-400 mt-2 leading-relaxed border-l-2 border-amber-500/50 pl-2.5">
                    {summary}
                  </p>
                )}
              </div>

              {/* Poster Footer with Scan Prompt */}
              <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-stone-300">
                    创意为魂 · 落地为本
                  </p>
                  <p className="text-[9px] text-stone-500">
                    www.creative-jiangshan.com
                  </p>
                </div>
                <div className="w-12 h-12 bg-white p-1 rounded flex items-center justify-center">
                  <QrCode className="w-9 h-9 text-stone-950" />
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded-lg font-medium transition-colors"
              >
                {t.copyPosterText}
              </button>
              <button
                onClick={() => {
                  alert(lang === 'zh' ? '海报已准备好，支持长按或截图分享至朋友圈与各社交平台！' : 'Poster ready! Screenshot or save to share across your channels.');
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs rounded-lg font-medium transition-colors"
              >
                {t.downloadPoster}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
