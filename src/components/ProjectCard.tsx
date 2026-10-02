'use client';

import { forwardRef } from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import { ArrowUpRight, Code2, Globe } from 'lucide-react';
import type { Project } from '@/data/projects';
import { useLanguage } from '@/context/LanguageContext';
import { iconButton } from './ui';

type Props = {
  project: Project;
  /** Lead cards span the full row with the image beside the text. */
  lead?: boolean;
  onOpen: (project: Project, trigger: HTMLButtonElement) => void;
};

export function TagList({ tags, className = '' }: { tags: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {tags.map((tag) => (
        <li
          key={tag}
          dir="ltr"
          className="rounded-full border border-line px-2.5 py-1 font-mono text-[11.5px] leading-none text-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

const ProjectCard = forwardRef<HTMLElement, Props>(function ProjectCard({ project, lead = false, onOpen }, ref) {
  const { t, language } = useLanguage();
  const { image } = project;

  return (
    <m.article
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-subtle hover:shadow-card ${
        lead ? 'md:col-span-2 lg:flex-row' : ''
      }`}
    >
      {image && (
        <div
          className={`relative aspect-[16/10] shrink-0 overflow-hidden border-b border-line ${
            lead ? 'lg:aspect-auto lg:min-h-[26rem] lg:w-[58%] lg:border-e lg:border-b-0' : ''
          } ${image.fit === 'contain' ? 'banner-plate' : 'bg-surface-2'}`}
        >
          <Image
            src={image.src}
            alt={image.alt[language]}
            fill
            sizes={lead ? '(min-width: 1024px) 700px, (min-width: 768px) 90vw, 100vw' : '(min-width: 768px) 600px, 100vw'}
            className={
              image.fit === 'contain'
                ? 'object-contain px-6'
                : 'object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]'
            }
          />
        </div>
      )}

      <div className={`flex flex-1 flex-col p-6 ${lead ? 'lg:justify-center lg:p-10' : ''}`}>
        <p className="text-sm font-medium text-accent">{project.role[language]}</p>
        <h3 className={`mt-2 font-semibold tracking-tight ${lead ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
          <bdi>{project.title}</bdi>
        </h3>
        <p className={`mt-2 leading-relaxed text-muted ${lead ? 'lg:text-lg' : ''}`}>{project.summary[language]}</p>
        <TagList tags={project.tags} className="mt-5" />

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <button
            type="button"
            onClick={(event) => onOpen(project, event.currentTarget)}
            aria-haspopup="dialog"
            className="inline-flex items-center gap-1.5 rounded-full text-sm font-semibold text-fg after:absolute after:inset-0 after:rounded-2xl after:content-['']"
          >
            {t.projects.story}
            <span className="sr-only">: {project.title}</span>
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
              strokeWidth={2}
              aria-hidden
            />
          </button>
          <div className="relative z-10 flex gap-1">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.projects.source}: ${project.title}`}
                title={t.projects.source}
                className={iconButton}
              >
                <Code2 className="size-[18px]" strokeWidth={1.75} aria-hidden />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.projects.live}: ${project.title}`}
                title={t.projects.live}
                className={iconButton}
              >
                <Globe className="size-[18px]" strokeWidth={1.75} aria-hidden />
              </a>
            )}
          </div>
        </div>
      </div>
    </m.article>
  );
});

export default ProjectCard;
