"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Generate random stars
const generateStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  }));
};

// Crescent Moon SVG
const CrescentMoon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full animate-moon-pulse">
    <defs>
      <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fdf6e3" />
        <stop offset="50%" stopColor="#e8d48a" />
        <stop offset="100%" stopColor="#c9a227" />
      </linearGradient>
    </defs>
    <path
      d="M50 5 C75 5 95 25 95 50 C95 75 75 95 50 95 C30 95 15 80 10 60 C25 75 45 70 55 50 C65 30 55 15 35 10 C40 6 45 5 50 5"
      fill="url(#moonGrad)"
    />
  </svg>
);

// Lantern Component
const Lantern = ({
  size = "md",
  delay = 0,
}: {
  size?: "sm" | "md" | "lg";
  delay?: number;
}) => {
  const sizeClasses = {
    sm: "w-6 h-12",
    md: "w-10 h-16",
    lg: "w-14 h-24",
  };

  return (
    <div
      className={`${sizeClasses[size]} animate-swing`}
      style={{ animationDelay: `${delay}s` }}
    >
      <svg viewBox="0 0 40 70" className="w-full h-full">
        <defs>
          <linearGradient
            id={`lanternGold${delay}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#e8d48a" />
            <stop offset="50%" stopColor="#c9a227" />
            <stop offset="100%" stopColor="#8b6914" />
          </linearGradient>
          <radialGradient id={`lanternGlow${delay}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(232, 212, 138, 0.9)" />
            <stop offset="100%" stopColor="rgba(201, 162, 39, 0)" />
          </radialGradient>
        </defs>
        <path
          d="M18 0 L22 0 L22 6 L18 6 Z"
          fill={`url(#lanternGold${delay})`}
        />
        <circle
          cx="20"
          cy="3"
          r="2"
          fill="none"
          stroke={`url(#lanternGold${delay})`}
          strokeWidth="1"
        />
        <path
          d="M12 6 L28 6 L26 12 L14 12 Z"
          fill={`url(#lanternGold${delay})`}
        />
        <ellipse
          cx="20"
          cy="35"
          rx="12"
          ry="20"
          fill={`url(#lanternGlow${delay})`}
          opacity="0.7"
        />
        <path
          d="M14 12 Q8 35 14 58 L26 58 Q32 35 26 12"
          fill="rgba(232, 212, 138, 0.2)"
          stroke={`url(#lanternGold${delay})`}
          strokeWidth="1.5"
        />
        <path
          d="M14 58 L26 58 L28 64 L12 64 Z"
          fill={`url(#lanternGold${delay})`}
        />
      </svg>
    </div>
  );
};

// Corner Ornament
const CornerOrnament = ({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) => {
  const transforms = {
    tl: "",
    tr: "scale(-1, 1)",
    bl: "scale(1, -1)",
    br: "scale(-1, -1)",
  };
  const positions = {
    tl: "top-3 left-3",
    tr: "top-3 right-3",
    bl: "bottom-3 left-3",
    br: "bottom-3 right-3",
  };

  return (
    <svg
      className={`absolute ${positions[position]} w-10 h-10 md:w-14 md:h-14 text-[#c9a227] opacity-50`}
      viewBox="0 0 50 50"
      style={{ transform: transforms[position] }}
    >
      <path d="M0 0 L20 0 L20 2 L2 2 L2 20 L0 20 Z" fill="currentColor" />
      <path
        d="M6 6 L15 6 L15 7 L7 7 L7 15 L6 15 Z"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
};

// Music Toggle
const MusicToggle = ({
  isPlaying,
  onClick,
}: {
  isPlaying: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#1a1f2e]/90 backdrop-blur-md border border-[#c9a227]/40 flex items-center justify-center transition-all hover:scale-110 hover:border-[#c9a227] group"
    aria-label={isPlaying ? "Pause music" : "Play music"}
  >
    {isPlaying ? (
      <svg
        className="w-4 h-4 text-[#e8d48a]"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <rect x="6" y="4" width="4" height="16" rx="1" />
        <rect x="14" y="4" width="4" height="16" rx="1" />
      </svg>
    ) : (
      <svg
        className="w-4 h-4 text-[#e8d48a] ml-0.5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    )}
  </button>
);

export default function Home() {
  const [stars, setStars] = useState<ReturnType<typeof generateStars>>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setStars(generateStars(80));
    setMounted(true);

    audioRef.current = new Audio(
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    );
    audioRef.current.loop = true;
    audioRef.current.volume = 0.25;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main className="relative">
      {/* ============ HERO SECTION ============ */}
      <section className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#0a0d14] via-[#0f1419] to-[#1a1f2e]">
        {/* Stars Background */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="star animate-twinkle"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}

        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#c9a227]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#10b981]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#c9a227]/5 rounded-full blur-[80px]" />

        {/* Floating Lanterns */}
        <div className="absolute top-20 left-6 md:left-12 animate-float">
          <Lantern size="lg" delay={0} />
        </div>
        <div
          className="absolute top-32 right-6 md:right-16 animate-float"
          style={{ animationDelay: "1.2s" }}
        >
          <Lantern size="md" delay={1.2} />
        </div>
        <div
          className="absolute top-48 left-1/5 animate-float hidden lg:block"
          style={{ animationDelay: "0.8s" }}
        >
          <Lantern size="sm" delay={0.8} />
        </div>
        <div
          className="absolute top-24 right-1/4 animate-float hidden lg:block"
          style={{ animationDelay: "2s" }}
        >
          <Lantern size="sm" delay={2} />
        </div>
        <div
          className="absolute bottom-32 left-16 animate-float hidden md:block"
          style={{ animationDelay: "1.5s" }}
        >
          <Lantern size="sm" delay={1.5} />
        </div>
        <div
          className="absolute bottom-40 right-20 animate-float hidden md:block"
          style={{ animationDelay: "0.5s" }}
        >
          <Lantern size="md" delay={0.5} />
        </div>

        {/* Crescent Moon */}
        <div className="absolute top-12 right-8 md:top-16 md:right-24 w-16 h-16 md:w-24 md:h-24 animate-float-slow">
          <CrescentMoon />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 py-16 md:py-20">
          {/* Photo Frame - AT TOP */}
          <div
            className={`relative inline-block mb-10 md:mb-12 transition-all duration-1000 ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {/* Outer Glow */}
            <div className="absolute -inset-6 md:-inset-8 bg-gradient-to-br from-[#c9a227]/20 via-[#e8d48a]/10 to-[#c9a227]/20 rounded-3xl blur-xl animate-glow-pulse" />

            {/* Decorative Border */}
            <div className="absolute -inset-4 md:-inset-5 rounded-2xl border border-[#c9a227]/30" />
            <div className="absolute -inset-2 md:-inset-3 rounded-xl border border-[#c9a227]/50" />

            {/* Image Container */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/zuraib.png"
                alt="Zuraib bin Noman & Umar bin Noman"
                width={400}
                height={480}
                className="object-cover w-[260px] h-[320px] md:w-[320px] md:h-[400px]"
                priority
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-transparent to-transparent opacity-60" />

              {/* Name Overlay on Image */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <p className="text-base md:text-lg font-semibold text-white drop-shadow-lg">
                  Zuraib & Umar
                </p>
                <p className="text-xs text-[#e8d48a]/80 mt-0.5">bin Noman</p>
              </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-[#c9a227] rounded-tl-lg" />
            <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-[#c9a227] rounded-tr-lg" />
            <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-[#c9a227] rounded-bl-lg" />
            <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-[#c9a227] rounded-br-lg" />
          </div>

          {/* Decorative Line */}
          <div
            className={`flex items-center justify-center gap-3 mb-6 transition-all duration-1000 delay-200 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-[#c9a227]" />
            <div className="text-[#c9a227] text-lg">&#10022;</div>
            <div className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-[#c9a227]" />
          </div>

          {/* Main Title - BELOW FRAME */}
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-3 transition-all duration-1000 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="text-gold-gradient glow-text">Eid Mubarak</span>
          </h1>

          {/* Emoji Line */}
          <div
            className={`text-2xl md:text-3xl mb-5 transition-all duration-1000 delay-400 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            &#127769; &#10024; &#127775;
          </div>

          {/* Subtitle */}
          <p
            className={`text-sm md:text-lg text-[#a0aec0] max-w-md mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Wishing you joy, peace, and countless blessings on this blessed day
          </p>

          {/* Scroll Indicator */}
          <div
            className={`mt-10 md:mt-14 transition-all duration-1000 delay-700 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <span className="text-xs text-[#c9a227]/60 tracking-widest uppercase">
                Scroll
              </span>
              <svg
                className="w-5 h-5 text-[#c9a227]/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a1f2e] to-transparent" />
      </section>

      {/* ============ MESSAGE SECTION ============ */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-[#1a1f2e] via-[#0f1419] to-[#0a0d14] islamic-geo-pattern">
        {/* Background Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#c9a227]/5 rounded-full blur-[120px]" />

        {/* Message Card */}
        <div className="relative w-full max-w-xl animate-fade-in-up">
          <div className="premium-card rounded-2xl md:rounded-3xl p-6 md:p-10 glow-gold">
            {/* Corner Ornaments */}
            <CornerOrnament position="tl" />
            <CornerOrnament position="tr" />
            <CornerOrnament position="bl" />
            <CornerOrnament position="br" />

            {/* Top Icon */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a227] to-[#8b6914] flex items-center justify-center shadow-lg border-4 border-[#0f1419]">
                <span className="text-base">&#127769;</span>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 pt-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[#e8d48a] mb-2">
                Ek Khaas Paigham
              </h2>

              {/* Decorative Line */}
              <div className="flex justify-center mb-8">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#c9a227]/50 to-transparent" />
              </div>

              {/* Message */}
              <div className="space-y-5 mb-8">
                <p className="text-xl md:text-2xl font-semibold text-white">
                  Eid Mubarak! &#127769;&#10024;
                </p>
                <p className="text-[#a0aec0] leading-relaxed text-lg">
                  Allah aap ki zindagi ko khushiyon, kamiyabiyon aur be shumaar barkaton se bhar de.
                </p>
                <p className="text-[#a0aec0] leading-relaxed text-lg">
                  Yeh Eid aap ke dil mein khushi aur aap ke ghar mein sukoon laye.
                </p>
              </div>

              {/* Divider */}
              <div className="gold-divider mb-6" />

              {/* Signature */}
              <p className="text-xs text-[#6b7280] tracking-[0.15em] uppercase mb-2">
                Mohabbat ke saath
              </p>
              <p className="text-lg md:text-xl font-semibold text-gold-gradient">
                Zuraib bin Noman & Umar bin Noman
              </p>
              <div className="mt-3 text-xl animate-pulse-soft">
                &#10084;&#65039;
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-[#c9a227]/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#c9a227]/60" />
          <div className="w-2 h-2 rounded-full bg-[#c9a227] animate-pulse-soft" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#c9a227]/60" />
          <div className="w-1 h-1 rounded-full bg-[#c9a227]/40" />
        </div>
      </section>

      {/* Music Toggle */}
      <MusicToggle isPlaying={isPlaying} onClick={toggleMusic} />
    </main>
  );
}
