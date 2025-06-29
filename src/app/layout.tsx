import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shota Yamashita - Full-Stack AI Engineer",
  description: "Portfolio site of Shota Yamashita, Full-Stack AI Engineer and founder of Ghoona Inc.",
};

const themeScript = `
  (function() {
    try {
      const theme = localStorage.getItem('theme') || 'system';
      const resolved = theme === 'system' ? 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : 
        theme;
      document.documentElement.setAttribute('data-theme', resolved);
      document.documentElement.style.colorScheme = resolved;
    } catch (e) {
      // Fallback for any localStorage errors
      document.documentElement.setAttribute('data-theme', 'light');
    }
  })();
`;

const languageScript = `
  (function() {
    try {
      const getSystemLanguage = () => {
        const browserLang = navigator.language.toLowerCase();
        return browserLang.startsWith('ja') ? 'ja' : 'en';
      };
      
      const savedLanguage = localStorage.getItem('language') || getSystemLanguage();
      document.documentElement.lang = savedLanguage;
    } catch (e) {
      // Fallback for any localStorage errors
      document.documentElement.lang = 'en';
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <script
          dangerouslySetInnerHTML={{ __html: languageScript }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
