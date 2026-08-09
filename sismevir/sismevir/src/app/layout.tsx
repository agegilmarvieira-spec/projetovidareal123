import type { Metadata, Viewport } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "SISMeViR — Sistema Método Vida Real",
  description: "Contando histórias através do esporte.",
  manifest: "/manifest.json",
  icons: {
    icon: "/brand/logo-gilmar-videos.png",
    apple: "/brand/logo-gilmar-videos.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SISMeViR",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen bg-ink-950 font-sans">
        <ServiceWorkerRegister />
        <div className="mx-auto min-h-screen max-w-md px-5 pb-28 pt-8">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
