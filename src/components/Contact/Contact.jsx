import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import profileData from '../../data/profileData';

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!form.name.trim()) return 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Invalid email';
    if (!form.message.trim()) return 'Message is required';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setStatus(err); return; }

    setLoading(true);
    setStatus('');

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send');
      }

      setStatus(t.contact.success);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus(t.contact.error);
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(''), 3000);
    }
  };

  const { contact, socials } = profileData;

  return (
    <section id="contact" className="min-h-screen w-full py-16 lg:py-28 flex flex-col justify-center items-center">
      <div className="w-full px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col justify-center order-1 md:order-1">
            <div className="mb-8 text-left">
              <h2 className="text-[clamp(32px,4vw,44px)] font-bold tracking-[-.03em] mb-3 text-gray-1000">
                {t.contact.title}
              </h2>
              <p className="text-base md:text-lg text-gray-900 max-w-md">
                {t.contact.subtitle}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {contact.email && (
                <div className="flex items-center gap-3 text-base text-gray-800">
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-gray-600"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  <a href={`mailto:${contact.email}`} className="text-gray-800 no-underline transition-colors duration-[90ms] hover:text-gray-1000">{contact.email}</a>
                </div>
              )}
              {contact.phone && (
                <div className="flex items-center gap-3 text-base text-gray-800">
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-gray-600"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  <a href={`tel:${contact.phone}`} className="text-gray-800 no-underline transition-colors duration-[90ms] hover:text-gray-1000">{contact.phone}</a>
                </div>
              )}
              {contact.location && (
                <div className="flex items-center gap-3 text-base text-gray-800">
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-gray-600"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  <span>{contact.location}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2.5 flex-wrap mt-6">
              {socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-900 no-underline px-4 py-2 border border-gray-400 rounded-full bg-transparent transition-colors duration-[90ms] hover:bg-gray-200 hover:text-gray-1000"
                  aria-label={s.platform}
                >
                  {s.platform}
                </a>
              ))}
            </div>
          </div>

          <div className="bg-background-100 border border-gray-300 rounded-[var(--radius)] p-6 md:p-8 order-2 md:order-2 w-full shadow-[0_-8px_30px_-4px_rgba(255,255,255,0.07)]">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="name" className="text-sm font-medium text-gray-1000">{t.contact.formName}</label>
                <input
                  id="name" type="text" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t.contact.formName}
                  className="w-full px-3.5 py-3 border border-gray-400 rounded-lg bg-background-200 text-gray-1000 text-base font-[inherit] outline-none transition-colors duration-[90ms] focus:border-gray-1000"
                />
              </div>
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="email" className="text-sm font-medium text-gray-1000">{t.contact.formEmail}</label>
                <input
                  id="email" type="email" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={t.contact.formEmail}
                  className="w-full px-3.5 py-3 border border-gray-400 rounded-lg bg-background-200 text-gray-1000 text-base font-[inherit] outline-none transition-colors duration-[90ms] focus:border-gray-1000"
                />
              </div>
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="message" className="text-sm font-medium text-gray-1000">{t.contact.formMessage}</label>
                <textarea
                  id="message" rows={5} value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t.contact.formMessage}
                  className="w-full px-3.5 py-3 border border-gray-400 rounded-lg bg-background-200 text-gray-1000 text-base font-[inherit] outline-none transition-colors duration-[90ms] focus:border-gray-1000 resize-vertical min-h-[120px]"
                />
              </div>
              <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 text-[15px] font-medium px-6 py-3 rounded-full bg-gray-1000 text-background-100 border-0 transition-opacity duration-150 cursor-pointer hover:opacity-85 self-start font-[inherit] w-full sm:w-auto mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? '...' : t.contact.formSubmit}
              </button>
              {status && (
                <p className="text-sm px-3 py-2 rounded-lg bg-gray-200 text-gray-1000 text-left mt-2">
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
