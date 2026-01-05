"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Users, RefreshCw, AlertCircle, LogOut, CheckCircle2, XCircle, Clock, Loader2 } from "lucide-react";
import { updateStudentStatus } from "@/app/actions/updateStatus";

type CalonSiswa = {
    id: string;
    created_at: string;
    nama_lengkap: string;
    nisn: string;
    asal_sekolah: string;
    jurusan_pilihan: string;
    status: string;
};

export default function AdminDashboardPage() {
    const router = useRouter();
    const [data, setData] = useState<CalonSiswa[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    // Check authentication on mount
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                router.replace("/admin");
                return;
            }

            // Optional: Check if user is in admins table
            const { data: adminData, error: adminError } = await supabase
                .from("admins")
                .select("id")
                .eq("id", session.user.id)
                .single();

            if (adminError || !adminData) {
                // Not an admin, sign out and redirect
                await supabase.auth.signOut();
                router.replace("/admin");
                return;
            }

            setIsAuthenticated(true);
            setCheckingAuth(false);
            fetchData();
        };

        checkAuth();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_OUT" || !session) {
                router.replace("/admin");
            }
        });

        return () => subscription.unsubscribe();
    }, [router]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        const { data: siswa, error: fetchError } = await supabase
            .from("calon_siswa")
            .select("*")
            .order("created_at", { ascending: false });

        if (fetchError) {
            setError(fetchError.message);
            setData([]);
        } else {
            setData(siswa || []);
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.replace("/admin");
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        setUpdatingId(id);
        const result = await updateStudentStatus(id, newStatus);

        if (result.success) {
            setData(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
        } else {
            alert("Gagal mengubah status: " + result.error);
        }
        setUpdatingId(null);
    };

    const getStatusBadge = (status: string) => {
        const colors: Record<string, string> = {
            Pending: "bg-yellow-100 text-yellow-800",
            Diterima: "bg-green-100 text-green-800",
            Ditolak: "bg-red-100 text-red-800",
        };
        return colors[status] || "bg-gray-100 text-gray-800";
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Diterima":
                return <CheckCircle2 className="h-4 w-4 text-green-600" />;
            case "Ditolak":
                return <XCircle className="h-4 w-4 text-red-600" />;
            default:
                return <Clock className="h-4 w-4 text-yellow-600" />;
        }
    };

    // Show loading while checking auth
    if (checkingAuth) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-school-green mx-auto mb-4" />
                    <p className="text-gray-600">Memeriksa autentikasi...</p>
                </div>
            </div>
        );
    }

    // If not authenticated, don't render anything (will redirect)
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-school-green text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                                <p className="text-green-100 text-sm">Data Pendaftar PPDB</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={fetchData}
                                disabled={loading}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                            >
                                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                                Refresh
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 bg-red-500/80 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm">Total Pendaftar</p>
                        <p className="text-3xl font-bold text-gray-900">{data.length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm">Pending</p>
                        <p className="text-3xl font-bold text-yellow-600">
                            {data.filter((d) => d.status === "Pending").length}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm">Diterima</p>
                        <p className="text-3xl font-bold text-school-green">
                            {data.filter((d) => d.status === "Diterima").length}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm">Ditolak</p>
                        <p className="text-3xl font-bold text-red-600">
                            {data.filter((d) => d.status === "Ditolak").length}
                        </p>
                    </div>
                </div>

                {/* Error State */}
                {error && (
                    <div className="mb-6 flex items-center gap-3 rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Nama Lengkap
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        NISN
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Asal Sekolah
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Jurusan
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                                            Memuat data...
                                        </td>
                                    </tr>
                                ) : data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            Belum ada data pendaftar
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((siswa) => (
                                        <tr key={siswa.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {siswa.nama_lengkap}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 font-mono">
                                                {siswa.nisn}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {siswa.asal_sekolah}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-school-green/10 text-school-green">
                                                    {siswa.jurusan_pilihan}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                                        siswa.status
                                                    )}`}
                                                >
                                                    {getStatusIcon(siswa.status)}
                                                    {siswa.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={siswa.status}
                                                    onChange={(e) => handleStatusChange(siswa.id, e.target.value)}
                                                    disabled={updatingId === siswa.id}
                                                    className="text-sm rounded-lg border border-gray-300 px-3 py-1.5 focus:border-school-green focus:outline-none focus:ring-1 focus:ring-school-green disabled:opacity-50 disabled:cursor-wait"
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Diterima">Diterima</option>
                                                    <option value="Ditolak">Ditolak</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
