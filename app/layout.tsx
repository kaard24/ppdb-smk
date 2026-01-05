import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "PPDB SMK Al-Hidayah Lestari",
    description: "Portal Pendaftaran Peserta Didik Baru SMK Al-Hidayah Lestari",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id">
            <body className={inter.className}>
                <Navbar />
                <main className="min-h-screen bg-gray-50">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
