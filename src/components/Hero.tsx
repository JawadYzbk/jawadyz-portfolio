'use client';

import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { buttonPrimary, container, textLink } from './ui';

const step = (i: number) => ({ '--i': i }) as React.CSSProperties;

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" aria-labelledby="hero-title" className="pt-14 pb-20 md:pt-20 md:pb-[90px]">
      <div className={`${container} text-center`}>
        <p className="rise text-[19px] leading-[1.21] font-semibold tracking-[0.012em] md:text-[21px]" style={step(0)}>
          {t.hero.welcome}
        </p>
        <h1 id="hero-title" className="rise text-hero mt-4 text-balance" style={step(1)}>
          <span className="block">{t.hero.line1}</span>
          <span className="block">{t.hero.line2}</span>
        </h1>
        <p className="rise text-lead mx-auto mt-6 max-w-[36rem] text-balance" style={step(2)}>
          {t.hero.description}
        </p>
        <div className="rise mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-4" style={step(3)}>
          <a href="#projects" className={buttonPrimary}>
            {t.hero.viewWork}
          </a>
          <a href="#contact" className={`${textLink} text-[17px]`}>
            {t.hero.contact}
            <ChevronRight className="size-4 rtl:-scale-x-100" strokeWidth={2} aria-hidden />
          </a>
        </div>
      </div>

      <div className={`${container} mt-12 md:mt-16`}>
        <div className="relative mx-auto max-w-[980px]">
          <div className="overflow-hidden rounded-[28px] bg-[#141414]">
            <Image
              src="/images/system-sculpture.webp"
              alt={t.hero.imageAlt}
              width={1400}
              height={933}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1120px) 980px, 92vw"
              className="h-auto w-full"
            />
          </div>
          <div className="mx-auto mt-5 w-fit max-w-full rounded-[28px] bg-band px-6 py-3.5 text-center md:absolute md:inset-x-0 md:bottom-6 md:mt-0 md:max-w-[calc(100%-3rem)] md:bg-card">
            <p className="text-caption font-semibold text-label">{t.hero.available}</p>
            <p className="mt-0.5 text-[14px] leading-[1.29] font-semibold tracking-[-0.016em]">{t.about.availability}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
