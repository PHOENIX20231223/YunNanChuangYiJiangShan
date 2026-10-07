import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { MapPin, Mail, Phone, Send, CheckCircle2, ShieldCheck, Copy, Check, ExternalLink } from 'lucide-react';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const t = translations[lang].contact;

  const [formState, setFormState] = useState({
    name: '',
    org: '',
    phone: '',
    email: '',
    type: t.typeOptions[0],
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formState | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dataToSubmit = { ...formState };
    setSubmittedData(dataToSubmit);

    // Save inquiry to localStorage for persistent archival
    try {
      const existingInquiries = JSON.parse(localStorage.getItem('yunnan_jiangshan_inquiries') || '[]');
      existingInquiries.unshift({
        ...dataToSubmit,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('yunnan_jiangshan_inquiries', JSON.stringify(existingInquiries));
    } catch (err) {
      console.error('Failed to store inquiry:', err);
    }

    // Construct structured mailto content to info@chuangyijiangshan.com
    const subject = encodeURIComponent(
      `【政企合作咨询】${dataToSubmit.type} - ${dataToSubmit.name} (${dataToSubmit.org})`
    );
    const bodyText = `云南创意江山文化旅游发展有限公司 商务合作中心：

您好！以下是在线业务咨询与项目对接提交的详细合作意向：

--------------------------------------------------
【合作业务板块】：${dataToSubmit.type}
【联系人姓名】：${dataToSubmit.name}
【所属单位机构】：${dataToSubmit.org}
【联系人电话】：${dataToSubmit.phone}
【联系人邮箱】：${dataToSubmit.email}

【合作诉求与项目简要说明】：
${dataToSubmit.message}
--------------------------------------------------
咨询提交时间：${new Date().toLocaleString()}
收件官方邮箱：info@chuangyijiangshan.com
`;
    const mailtoUrl = `mailto:info@chuangyijiangshan.com?subject=${subject}&body=${encodeURIComponent(bodyText)}`;

    // Trigger sending via user mail client
    setTimeout(() => {
      try {
        const mailAnchor = document.createElement('a');
        mailAnchor.href = mailtoUrl;
        mailAnchor.target = '_blank';
        document.body.appendChild(mailAnchor);
        mailAnchor.click();
        document.body.removeChild(mailAnchor);
      } catch (err) {
        console.error('Mailto trigger error:', err);
      }

      setLoading(false);
      setSubmitted(true);
      setFormState({
        name: '',
        org: '',
        phone: '',
        email: '',
        type: t.typeOptions[0],
        message: '',
      });
    }, 600);
  };

  const handleCopyInquiryText = async () => {
    if (!submittedData) return;
    const summaryText = `【云南创意江山-业务咨询】\n收件邮箱：info@chuangyijiangshan.com\n联系人：${submittedData.name}\n单位：${submittedData.org}\n电话：${submittedData.phone}\n邮箱：${submittedData.email}\n业务类型：${submittedData.type}\n合作诉求：${submittedData.message}`;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(summaryText);
      }
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="contact" className="py-20 bg-stone-950 border-t border-stone-800/80 relative overflow-hidden">
      {/* Real scenery ambient background */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <img
          src="/images/lijiang-old-town.webp"
          alt="Yunnan cultural landscape"
          className="w-full h-full object-cover filter blur-[2px]"
        />
        <div className="absolute inset-0 bg-stone-950/85" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
            GOVERNMENT & ENTERPRISE PARTNERSHIP
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-sc text-stone-100 mt-2 text-balance">
            {t.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-stone-400 mt-3 leading-relaxed text-balance">
            {t.sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left 5 Cols: Company Profile & Scopes */}
          <div className="lg:col-span-5 bg-stone-900/60 border border-stone-800 rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono tracking-wider text-amber-400 font-semibold">
                  OFFICIAL CONTACT
                </span>
                {/* 1. Full Company Name */}
                <h3 className="text-xl font-bold font-serif-sc text-stone-100 mt-1">
                  云南创意江山文化旅游发展有限公司
                </h3>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-stone-300">
                {/* 2. Official Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{t.address}</span>
                </div>

                {/* 3. Business hotline */}
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <a
                    href="tel:13701280798"
                    className="font-mono text-amber-300 hover:text-amber-200 hover:underline"
                  >
                    13701280798
                  </a>
                  <span className="text-stone-500">{t.phoneNote}</span>
                </div>

                {/* 4. Official Email: info@chuangyijiangshan.com */}
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                  <a
                    href="mailto:info@chuangyijiangshan.com"
                    className="font-mono text-amber-300 hover:text-amber-200 hover:underline"
                  >
                    info@chuangyijiangshan.com
                  </a>
                </div>
              </div>

              {/* Service Scopes */}
              <div className="pt-6 border-t border-stone-800">
                <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-3">
                  {t.serviceScopeTitle}
                </h4>
                <ul className="space-y-2.5">
                  {t.serviceScopes.map((scope, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                      <span className="text-amber-400 font-bold">›</span>
                      <span>{scope}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-800 text-[11px] text-stone-500 font-mono flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>CONFIDENTIAL & DIRECT DISPATCH</span>
              </div>
              <span className="text-amber-400 font-medium">info@chuangyijiangshan.com</span>
            </div>
          </div>

          {/* Right 7 Cols: Online Consultation Form (Dispatches to info@chuangyijiangshan.com) */}
          <div className="lg:col-span-7 bg-stone-900/40 border border-stone-800 rounded-2xl p-7 sm:p-8 shadow-xl">
            <h3 className="text-xl font-bold font-serif-sc text-stone-100">
              {t.formTitle}
            </h3>
            <p className="text-xs text-stone-400 mt-1 mb-6">
              {t.formDesc}
            </p>

            {submitted ? (
              <div className="p-7 text-center bg-stone-950/80 rounded-xl border border-emerald-800/60 my-4 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-base font-bold text-stone-100 font-serif-sc">
                  {lang === 'zh' ? '咨询信息已就绪，请确认发送' : 'Inquiry Ready — Please Confirm Sending'}
                </h4>
                <p className="text-xs text-stone-300 mt-2 max-w-lg mx-auto leading-relaxed">
                  {lang === 'zh'
                    ? '咨询信息已整理，请在自动弹出的邮件客户端中确认发送至官方邮箱：'
                    : 'Your inquiry has been prepared. Please confirm sending in your mail client to: '}
                  <span className="text-amber-400 font-mono font-bold">info@chuangyijiangshan.com</span>
                  {lang === 'zh' ? '。若邮件客户端未自动弹出，请使用下方"通过邮件客户端再次发送"按钮。我们的政企业务负责人将在24小时内与您联系！' : '. If your mail client did not open automatically, use the "Resend via mail client" button below. Our team will review and reply within 24 hours.'}
                </p>

                {/* Submitted summary card */}
                {submittedData && (
                  <div className="my-5 p-4 bg-stone-900/90 rounded-lg border border-stone-800 text-left text-xs space-y-1.5 max-w-lg mx-auto text-stone-300">
                    <div><span className="text-stone-500">{t.sumType}</span><span className="text-amber-300">{submittedData.type}</span></div>
                    <div><span className="text-stone-500">{t.sumName}</span>{submittedData.name} ({submittedData.org})</div>
                    <div><span className="text-stone-500">{t.sumPhone}</span>{submittedData.phone}</div>
                    <div><span className="text-stone-500">{t.sumEmail}</span>{submittedData.email}</div>
                    <div className="pt-1.5 border-t border-stone-800 text-stone-400 text-[11px] line-clamp-2">
                      <span className="text-stone-500">{t.sumMsg}</span>{submittedData.message}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={`mailto:info@chuangyijiangshan.com?subject=${encodeURIComponent(
                      `【政企合作咨询】${submittedData?.type || ''} - ${submittedData?.name || ''}`
                    )}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-medium transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{t.resendBtn}</span>
                  </a>

                  <button
                    onClick={handleCopyInquiryText}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded-lg transition-colors"
                  >
                    {copiedText ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">{t.copiedBtn}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.copyBtn}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setSubmittedData(null);
                    }}
                    className="px-4 py-2 text-stone-400 hover:text-white text-xs transition-colors"
                  >
                    {lang === 'zh' ? '填写新咨询' : 'New Inquiry'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ct-name" className="block text-xs font-semibold text-stone-300 mb-1">
                      {t.nameLabel}
                    </label>
                    <input id="ct-name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="ct-org" className="block text-xs font-semibold text-stone-300 mb-1">
                      {t.orgLabel}
                    </label>
                    <input id="ct-org"
                      type="text"
                      required
                      value={formState.org}
                      onChange={(e) => setFormState({ ...formState, org: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ct-phone" className="block text-xs font-semibold text-stone-300 mb-1">
                      {t.phoneLabel}
                    </label>
                    <input id="ct-phone"
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="ct-email" className="block text-xs font-semibold text-stone-300 mb-1">
                      {t.emailLabel}
                    </label>
                    <input id="ct-email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="ct-type" className="block text-xs font-semibold text-stone-300 mb-1">
                    {t.typeLabel}
                  </label>
                  <select id="ct-type"
                    value={formState.type}
                    onChange={(e) => setFormState({ ...formState, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                  >
                    {t.typeOptions.map((opt, idx) => (
                      <option key={idx} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="ct-message" className="block text-xs font-semibold text-stone-300 mb-1">
                    {t.messageLabel}
                  </label>
                  <textarea id="ct-message"
                    rows={3}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder={t.messagePh}
                    className="w-full px-3.5 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-medium text-xs rounded-lg shadow-lg hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{loading ? t.submitting : t.submitBtn}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
