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

export const metadata: Metadata = {
  title: "Anamnese | Diamond HOF",
  description: "Formulário de anamnese — Diamond HOF Estética Integrada Premium",
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
