import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import LanguageSwitcher from './LanguageSwitcher';
import profileData from '../../data/profileData';

const navItems = ['home', 'about', 'education', 'portfolio', 'certificates', 'contact'];

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark-theme')
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = useCallback(() => {
    const html = document.documentElement;
    const nowDark = html.classList.contains('dark-theme');
    html.classList.toggle('dark-theme', !nowDark);
    html.classList.toggle('light-theme', nowDark);
    html.style.colorScheme = nowDark ? 'light' : 'dark';
    setIsDark(!nowDark);
    try { localStorage.setItem('portfolio-theme', nowDark ? 'light' : 'dark'); } catch {}
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleClick = (e) => {
      if (!e.target.closest('[data-nav-pill]')) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, [mobileOpen]);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-3 sm:pt-4 pointer-events-none  px-6 md:px-16 lg:px-24">
      <div data-nav-pill
        className={`pointer-events-auto flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 w-full rounded-full bg-background-100/80 backdrop-blur-xl border border-gray-300/10 shadow-lg shadow-black/5 transition-all duration-300 ${
          scrolled ? 'shadow-xl shadow-black/10' : ''
        }`}
      >
        <button className="flex items-center gap-2 p-0.5 text-gray-1000 bg-transparent border-0 cursor-pointer group shrink-0" onClick={() => scrollTo('home')} aria-label="Home">
          <div className="relative">
            <img
              src={profileData.image}
              alt={profileData.name}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-gray-400 transition-transform duration-200 group-hover:scale-105"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2.5 rounded-full bg-green-500 border-2 border-background-100" />
          </div>
          <span className="text-sm font-semibold tracking-tight hidden sm:inline">{profileData.name.split(' ')[0]}</span>
        </button>

        <nav className={`flex items-center gap-0.5 sm:gap-1 flex-1 justify-center max-md:fixed max-md:left-6 max-md:right-6 max-md:top-[60px] max-md:flex-col max-md:p-3 max-md:gap-1 max-md:z-[110] max-md:bg-background-100/90 max-md:backdrop-blur-xl max-md:rounded-2xl max-md:border max-md:border-gray-300/10 max-md:shadow-lg ${mobileOpen ? 'max-md:flex' : 'max-md:hidden'}`}>
          {navItems.map((item) => (
            <button
              key={item}
              className="text-[13px] sm:text-[14px] font-medium leading-none px-3 sm:px-3.5 py-1.5 rounded-full text-gray-800 bg-transparent border-0 transition-all duration-150 whitespace-nowrap cursor-pointer hover:bg-gray-300/30 hover:text-gray-1000 active:scale-95 max-md:w-full max-md:text-left max-md:text-base max-md:px-4 max-md:py-3"
              onClick={() => scrollTo(item)}
            >
              {t.nav[item]}
            </button>
          ))}
          <div className="hidden max-md:block px-4 py-1">
            <LanguageSwitcher />
          </div>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0 ml-auto">
          <LanguageSwitcher />
          <button
            className="flex items-center justify-center p-1.5 border border-gray-400 rounded-full text-gray-800 bg-transparent cursor-pointer transition-all duration-150 hover:bg-gray-300/30 hover:text-gray-1000 active:scale-90"
            onClick={toggleTheme}
            aria-label={t.nav.ariaTheme}
          >
            <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200" style={{ transform: isDark ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
              {isDark ? (
                <>
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </>
              ) : (
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              )}
            </svg>
          </button>
          <button
            className="flex sm:hidden items-center bg-transparent border-0 text-gray-1000 p-1.5 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={t.nav.ariaMenu}
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform duration-200" style={{ transform: mobileOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className="fixed inset-0 bg-black/40 transition-opacity duration-300 md:hidden pointer-events-none"
        style={{ opacity: mobileOpen ? 1 : 0 }}
      />
    </header>
  );
}
