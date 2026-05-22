import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Journalist Portfolio - Lopez, J.",
  description:
    "Professional portfolio showcasing journalism work, articles, and investigative pieces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  );
}
