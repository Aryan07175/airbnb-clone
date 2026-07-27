import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://Aryan07175.github.io/airbnb-clone"),
  title: {
    default: "Airbnb Clone Docs — Full-Stack Next.js + FastAPI",
    template: "%s | Airbnb Clone Docs",
  },
  description:
    "Complete documentation for the Airbnb Web App Clone — a full-stack application built with Next.js 14, FastAPI, SQLAlchemy, and TailwindCSS. Covers setup, API reference, architecture, and deployment.",
  keywords: [
    "airbnb clone",
    "nextjs",
    "fastapi",
    "sqlalchemy",
    "sqlite",
    "tailwindcss",
    "documentation",
    "full-stack",
    "booking app",
  ],
  authors: [{ name: "Aryan07175", url: "https://github.com/Aryan07175" }],
  creator: "Aryan07175",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://Aryan07175.github.io/airbnb-clone",
    title: "Airbnb Clone Docs — Full-Stack Next.js + FastAPI",
    description:
      "Complete documentation for the Airbnb Web App Clone — a full-stack application built with Next.js 14, FastAPI, SQLAlchemy, and TailwindCSS.",
    siteName: "Airbnb Clone Docs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Airbnb Clone Docs — Full-Stack Next.js + FastAPI",
    description:
      "Complete documentation for the Airbnb Web App Clone — a full-stack application built with Next.js 14, FastAPI, SQLAlchemy, and TailwindCSS.",
    creator: "@Aryan07175",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full flex flex-col bg-[#09090b] text-zinc-100">
        {children}
      </body>
    </html>
  );
}
