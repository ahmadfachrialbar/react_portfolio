import { useLanguage } from '../../hooks/useLanguage';
import profileData from '../../data/profileData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function About() {
  const { t, lang } = useLanguage();
  const [ref, visible] = useScrollAnimation();

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center py-20">
      <div className="w-full px-6 md:px-16 lg:px-24">
        <div className="mb-10">
          <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-.03em] mb-2">{t.about.title}</h2>
          <p className="text-lg text-gray-900">{t.about.subtitle}</p>
        </div>
        <div
          ref={ref}
          className={`grid grid-cols-[200px_1fr] gap-12 items-start max-md:grid-cols-1 max-md:text-center transition-all duration-600 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="max-md:flex max-md:justify-center">
            <div className="w-[200px] h-[200px] rounded-[var(--radius)] bg-gray-200 flex items-center justify-center text-gray-600 border border-gray-300 overflow-hidden">
              {profileData.image ? (
                <img src={profileData.image} alt={profileData.name} className="w-full h-full object-cover" />
              ) : (
                <svg viewBox="0 0 115 100" fill="currentColor" width="40" height="35">
                  <path fillRule="evenodd" d="M57.5 0 115 100H0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          <div>
            <p className="text-[17px] leading-relaxed text-gray-800 mb-6">{profileData.about[lang]}</p>
            <div className="flex flex-col gap-3 max-md:items-center">
              <div className="flex gap-4 text-base">
                <strong className="text-gray-1000 min-w-[80px]">{t.contact.formEmail}</strong>
                <span className="text-gray-800">{profileData.contact.email}</span>
              </div>
              <div className="flex gap-4 text-base">
                <strong className="text-gray-1000 min-w-[80px]">{t.about.location}</strong>
                <span className="text-gray-800">{profileData.contact.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
