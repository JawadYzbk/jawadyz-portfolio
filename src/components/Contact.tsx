'use client';

import { ArrowUpRight, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { profile } from '@/data/profile';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import ContactForm from './ContactForm';
import { container } from './ui';

export default function Contact() {
  const { t } = useLanguage();

  const elsewhere = [
    { href: profile.github, label: 'GitHub', handle: 'JawadYzbk', Icon: GithubIcon },
    { href: profile.linkedin, label: 'LinkedIn', handle: 'jawad-yazbek2k', Icon: LinkedinIcon },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-20 md:py-28">
      <div className={`${container} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
        <div className="reveal lg:col-span-5">
          <h2 id="contact-title" className="text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl">
            {t.contact.title}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{t.contact.description}</p>

          <div className="mt-10">
            <p className="text-sm text-subtle">{t.contact.emailLabel}</p>
            <a
              href={`mailto:${profile.email}`}
              dir="ltr"
              className="group mt-2 inline-flex items-center gap-3 text-xl font-semibold break-all text-fg transition-colors hover:text-accent sm:text-2xl"
            >
              <Mail className="size-5 shrink-0 text-accent" strokeWidth={1.75} aria-hidden />
              {profile.email}
            </a>
          </div>

          <ul className="mt-8 grid gap-3">
            {elsewhere.map(({ href, label, handle, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-muted transition-colors hover:text-fg"
                >
                  <Icon className="size-[18px]" />
                  <span className="font-medium text-fg">{label}</span>
                  <span dir="ltr" className="font-mono text-sm">
                    {handle}
                  </span>
                  <ArrowUpRight
                    className="size-4 opacity-60 transition-transform duration-300 group-hover:-translate-y-0.5 rtl:-scale-x-100"
                    strokeWidth={2}
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
