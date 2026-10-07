import React, { useState } from 'react';
import { NewsItem, Language } from '../types';
import { translations } from '../data/translations';
import { ScenicCover } from './VisualAssets';
import { ShareModal } from './ShareModal';
import {
  PlusCircle,
  Share2,
  Calendar,
  User,
  ArrowRight,
  Search,
  RotateCcw,
  Video,
  FileText,
  X,
  Edit2,
  Trash2,
  Tag,
  Lock,
} from 'lucide-react';

interface NewsSectionProps {
  lang: Language;
  newsList: NewsItem[];
  isAdmin?: boolean;
  onOpenUpload: () => void;
  onEditNews: (item: NewsItem) => void;
  onDeleteNews: (id: string) => void;
  onResetNews: () => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({
  lang,
  newsList,
  isAdmin = false,
  onOpenUpload,
  onEditNews,
  onDeleteNews,
  onResetNews,
}) => {
  const [filter, setFilter] = useState<'all' | 'group' | 'milestone' | 'insight' | 'announcement'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingItem, setReadingItem] = useState<NewsItem | null>(null);
  const [sharingItem, setSharingItem] = useState<NewsItem | null>(null);

  const t = translations[lang].news;

  const filteredNews = newsList.filter((item) => {
    if (filter !== 'all' && item.category !== filter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchZh = item.titleZh.toLowerCase().includes(q) || item.summaryZh.toLowerCase().includes(q);
      const matchEn = item.titleEn.toLowerCase().includes(q) || item.summaryEn.toLowerCase().includes(q);
      const matchTag = item.tagsZh.some((tag) => tag.toLowerCase().includes(q));
      if (!matchZh && !matchEn && !matchTag) return false;
    }
    return true;
  });

  const getCategoryLabel = (cat: NewsItem['category']) => {
    switch (cat) {
      case 'group':
        return lang === 'zh' ? '集团动态' : 'Group News';
      case 'milestone':
        return lang === 'zh' ? '项目进展' : 'Project Update';
      case 'insight':
        return lang === 'zh' ? '智库洞察' : 'Think Tank Insight';
      case 'announcement':
        return lang === 'zh' ? '招商发布' : 'Announcement';
    }
  };

