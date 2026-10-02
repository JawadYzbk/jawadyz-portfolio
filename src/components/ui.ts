/** Shared layout and control classes, so every section uses the same rhythm. */
export const container = 'mx-auto w-full max-w-[1120px] px-5 sm:px-8';

/** Full-width section rhythm: 90px between storytelling sections on desktop. */
export const section = 'py-20 md:py-[90px]';

/** Filled conversion pill. */
export const buttonPrimary =
  'inline-flex h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-action px-[22px] text-[17px] font-normal text-action-fg transition-[transform,filter] duration-200 hover:brightness-110 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50';

/** Outlined explore pill. */
export const buttonOutline =
  'inline-flex h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-steel px-[22px] text-[17px] text-fg transition-[transform,background-color] duration-200 hover:bg-band active:scale-[0.98]';

/** Inline blue text link with a trailing chevron. */
export const textLink =
  'group inline-flex items-center gap-0.5 text-link hover:underline underline-offset-4 decoration-1';

export const iconButton =
  'inline-flex size-9 items-center justify-center rounded-full text-fg/80 transition-colors duration-200 hover:bg-control hover:text-fg';
