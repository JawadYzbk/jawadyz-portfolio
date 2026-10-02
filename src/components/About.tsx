'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import { GraduationCap, Laptop } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { container } from './ui';

export default function About() {
  const { t } = useLanguage();

  const capabilities = [
    { label: t.about.frontend, stack: t.about.frontendDesc },
    { label: t.about.backend, stack: t.about.backendDesc },
    { label: t.about.desktop, stack: t.about.desktopDesc },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line bg-surface py-20 md:py-28">
      <div className={`${container} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
        <div className="reveal lg:col-span-5 xl:col-span-4">
          <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-2xl border border-line bg-surface-2 lg:mx-0 lg:max-w-none">
            <Image
              src="/profile.jpg"
              alt={t.about.portraitAlt}
              fill
              sizes="(min-width: 1024px) 400px, 384px"
              className="object-cover object-[50%_35%]"
            />
          </div>
        </div>

        <div className="lg:col-span-7 xl:col-span-8">
          <div className="reveal max-w-2xl">
            <h2 id="about-title" className="text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl">
              {t.about.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-fg">{t.about.p1}</p>
            <p className="mt-4 text-lg leading-relaxed text-muted">{t.about.p2}</p>
          </div>

          <dl className="reveal mt-10 grid gap-6 sm:grid-cols-2">
            <div className="relative min-h-10 ps-14">
              <dt className="text-sm text-subtle">
                <span className="absolute start-0 top-0 flex size-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <GraduationCap className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                {t.about.educationLabel}
              </dt>
              <dd className="mt-1 font-medium">{t.about.education}</dd>
              <dd className="text-muted">{t.about.school}</dd>
            </div>
            <div className="relative min-h-10 ps-14">
              <dt className="text-sm text-subtle">
                <span className="absolute start-0 top-0 flex size-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Laptop className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                {t.about.availabilityLabel}
              </dt>
              <dd className="mt-1 font-medium">{t.about.availability}</dd>
            </div>
          </dl>

          <div className="reveal mt-12">
            <h3 className="text-sm font-medium text-subtle">{t.about.capabilities}</h3>
            <dl className="mt-4 divide-y divide-line border-y border-line">
              {capabilities.map((item) => (
                <div key={item.label} className="grid gap-1 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <dt className="font-semibold">{item.label}</dt>
                  <dd dir="ltr" className="font-mono text-sm leading-relaxed text-muted rtl:text-right">
                    {item.stack.split(' · ').map((tech, index) => (
                      <Fragment key={tech}>
                        {index > 0 && ' · '}
                        <span className="whitespace-nowrap">{tech}</span>
                      </Fragment>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