  return (
    <section id="news" className="py-20 bg-stone-900/60 border-t border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
              NEWS & MEDIA CENTER
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-sc text-stone-100 mt-2">
              {t.sectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-stone-400 mt-2 max-w-2xl">
              {t.sectionSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onResetNews}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-stone-200 text-xs rounded-lg transition-colors"
              title="恢复官方默认新闻数据"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.resetData}</span>
            </button>

            <button
              onClick={onOpenUpload}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 border border-stone-800 hover:border-amber-500/50 text-stone-400 hover:text-amber-300 text-xs rounded-lg transition-colors cursor-pointer"
              title={lang === 'zh' ? '管理员专属通道（需密码认证）' : 'Admin Publishing (Password Required)'}
            >
              <Lock className="w-3.5 h-3.5 text-amber-500/80" />
              <span>{lang === 'zh' ? (isAdmin ? '发布新闻 (管理员)' : '管理员发布') : (isAdmin ? 'Publish (Admin)' : 'Admin Publish')}</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-stone-800/80">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { key: 'all', label: t.tabs.all },
                { key: 'group', label: t.tabs.group },
                { key: 'milestone', label: t.tabs.milestone },
                { key: 'insight', label: t.tabs.insight },
                { key: 'announcement', label: t.tabs.announcement },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  filter === tab.key
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-stone-950 text-stone-400 border border-stone-800 hover:text-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'zh' ? '搜索新闻、关键词...' : 'Search news...'}
              className="w-full pl-9 pr-3 py-1.5 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length === 0 ? (
          <div className="text-center py-16 bg-stone-950/60 rounded-2xl border border-stone-800">
            <FileText className="w-12 h-12 text-stone-600 mx-auto mb-3" />
            <p className="text-stone-400 text-sm">{t.empty}</p>
            <button
              onClick={() => {
                setFilter('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-amber-400 hover:underline"
            >
              清空搜索与筛选条件
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <article
                key={item.id}
                className="bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden flex flex-col justify-between group hover:border-amber-500/40 transition-all duration-300 shadow-xl"
              >
                <div>
                  {/* Article Media Cover */}
                  <div
                    className="relative h-48 w-full overflow-hidden cursor-pointer"
                    onClick={() => setReadingItem(item)}
                  >
                    <ScenicCover
                      type={item.coverImage || 'preset-erhai'}
                      className="w-full h-full"
                      title={lang === 'zh' ? item.titleZh : item.titleEn}
                      badge={getCategoryLabel(item.category)}
                    />
                    {item.videoUrl && (
                      <span className="absolute bottom-3 right-3 flex items-center gap-1 text-[11px] font-semibold text-white bg-black/80 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
                        <Video className="w-3.5 h-3.5 text-cyan-400" />
                        <span>视频报道</span>
                      </span>
                    )}
                  </div>

                  {/* Body Info */}
                  <div className="p-5">
                    {/* Unboxed metadata with bullet separators (Constitution rule) */}
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                      <span className="text-amber-400/90 font-medium">
                        {lang === 'zh' ? item.authorZh : item.authorEn}
                      </span>
                      <span aria-hidden="true" className="text-stone-600">·</span>
                      <span className="font-mono">{item.date}</span>
                    </div>

                    <h3
                      onClick={() => setReadingItem(item)}
                      className="text-base font-bold font-serif-sc text-stone-100 group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-2 leading-snug"
                    >
                      {lang === 'zh' ? item.titleZh : item.titleEn}
                    </h3>

                    <p className="text-xs text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                      {lang === 'zh' ? item.summaryZh : item.summaryEn}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {(lang === 'zh' ? item.tagsZh : item.tagsEn).slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Bottom Actions */}
                <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-stone-900">
                  <button
                    onClick={() => setReadingItem(item)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <span>{t.readFull}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1">
                    {/* Share Action Button */}
                    <button
                      onClick={() => setSharingItem(item)}
                      className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-900 transition-colors"
                      title={t.shareNews}
                    >
                      <Share2 className="w-4 h-4 text-emerald-400" />
                    </button>

                    {/* Edit button */}
                    <button
                      onClick={() => onEditNews(item)}
                      className="p-1.5 text-stone-500 hover:text-amber-300 rounded-lg hover:bg-stone-900 transition-colors"
                      title="编辑资讯"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete button (with confirmation) */}
                    <button
                      onClick={() => {
                        if (confirm(lang === 'zh' ? '确定要删除此条新闻吗？' : 'Delete this news article?')) {
                          onDeleteNews(item.id);
                        }
                      }}
                      className="p-1.5 text-stone-500 hover:text-rose-400 rounded-lg hover:bg-stone-900 transition-colors"
                      title="删除资讯"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Reading Modal */}
      {readingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
            <button
              onClick={() => setReadingItem(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-950/80 text-stone-300 hover:text-white hover:bg-stone-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media Cover */}
            <div className="relative h-60 sm:h-72 w-full shrink-0">
              <ScenicCover
                type={readingItem.coverImage || 'preset-erhai'}
                className="w-full h-full"
                title={lang === 'zh' ? readingItem.titleZh : readingItem.titleEn}
                badge={getCategoryLabel(readingItem.category)}
              />
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
              {/* Metadata */}
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <span className="text-amber-400 font-medium">
                  {lang === 'zh' ? readingItem.authorZh : readingItem.authorEn}
                </span>
                <span>·</span>
                <span className="font-mono">{readingItem.date}</span>
                <span>·</span>
                <span className="text-stone-500">
                  {readingItem.views} {t.views}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-bold font-serif-sc text-stone-100 leading-snug">
                {lang === 'zh' ? readingItem.titleZh : readingItem.titleEn}
              </h1>

              {/* Summary Lead Block */}
              {(readingItem.summaryZh || readingItem.summaryEn) && (
                <div className="p-4 bg-stone-950/80 rounded-xl border-l-4 border-amber-500 text-stone-300 text-sm leading-relaxed">
                  {lang === 'zh' ? readingItem.summaryZh : readingItem.summaryEn}
                </div>
              )}

              {/* Embedded Video Player if available */}
              {readingItem.videoUrl && (
                <div className="my-4 rounded-xl overflow-hidden border border-stone-800 bg-black shadow-lg">
                  <div className="p-2 bg-stone-950 border-b border-stone-800 flex items-center gap-2 text-xs text-stone-400">
                    <Video className="w-3.5 h-3.5 text-cyan-400" />
                    <span>新闻配套视频播放</span>
                  </div>
                  <video
                    src={readingItem.videoUrl}
                    controls
                    className="w-full max-h-96 object-contain"
                  />
                </div>
              )}

              {/* Body Content Paragraphs */}
              <div className="text-stone-200 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4 font-light">
                {lang === 'zh' ? readingItem.contentZh : readingItem.contentEn}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-stone-800 flex flex-wrap gap-1.5">
                {(lang === 'zh' ? readingItem.tagsZh : readingItem.tagsEn).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs text-stone-400 bg-stone-950 px-2.5 py-1 rounded border border-stone-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Modal Footer Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-800">
                <button
                  onClick={() => {
                    const item = readingItem;
                    setReadingItem(null);
                    setSharingItem(item);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-medium transition-colors"
                >
                  <Share2 className="w-4 h-4 text-emerald-400" />
                  <span>{t.shareNews}</span>
                </button>

                <button
                  onClick={() => setReadingItem(null)}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Social Media Share Modal for News */}
      {sharingItem && (
        <ShareModal
          isOpen={true}
          onClose={() => setSharingItem(null)}
          lang={lang}
          title={lang === 'zh' ? sharingItem.titleZh : sharingItem.titleEn}
          summary={lang === 'zh' ? sharingItem.summaryZh : sharingItem.summaryEn}
          categoryName={getCategoryLabel(sharingItem.category)}
        />
      )}
    </section>
  );
};
