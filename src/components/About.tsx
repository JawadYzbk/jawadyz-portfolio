'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import { GraduationCap, Laptop } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { container, section } from './ui';

export default function About() {
  const { t } = useLanguage();

  const capabilities = [
    { label: t.about.frontend, stack: t.about.frontendDesc },
    { label: t.about.backend, stack: t.about.backendDesc },
    { label: t.about.desktop, stack: t.about.desktopDesc },
  ];

  const facts = [
    { Icon: GraduationCap, label: t.about.educationLabel, value: t.about.education, detail: t.about.school },
    { Icon: Laptop, label: t.about.availabilityLabel, value: t.about.availability },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className={section}>
      <div className={`${container} grid items-start gap-12 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-7">
          <div className="reveal max-w-[40rem]">
            <p className="text-[19px] leading-[1.21] font-semibold tracking-[0.012em] md:text-[21px]">{t.nav.about}</p>
            <h2 id="about-title" className="text-section mt-3 text-balance">
              {t.about.title}
            </h2>
            <p className="text-lead mt-6">{t.about.p1}</p>
            <p className="text-lead mt-4 text-muted">{t.about.p2}</p>
          </div>

          <dl className="reveal mt-12 grid gap-8 sm:grid-cols-2">
            {facts.map(({ Icon, label, value, detail }) => (
              <div key={label}>
                <dt className="text-[14px] text-muted">
                  <Icon className="mb-3 size-7 text-fg" strokeWidth={1.5} aria-hidden />
                  {label}
                </dt>
                <dd className="mt-1 text-[17px] leading-[1.47] font-semibold">{value}</dd>
                {detail && <dd className="text-[17px] leading-[1.47] text-muted">{detail}</dd>}
              </div>
            ))}
          </dl>
        </div>

        <div className="reveal lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[28px] bg-band lg:max-w-none">
            <Image
              src="/profile.jpg"
              alt={t.about.portraitAlt}
              fill
              sizes="(min-width: 1024px) 440px, 448px"
              className="object-cover object-[50%_35%]"
            />
          </div>
        </div>

        <div className="reveal lg:col-span-12">
          <h3 className="text-[24px] leading-[1.17] font-semibold">{t.about.capabilities}</h3>
          <dl className="mt-4 divide-y divide-line border-t border-line">
            {capabilities.map((item) => (
              <div key={item.label} className="grid gap-1 py-5 md:grid-cols-12 md:gap-8">
                <dt className="text-[17px] leading-[1.47] font-semibold md:col-span-4">{item.label}</dt>
                <dd dir="ltr" className="text-[17px] leading-[1.47] text-muted md:col-span-8 rtl:text-right">
                  {item.stack.split(' · ').map((tech, index) => (
                    <Fragment key={tech}>
                      {index > 0 && ', '}
                      <span className="whitespace-nowrap">{tech}</span>
                    </Fragment>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
