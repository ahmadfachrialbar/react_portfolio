import { useLanguage } from '../../hooks/useLanguage';
import certificateData from '../../data/certificateData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function Certificates() {
  const { t, lang } = useLanguage();
  const [ref, visible] = useScrollAnimation();

  return (
    <section id="certificates" className="min-h-screen py-20">
      <div className="w-full px-6 md:px-16 lg:px-24">
        <div className="mb-10">
          <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-.03em] mb-2">{t.certificates.title}</h2>
          <p className="text-lg text-gray-900">{t.certificates.subtitle}</p>
        </div>
        <div
          ref={ref}
          className={`grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 transition-all duration-600 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          {certificateData.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificateCard({ cert, lang }) {
  const { t } = useLanguage();
  const [ref, visible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`bg-background-100 border border-gray-300 rounded-[var(--radius)] overflow-hidden transition-all duration-200 hover:-translate-y-1 shadow-[0_-8px_30px_-4px_rgba(255,255,255,0.07)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="w-full h-[160px] bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
        {cert.image ? (
          <img src={cert.image} alt={cert.name[lang]} className="w-full h-full object-cover" />
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold tracking-[-.01em] mb-1">{cert.name[lang]}</h3>
        <p className="text-base text-gray-800 mb-3">{cert.issuer}</p>
        <div className="flex gap-3 text-sm text-gray-900 mb-4">
          <span>{cert.issueDate}</span>
          <span className="text-gray-600">&middot;</span>
          <span className={cert.expiryDate ? '' : 'text-gray-700'}>
            {cert.expiryDate || t.certificates.noExpiry}
          </span>
        </div>
        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium text-gray-1000 no-underline border-b border-transparent transition-colors duration-[90ms] hover:border-gray-1000"
          >
            {t.certificates.verify}
          </a>
        )}
      </div>
    </div>
  );
}
