
import React from 'react';
import { ArrowRight, Users, CreditCard, Calendar, FileText, Info } from "lucide-react";

export default function InformasiPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">Informasi Pendaftaran</h1>
                    <p className="text-lg text-gray-600">Semua yang perlu Anda ketahui tentang PPDB SMK Al-Hidayah Lestari</p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Alur Pendaftaran */}
                    <div className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <ArrowRight className="h-6 w-6" />
                        </div>
                        <h2 className="mb-4 text-2xl font-bold text-gray-900">Alur Pendaftaran</h2>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-start gap-2">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">1</span>
                                <span>Isi formulir pendaftaran online</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">2</span>
                                <span>Upload dokumen persyaratan</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">3</span>
                                <span>Verifikasi data oleh panitia</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">4</span>
                                <span>Pengumuman hasil seleksi</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">5</span>
                                <span>Daftar ulang</span>
                            </li>
                        </ul>
                    </div>

                    {/* Syarat Pendaftaran */}
                    <div className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                            <Users className="h-6 w-6" />
                        </div>
                        <h2 className="mb-4 text-2xl font-bold text-gray-900">Syarat Pendaftaran</h2>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-orange-400" />
                                <span>Fotokopi Ijazah / SKL SMP/MTs</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-orange-400" />
                                <span>Fotokopi Kartu Keluarga (KK)</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-orange-400" />
                                <span>Fotokopi Akta Kelahiran</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-orange-400" />
                                <span>Pas Foto 3x4 (4 lembar)</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-orange-400" />
                                <span>Fotokopi KIP/PKH (Jika ada)</span>
                            </li>
                        </ul>
                    </div>

                    {/* Biaya Pendidikan */}
                    <div className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-school-green">
                            <CreditCard className="h-6 w-6" />
                        </div>
                        <h2 className="mb-4 text-2xl font-bold text-gray-900">Biaya Pendidikan</h2>
                        <div className="space-y-4 text-gray-600">
                            <p>Kami berkomitmen memberikan pendidikan berkualitas dengan biaya terjangkau.</p>
                            <div className="rounded-lg bg-green-50 p-4">
                                <h3 className="mb-2 font-semibold text-school-green">Rincian Biaya:</h3>
                                <ul className="list-inside list-disc space-y-1 text-sm">
                                    <li>SPP Bulanan: Terjangkau</li>
                                    <li>Uang Gedung: Dapat diangsur</li>
                                    <li>Seragam: Lengkap</li>
                                </ul>
                            </div>
                            <p className="text-sm italic text-gray-500">* Tersedia beasiswa bagi siswa berprestasi dan kurang mampu.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 rounded-2xl bg-white p-8 shadow-sm">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                        <div className="flex items-start gap-4">
                            <div className="hidden rounded-full bg-blue-100 p-3 text-blue-600 md:block">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Jadwal Pendaftaran</h3>
                                <p className="text-gray-600">Gelombang 1: 1 Januari - 31 Maret 2024</p>
                                <p className="text-gray-600">Gelombang 2: 1 April - 30 Juni 2024</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="hidden rounded-full bg-orange-100 p-3 text-orange-600 md:block">
                                <Info className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Pusat Bantuan</h3>
                                <p className="text-gray-600">Hubungi kami jika ada pertanyaan:</p>
                                <p className="font-semibold text-school-green">WA: 0812-3456-7890</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
