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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ||
      "https://eid-mubarak-from-zuraib-umar.vercel.app/"
  ),
  title: "Eid Mubarak - From Zuraib & Umar",
  description:
    "Eid Mubarak! Allah aap ki zindagi ko khushiyon, kamiyabiyon aur be shumaar barkaton se bhar de. From Zuraib bin Noman & Umar bin Noman.",
  openGraph: {
    title: "Eid Mubarak - From Zuraib & Umar",
    description:
      "Eid Mubarak! Allah aap ki zindagi ko khushiyon aur barkaton se bhar de.",
    type: "website",
    siteName: "Eid Mubarak",
    images: [
      {
        url: "/zuraib.png",
        width: 800,
        height: 600,
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
