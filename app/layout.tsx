import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Indian Invite Studio",
  description: "Premium three-step invitation builder with AI-style generation and timeline editing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${playfair.variable} antialiased`}>
        <Header />
        <div className="pt-20">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
