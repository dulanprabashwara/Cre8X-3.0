import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { JourneyProvider } from "@/context/JourneyContext";
import { ResponsiveAppShell } from "@/components/layout/ResponsiveAppShell";
import { Toast } from "@/components/ui/Toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NOVA 2100 — Universal Mobility OS",
  description:
    "One journey. Every network. Advanced multimodal transportation operating system.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#F7F4FA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-nova-bg text-nova-text-primary antialiased min-h-screen selection:bg-nova-green/20 selection:text-nova-green-hover">
        <JourneyProvider>
          <ResponsiveAppShell>
            {children}
            <Toast />
          </ResponsiveAppShell>
        </JourneyProvider>
      </body>
    </html>
  );
}
