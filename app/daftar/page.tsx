"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, School, ChevronRight, Loader2, CheckCircle2, AlertCircle, BookOpen } from "lucide-react";
import { submitPendaftaran } from "@/app/actions/submitPendaftaran";

export default function DaftarPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const result = await submitPendaftaran(formData);

        setIsLoading(false);

        if (result.success) {
            router.push("/sukses");
        } else {
            setError(result.error || "Terjadi kesalahan");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-50 animate-float" />

            <div className="mx-auto max-w-2xl animate-slide-up">
                <div className="mb-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">PPDB Online</span>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Formulir Pendaftaran</h1>
                    <p className="text-muted-foreground text-lg">Mulai perjalanan karirmu bersama SMK Al-Hidayah Lestari</p>
                </div>

                {error && (
                    <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 border border-red-100 p-4 text-red-700 animate-fade-in">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <div className="glass-card rounded-3xl p-8 sm:p-10 shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Section: Data Diri */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                                    <User className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Data Pribadi</h2>
                            </div>

                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label htmlFor="nama_lengkap" className="text-sm font-semibold text-gray-700 ml-1">Nama Lengkap</label>
                                    <input
                                        id="nama_lengkap"
                                        name="nama_lengkap"
                                        type="text"
                                        required
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-3 transition-all focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                                        placeholder="Sesuai Ijazah SMP/MTs"
                                    />
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="nisn" className="text-sm font-semibold text-gray-700 ml-1">NISN</label>
                                        <input
                                            id="nisn"
                                            name="nisn"
                                            type="text"
                                            required
                                            pattern="[0-9]{10}"
                                            maxLength={10}
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-3 transition-all focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 font-mono"
                                            placeholder="10 digit NISN"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="asal_sekolah" className="text-sm font-semibold text-gray-700 ml-1">Asal Sekolah</label>
                                        <div className="relative">
                                            <School className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                                            <input
                                                id="asal_sekolah"
                                                name="asal_sekolah"
                                                type="text"
                                                required
                                                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-12 pr-5 py-3 transition-all focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                                                placeholder="Nama SMP/MTs Asal"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section: Pilihan Jurusan */}
                        <div className="space-y-6 pt-2">
                            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-primary">
                                    <BookOpen className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Minat Jurusan</h2>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="jurusan_pilihan" className="text-sm font-semibold text-gray-700 ml-1">Kompetensi Keahlian</label>
                                <div className="relative">
                                    <select
                                        id="jurusan_pilihan"
                                        name="jurusan_pilihan"
                                        required
                                        className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-3 transition-all focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 cursor-pointer"
                                    >
                                        <option value="">-- Pilih Jurusan --</option>
                                        <option value="TKJ">Teknik Komputer &amp; Jaringan (TKJ)</option>
                                        <option value="RPL">Rekayasa Perangkat Lunak (RPL)</option>
                                        <option value="TSM">Teknik Sepeda Motor (TSM)</option>
                                    </select>
                                    <ChevronRight className="absolute right-4 top-3.5 h-5 w-5 text-gray-400 rotate-90 pointer-events-none" />
                                </div>
                                <p className="text-xs text-muted-foreground ml-1">Pilih sesuai dengan minat dan bakat anda.</p>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-bold text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 hover:translate-y-[-1px] disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Memproses...
                                    </>
                                ) : (
                                    <>
                                        Kirim Pendaftaran
                                        <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
