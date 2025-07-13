import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Location Appartement Gourette - Séjour au Ski",
  description: "Découvrez notre appartement à louer à Gourette pour un séjour inoubliable au ski. Confort et proximité des pistes garantis.",
  openGraph: {
    title: "Location Appartement Gourette - Séjour au Ski",
    description: "Découvrez notre appartement à louer à Gourette pour un séjour inoubliable au ski. Confort et proximité des pistes garantis.",
    url: "https://www.locationgourette.fr", // Remplacez par l'URL réelle de votre site
    siteName: "Location Gourette",
    images: [
      {
        url: "https://www.locationgourette.fr/og-image.jpg", // Remplacez par l'URL de votre image OpenGraph
        width: 1200,
        height: 630,
        alt: "Appartement à louer à Gourette",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  // Ajout des balises meta pour le SEO
  keywords: "location gourette, appartement gourette, ski gourette, séjour ski, location vacances gourette, appartement à louer gourette",
  authors: [{ name: "Votre Nom" }], // Remplacez par votre nom ou celui du propriétaire
  // Ajout du favicon
  icons: {
    icon: "/logo/favicon.png",
    shortcut: "/logo/favicon.png",
    apple: "/logo/apple-touch-icon.png", // Si vous avez un apple-touch-icon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
