'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { THEME_COOKIE, savePreference } from '@/lib/preferences';
import { profile } from '@/data/profile';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { container, iconButton } from './ui';

function toggleTheme() {
  const root = document.documentElement;
  const current =
    root.dataset.theme ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
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
    { href: '#contact', label: t.nav.contact },
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

  const languageButton = (
    <button
      type="button"
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className="inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-semibold text-muted transition-colors duration-200 hover:bg-surface-2 hover:text-fg"
    >
      <span lang={language === 'en' ? 'ar' : 'en'}>{t.nav.languageShort}</span>
      <span className="sr-only"> {t.nav.language}</span>
    </button>
  );

  const themeButton = (
    <button type="button" onClick={toggleTheme} aria-label={t.nav.theme} className={iconButton}>
      <Moon className="size-[18px] dark:hidden" strokeWidth={1.75} aria-hidden />
      <Sun className="hidden size-[18px] dark:block" strokeWidth={1.75} aria-hidden />
    </button>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <a
        href="#content"
        className="absolute start-4 top-3 z-50 -translate-y-20 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-fg focus:translate-y-0"
      >
        {t.nav.skip}
      </a>
      <div className={`${container} flex h-16 items-center justify-between gap-6`}>
        <a href="#top" className="text-[17px] font-semibold tracking-tight text-fg" dir="ltr">
          Jawad<span className="text-accent">.dev</span>
        </a>

        <nav aria-label={t.nav.main} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 md:flex">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label={t.nav.github} className={iconButton}>
              <GithubIcon className="size-[18px]" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label={t.nav.linkedin} className={iconButton}>
              <LinkedinIcon className="size-[18px]" />
            </a>
            <span className="mx-1 h-5 w-px bg-line" aria-hidden />
          </div>
          {languageButton}
          {themeButton}
          <button
            ref={menuButton}
            type="button"
            className={`${iconButton} md:hidden`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" strokeWidth={1.75} aria-hidden /> : <Menu className="size-5" strokeWidth={1.75} aria-hidden />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label={t.nav.main}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-bg md:hidden"
      >
        <ul className={`${container} flex flex-col py-3`}>
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-2xl font-semibold tracking-tight text-fg"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2 flex gap-2 border-t border-line pt-4">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label={t.nav.github} className={iconButton}>
              <GithubIcon className="size-5" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label={t.nav.linkedin} className={iconButton}>
              <LinkedinIcon className="size-5" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
