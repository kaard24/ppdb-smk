
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Monitor, Code, Wrench, CheckCircle } from "lucide-react";
import { notFound } from 'next/navigation';

export function generateStaticParams() {
    return [
        { slug: 'tkj' },
        { slug: 'rpl' },
        { slug: 'tsm' },
    ];
}

export default function JurusanDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const jurusans = {
        tkj: {
            code: "TKJ",
            name: "Teknik Komputer & Jaringan",
            icon: <Monitor className="h-16 w-16" />,
            desc: "Expert dalam infrastruktur jaringan, administrasi server, dan teknologi cloud.",
            longDesc: "Jurusan TKJ berfokus pada penguasaan keterampilan dalam merakit komputer, instalasi sistem operasi, konfigurasi jaringan lokal (LAN) dan luas (WAN), serta administrasi server. Siswa akan dibekali dengan sertifikasi internasional (MikroTik/Cisco) untuk menunjang karir di dunia industri.",
            prospects: ["Network Engineer", "System Administrator", "IT Support", "Server Administrator"],
            competencies: [
                "Perakitan Komputer & Laptop",
                "Instalasi Sistem Operasi & Aplikasi",
                "Rancang Bangun Jaringan LAN/WAN",
                "Administrasi Server (Windows/Linux)",
                "Teknologi Layanan Jaringan (VoIP)",
                "Keamanan Jaringan (Cyber Security)"
            ],
            color: "bg-blue-50 text-blue-600"
        },
        rpl: {
            code: "RPL",
            name: "Rekayasa Perangkat Lunak",
            icon: <Code className="h-16 w-16" />,
            desc: "Menjadi developer profesional yang mampu membangun aplikasi web dan mobile.",
            longDesc: "Jurusan RPL mencetak tenaga ahli di bidang pengembangan perangkat lunak (software engineering). Siswa akan mempelajari bahasa pemrograman modern, pengembangan aplikasi berbasis web dan mobile, serta manajemen basis data. Kurikulum diselaraskan dengan kebutuhan industri startup dan software house.",
            prospects: ["Web Developer", "Mobile App Developer", "UI/UX Designer", "Database Administrator"],
            competencies: [
                "Pemrograman Dasar & Algoritma",
                "Pemrograman Berorientasi Objek (Java)",
                "Pemrograman Web (HTML, CSS, JS, PHP)",
                "Pemrograman Mobile (Android/Flutter)",
                "Basis Data (MySQL/PostgreSQL)",
                "Produk Kreatif & Kewirausahaan"
            ],
            color: "bg-purple-50 text-purple-600"
        },
        tsm: {
            code: "TSM",
            name: "Teknik Sepeda Motor",
            icon: <Wrench className="h-16 w-16" />,
            desc: "Ahli dalam perawatan dan perbaikan sepeda motor dengan standar industri.",
            longDesc: "Jurusan TSM mempersiapkan mekanik handal yang menguasai teknik perawatan dan perbaikan sepeda motor konvensional maupun injeksi. Bekerjasama dengan industri otomotif terkemuka untuk memastikan kompetensi siswa sesuai standar bengkel resmi.",
            prospects: ["Mekanik Profesional", "Service Advisor", "Wirausaha Bengkel", "Teknisi Perakitan"],
            competencies: [
                "Perawatan & Perbaikan Mesin",
                "Sistem Sasis & Pemindah Tenaga",
                "Sistem Kelistrikan Otomotif",
                "Sistem Injeksi Elektronik",
                "Pengelolaan Bengkel Sepeda Motor"
            ],
            color: "bg-orange-50 text-orange-600"
        }
    };

    const data = jurusans[slug as keyof typeof jurusans];

    if (!data) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-900">Jurusan Tidak Ditemukan</h1>
                <p className="mb-8 text-gray-600">Maaf, jurusan yang Anda cari tidak tersedia.</p>
                <Link href="/jurusan" className="text-school-green hover:underline">Kembali ke Daftar Jurusan</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <Link href="/jurusan" className="mb-6 inline-flex items-center text-sm font-medium text-gray-600 hover:text-school-green">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali
                    </Link>
                    <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
                        <div className={`flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl ${data.color} shadow-sm`}>
                            {data.icon}
                        </div>
                        <div>
                            <span className="mb-2 inline-block rounded-full bg-white px-3 py-1 text-sm font-bold shadow-sm">{data.code}</span>
                            <h1 className="mb-4 text-4xl font-bold text-gray-900">{data.name}</h1>
                            <p className="text-xl text-gray-600">{data.desc}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-12 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <h2 className="mb-6 text-2xl font-bold text-gray-900">Tentang Program Keahlian</h2>
                        <p className="mb-8 text-lg leading-relaxed text-gray-600">
                            {data.longDesc}
                        </p>

                        <h3 className="mb-4 text-xl font-bold text-gray-900">Kompetensi yang Dipelajari</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {data.competencies.map((comp, idx) => (
                                <div key={idx} className="flex items-start gap-3 rounded-lg border border-gray-100 p-4 shadow-sm transition-colors hover:bg-gray-50">
                                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-school-green" />
                                    <span className="text-gray-700">{comp}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <h3 className="mb-4 text-xl font-bold text-gray-900">Prospek Karir</h3>
                            <ul className="space-y-3">
                                {data.prospects.map((job, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-gray-600">
                                        <div className="h-2 w-2 rounded-full bg-school-green"></div>
                                        {job}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-2xl bg-school-green p-6 text-white shadow-lg">
                            <h3 className="mb-2 text-xl font-bold">Tertarik dengan jurusan ini?</h3>
                            <p className="mb-6 opacity-90">Segera daftarkan dirimu sebelum kuota terpenuhi.</p>
                            <Link
                                href="/daftar"
                                className="block w-full rounded-lg bg-white py-3 text-center font-bold text-school-green transition-transform hover:scale-105"
                            >
                                Daftar Sekarang
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
