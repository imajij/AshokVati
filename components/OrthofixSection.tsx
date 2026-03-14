'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { GOOGLE_FORM_URL } from '@/constants/links';

const FEATURES = [
  'Reduces chronic joint pain and stiffness',
  'Helps restore cartilage and synovial fluid',
  'Natural reduction of inflammation',
];

export default function OrthofixSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ── Section heading entrance ── */
      gsap.fromTo(
        '.orthofix-heading',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        },
      );

      /* ── Features stagger ── */
      gsap.fromTo(
        '.orthofix-feature',
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.orthofix-features', start: 'top 80%' },
        },
      );

      /* ── Stats ── */
      gsap.fromTo(
        '.orthofix-stat',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.orthofix-stats', start: 'top 82%' },
        },
      );

      /* ── Product image panel scale in ── */
      if (canvasRef.current) {
        gsap.fromTo(
          canvasRef.current,
          { scale: 0.88, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: { trigger: canvasRef.current, start: 'top 80%' },
          },
        );

        /* ── Subtle zoom on scroll ── */
        gsap.to(canvasRef.current, {
          scale: 1.06,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="orthofix"
      className="py-24 px-6 overflow-hidden"
      style={{
        background:
          'linear-gradient(to bottom, #050505 0%, #080808 50%, #050505 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Top tag ── */}
        <div className="text-center mb-4">
          <p className="section-tag">Ingredient Focus</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left: Product image ── */}
          <div
            ref={canvasRef}
            className="relative h-[380px] md:h-[520px] will-change-transform order-2 md:order-1"
          >
            {/* Glow backdrop */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)',
              }}
            />

            <div className="absolute inset-4 md:inset-8 rounded-3xl overflow-hidden">
              <Image
                src="/products/combined.jpeg"
                alt="Orthofix and Zero Sugar products"
                fill
                quality={100}
                sizes="(max-width: 768px) 85vw, 520px"
                className="object-contain"
                style={{ filter: 'brightness(1.16) contrast(1.14) saturate(1.25)' }}
                priority
              />
            </div>
          </div>

          {/* ── Right: Content ── */}
          <div className="order-1 md:order-2">
            <div className="orthofix-heading">
              <h2 className="heading-lg text-cream mb-4">
                Orthofix <span className="text-gold-400">Care</span>
              </h2>
              <p className="text-cream/55 font-sans text-sm leading-relaxed max-w-sm mb-6">
                A powerful synergy of nature&apos;s best anti-inflammatory roots
                and herbs designed for mobility.
              </p>
            </div>

            {/* Features */}
            <div className="orthofix-features space-y-4 mb-8">
              {FEATURES.map((f) => (
                <div key={f} className="orthofix-feature feature-item">
                  <div className="feature-dot">
                    <svg className="w-3 h-3 text-gold-400" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6L5 9L10 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-cream/70 text-sm font-sans leading-relaxed">{f}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="orthofix-stats grid grid-cols-2 gap-5 mb-8">
              {[
                { val: '4 Roots', desc: 'Ancient botanical herbs' },
                { val: '24 Hours', desc: 'Continuous inflammation reduction' },
              ].map((s) => (
                <div key={s.val} className="orthofix-stat glass-card rounded-2xl p-4">
                  <p className="stat-number text-2xl">{s.val}</p>
                  <p className="text-cream/45 text-xs font-sans mt-1 leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>

            <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">
              Shop Orthofix Care
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
