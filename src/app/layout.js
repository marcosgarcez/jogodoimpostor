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

export const metadata = {
  title: {
    default: "Jogo do Impostor",
    template: "%s | Jogo do Impostor",
  },
  description: "Reúna os amigos e descubra quem é o intruso! Um jogo de dedução social estilo Spyfall, grátis e online. Jogue agora sem baixar nada.",
  applicationName: "Jogo do Impostor",
  authors: [{ name: "Seu Nome Aqui" }], // Coloque seu nome se quiser
  keywords: ["jogo", "impostor", "spyfall", "mentiroso", "party game", "jogo de festa", "online", "grátis"],
  creator: "Marcos Garcez",
  metadataBase: new URL("https://jogodoimpostor.vercel.app"),
  
  // Como aparece no Facebook, WhatsApp, LinkedIn
  openGraph: {
    title: "Jogo do Impostor 🕵️",
    description: "Quem está mentindo na roda? Jogue agora com seus amigos!",
    url: "https://jogodoimpostor.vercel.app",
    siteName: "Jogo do Impostor",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Jogo do Impostor Preview",
      },
    ],
  },

  // Como aparece no Twitter (X)
  twitter: {
    card: "summary_large_image",
    title: "Jogo do Impostor 🕵️",
    description: "Reúna a galera e descubra o intruso. Jogo online grátis!",
    images: ["/opengraph-image.png"], // Mesma imagem
  },

  // Ícones (Favicon)
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  
  // Para funcionar como "App" se alguém salvar na tela inicial
  manifest: "/manifest.json", 
};

export default function RootLayout({ children }) {
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
