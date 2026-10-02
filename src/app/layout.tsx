import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import { IBM_Plex_Sans_Arabic, Inter } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import { profile, siteUrl } from '@/data/profile';
import { LANGUAGE_COOKIE, THEME_COOKIE, parseLanguage, parseTheme } from '@/lib/preferences';
import './globals.css';

// Apple devices render the system SF Pro; Inter is the fallback elsewhere.
const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });
// Arabic is not needed for the first English paint, so it loads on demand.
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: '--font-ibm-plex-arabic',
  subsets: ['arabic'],
  weight: ['400', '500', '600'],
  preload: false,
});

const title = 'Jawad Yazbek | Full-stack developer';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: profile.description,
  applicationName: 'Jawad.dev',
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: ['Jawad Yazbek', 'full-stack developer', 'Laravel', 'React', 'Next.js', 'TypeScript', 'Lebanon'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: 'Jawad.dev',
    title,
    description: profile.description,
    locale: 'en_US',
    alternateLocale: ['ar_LB'],
    firstName: 'Jawad',
    lastName: 'Yazbek',
  },
  twitter: { card: 'summary_large_image', title, description: profile.description },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  alternateName: profile.nameAr,
  jobTitle: profile.role,
  description: profile.description,
  url: siteUrl,
  image: `${siteUrl}/profile.jpg`,
  email: `mailto:${profile.email}`,
  address: { '@type': 'PostalAddress', addressCountry: 'LB' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Lebanese International University' },
  knowsAbout: ['Laravel', 'React', 'Next.js', 'TypeScript', 'PHP', 'C#', '.NET', 'Python'],
  sameAs: [profile.github, profile.linkedin],
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const store = await cookies();
  const language = parseLanguage(store.get(LANGUAGE_COOKIE)?.value);
  const theme = parseTheme(store.get(THEME_COOKIE)?.value);

  return (
    <html
      lang={language}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      data-theme={theme}
      className={`${inter.variable} ${plexArabic.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
        />
        <LanguageProvider initialLanguage={language}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
