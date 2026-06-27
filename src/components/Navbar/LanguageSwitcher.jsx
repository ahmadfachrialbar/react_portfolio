import { useLanguage } from '../../hooks/useLanguage';

export default function LanguageSwitcher() {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <button
      className="flex items-center gap-0.5 border border-gray-400 rounded-full px-2.5 py-1 text-xs font-semibold text-gray-900 bg-transparent cursor-pointer transition-colors duration-[90ms] hover:bg-gray-200 font-[inherit]"
      onClick={toggleLang}
      aria-label={t.language.en}
    >
      <span className={`transition-colors duration-[90ms] ${lang === 'id' ? 'text-gray-1000' : ''}`}>ID</span>
      <span className="text-gray-600 text-[11px]">/</span>
      <span className={`transition-colors duration-[90ms] ${lang === 'en' ? 'text-gray-1000' : ''}`}>EN</span>
    </button>
  );
}
