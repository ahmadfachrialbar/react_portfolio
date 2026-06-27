import { useLanguage } from '../../hooks/useLanguage';
import profileData from '../../data/profileData';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="pt-20 pb-10 border-t border-gray-300 mt-10">
      <div className="w-full px-6 md:px-16 lg:px-24">
        <div className="text-[clamp(18px,2vw,24px)] font-medium leading-tight tracking-[-.03em] text-gray-900 mb-12">
          <b className="text-gray-1000 font-semibold">{profileData.name}</b> &mdash; {profileData.title}
        </div>
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-12 max-md:grid-cols-2 max-md:gap-8 max-[480px]:grid-cols-1">
          <div className="flex flex-col">
            <h4 className="text-sm font-semibold text-gray-1000 mb-4">{t.footer.navigation}</h4>
            <a href="#home" className="text-base text-gray-800 py-1 no-underline transition-colors duration-[90ms] hover:text-gray-1000">{t.nav.home}</a>
            <a href="#about" className="text-base text-gray-800 py-1 no-underline transition-colors duration-[90ms] hover:text-gray-1000">{t.nav.about}</a>
            <a href="#education" className="text-base text-gray-800 py-1 no-underline transition-colors duration-[90ms] hover:text-gray-1000">{t.nav.education}</a>
            <a href="#portfolio" className="text-base text-gray-800 py-1 no-underline transition-colors duration-[90ms] hover:text-gray-1000">{t.nav.portfolio}</a>
            <a href="#certificates" className="text-base text-gray-800 py-1 no-underline transition-colors duration-[90ms] hover:text-gray-1000">{t.nav.certificates}</a>
            <a href="#contact" className="text-base text-gray-800 py-1 no-underline transition-colors duration-[90ms] hover:text-gray-1000">{t.nav.contact}</a>
          </div>
          <div className="flex flex-col">
            <h4 className="text-sm font-semibold text-gray-1000 mb-4">{t.footer.contact}</h4>
            <a href={`mailto:${profileData.contact.email}`} className="text-base text-gray-800 py-1 no-underline transition-colors duration-[90ms] hover:text-gray-1000">{profileData.contact.email}</a>
            <a href={profileData.contact.github} target="_blank" rel="noopener noreferrer" className="text-base text-gray-800 py-1 no-underline transition-colors duration-[90ms] hover:text-gray-1000">GitHub</a>
            <a href={profileData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-base text-gray-800 py-1 no-underline transition-colors duration-[90ms] hover:text-gray-1000">LinkedIn</a>
          </div>
          <div className="flex flex-col items-end justify-end text-right col-span-2 max-md:col-span-1">
            <span className="text-[clamp(32px,5vw,64px)] font-bold leading-tight tracking-[-.03em] text-gray-1000">{t.footer.thanks}</span>
          </div>
        </div>
        <div className="flex justify-between items-center pt-8 border-t border-gray-300 text-sm text-gray-900 max-md:flex-col max-md:gap-4 max-md:items-start">
          <p>{t.footer.copyright.replace('{name}', profileData.name)}</p>
          <div className="flex gap-4">
            {profileData.socials.map((s) => (
              <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" className="text-gray-700 text-sm no-underline transition-colors duration-[90ms] hover:text-gray-1000" aria-label={s.platform}>
                {s.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
