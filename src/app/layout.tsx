import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "./components/common/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Shop",
  icons: {
    icon: "../.../public/next.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Providers>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div>
            <Navbar />
          </div>
          {children}
          <Toaster position="top-right" />
        </body>
      </Providers>
    </html>
  );
}
