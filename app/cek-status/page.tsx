"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, CheckCircle2, XCircle, Clock, AlertCircle, School, User, GraduationCap, Users } from "lucide-react";
import { checkStatus, CheckStatusResult } from "@/app/actions/checkStatus";
import { getRegistrants, Registrant } from "@/app/actions/getRegistrants";

export default function CekStatusPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<CheckStatusResult | null>(null);
    const [registrants, setRegistrants] = useState<Registrant[]>([]);
    const [isLoadingRegistrants, setIsLoadingRegistrants] = useState(true);

    useEffect(() => {
        async function fetchRegistrants() {
            const res = await getRegistrants();
            if (res.success && res.data) {
                setRegistrants(res.data);
            }
            setIsLoadingRegistrants(false);
        }
        fetchRegistrants();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setResult(null);

        const formData = new FormData(e.currentTarget);
        const res = await checkStatus(formData);

        setResult(res);
        setIsLoading(false);
    };

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case "diterima":
                return (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-600 border border-green-200">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        DITERIMA
                    </span>
                );
            case "ditolak":
                return (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-600 border border-red-200">
                        <XCircle className="h-3.5 w-3.5" />
                        DITOLAK
                    </span>
                );
            default: // pending
                return (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-600 border border-yellow-200">
                        <Clock className="h-3.5 w-3.5" />
                        PENDING
                    </span>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="text-center mb-12 animate-slide-up">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Cek Status Seleksi</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Pantau hasil seleksi penerimaan peserta didik baru secara real-time.</p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2 items-start">
                    {/* Left: Check Status Form */}
                    <div className="glass-card rounded-3xl p-8 shadow-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Search className="w-5 h-5 text-primary" />
                            Pencarian Siswa
                        </h2>

                        <form onSubmit={handleSubmit} className="mb-0">
                            <div className="space-y-4">
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        name="nisn"
                                        type="text"
                                        required
                                        pattern="[0-9]{10}"
                                        maxLength={10}
                                        className="block w-full rounded-xl border-gray-200 bg-gray-50/50 pl-11 pr-4 py-3 text-sm focus:bg-white focus:border-primary focus:ring-primary/20 transition-all font-mono tracking-wider"
                                        placeholder="Masukkan 10 Digit NISN"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gray-900 text-white px-6 py-3.5 text-sm font-bold hover:bg-gray-800 transition-all hover:shadow-lg disabled:opacity-70"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Mencari Data...
                                        </>
                                    ) : (
                                        "Cek Status Sekarang"
                                    )}
                                </button>
                            </div>
                        </form>

                        {result && (
                            <div className="mt-8 pt-8 border-t border-dashed border-gray-200 animate-fade-in">
                                {!result.success ? (
                                    <div className="rounded-xl bg-red-50 text-red-600 p-4 flex items-center gap-3 text-sm font-medium">
                                        <AlertCircle className="h-5 w-5" />
                                        {result.error}
                                    </div>
                                ) : result.data && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">Status Seleksi</p>
                                                {getStatusBadge(result.data.status)}
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500 mb-1">Tanggal Daftar</p>
                                                <p className="text-sm font-medium">{new Date(result.data.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</p>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50/80 rounded-2xl p-6 space-y-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-blue-500">
                                                    <User className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Nama Lengkap</p>
                                                    <p className="font-bold text-gray-900">{result.data.nama_lengkap}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-orange-500">
                                                    <School className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Asal Sekolah</p>
                                                    <p className="font-bold text-gray-900">{result.data.asal_sekolah}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-purple-500">
                                                    <GraduationCap className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Jurusan Pilihan</p>
                                                    <p className="font-bold text-gray-900">{result.data.jurusan_pilihan}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {result.data.status.toLowerCase() === "diterima" && (
                                            <div className="rounded-xl bg-green-50 p-4 border border-green-100">
                                                <h4 className="font-bold text-green-800 mb-1">Selamat! Anda Diterima 🎉</h4>
                                                <p className="text-sm text-green-700 leading-relaxed">Silakan lakukan daftar ulang mulai tanggal <span className="font-bold">1 Juli 2024</span> di bagian Tata Usaha sekolah.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right: Registrant Table */}
                    <div className="glass-card rounded-3xl p-8 shadow-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Users className="w-5 h-5 text-secondary" />
                                Data Pendaftar
                            </h2>
                            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600">
                                Total: {registrants.length}
                            </span>
                        </div>

                        {isLoadingRegistrants ? (
                            <div className="flex flex-col items-center justify-center py-12 gap-4">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                <p className="text-sm text-gray-500">Memuat data...</p>
                            </div>
                        ) : registrants.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                                <Users className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                                <p className="text-gray-500 font-medium">Belum ada data pendaftar terbaru</p>
                            </div>
                        ) : (
                            <div className="overflow-hidden rounded-xl border border-gray-100">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50/80 border-b border-gray-100">
                                        <tr>
                                            <th className="py-3 px-4 font-semibold text-gray-600">Siswa</th>
                                            <th className="py-3 px-4 font-semibold text-gray-600">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 bg-white">
                                        {registrants.slice(0, 10).map((r, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="py-3 px-4">
                                                    <div className="font-bold text-gray-900">{r.nama_lengkap}</div>
                                                    <div className="text-xs text-gray-500">{r.jurusan_pilihan} • {r.asal_sekolah}</div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    {getStatusBadge(r.status)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {registrants.length > 10 && (
                                    <div className="p-3 text-center border-t border-gray-100 bg-gray-50/30">
                                        <p className="text-xs text-gray-500">Menampilkan 10 pendaftar terbaru</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
