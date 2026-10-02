'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Moon, Sun } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { THEME_COOKIE, savePreference } from '@/lib/preferences';
import { profile } from '@/data/profile';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { container, iconButton } from './ui';

function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  savePreference(THEME_COOKIE, next);
}

export default function SiteHeader() {
  const { t, language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  const links = [
    { href: '#projects', label: t.nav.projects },
    { href: '#about', label: t.nav.about },
  ];

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      <a
        href="#content"
        className="fixed start-4 top-2 z-50 -translate-y-20 rounded-full bg-action px-4 py-2 text-sm text-action-fg focus:translate-y-0"
      >
        {t.nav.skip}
      </a>

      {/* Global bar: identity and utilities. */}
      <div className="bg-canvas">
        <div className={`${container} flex h-11 items-center justify-between`}>
          <a href="#top" dir="ltr" className="text-[15px] font-semibold tracking-[-0.01em] text-fg">
            Jawad.dev
          </a>
          <div className="flex items-center gap-0.5">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label={t.nav.github} className={iconButton}>
              <GithubIcon className="size-4" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label={t.nav.linkedin} className={iconButton}>
              <LinkedinIcon className="size-4" />
            </a>
            <button
              type="button"
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="text-caption inline-flex h-9 min-w-9 items-center justify-center rounded-full px-2.5 text-fg/80 transition-colors duration-200 hover:bg-control hover:text-fg"
            >
              <span lang={language === 'en' ? 'ar' : 'en'}>{t.nav.languageShort}</span>
              <span className="sr-only"> {t.nav.language}</span>
            </button>
            <button type="button" onClick={toggleTheme} aria-label={t.nav.theme} className={iconButton}>
              <Moon className="size-4 dark:hidden" strokeWidth={1.75} aria-hidden />
              <Sun className="hidden size-4 dark:block" strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {/* Local bar: sticky section navigation. */}
      <header className="sticky top-0 z-40 border-b border-line bg-frost backdrop-blur-[20px] backdrop-saturate-[1.8]">
        <div className={`${container} flex h-[52px] items-center justify-between gap-6`}>
          <p className="text-[19px] leading-[1.21] font-semibold tracking-[0.012em]">
            {language === 'ar' ? profile.nameAr : profile.name}
          </p>

          <div className="flex items-center gap-5">
            <nav aria-label={t.nav.main} className="hidden md:block">
              <ul className="flex items-center gap-6">
                {links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-caption text-fg/80 transition-colors hover:text-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <button
              ref={menuButton}
              type="button"
              className="text-caption inline-flex h-8 items-center gap-1 rounded-full px-2 text-fg/80 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? t.nav.close : t.nav.menu}
              onClick={() => setOpen((value) => !value)}
            >
              <ChevronDown
                className={`size-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                strokeWidth={1.75}
                aria-hidden
              />
            </button>
            <a
              href="#contact"
              className="text-caption inline-flex h-7 items-center rounded-full bg-action px-3 text-action-fg transition-[filter] hover:brightness-110"
            >
              {t.nav.contact}
            </a>
          </div>
        </div>

        <nav
          id="mobile-nav"
          aria-label={t.nav.main}
          hidden={!open}
          className="absolute inset-x-0 top-full border-b border-line bg-frost backdrop-blur-[20px] md:hidden"
        >
          <ul className={`${container} flex flex-col py-2`}>
            {[...links, { href: '#contact', label: t.nav.contact }].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[17px] leading-[1.47] text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
