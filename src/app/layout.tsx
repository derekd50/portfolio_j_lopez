import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Journalist Portfolio - Lopez, J.",
  description:
    "Professional portfolio showcasing journalism work and articles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
