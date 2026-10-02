'use client';

import Image from 'next/image';
import { ArrowUpRight, Lock, X } from 'lucide-react';
import type { Project } from '@/data/projects';
import { useLanguage } from '@/context/LanguageContext';
import { StackLine } from './ProjectCard';
import { buttonOutline, buttonPrimary } from './ui';

type Props = {
  project: Project | null;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  onClose: () => void;
};

/** Native modal dialog: Escape, focus trapping and the top layer come from the browser. */
export default function ProjectDialog({ project, dialogRef, onClose }: Props) {
  const { t, language } = useLanguage();
  const image = project?.image;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      className="project-dialog m-auto max-h-[calc(100dvh-2rem)] w-[min(calc(100%-1.5rem),52rem)] overflow-y-auto overscroll-contain rounded-[28px] bg-card p-0 text-fg"
    >
      {project && (
        <div className="relative px-6 pt-14 pb-10 sm:px-12 sm:pt-16 sm:pb-12">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label={t.projects.close}
            className="absolute end-4 top-4 flex size-9 items-center justify-center rounded-full bg-control text-fg/80 transition-colors hover:text-fg"
          >
            <X className="size-5" strokeWidth={2} aria-hidden />
          </button>

          <p className="text-caption font-semibold text-label">{project.role[language]}</p>
          <h2 id="project-dialog-title" className="mt-2 text-[32px] leading-[1.1] font-semibold sm:text-[40px]">
            <bdi>{project.title}</bdi>
          </h2>
          <p className="text-lead mt-4">{project.summary[language]}</p>

          {image && (
            <div
              className={`relative mt-8 aspect-[16/9] overflow-hidden rounded-[14px] border border-line ${
                image.fit === 'contain' ? 'bg-[#050b0a]' : 'bg-band'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt[language]}
                fill
                sizes="(min-width: 840px) 736px, 92vw"
                className={image.fit === 'contain' ? 'object-contain px-8' : 'object-cover object-left-top'}
              />
            </div>
          )}

          <dl className="mt-10 grid gap-x-10 gap-y-2 border-t border-line pt-8 sm:grid-cols-[9rem_1fr] sm:gap-y-7">
            <dt className="text-[14px] font-semibold">{t.projects.built}</dt>
            <dd className="mb-5 text-[17px] leading-[1.47] sm:mb-0">{project.details[language]}</dd>

            <dt className="text-[14px] font-semibold">{t.projects.stack}</dt>
            <dd className="mb-5 sm:mb-0">
              <StackLine tags={project.tags} className="text-[17px]! leading-[1.47]! text-fg!" />
            </dd>

            <dt className="text-[14px] font-semibold">{t.projects.links}</dt>
            <dd className="flex flex-col items-start gap-4">
              {(project.live || project.repo) && (
                <div className="flex flex-wrap gap-3">
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className={buttonPrimary}>
                      {t.projects.live}
                      <ArrowUpRight className="size-4 rtl:-scale-x-100" strokeWidth={2} aria-hidden />
                    </a>
                  )}
                  {project.repo && (
                    <a href={project.repo} target="_blank" rel="noopener noreferrer" className={buttonOutline}>
                      {t.projects.source}
                      <ArrowUpRight className="size-4 rtl:-scale-x-100" strokeWidth={2} aria-hidden />
                    </a>
                  )}
                </div>
              )}
              {!project.live && (
                <p className="inline-flex items-center gap-2 text-[14px] text-muted">
                  <Lock className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
                  {t.projects.private}
                </p>
              )}
            </dd>
          </dl>
        </div>
      )}
    </dialog>
  );
}
