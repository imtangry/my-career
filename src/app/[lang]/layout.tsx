import type {Metadata} from 'next'

import '@/styles/globals.css'

import {Nunito, Poppins, Space_Mono} from 'next/font/google'
import Script from 'next/script'

import {Lang, locales} from '~/i18n/config'

interface RootLayoutProps {
  children: React.ReactNode
  params: {
    lang: Lang
  }
}

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito'
})

const space_mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-space-mono'
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Daisyz',
  description: 'DEX platform',
  icons: {
    icon: [
      {
        url: '/images/logo.svg',
        href: '/images/logo.svg'
      }
    ]
  }
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default function RootLayout({
  children,
  params: {lang}
}: RootLayoutProps) {
  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${nunito.variable} ${space_mono.variable} ${poppins.variable}`}
    >
      <body className={`${nunito.className}`}>
        {children}

        <Script id='theme-script'>
          {`const item = 'light';
          localStorage.setItem('theme', item);
          document.getElementsByTagName('html')[0].dataset.theme = item;
          document.documentElement.classList.add(item);
          document.documentElement.classList.remove(
            item === 'dark' ? 'light' : 'dark'
          );
          `}
        </Script>
      </body>
    </html>
  )
}
