import { useLanguage } from "../../hooks/useLanguage";
import profileData from "../../data/profileData";

const techStack = [
  "HTML", "CSS", "JavaScript", "MySQL", "Tailwind CSS",
  "Express.js", "Laravel", "Next.js", "Figma", "AI Agents",
  "React", "Node.js",
];

export default function Hero() {
  const { t } = useLanguage();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      className="relative text-center min-h-screen flex flex-col justify-between overflow-hidden pt-28 pb-0 md:pt-36 md:pb-0"
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: "var(--glow)" }}
      />

      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 mb-10 md:mb-16 flex-1 flex flex-col justify-center items-center">
        <div className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 bg-gray-200 rounded-full px-4 py-1.5 pl-1.5 mb-6 md:mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
          <span>{profileData.title}</span>
        </div>

        <div className="relative w-full">
          <div className="relative">
            <h1 className="text-[clamp(30px,7vw,64px)] font-bold leading-[1.15] tracking-[-.04em] mb-4 max-md:mb-3">
              <span className="text-gray-900 font-medium">
                {t.hero.greeting}
              </span>
              <br />
              <span className="text-gray-1000">{profileData.name}</span>
            </h1>
            <p className="text-[clamp(15px,3.5vw,22px)] leading-relaxed text-gray-900 tracking-[-.01em] max-w-[600px] mx-auto mb-8 md:mb-10 max-md:max-w-[90%]">
              {profileData.tagline}
            </p>

            <div className="flex gap-3 justify-center items-center flex-wrap max-md:flex-col max-md:w-full max-w-[260px] md:max-w-none mx-auto">
              <button
                className="inline-flex items-center justify-center gap-2 text-[15px] font-medium px-6 py-3 rounded-full bg-gray-1000 text-background-100 border-0 transition-opacity duration-150 cursor-pointer hover:opacity-85 max-md:w-full max-md:text-sm max-md:px-5 max-md:py-2.5"
                onClick={() => scrollTo("portfolio")}
              >
                {t.hero.ctaViewWork}
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 text-[15px] font-medium px-6 py-3 rounded-full border border-gray-400 bg-transparent text-gray-1000 transition-colors duration-[90ms] cursor-pointer hover:bg-gray-200 max-md:w-full max-md:text-sm max-md:px-5 max-md:py-2.5"
                onClick={() => scrollTo("contact")}
              >
                {t.hero.ctaContact}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden pt-16 pb-8 border-t border-gray-300/60 max-md:pt-6 max-md:pb-4">
        <div className="marquee-container flex whitespace-nowrap">
          <div className="marquee-track flex gap-4 items-center max-md:gap-3 px-2">
            {techStack.map((tech, i) => (
              <span
                key={`tech-1-${i}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-100 border border-gray-300 text-[14px] font-medium text-gray-1000 whitespace-nowrap tracking-[-.01em] shadow-sm max-md:px-3 max-md:py-1.5 max-md:text-[13px] max-md:gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-blue-900/60 max-md:w-1.5 max-md:h-1.5" />
                {tech}
              </span>
            ))}
          </div>
          <div className="marquee-track flex gap-4 items-center max-md:gap-3 px-2" aria-hidden="true">
            {techStack.map((tech, i) => (
              <span
                key={`tech-2-${i}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-100 border border-gray-300 text-[14px] font-medium text-gray-1000 whitespace-nowrap tracking-[-.01em] shadow-sm max-md:px-3 max-md:py-1.5 max-md:text-[13px] max-md:gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-blue-900/60 max-md:w-1.5 max-md:h-1.5" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .marquee-container {
          display: flex;
          width: 100%;
        }
        .marquee-track {
          display: flex;
          flex-shrink: 0;
          animation: marquee-scroll 30s linear infinite;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
}
