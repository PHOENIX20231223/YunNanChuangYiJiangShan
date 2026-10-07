import React, { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, Video, Eye, Edit3, Trash2, CheckCircle2, Film, Loader2 } from 'lucide-react';
import { Language, NewsItem } from '../types';
import { translations } from '../data/translations';
import { ScenicCover } from './VisualAssets';

interface NewsUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSaveNews: (item: NewsItem) => void;
  editingItem?: NewsItem | null;
}

// Compress uploaded photos via HTML5 Canvas to keep storage <150KB and prevent localStorage QuotaExceededError
const compressImageFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 1600;
        const maxHeight = 1000;
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        // High quality web JPEG, typically 80-180KB
        const compressed = canvas.toDataURL('image/jpeg', 0.85);
        resolve(compressed);
      };
      img.onerror = () => reject(new Error('Image decode failed'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('File read failed'));
    reader.readAsDataURL(file);
  });
};

export const NewsUploadModal: React.FC<NewsUploadModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSaveNews,
  editingItem = null,
}) => {
  const t = translations[lang].newsModal;

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [titleZh, setTitleZh] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [category, setCategory] = useState<NewsItem['category']>('group');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [authorZh, setAuthorZh] = useState('云南创意江山统筹中心');
  const [authorEn, setAuthorEn] = useState('Creative Landscape Team');
  const [summaryZh, setSummaryZh] = useState('');
  const [summaryEn, setSummaryEn] = useState('');
  const [contentZh, setContentZh] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [coverImage, setCoverImage] = useState('preset-erhai');
  const [videoUrl, setVideoUrl] = useState('');
  const [tagsStr, setTagsStr] = useState('云南文旅, 项目动态');
  const [uploadError, setUploadError] = useState('');
  const [isCompressingImg, setIsCompressingImg] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Synchronize form when opened or editingItem changes
  useEffect(() => {
    if (isOpen) {
      setActiveTab('edit');
      setUploadError('');
      setIsSubmitting(false);
      if (editingItem) {
        setTitleZh(editingItem.titleZh || '');
        setTitleEn(editingItem.titleEn || '');
        setCategory(editingItem.category || 'group');
        setDate(editingItem.date || new Date().toISOString().slice(0, 10));
        setAuthorZh(editingItem.authorZh || '云南创意江山统筹中心');
        setAuthorEn(editingItem.authorEn || 'Creative Landscape Team');
        setSummaryZh(editingItem.summaryZh || '');
        setSummaryEn(editingItem.summaryEn || '');
        setContentZh(editingItem.contentZh || '');
        setContentEn(editingItem.contentEn || '');
        setCoverImage(editingItem.coverImage || 'preset-erhai');
        setVideoUrl(editingItem.videoUrl || '');
        setTagsStr((editingItem.tagsZh || ['云南文旅', '项目动态']).join(', '));
      } else {
        setTitleZh('');
        setTitleEn('');
        setCategory('group');
        setDate(new Date().toISOString().slice(0, 10));
        setAuthorZh('云南创意江山统筹中心');
        setAuthorEn('Creative Landscape Team');
        setSummaryZh('');
        setSummaryEn('');
        setContentZh('');
        setContentEn('');
        setCoverImage('preset-erhai');
        setVideoUrl('');
        setTagsStr('云南文旅, 项目动态');
      }
    }
  }, [isOpen, editingItem]);

  if (!isOpen) return null;

  // Handle local image file upload with automatic compression
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      setUploadError(lang === 'zh' ? '图片大小请在 20MB 以内' : 'Image size must be under 20MB');
      return;
    }

    try {
      setIsCompressingImg(true);
      setUploadError('');
      const compressedDataUrl = await compressImageFile(file);
      setCoverImage(compressedDataUrl);
    } catch (err) {
      console.error(err);
      setUploadError(lang === 'zh' ? '图片处理失败，请重试' : 'Failed to process image');
    } finally {
      setIsCompressingImg(false);
    }
  };

  // Handle local video file upload -> convert to blob DataURL
  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      setUploadError(lang === 'zh' ? '本地视频建议在 50MB 以内，或填写在线视频URL' : 'Local video must be under 50MB or use online URL');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setVideoUrl(reader.result);
        setUploadError('');
      }
    };
    reader.readAsDataURL(file);
  };

  const executeSave = () => {
    if (!titleZh.trim()) {
      setUploadError(lang === 'zh' ? '请填写中文新闻标题' : 'Please provide Chinese title');
      setActiveTab('edit');
      return;
    }
    if (!contentZh.trim()) {
      setUploadError(lang === 'zh' ? '请填写新闻正文内容' : 'Please provide content body');
      setActiveTab('edit');
      return;
    }

    setIsSubmitting(true);

    const tagsArray = tagsStr
      .split(/[,，]/)
      .map((s) => s.trim())
      .filter(Boolean);

    const finalTags = tagsArray.length > 0 ? tagsArray : ['云南文旅'];

    const newItem: NewsItem = {
      id: editingItem?.id || `news-${Date.now()}`,
      titleZh: titleZh.trim(),
      titleEn: titleEn.trim() || titleZh.trim(),
      category,
      date: date || new Date().toISOString().slice(0, 10),
      authorZh: authorZh.trim() || '云南创意江山统筹中心',
      authorEn: authorEn.trim() || 'Creative Landscape Team',
      summaryZh: summaryZh.trim() || (contentZh.length > 120 ? contentZh.slice(0, 120) + '...' : contentZh.trim()),
      summaryEn: summaryEn.trim() || (titleEn.trim() ? titleEn.trim() + '...' : summaryZh.trim() || contentZh.slice(0, 120)),
      contentZh: contentZh.trim(),
      contentEn: contentEn.trim() || contentZh.trim(),
      coverImage: coverImage || 'preset-erhai',
      videoUrl: videoUrl.trim() || undefined,
      tagsZh: finalTags,
      tagsEn: finalTags,
      views: editingItem?.views || 1,
      isOfficial: false,
    };

    onSaveNews(newItem);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSave();
  };

  const presetImages = [
    { id: 'preset-erhai', nameZh: '洱海生态廊道', nameEn: 'Erhai Corridor' },
    { id: 'preset-lugu', nameZh: '泸沽湖女儿谷', nameEn: 'Lugu Lake' },
    { id: 'preset-jiulong', nameZh: '罗平九龙瀑布', nameEn: 'Jiulong Falls' },
    { id: 'preset-yangtze', nameZh: '长江第一湾', nameEn: 'Yangtze Bend' },
    { id: 'preset-coffee', nameZh: '普洱咖啡与半山酒店', nameEn: 'Pu\'er Coffee' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="px-6 py-4 bg-stone-950/90 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-100 font-serif-sc flex items-center gap-2">
              <Upload className="w-5 h-5 text-amber-500" />
              {editingItem ? t.titleEdit : t.titleNew}
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">{t.subtitle}</p>
          </div>

          <div className="flex items-center gap-3">
            {/* View/Edit tabs */}
            <div className="flex bg-stone-800/80 p-0.5 rounded-lg border border-stone-700/80">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'edit'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{t.editTab}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t.previewTab}</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {uploadError && (
          <div className="px-6 py-2.5 bg-rose-950/80 border-b border-rose-800/50 text-rose-300 text-xs font-medium">
            {uploadError}
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'edit' ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Title (CN & EN) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {t.form.titleZh}
                  </label>
                  <input
                    type="text"
                    required
                    value={titleZh}
                    onChange={(e) => setTitleZh(e.target.value)}
                    placeholder={t.form.titleZhPh}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-lg text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {t.form.titleEn}
                  </label>
                  <input
                    type="text"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder={t.form.titleEnPh}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-lg text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Category, Date, Author */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {t.form.category}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as NewsItem['category'])}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-lg text-sm text-stone-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                  >
                    <option value="group">集团动态 (Group News)</option>
                    <option value="milestone">项目进展 (Milestones)</option>
                    <option value="insight">智库洞察 (Insights)</option>
                    <option value="announcement">招商发布 (Announcements)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {t.form.date}
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-lg text-sm text-stone-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {t.form.authorZh}
                  </label>
                  <input
                    type="text"
                    value={authorZh}
                    onChange={(e) => setAuthorZh(e.target.value)}
                    placeholder={t.form.authorZhPh}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-lg text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Summaries */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {t.form.summaryZh}
                  </label>
                  <textarea
                    rows={2}
                    value={summaryZh}
                    onChange={(e) => setSummaryZh(e.target.value)}
                    placeholder={t.form.summaryZhPh}
                    className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-lg text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {t.form.summaryEn}
                  </label>
                  <textarea
                    rows={2}
                    value={summaryEn}
                    onChange={(e) => setSummaryEn(e.target.value)}
                    placeholder="Brief highlight in English..."
                    className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-lg text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Row 4: Main Content (Text) */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  {t.form.contentZh}
                </label>
                <textarea
                  rows={5}
                  required
                  value={contentZh}
                  onChange={(e) => setContentZh(e.target.value)}
                  placeholder={t.form.contentZhPh}
                  className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-lg text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                />
              </div>

              {/* Row 5: Media Upload: Image & Video Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-stone-950/60 rounded-xl border border-stone-800">
                {/* Image Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                    <ImageIcon className="w-4 h-4" />
                    <span>{t.form.coverImage}</span>
                  </div>

                  {/* Preset Selector */}
                  <div className="flex flex-wrap gap-1.5">
                    {presetImages.map((p) => (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setCoverImage(p.id)}
                        className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                          coverImage === p.id
                            ? 'bg-amber-600/30 border-amber-500 text-amber-300'
                            : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        {lang === 'zh' ? p.nameZh : p.nameEn}
                      </button>
                    ))}
                  </div>

                  {/* Local image file upload */}
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-medium transition-colors border border-stone-700">
                      {isCompressingImg ? (
                        <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                      )}
                      <span>{isCompressingImg ? '处理中...' : t.form.uploadImageBtn}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isCompressingImg}
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[11px] text-stone-500 truncate max-w-[150px]">
                      {isCompressingImg
                        ? '正在自动压缩画质...'
                        : coverImage.startsWith('data:image')
                        ? '已选择本地文件 (已自动优化)'
                        : coverImage}
                    </span>
                  </div>

                  {/* Image thumbnail preview */}
                  <div className="h-28 w-full rounded-lg overflow-hidden border border-stone-800">
                    <ScenicCover type={coverImage} className="w-full h-full" badge="封面预览" />
                  </div>
                </div>

                {/* Video Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                    <Video className="w-4 h-4" />
                    <span>{t.form.videoUrl}</span>
                  </div>

                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="例如: https://example.com/video.mp4"
                    className="w-full px-3 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-xs text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-cyan-500"
                  />

                  {/* Local video file upload */}
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-medium transition-colors border border-stone-700">
                      <Film className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{t.form.uploadVideoBtn}</span>
                      <input
                        type="file"
                        accept="video/mp4,video/webm"
                        onChange={handleVideoFileChange}
                        className="hidden"
                      />
                    </label>
                    {videoUrl && (
                      <span className="text-[11px] text-emerald-400 truncate max-w-[150px]">
                        ✓ 视频已加载
                      </span>
                    )}
                  </div>

                  {/* Video player preview if provided */}
                  {videoUrl ? (
                    <div className="h-28 w-full rounded-lg overflow-hidden bg-black border border-stone-800 flex items-center justify-center">
                      <video
                        src={videoUrl}
                        controls
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="h-28 w-full rounded-lg bg-stone-900 border border-dashed border-stone-800 flex flex-col items-center justify-center text-stone-600 text-xs">
                      <Video className="w-6 h-6 mb-1 opacity-50" />
                      <span>可选：上传视频或粘贴在线视频地址</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 6: Tags */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  {t.form.tags}
                </label>
                <input
                  type="text"
                  value={tagsStr}
                  onChange={(e) => setTagsStr(e.target.value)}
                  placeholder={t.form.tagsPh}
                  className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-lg text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                />
              </div>

              {/* Bottom Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-medium text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
                >
                  {t.form.cancelBtn}
                </button>
                <button
                  type="submit"
                  disabled={isCompressingImg || isSubmitting}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-xs rounded-lg shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>
                    {isSubmitting
                      ? '发布中...'
                      : editingItem
                      ? t.form.saveEditBtn
                      : t.form.submitBtn}
                  </span>
                </button>
              </div>
            </form>
          ) : (
            /* Live Responsive Article Preview */
            <div className="space-y-6 max-w-2xl mx-auto py-2">
              <div className="rounded-xl overflow-hidden shadow-2xl border border-stone-800">
                <ScenicCover
                  type={coverImage}
                  className="w-full h-64 sm:h-80"
                  badge={
                    category === 'milestone'
                      ? '项目进展'
                      : category === 'announcement'
                      ? '招商发布'
                      : category === 'insight'
                      ? '智库洞察'
                      : '集团动态'
                  }
                />
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="text-amber-400 font-medium">{authorZh}</span>
                  <span>·</span>
                  <span>{date}</span>
                </div>

                <h1 className="text-2xl font-bold font-serif-sc text-stone-100 mt-2 leading-snug">
                  {titleZh || '新闻标题预览'}
                </h1>
                {titleEn && (
                  <p className="text-sm font-light text-stone-400 mt-1 italic">
                    {titleEn}
                  </p>
                )}

                {summaryZh && (
                  <div className="my-4 p-4 bg-stone-950/80 rounded-lg border-l-4 border-amber-500 text-stone-300 text-sm leading-relaxed">
                    {summaryZh}
                  </div>
                )}

                {/* Video player in article */}
                {videoUrl && (
                  <div className="my-5 rounded-xl overflow-hidden border border-stone-800 bg-black">
                    <video src={videoUrl} controls className="w-full max-h-96" />
                  </div>
                )}

                <div className="prose prose-invert prose-stone max-w-none text-stone-300 text-sm leading-relaxed whitespace-pre-line mt-4">
                  {contentZh || '正文内容预览...'}
                </div>

                <div className="mt-6 pt-4 border-t border-stone-800 flex flex-wrap gap-2">
                  {tagsStr
                    .split(/[,，]/)
                    .map((tag) => tag.trim())
                    .filter(Boolean)
                    .map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-stone-400 bg-stone-950 px-2.5 py-1 rounded border border-stone-800"
                      >
                        #{tag}
                      </span>
                    ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded-lg transition-colors cursor-pointer"
                >
                  返回修改
                </button>

                <button
                  type="button"
                  onClick={executeSave}
                  disabled={isSubmitting || isCompressingImg}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:opacity-50 text-white font-medium text-xs rounded-lg shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>
                    {isSubmitting
                      ? '发布中...'
                      : editingItem
                      ? '保存并更新'
                      : '确认发布新闻'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
