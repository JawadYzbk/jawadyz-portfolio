export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';

export const LANGUAGE_COOKIE = 'lang';
export const THEME_COOKIE = 'theme';

const ONE_YEAR = 60 * 60 * 24 * 365;

export const parseLanguage = (value: string | undefined): Language => (value === 'ar' ? 'ar' : 'en');

export const parseTheme = (value: string | undefined): Theme | undefined =>
  value === 'light' || value === 'dark' ? value : undefined;

/** Client-only: persist a preference so the server renders it on the next request. */
export function savePreference(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
}
