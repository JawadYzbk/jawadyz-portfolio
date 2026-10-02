'use client';

import Image from 'next/image';
import { ArrowUpRight, Code2, Lock, X } from 'lucide-react';
import type { Project } from '@/data/projects';
import { useLanguage } from '@/context/LanguageContext';
import { TagList } from './ProjectCard';
import { buttonPrimary, buttonSecondary, iconButton } from './ui';

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
      className="project-dialog m-auto max-h-[calc(100dvh-2rem)] w-[min(calc(100%-2rem),46rem)] overflow-y-auto overscroll-contain rounded-2xl border border-line bg-surface p-0 text-fg shadow-card"
    >
      {project && (
        <div>
          <div className="sticky top-0 z-10 flex justify-end p-3">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label={t.projects.close}
              className={`${iconButton} bg-surface/90 backdrop-blur`}
            >
              <X className="size-5" strokeWidth={1.75} aria-hidden />
            </button>
          </div>

          {image && (
            <div
              className={`relative -mt-16 aspect-[16/9] overflow-hidden border-b border-line ${
                image.fit === 'contain' ? 'banner-plate' : 'bg-surface-2'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt[language]}
                fill
                sizes="(min-width: 768px) 736px, 100vw"
                className={image.fit === 'contain' ? 'object-contain px-8' : 'object-cover object-top'}
              />
            </div>
          )}

          <div className={`px-6 pb-8 sm:px-10 sm:pb-10 ${image ? 'pt-8' : 'pt-0'}`}>
            <h2 id="project-dialog-title" className="text-3xl font-semibold tracking-tight">
              <bdi>{project.title}</bdi>
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">{project.summary[language]}</p>

            <dl className="mt-8 grid gap-7 border-t border-line pt-8 sm:grid-cols-[10rem_1fr] sm:gap-x-8">
              <dt className="text-sm font-medium text-subtle">{t.projects.role}</dt>
              <dd className="-mt-5 font-medium text-accent sm:mt-0">{project.role[language]}</dd>

              <dt className="text-sm font-medium text-subtle">{t.projects.built}</dt>
              <dd className="-mt-5 leading-relaxed sm:mt-0">{project.details[language]}</dd>

              <dt className="text-sm font-medium text-subtle">{t.projects.stack}</dt>
              <dd className="-mt-5 sm:mt-0">
                <TagList tags={project.tags} />
              </dd>

              <dt className="text-sm font-medium text-subtle">{t.projects.links}</dt>
              <dd className="-mt-5 flex flex-col items-start gap-4 sm:mt-0">
                {(project.live || project.repo) && (
                  <div className="flex flex-wrap gap-3">
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className={buttonPrimary}>
                        {t.projects.live}
                        <ArrowUpRight className="size-4 rtl:-scale-x-100" strokeWidth={2} aria-hidden />
                      </a>
                    )}
                    {project.repo && (
                      <a href={project.repo} target="_blank" rel="noopener noreferrer" className={buttonSecondary}>
                        <Code2 className="size-4" strokeWidth={2} aria-hidden />
                        {t.projects.source}
                      </a>
                    )}
                  </div>
                )}
                {!project.live && (
                  <p className="inline-flex items-center gap-2 text-sm text-muted">
                    <Lock className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
                    {t.projects.private}
                  </p>
                )}
              </dd>
            </dl>
          </div>
        </div>
      )}
    </dialog>
  );
}
