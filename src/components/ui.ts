/** Shared layout and control classes, so every section uses the same rhythm. */
export const container = 'mx-auto w-full max-w-[1240px] px-5 sm:px-8';

export const buttonPrimary =
  'inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-5 text-sm font-semibold text-accent-fg transition-[transform,filter] duration-200 hover:brightness-110 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60';

export const buttonSecondary =
  'inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface px-5 text-sm font-semibold text-fg transition-[transform,border-color,background-color] duration-200 hover:border-subtle active:scale-[0.98]';

export const iconButton =
  'inline-flex size-10 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-surface-2 hover:text-fg';
