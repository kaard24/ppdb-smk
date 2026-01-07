"use client";

import Link from 'next/link';
import { Menu, X, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Don't render navbar on admin pages
    if (pathname?.startsWith('/admin')) {
        return null;
    }

    return (
        <nav className="fixed top-0 z-50 w-full glass border-b border-white/20 transition-all duration-300">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
                        <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <span className="block text-lg font-bold text-foreground leading-none">Al-Hidayah</span>
                        <span className="text-xs font-medium text-muted-foreground tracking-widest uppercase">Lestari</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {['Beranda', 'Informasi', 'Jurusan', 'Cek Status'].map((item) => {
                        const href = item === 'Beranda' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`;
                        return (
                            <Link
                                key={item}
                                href={href}
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                            >
                                {item}
                            </Link>
                        );
                    })}
                    <Link
                        href="/daftar"
                        className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95"
                    >
                        Daftar Sekarang
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white/90 backdrop-blur-xl border-b border-gray-100 p-6 flex flex-col gap-4 animate-fade-in shadow-xl">
                    {['Beranda', 'Informasi', 'Jurusan', 'Cek Status'].map((item) => {
                        const href = item === 'Beranda' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`;
                        return (
                            <Link
                                key={item}
                                href={href}
                                className="text-lg font-medium text-foreground py-2 border-b border-gray-50"
                                onClick={() => setIsOpen(false)}
                            >
                                {item}
                            </Link>
                        );
                    })}
                    <Link
                        href="/daftar"
                        onClick={() => setIsOpen(false)}
                        className="mt-2 w-full text-center py-3 rounded-xl bg-primary text-primary-foreground font-bold"
                    >
                        Daftar Sekarang
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
