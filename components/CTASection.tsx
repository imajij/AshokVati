'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GOOGLE_FORM_URL } from '@/constants/links';

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-content',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        },
      );

      /* ── Background parallax trees ── */
      gsap.to('.cta-bg-layer', {
        y: '-15%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      id="shop"
    >
      {/* ── Forest background ── */}
      <div
        className="cta-bg-layer absolute inset-0 will-change-transform"
        style={{
          background:
            'linear-gradient(to bottom, #030303 0%, #050505 40%, #030303 100%)',
        }}
      >
        {/* Tree silhouettes */}
        <svg
          className="absolute bottom-0 w-full opacity-60"
          viewBox="0 0 1440 280"
          preserveAspectRatio="xMidYMax slice"
        >
          {[50, 180, 310, 450, 580, 710, 840, 970, 1100, 1230, 1380].map((x, i) => {
            const h = 140 + (i % 4) * 55;
            const w = 38 + (i % 3) * 14;
            return (
              <g key={i} transform={`translate(${x}, 278)`}>
                <polygon
                  points={`0,0 -${w},-${h} ${w},0`}
                  fill={`rgba(3,3,3,${0.8 + (i % 3) * 0.06})`}
                />
                <polygon
                  points={`0,-${h * 0.5} -${w * 0.68},-${h} ${w * 0.68},-${h * 0.5}`}
                  fill={`rgba(4,4,4,${0.75 + (i % 4) * 0.05})`}
                />
              </g>
            );
          })}
        </svg>

        {/* Light from above */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: '500px',
            height: '300px',
            background:
              'radial-gradient(ellipse at center top, rgba(255,255,255,0.07) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
      </div>

      {/* ── Gradient overlays ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(3,3,3,0.6) 0%, rgba(3,3,3,0.3) 50%, rgba(3,3,3,0.8) 100%)',
        }}
      />

      {/* ── Content ── */}
      <div className="cta-content relative z-10 text-center max-w-2xl mx-auto">
        <p className="section-tag mb-4">Begin Your Journey</p>
        <h2 className="heading-xl text-cream mb-4">
          Start Your Natural
          <br />
          <span className="text-gold-400 italic">Healing Journey</span>
        </h2>
        {/* Hindi subtitle */}
        <p className="text-gold-400/70 font-sans text-sm italic mb-3">
          अपनी सेहत की शुरुआत आज ही करें
        </p>
        <p className="text-cream/55 font-sans text-sm leading-relaxed mb-10 max-w-lg mx-auto">
          Discover the path that your body needs today. Ancient wisdom meets
          modern science to restore your natural balance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-8 py-3.5 text-sm"
          >
            Buy Orthofix Care
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline px-8 py-3.5 text-sm"
          >
            Shop Zero Sugar
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Google Form CTA */}
        <div className="mt-8 flex justify-center">
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 text-sm font-sans font-semibold tracking-widest uppercase rounded-full border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-forest-900 transition-all duration-300"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12h6M9 16h6M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" />
            </svg>
            अभी फॉर्म भरें &nbsp;/&nbsp; Fill the Order Form
          </a>
        </div>

        {/* Trust line */}
        <p className="mt-6 text-cream/30 text-xs font-sans tracking-wide">
          Free shipping • 30-day money-back guarantee • No subscription
        </p>
      </div>
    </section>
  );
}
