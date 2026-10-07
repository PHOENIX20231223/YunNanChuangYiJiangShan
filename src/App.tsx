import React, { useState, useEffect } from 'react';
import { Language, NewsItem } from './types';
import { getStoredNews, saveNewsToStorage, resetNewsToDefault } from './data/newsData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandHeritage } from './components/BrandHeritage';
import { CoreEngines } from './components/CoreEngines';
import { CaseStudies } from './components/CaseStudies';
import { YunnanMapExplorer } from './components/YunnanMapExplorer';
import { NewsSection } from './components/NewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { NewsUploadModal } from './components/NewsUploadModal';
import { AdminAuthModal, ADMIN_AUTH_KEY } from './components/AdminAuthModal';
import { ShareModal } from './components/ShareModal';
import { Share2 } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('zh');
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingNewsItem, setEditingNewsItem] = useState<NewsItem | null>(null);
  const [isSiteShareModalOpen, setIsSiteShareModalOpen] = useState(false);

  // Administrator authentication state (Password: "LEOWANG")
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Initialize news data from localStorage & check session auth
  useEffect(() => {
    const loaded = getStoredNews();
    setNewsList(loaded);

    try {
      if (sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true') {
        setIsAdminAuthenticated(true);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'zh' ? 'en' : 'zh'));
  };

  // Guard action requiring password "LEOWANG"
  const requireAdminAuth = (action: () => void) => {
    if (isAdminAuthenticated) {
      action();
    } else {
      setPendingAction(() => action);
      setIsAuthModalOpen(true);
    }
  };

  const handleOpenUploadNews = () => {
    requireAdminAuth(() => {
      setEditingNewsItem(null);
      setIsUploadModalOpen(true);
    });
  };

  const handleEditNews = (item: NewsItem) => {
    requireAdminAuth(() => {
      setEditingNewsItem(item);
      setIsUploadModalOpen(true);
    });
  };

  const handleDeleteNews = (id: string) => {
    requireAdminAuth(() => {
      setNewsList((prev) => {
        const updated = prev.filter((n) => n.id !== id);
        saveNewsToStorage(updated);
        return updated;
      });
    });
  };

  const handleResetNews = () => {
    requireAdminAuth(() => {
      const defaults = resetNewsToDefault();
      setNewsList(defaults);
    });
  };

  const handleSaveNews = (savedItem: NewsItem) => {
    setNewsList((prev) => {
      const existsIndex = prev.findIndex((n) => n.id === savedItem.id);
      let updated: NewsItem[];
      if (existsIndex >= 0) {
        updated = [...prev];
        updated[existsIndex] = savedItem;
      } else {
        updated = [savedItem, ...prev];
      }
      saveNewsToStorage(updated);
      return updated;
    });
  };

  const handleAuthSuccess = () => {
    setIsAdminAuthenticated(true);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-600 selection:text-white">
      {/* Top 3-Zone Navigation Header (Clean without prominent publishing CTA) */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenShareSite={() => setIsSiteShareModalOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero lang={lang} />

        {/* Think Tank Heritage & Paradigm Shift */}
        <BrandHeritage lang={lang} />

        {/* Four Core Business Engines & 5 Pillars */}
        <CoreEngines lang={lang} />

        {/* Executed Flagship Cases Showcase */}
        <CaseStudies lang={lang} />

        {/* Interactive Yunnan Province Footprint Map */}
        <YunnanMapExplorer lang={lang} />

        {/* News & Media Center with Discreet Protected Admin Publish Portal */}
        <NewsSection
          lang={lang}
          newsList={newsList}
          isAdmin={isAdminAuthenticated}
          onOpenUpload={handleOpenUploadNews}
          onEditNews={handleEditNews}
          onDeleteNews={handleDeleteNews}
          onResetNews={handleResetNews}
        />

        {/* Government & Enterprise Consultation */}
        <ContactSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenShare={() => setIsSiteShareModalOpen(true)}
      />

      {/* Administrator Authentication Modal (Password: "LEOWANG") */}
      <AdminAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setPendingAction(null);
        }}
        lang={lang}
        onAuthenticated={handleAuthSuccess}
      />

      {/* Autonomous News Upload & Editing Modal (Only opened after LEOWANG password verification) */}
      <NewsUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => {
          setIsUploadModalOpen(false);
          setEditingNewsItem(null);
        }}
        lang={lang}
        onSaveNews={handleSaveNews}
        editingItem={editingNewsItem}
      />

      {/* Global Site Social Share Modal */}
      <ShareModal
        isOpen={isSiteShareModalOpen}
        onClose={() => setIsSiteShareModalOpen(false)}
        lang={lang}
        title={
          lang === 'zh'
            ? '云南创意江山文化旅游发展有限公司 | 官方网站'
            : 'Yunnan Creative Landscape Culture & Tourism Development Co., Ltd.'
        }
        summary={
          lang === 'zh'
            ? '创意为魂 · 落地为本。依托国家级智库策划力与全流程招商运营服务，深耕云南文旅全产业链。'
            : 'Creativity Drives · Execution Delivers. Comprehensive cultural tourism planning, investment agency, and destination operations.'
        }
        categoryName={lang === 'zh' ? '云南文旅全产业链平台' : 'Official Portal'}
      />

      {/* Quick Floating Share Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setIsSiteShareModalOpen(true)}
          className="flex items-center gap-2 p-3 bg-stone-900/90 hover:bg-stone-800 text-stone-200 hover:text-amber-300 rounded-full border border-stone-700/80 shadow-2xl backdrop-blur-md transition-all duration-200 hover:scale-105 cursor-pointer group"
          title={lang === 'zh' ? '一键分享至社交媒体' : 'Share on Social Media'}
        >
          <Share2 className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline text-xs font-medium pr-1">
            {lang === 'zh' ? '一键分享' : 'Share'}
          </span>
        </button>
      </div>
    </div>
  );
}
