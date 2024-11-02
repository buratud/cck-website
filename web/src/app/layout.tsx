import type { Metadata } from "next";
import { inter, notoSansThai } from '@/app/ui/fonts';
import '@/app/global.css';

export const metadata: Metadata = {
  title: "Computer Club KMUTNB",
  description: "© 2024-2025 Computer Club KMUTNB, All rights reserved.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}  ${notoSansThai.variable}`}>
      <body>{children}</body>
    </html>
  );
}
