import React from "react";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {/* Admin pages have their own layout without Navbar/Footer */}
            {children}
        </>
    );
}
