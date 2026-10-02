'use client';

import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { buttonPrimary, buttonSecondary, container } from './ui';

const step = (i: number) => ({ '--i': i }) as React.CSSProperties;

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" aria-labelledby="hero-title">
      <div
        className={`${container} grid items-center gap-12 pt-12 pb-16 md:pt-16 lg:min-h-[min(calc(100dvh-4rem),46rem)] lg:grid-cols-12 lg:gap-10 lg:py-16`}
      >
        <div className="lg:col-span-7">
          <p className="rise text-sm font-medium text-muted" style={step(0)}>
            {t.hero.welcome}
          </p>
          <h1
            id="hero-title"
            className="rise mt-5 text-[2.6rem] leading-[1.04] font-semibold tracking-[-0.035em] sm:text-6xl xl:text-[4.25rem]"
            style={step(1)}
          >
            <span className="block">{t.hero.line1}</span>
            <span className="block text-muted">{t.hero.line2}</span>
          </h1>
          <p className="rise mt-6 max-w-[34rem] text-lg leading-relaxed text-muted" style={step(2)}>
            {t.hero.description}
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3" style={step(3)}>
            <a href="#projects" className={buttonPrimary}>
              {t.hero.viewWork}
              <ArrowDown className="size-4" strokeWidth={2} aria-hidden />
            </a>
            <a href="#contact" className={buttonSecondary}>
              {t.hero.contact}
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-2xl border border-line bg-[#141414] dark:border-transparent">
            <Image
              src="/images/system-sculpture.webp"
              alt={t.hero.imageAlt}
              width={1400}
              height={933}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1240px) 480px, (min-width: 1024px) 40vw, 100vw"
              className="settle h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
