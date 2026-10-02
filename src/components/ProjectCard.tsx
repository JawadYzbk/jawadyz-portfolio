'use client';

import { forwardRef, useRef } from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { Project } from '@/data/projects';
import { useLanguage } from '@/context/LanguageContext';

type Props = {
  project: Project;
  /** Lead cards span the full row with the text beside the image. */
  lead?: boolean;
  onOpen: (project: Project, trigger: HTMLButtonElement) => void;
};

export function StackLine({ tags, className = '' }: { tags: string[]; className?: string }) {
  return (
    <p dir="ltr" className={`text-[14px] leading-[1.29] tracking-[-0.016em] text-muted rtl:text-right ${className}`}>
      {tags.join(', ')}
    </p>
  );
}

const ProjectCard = forwardRef<HTMLElement, Props>(function ProjectCard({ project, lead = false, onOpen }, ref) {
  const { t, language } = useLanguage();
  const button = useRef<HTMLButtonElement>(null);
  const { image } = project;
  const open = () => button.current && onOpen(project, button.current);

  return (
    <m.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onClick={open}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-[28px] bg-card ${
        lead ? 'md:col-span-2 lg:flex-row' : ''
      } ${image ? '' : 'pb-16'}`}
    >
      <div className={`p-7 md:p-8 ${lead ? 'lg:flex lg:w-[40%] lg:shrink-0 lg:flex-col lg:justify-center lg:p-12' : ''}`}>
        <p className="text-caption font-semibold text-label">{project.role[language]}</p>
        <h3
          className={`mt-2 font-semibold ${
            lead ? 'text-[28px] leading-[1.1] md:text-[40px]' : 'text-[24px] leading-[1.17] tracking-[0.009em]'
          }`}
        >
          <bdi>{project.title}</bdi>
        </h3>
        <p className={`mt-3 ${lead ? 'text-lead' : 'text-[17px] leading-[1.47]'}`}>{project.summary[language]}</p>
        <StackLine tags={project.tags} className="mt-3" />
      </div>

      {image && (
        <div className={`mt-auto ps-7 md:ps-8 ${lead ? 'lg:mt-12 lg:flex-1 lg:ps-0' : ''}`}>
          <div
            className={`relative overflow-hidden rounded-ss-[14px] border-s border-t border-line ${
              lead ? 'aspect-[16/10] lg:aspect-auto lg:h-[26rem]' : 'aspect-[16/10]'
            } ${image.fit === 'contain' ? 'bg-[#050b0a]' : 'bg-band'}`}
          >
            <Image
              src={image.src}
              alt={image.alt[language]}
              fill
              sizes={lead ? '(min-width: 1024px) 640px, 92vw' : '(min-width: 768px) 520px, 92vw'}
              className={
                image.fit === 'contain'
                  ? 'object-contain px-6'
                  : 'object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.02]'
              }
            />
          </div>
        </div>
      )}

      <button
        ref={button}
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          open();
        }}
        aria-haspopup="dialog"
        aria-label={`${t.projects.story}: ${project.title}`}
        className="absolute end-5 bottom-5 z-10 flex size-9 items-center justify-center rounded-full bg-fg/85 text-canvas backdrop-blur transition-transform duration-300 group-hover:scale-110"
      >
        <Plus className="size-5" strokeWidth={2.25} aria-hidden />
      </button>
    </m.article>
  );
});

export default ProjectCard;
