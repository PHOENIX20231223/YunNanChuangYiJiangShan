import React, { useState } from 'react';
import { X, Lock, ShieldCheck, KeyRound, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Language } from '../types';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onAuthenticated: () => void;
}

export const ADMIN_AUTH_KEY = 'jiangshan_admin_auth_token_v1';
export const CORRECT_PASSWORD = 'LEOWANG';

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  lang,
  onAuthenticated,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === CORRECT_PASSWORD) {
      setErrorMsg('');
      try {
        sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      } catch (err) {
        console.error(err);
      }
      onAuthenticated();
      onClose();
      setPassword('');
    } else {
      setErrorMsg(
        lang === 'zh'
          ? '认证密码错误，请核对后重试'
          : 'Incorrect authentication password. Please try again.'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-stone-900 border border-stone-700/80 rounded-2xl shadow-2xl p-6 sm:p-7 overflow-hidden">
        {/* Subtle decorative gold top bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700" />

        <div className="flex items-start justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400/90 font-semibold">
                ADMIN PRIVILEGES
              </span>
              <h3 className="text-lg font-bold text-stone-100 font-serif-sc">
                {lang === 'zh' ? '管理员权限认证' : 'Administrator Verification'}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              setErrorMsg('');
              setPassword('');
              onClose();
            }}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-stone-400 mt-4 leading-relaxed">
          {lang === 'zh'
            ? '发布及编辑文旅新闻为管理员专属权限，请输入系统认证密码以继续：'
            : 'Publishing and managing news articles is restricted to administrators. Please enter the authorization password to proceed:'}
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              {lang === 'zh' ? '认证密码 *' : 'Authentication Password *'}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder={lang === 'zh' ? '请输入管理员认证密码' : 'Enter admin password'}
                className="w-full pl-3.5 pr-10 py-2.5 bg-stone-950 border border-stone-700 rounded-lg text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-mono tracking-wider"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 p-2.5 bg-rose-950/60 border border-rose-800/50 rounded-lg text-rose-300 text-xs animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setErrorMsg('');
                setPassword('');
                onClose();
              }}
              className="px-4 py-2 text-xs font-medium text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            >
              {lang === 'zh' ? '取消' : 'Cancel'}
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-medium text-xs rounded-lg shadow-md hover:shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{lang === 'zh' ? '验证并进入发布' : 'Verify & Proceed'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
