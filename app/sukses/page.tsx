import Link from "next/link";
import { CheckCircle, Home, ArrowRight } from "lucide-react";

export default function SuksesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                    {/* Success Icon */}
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-school-green to-green-600 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="h-10 w-10 text-white" />
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Pendaftaran Berhasil!
                        </h1>
                        <p className="text-gray-600">
                            Data pendaftaran Anda telah berhasil dikirim dan sedang dalam proses verifikasi.
                        </p>
                    </div>

                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                        Status: Menunggu Verifikasi
                    </div>

                    {/* Info Box */}
                    <div className="bg-gray-50 rounded-xl p-4 text-left text-sm text-gray-600 space-y-2">
                        <p className="font-medium text-gray-700">Langkah Selanjutnya:</p>
                        <ul className="space-y-1 list-disc list-inside">
                            <li>Pantau status pendaftaran Anda</li>
                            <li>Siapkan dokumen yang diperlukan</li>
                            <li>Tunggu pengumuman hasil seleksi</li>
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            href="/"
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                            <Home className="h-4 w-4" />
                            Beranda
                        </Link>
                        <Link
                            href="/cek-status"
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-school-green text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                        >
                            <ArrowRight className="h-4 w-4" />
                            Cek Status
                        </Link>
                    </div>
                </div>

                {/* Footer Note */}
                <p className="mt-6 text-sm text-gray-500">
                    SMK Al-Hidayah Lestari - PPDB 2024/2025
                </p>
            </div>
        </div>
    );
}
