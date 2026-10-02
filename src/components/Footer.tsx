'use client';

import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { profile } from '@/data/profile';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { container, iconButton } from './ui';

export default function Footer({ year }: { year: number }) {
  const { t, language } = useLanguage();

  return (
    <footer className="border-t border-line py-10">
      <div className={`${container} flex flex-col gap-8 md:flex-row md:items-end md:justify-between`}>
        <div>
          <p className="text-[17px] font-semibold tracking-tight" dir="ltr">
            Jawad<span className="text-accent">.dev</span>
          </p>
          <p className="mt-2 text-sm text-muted">{t.footer.signature}</p>
          <p className="mt-6 text-sm text-subtle">
            © {year} {language === 'ar' ? profile.nameAr : profile.name}. {t.footer.rights}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label={t.nav.github} className={iconButton}>
            <GithubIcon className="size-[18px]" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label={t.nav.linkedin} className={iconButton}>
            <LinkedinIcon className="size-[18px]" />
          </a>
          <a
            href="#top"
            className="ms-2 inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium text-muted transition-colors hover:border-subtle hover:text-fg"
          >
            {t.footer.top}
            <ArrowUp className="size-4" strokeWidth={2} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
