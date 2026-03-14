'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

export default function StrugglesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { x: -60, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        },
      );

      gsap.fromTo(
        '.struggles-item',
        { x: 55, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6"
      style={{
        background:
          'linear-gradient(to bottom, #060606 0%, #040404 40%, #060606 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* ── Left: Image panel ── */}
        <div
          ref={imageRef}
          className="relative aspect-[4/5] max-w-md mx-auto md:mx-0 rounded-3xl overflow-hidden will-change-transform"
        >
          {/* Gradient base to simulate a moody photo */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(160deg, #000000 0%, #000000 55%, #020202 100%)',
            }}
          />

          {/* Actual Image */}
          <div className="absolute inset-4 md:inset-6">
            <Image
              src="/products/product1.jpeg"
              alt="Modern Struggles"
              fill
              quality={100}
              sizes="(max-width: 768px) 80vw, 420px"
              className="object-contain opacity-100"
              style={{ filter: 'brightness(1.2) contrast(1.18) saturate(1.35)' }}
            />
          </div>

          {/* Greenish organic overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.32) 100%)',
            }}
          />

          {/* Leaf texture overlay */}
          <div className="absolute top-6 right-6 opacity-30">
            <svg viewBox="0 0 80 80" width="70" fill="none">
              <path
                d="M40 5C40 5 5 30 5 55C5 69.36 17.09 80 40 80C62.91 80 75 69.36 75 55C75 30 40 5 40 5Z"
                fill="#c0c0c0"
              />
            </svg>
          </div>

          {/* Quote overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/68 via-black/30 to-transparent">
            <p className="text-cream/80 text-sm font-serif italic leading-relaxed">
              &ldquo;Millions suffer from joint pain and blood sugar imbalance
              due to sedentary lifestyles and processed nutrition.&rdquo;
            </p>
          </div>
        </div>

        {/* ── Right: Content ── */}
        <div className="space-y-5">
          <p className="struggles-item section-tag">The Modern Reality</p>
          <h2 className="struggles-item heading-lg text-cream">
            Modern Life,
            <br />
            <span className="text-gold-400 italic">Ancient Struggles.</span>
          </h2>
          <p className="struggles-item text-cream/55 leading-relaxed font-sans text-sm max-w-md">
            Millions suffer from joint pain and blood sugar imbalance due to
            sedentary lifestyles and processed nutrition. We don&apos;t just
            mask the symptoms — we restore the cure.
          </p>

          {/* Stats row */}
          <div className="struggles-item grid grid-cols-3 gap-4 py-5">
            {[
              { number: '12M+', label: 'People affected' },
              { number: '92%', label: 'Feel relief in 30 days' },
              { number: '4', label: 'Ancient herbs' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="stat-number text-3xl">{s.number}</div>
                <p className="text-cream/45 text-xs font-sans mt-1 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>

          <blockquote className="struggles-item glass-card rounded-xl p-5 border-l-2 border-gold-500">
            <p className="text-cream/75 font-serif italic text-base leading-relaxed">
              &ldquo;Somewhere we lost our health to a balance of story, body,
              and soul — Ashokvati brings it back.&rdquo;
            </p>
          </blockquote>

          <div className="struggles-item flex flex-wrap gap-4 pt-2">
            <a href="#formulas" className="btn-gold text-sm">
              Discover the Solution
            </a>
            <a href="#science" className="btn-outline text-sm">
              The Science
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
