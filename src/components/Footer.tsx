'use client';

import { useLanguage } from '@/context/LanguageContext';
import { profile } from '@/data/profile';
import { container } from './ui';

export default function Footer({ year }: { year: number }) {
  const { t, language } = useLanguage();

  const links = [
    { href: '#projects', label: t.nav.projects },
    { href: '#about', label: t.nav.about },
    { href: '#contact', label: t.nav.contact },
    { href: profile.github, label: 'GitHub', external: true },
    { href: profile.linkedin, label: 'LinkedIn', external: true },
  ];

  return (
    <footer className="text-caption bg-band text-muted">
      <div className={`${container} border-t border-line py-5`}>
        <p>{t.footer.signature}</p>
      </div>
      <div className={`${container} flex flex-col gap-3 pb-8 md:flex-row md:items-center md:justify-between`}>
        <p>
          © {year} {language === 'ar' ? profile.nameAr : profile.name}. {t.footer.rights}
        </p>
        <ul className="flex flex-wrap items-center gap-y-2">
          {links.map((link, index) => (
            <li key={link.href} className={index > 0 ? 'border-s border-line ps-2.5 ms-2.5' : ''}>
              <a
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-fg/80 hover:underline"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="ms-2.5 border-s border-line ps-2.5">
            <a href="#top" className="text-fg/80 hover:underline">
              {t.footer.top}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
