import { useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

export default function ScrollToTop() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-gray-1000 text-background-100 border-0 flex items-center justify-center cursor-pointer transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t.common.scrollToTop}
    >
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
