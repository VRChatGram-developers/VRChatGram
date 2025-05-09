import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/features/auth/providers/SessionProvider";
import { Header } from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";
import { ModalProvider } from "@/provider/modal-provider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          </head>
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased layout`}>
            <Header />
            <main> {children}</main>
            <ToastContainer position="bottom-right" autoClose={3000} />
            <Footer />
          </body>
        </html>
      </ModalProvider>
    </SessionProvider>
  );
}
