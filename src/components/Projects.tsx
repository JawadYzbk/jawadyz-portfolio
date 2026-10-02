'use client';

import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { categories, projects, type Category, type Project } from '@/data/projects';
import { format, useLanguage } from '@/context/LanguageContext';
import ProjectCard from './ProjectCard';
import ProjectDialog from './ProjectDialog';
import { buttonSecondary, container } from './ui';

type Filter = 'all' | Category;

const filters: Filter[] = ['all', ...categories];
const countFor = (filter: Filter) =>
  filter === 'all' ? projects.length : projects.filter((project) => project.category === filter).length;

export default function Projects() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>('all');
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const matching = filter === 'all' ? projects : projects.filter((project) => project.category === filter);
  const visible = filter === 'all' && !expanded ? matching.filter((project) => project.featured) : matching;
  const withImages = visible.filter((project) => project.image);
  const withoutImages = visible.filter((project) => !project.image);

  const openProject = (project: Project, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setSelected(project);
    dialogRef.current?.showModal();
  };

  const toggleExpanded = () => {
    setExpanded((value) => !value);
    // Collapsing removes cards above the toggle; keep it under the pointer.
    if (expanded) requestAnimationFrame(() => toggleRef.current?.scrollIntoView({ block: 'center' }));
  };

  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t border-line py-20 md:py-28">
      <div className={container}>
        <div className="reveal max-w-2xl">
          <h2 id="projects-title" className="text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl">
            {t.projects.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{t.projects.subtitle}</p>
        </div>

        <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div
            role="group"
            aria-label={t.projects.filterLabel}
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {filters.map((value) => {
              const active = filter === value;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(value)}
                  className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200 ${
                    active
                      ? 'border-fg bg-fg text-bg'
                      : 'border-line bg-surface text-muted hover:border-subtle hover:text-fg'
                  }`}
                >
                  {t.projects[value]}
                  <span className={`font-mono text-xs ${active ? 'text-bg/70' : 'text-subtle'}`}>{countFor(value)}</span>
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="shrink-0 text-sm text-subtle">
            {format(t.projects.showing, { shown: visible.length, total: projects.length })}
          </p>
        </div>

        <div id="project-list" className="mt-8">
          {visible.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-line px-6 py-16 text-center text-muted">
              {t.projects.empty}
            </p>
          ) : (
            <>
              {withImages.length > 0 && (
                <div className="grid gap-5 md:grid-cols-2">
                  <AnimatePresence initial={false} mode="popLayout">
                    {withImages.map((project, index) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        lead={index === 0 && withImages.length % 2 === 1}
                        onOpen={openProject}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
              {withoutImages.length > 0 && (
                <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${withImages.length > 0 ? 'mt-5' : ''}`}>
                  <AnimatePresence initial={false} mode="popLayout">
                    {withoutImages.map((project) => (
                      <ProjectCard key={project.id} project={project} onOpen={openProject} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </>
          )}
        </div>

        {filter === 'all' && (
          <div className="mt-10 flex justify-center">
            <button
              ref={toggleRef}
              type="button"
              onClick={toggleExpanded}
              aria-expanded={expanded}
              aria-controls="project-list"
              className={buttonSecondary}
            >
              {expanded ? (
                <Minus className="size-4" strokeWidth={2} aria-hidden />
              ) : (
                <Plus className="size-4" strokeWidth={2} aria-hidden />
              )}
              {expanded ? t.projects.less : format(t.projects.more, { count: projects.length })}
            </button>
          </div>
        )}
      </div>

      <ProjectDialog
        project={selected}
        dialogRef={dialogRef}
        onClose={() => triggerRef.current?.focus({ preventScroll: true })}
      />
    </section>
  );
}
