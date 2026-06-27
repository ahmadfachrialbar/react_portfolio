import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import portfolioData from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function Portfolio() {
  const { t, lang } = useLanguage();
  const [ref, visible] = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const allCategories = ['All', ...new Set(portfolioData.flatMap((p) => p.category))];

  const filtered = portfolioData.filter((p) => {
    const matchCategory = activeCategory === 'All' || p.category.includes(activeCategory);
    const matchSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const featured = portfolioData.filter((p) => p.featured);

  return (
    <section id="portfolio" className="min-h-screen py-20">
      <div className="w-full px-6 md:px-16 lg:px-24">
        <div className="mb-10">
          <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-.03em] mb-2">{t.portfolio.title}</h2>
          <p className="text-lg text-gray-900">{t.portfolio.subtitle}</p>
        </div>

        <div className="flex gap-4 items-center mb-8 flex-wrap">
          <div className="flex gap-2 flex-wrap">
            {allCategories.map((cat) => (
              <button
                key={cat}
                className={`text-sm font-medium px-4 py-1.5 rounded-full border font-[inherit] cursor-pointer transition-colors duration-[90ms] ${
                  activeCategory === cat
                    ? 'bg-gray-1000 text-background-100 border-gray-1000'
                    : 'bg-transparent text-gray-900 border-gray-400 hover:bg-gray-200 hover:text-gray-1000'
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === 'All' ? t.portfolio.filterAll : cat}
              </button>
            ))}
          </div>
          <input
            type="text"
            className="flex-1 min-w-[200px] px-4 py-2.5 rounded-full border border-gray-400 bg-background-100 text-gray-1000 text-base font-[inherit] outline-none transition-colors duration-[90ms] focus:border-gray-1000 placeholder:text-gray-700 md:ml-auto md:max-w-sm"
            placeholder={t.portfolio.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {featured.length > 0 && activeCategory === 'All' && !search && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-[.05em] mb-4">Featured</h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-6">
              {featured.map((item) => (
                <PortfolioCard key={item.id} item={item} lang={lang} featured />
              ))}
            </div>
          </div>
        )}

        <div
          ref={ref}
          className={`grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 transition-all duration-600 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          {filtered.map((item) => (
            <PortfolioCard key={item.id} item={item} lang={lang} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-900 py-12 text-base">{t.portfolio.noProjects}</p>
        )}
      </div>
    </section>
  );
}

function PortfolioCard({ item, lang, featured }) {
  const { t } = useLanguage();
  const [ref, visible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`bg-background-100 border rounded-[var(--radius)] overflow-hidden transition-all duration-200 hover:-translate-y-1 shadow-[0_-8px_30px_-4px_rgba(255,255,255,0.07)] ${
        featured ? 'border-gray-500' : 'border-gray-300'
      } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      <div className="w-full h-[180px] bg-gray-200 flex items-center justify-center text-gray-600 overflow-hidden">
        {item.image ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <svg aria-hidden="true" viewBox="0 0 115 100" fill="currentColor" width="24" height="21">
            <path fillRule="evenodd" d="M57.5 0 115 100H0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold tracking-[-.02em] mb-2">{item.title}</h3>
        <p className="text-base leading-relaxed text-gray-800 mb-4">{item.description[lang]}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.techStack.map((tech) => (
            <span key={tech} className="text-[13px] font-medium text-gray-900 bg-gray-200 px-2.5 py-0.5 rounded-full">{tech}</span>
          ))}
        </div>
        <div className="flex gap-3">
          {item.liveUrl && (
            <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-1000 no-underline border-b border-transparent transition-colors duration-[90ms] hover:border-gray-1000">
              {t.portfolio.viewProject}
            </a>
          )}
          {item.repoUrl && (
            <a href={item.repoUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-1000 no-underline border-b border-transparent transition-colors duration-[90ms] hover:border-gray-1000">
              {t.portfolio.viewCode}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
