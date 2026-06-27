import { useLanguage } from '../../hooks/useLanguage';
import educationData from '../../data/educationData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function Education() {
  const { t, lang } = useLanguage();
  const [ref, visible] = useScrollAnimation();
  const sorted = [...educationData].sort((a, b) => b.endYear - a.endYear);

  return (
    <section id="education" className="min-h-screen flex flex-col justify-center py-20">
      <div className="w-full px-6 md:px-16 lg:px-24">
        <div className="mb-10">
          <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-.03em] mb-2">{t.education.title}</h2>
          <p className="text-lg text-gray-900">{t.education.subtitle}</p>
        </div>
        <div
          ref={ref}
          className={`max-w-[700px] mx-auto relative transition-all duration-600 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          {sorted.map((item, idx) => (
            <EducationCard key={item.id} item={item} lang={lang} index={idx} isLast={idx === sorted.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationCard({ item, lang, index, isLast }) {
  const [ref, visible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`relative pl-8 pb-10 last:pb-0 transition-all duration-500 ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {!isLast && <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-gray-300" />}
      <div className="absolute left-0 top-[6px] w-4 h-4 rounded-full bg-gray-1000 border-[3px] border-background-200 z-10" />
      <div className="bg-background-100 border border-gray-300 rounded-[var(--radius)] p-5 shadow-[0_-8px_30px_-4px_rgba(255,255,255,0.07)] transition-all duration-[90ms] hover:bg-gray-100">
        <div className="flex justify-between items-start gap-4 mb-2 max-md:flex-col max-md:gap-1">
          <h3 className="text-xl font-semibold tracking-[-.02em]">{item.institution}</h3>
          <span className="text-sm font-medium text-gray-900 whitespace-nowrap px-3 py-0.5 bg-gray-200 rounded-full">{item.startYear} - {item.endYear}</span>
        </div>
        <p className="text-base font-medium text-gray-1000 mb-0.5">{item.degree[lang]}</p>
        <p className="text-sm text-gray-800 mb-3">{item.field[lang]}</p>
        <p className="text-base leading-relaxed text-gray-800">{item.description[lang]}</p>
      </div>
    </div>
  );
}
