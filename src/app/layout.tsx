import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Eid Mubarak - From Zuraib & Umar",
  description:
    "Eid Mubarak! Allah aap ki zindagi ko khushiyon, kamiyabiyon aur be shumaar barkaton se bhar de. From Zuraib bin Noman & Umar bin Noman.",
  keywords: ["Eid Mubarak", "Eid Greetings", "Islamic Festival", "Blessings"],
  openGraph: {
    title: "Eid Mubarak - From Zuraib & Umar",
    description:
      "Eid Mubarak! Allah aap ki zindagi ko khushiyon aur barkaton se bhar de.",
    type: "website",
    images: [
      {
        url: "/zuraib.png",
        width: 1200,
        height: 630,
        alt: "Eid Mubarak from Zuraib & Umar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eid Mubarak - From Zuraib & Umar",
    description:
      "Eid Mubarak! Allah aap ki zindagi ko khushiyon aur barkaton se bhar de.",
    images: ["/zuraib.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
