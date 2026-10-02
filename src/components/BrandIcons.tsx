import { Github, Linkedin, type LucideProps } from 'lucide-react';

// Lucide marks brand glyphs as deprecated ahead of its 1.0 release; they still ship
// in the pinned 0.x version. Swap these two wrappers if lucide-react is upgraded.
export function GithubIcon(props: LucideProps) {
  return <Github strokeWidth={1.75} aria-hidden {...props} />;
}

export function LinkedinIcon(props: LucideProps) {
  return <Linkedin strokeWidth={1.75} aria-hidden {...props} />;
}
