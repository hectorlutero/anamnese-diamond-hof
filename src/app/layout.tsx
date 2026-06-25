import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const siteUrl = "https://anamnese-diamond-hof.vercel.app";
const title = "Anamnese | Diamond HOF";
const description =
  "Preencha sua ficha de anamnese online com segurança. Diamond HOF — Estética Integrada Premium. Dra. Isadora Siman.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "anamnese",
    "estética",
    "Diamond HOF",
    "Dra. Isadora Siman",
    "ficha de anamnese",
    "estética integrada",
  ],
  authors: [{ name: "Diamond HOF" }],
  creator: "Diamond HOF",
  publisher: "Diamond HOF",
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Diamond HOF",
    title,
    description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Diamond HOF — Estética Integrada Premium | Formulário de Anamnese",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${montserrat.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
