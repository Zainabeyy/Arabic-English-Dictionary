import type { Metadata } from "next";
import { Inter, Scheherazade_New, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { DarkModeProviders } from "@/components/DarkModeProviders";
import { AuthProvider } from "./lib/auth/AuthProvider";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const scheherazadeNew = Scheherazade_New({
  subsets: ["arabic"],
  variable: "--font-arabic-traditional",
  weight: "400",
});

const notoSans = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-sans",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Arabic Dictionary",
  description:
    "Translate between English and Arabic with meanings and word roots. Learn accurate definitions and explore Arabic word origins easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${interSans.variable} ${scheherazadeNew.variable} ${notoSans.variable} antialiased`}
      >
        <DarkModeProviders>
          <AuthProvider>{children}</AuthProvider>
        </DarkModeProviders>
      </body>
    </html>
  );
}
