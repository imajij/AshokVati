'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const FEATURES = [
  {
    title: 'Restore Energy Levels',
    desc: 'Revives mitochondrial function for sustained daily energy without stimulants.',
  },
  {
    title: 'Supports Insulin Function',
    desc: 'Enhances cellular insulin sensitivity to balance blood sugar naturally.',
  },
  {
    title: 'Reduces Sugar Cravings',
    desc: 'Botanical neuropeptides signal satiety, reducing addictive sugar compulsion.',
  },
];

export default function ZeroSugarSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ── Text side ── */
      gsap.fromTo(
        '.zs-text-col',
        { x: -55, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        },
      );

      /* ── Feature cards animate in stagger ── */
      gsap.fromTo(
        '.zs-feature',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.14,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.zs-features', start: 'top 80%' },
        },
      );

      /* ── Bottle/image side ── */
      gsap.fromTo(
        imageRef.current,
        { x: 60, opacity: 0, scale: 0.94 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        },
      );

      /* ── Subtle parallax on image ── */
      gsap.to(imageRef.current, {
        y: '-8%',
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
      id="zero-sugar"
      className="py-24 px-6"
      style={{
        background:
          'linear-gradient(to bottom, #040404 0%, #060606 50%, #040404 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* ── Left: Content ── */}
        <div className="zs-text-col">
          <p className="section-tag mb-3">Botanical Formula 2</p>
          <h2 className="heading-lg text-cream mb-2">
            Zero <span className="text-gold-400 italic">Sugar</span>
          </h2>
          <p className="text-cream/55 font-sans text-sm leading-relaxed max-w-md mb-8">
            Harness the elder wisdom of forest botanicals to regulate your
            body&apos;s energy cycle naturally — without synthetic additives,
            without side effects.
          </p>

          {/* Feature list */}
          <div className="zs-features space-y-4 mb-8">
            {FEATURES.map((f) => (
              <div key={f.title} className="zs-feature">
                <div className="glass-card rounded-xl p-4 border-l-2 border-gold-500/40 hover:border-gold-500/70 transition-colors">
                  <h4 className="text-cream/90 font-sans text-sm font-semibold mb-1">{f.title}</h4>
                  <p className="text-cream/45 font-sans text-xs leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <a href="#shop" className="btn-gold">
            Shop Zero Sugar
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* ── Right: Bottle on wooden platform ── */}
        <div
          ref={imageRef}
          className="will-change-transform"
        >
          <div
            className="relative mx-auto max-w-xs rounded-3xl overflow-hidden"
            style={{ aspectRatio: '3/4' }}
          >
            {/* Product Image */}
            <div className="absolute inset-0">
              <Image
                src="/products/product2.jpg"
                alt="Zero Sugar Formula"
                fill
                className="object-cover"
              />
            </div>

            {/* Warm ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(200,200,200,0.05) 0%, transparent 70%)',
              }}
            />

            {/* Leaf decoration */}
            <div className="absolute top-8 right-6 opacity-30 animate-float-slow">
              <svg viewBox="0 0 40 40" width="36" fill="#c0c0c0">
                <path d="M20 2C20 2 2 14 2 26C2 34.28 10.27 40 20 40C29.73 40 38 34.28 38 26C38 14 20 2 20 2Z" />
              </svg>
            </div>
            <div className="absolute top-16 left-5 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
              <svg viewBox="0 0 30 30" width="26" fill="#a0a0a0">
                <path d="M15 2C15 2 2 9 2 18C2 24.63 7.37 30 15 30C22.63 30 28 24.63 28 18C28 9 15 2 15 2Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
