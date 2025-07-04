import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/features/auth/providers/SessionProvider";
import { Header } from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";
import { ModalProvider } from "@/provider/modal-provider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VRCSS",
  description: "VRCSS",
  icons: {
    icon: "/assets/vrcss.png",
  },
  openGraph: {
    type: "website",
    title: "VRCSS",
    description: "VRChatに特化したソーシャルメディアプラットフォーム",
    siteName: "VRCSS",
    url: process.env.NEXT_PUBLIC_APP_URL,
    images: {
      url: "/assets/vrcss.png",
      type: "image/png",
      width: 1200,
    },
  },
  twitter: {
    card: "summary",
    title: "VRCSS",
    description: "VRChatに特化したソーシャルメディアプラットフォーム",
    creator: "@vrcss",
    images: {
      url: "/assets/vrcss.png",
      type: "image/png",
      width: 1200,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <ModalProvider>
        <html lang="en">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" type="image/svg" sizes="50x50" href="/header/vrcss_icon.svg" />
            {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID && (
              <>
                <meta name="google-adsense-account" content={`ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`} />
                <Script
                  async
                  src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
                  crossOrigin="anonymous"
                  strategy="afterInteractive"
                />
              </>
            )}
          </head>
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased layout`}>
            <div id="modal-root">
              <Header />
              <main> {children}</main>
              <ToastContainer position="bottom-right" autoClose={3000} />
              <Footer />
            </div>
          </body>
        </html>
      </ModalProvider>
    </SessionProvider>
  );
}
