"use client";

import { usePathname } from 'next/navigation';

const Footer = () => {
    const pathname = usePathname();

    // Don't render footer on admin pages
    if (pathname?.startsWith('/admin')) {
        return null;
    }

    return (
        <footer className="w-full border-t border-gray-100 bg-white/50 py-12 mt-auto">
            <div className="container mx-auto px-6 text-center">
                <p className="text-sm text-muted-foreground font-medium mb-4">
                    © 2026 SMK Al-Hidayah Lestari. Mencetak Generasi Emas.
                </p>
                <div className="flex justify-center gap-6">
                    <a href="#" className="text-xs text-gray-400 hover:text-primary transition-colors">Privacy Policy</a>
                    <a href="#" className="text-xs text-gray-400 hover:text-primary transition-colors">Terms of Service</a>
                    <a href="#" className="text-xs text-gray-400 hover:text-primary transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
