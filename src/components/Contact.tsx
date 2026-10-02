'use client';

import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { profile } from '@/data/profile';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import ContactForm from './ContactForm';
import { container, section, textLink } from './ui';

export default function Contact() {
  const { t } = useLanguage();

  const elsewhere = [
    { href: profile.github, label: 'GitHub', Icon: GithubIcon },
    { href: profile.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className={`bg-band ${section}`}>
      <div className={container}>
        <h2 id="contact-title" className="reveal text-section max-w-[48rem] text-balance">
          {t.contact.title}
        </h2>
      </div>
      <div className={`${container} mt-10 grid gap-12 lg:mt-12 lg:grid-cols-12 lg:gap-16`}>
        <div className="reveal lg:col-span-5">
          <p className="text-lead max-w-md text-muted">{t.contact.description}</p>

          <div className="mt-10">
            <p className="text-[14px] text-muted">{t.contact.emailLabel}</p>
            <a
              href={`mailto:${profile.email}`}
              dir="ltr"
              className="mt-1 inline-block text-[21px] leading-[1.38] font-semibold break-all text-link hover:underline md:text-[24px]"
            >
              {profile.email}
            </a>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
            {elsewhere.map(({ href, label, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className={`${textLink} text-[17px]`}>
                  <Icon className="me-1.5 size-4" />
                  {label}
                  <ChevronRight className="size-4 rtl:-scale-x-100" strokeWidth={2} aria-hidden />
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
