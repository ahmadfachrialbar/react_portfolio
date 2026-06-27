import { createContext, useState, useEffect } from 'react';
import translations from '../data/translations';

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('portfolio-lang') || 'id';
    } catch {
      return 'id';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('portfolio-lang', lang);
    } catch {}
  }, [lang]);

  const t = translations[lang] || translations.id;

  const toggleLang = () => {
    setLang((prev) => (prev === 'id' ? 'en' : 'id'));
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
