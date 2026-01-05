
import React from 'react';
import Link from 'next/link';
import { Monitor, Code, Wrench, CheckCircle } from "lucide-react";

export default function JurusanPage() {
    const jurusans = [
        {
            code: "TKJ",
            name: "Teknik Komputer & Jaringan",
            icon: <Monitor className="h-12 w-12" />,
            desc: "Mempelajari perakitan, instalasi jaringan, administrasi server, dan troubleshooting.",
            competencies: [
                "Perakitan Komputer",
                "Instalasi Sistem Operasi",
                "Jaringan Lokal (LAN) & Luas (WAN)",
                "Administrasi Server",
                "Keamanan Jaringan",
                "Fiber Optic"
            ],
            color: "bg-blue-50 text-blue-600 border-blue-100"
        },
        {
            code: "RPL",
            name: "Rekayasa Perangkat Lunak",
            icon: <Code className="h-12 w-12" />,
            desc: "Fokus pada pengembangan software, aplikasi web, mobile, dan database.",
            competencies: [
                "Pemrograman Dasar (C++, Java, Python)",
                "Pemrograman Web (HTML, CSS, PHP, JS)",
                "Basis Data (MySQL)",
                "Pengembangan Aplikasi Mobile",
                "Produk Kreatif & Kewirausahaan"
            ],
            color: "bg-purple-50 text-purple-600 border-purple-100"
        },
        {
            code: "TSM",
            name: "Teknik Sepeda Motor",
            icon: <Wrench className="h-12 w-12" />,
            desc: "Keahlian dalam perawatan, perbaikan, dan modifikasi sepeda motor.",
            competencies: [
                "Perawatan Mesin Sepeda Motor",
                "Sistem Sasis & Pemindah Tenaga",
                "Sistem Kelistrikan Sepeda Motor",
                "Pengelolaan Bengkel",
                "Teknologi Motor Listrik"
            ],
            color: "bg-orange-50 text-orange-600 border-orange-100"
        },
    ];

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <span className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-school-green">
                        Program Keahlian
                    </span>
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">Pilihan Jurusan</h1>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">
                        SMK Al-Hidayah Lestari menyediakan program keahlian yang relevan dengan kebutuhan industri saat ini,
                        siap mencetak lulusan yang kompeten dan siap kerja.
                    </p>
                </div>

                <div className="grid gap-8">
                    {jurusans.map((jurusan, idx) => (
                        <div key={idx} className={`rounded-3xl border p-8 ${jurusan.color.replace('bg-', 'border-opacity-50 ')} bg-white shadow-sm transition-all hover:shadow-lg`}>
                            <div className="flex flex-col gap-8 md:flex-row">
                                <div className="shrink-0">
                                    <div className={`flex h-24 w-24 items-center justify-center rounded-2xl ${jurusan.color}`}>
                                        {jurusan.icon}
                                    </div>
                                    <div className="mt-4 text-center">
                                        <span className="text-2xl font-bold text-gray-900">{jurusan.code}</span>
                                    </div>
                                </div>
                                <div className="grow">
                                    <h2 className="mb-3 text-3xl font-bold text-gray-900">{jurusan.name}</h2>
                                    <p className="mb-6 text-xl text-gray-600">{jurusan.desc}</p>

                                    <h3 className="mb-3 font-semibold text-gray-900">Materi Kompetensi:</h3>
                                    <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                                        {jurusan.competencies.map((comp, i) => (
                                            <div key={i} className="flex items-start gap-2">
                                                <CheckCircle className={`mt-0.5 h-5 w-5 shrink-0 ${jurusan.color.split(' ')[1]}`} />
                                                <span className="text-gray-600">{comp}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex shrink-0 flex-col justify-center gap-3 md:w-48">
                                    <Link
                                        href="/daftar"
                                        className="inline-flex w-full items-center justify-center rounded-xl bg-school-green px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
                                    >
                                        Daftar Jurusan Ini
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
