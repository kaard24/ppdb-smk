"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import {
    Users,
    RefreshCw,
    AlertCircle,
    LogOut,
    CheckCircle2,
    XCircle,
    Clock,
    Loader2,
    Search,
    LayoutDashboard,
    UserCheck,
    ChevronDown,
    Filter,
    Menu,
    X,
    ChevronRight
} from "lucide-react";
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

// List of jurusan (majors) - adjust based on your data
const JURUSAN_LIST = [
    "Semua Jurusan",
    "Teknik Komputer dan Jaringan",
    "Rekayasa Perangkat Lunak",
    "Multimedia",
    "Akuntansi",
    "Administrasi Perkantoran",
];

export default function AdminDashboardPage() {
    const router = useRouter();
    const pathname = usePathname();
    const [data, setData] = useState<CalonSiswa[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedJurusan, setSelectedJurusan] = useState("Semua Jurusan");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [expandedCard, setExpandedCard] = useState<string | null>(null);

    // Filter data based on search query and jurusan
    const filteredData = data.filter((siswa) => {
        // Filter by search query
        let matchesSearch = true;
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            matchesSearch =
                siswa.nama_lengkap.toLowerCase().includes(query) ||
                siswa.nisn.toLowerCase().includes(query);
        }

        // Filter by jurusan
        let matchesJurusan = true;
        if (selectedJurusan !== "Semua Jurusan") {
            matchesJurusan = siswa.jurusan_pilihan === selectedJurusan;
        }

        return matchesSearch && matchesJurusan;
    });

    // Get unique jurusan from data for dynamic filtering
    const uniqueJurusan = ["Semua Jurusan", ...Array.from(new Set(data.map(s => s.jurusan_pilihan)))];

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

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedJurusan("Semua Jurusan");
    };

    const hasActiveFilters = searchQuery || selectedJurusan !== "Semua Jurusan";

    // Show loading while checking auth
    if (checkingAuth) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
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
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50
                w-64 sm:w-72 lg:w-64 bg-school-green text-white
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                flex flex-col shadow-xl lg:shadow-none
            `}>
                {/* Sidebar Header */}
                <div className="p-4 sm:p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div className="min-w-0">
                                <h1 className="text-base sm:text-lg font-bold truncate">Admin Panel</h1>
                                <p className="text-green-200 text-xs truncate">SMK Al-Hidayah</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-3 sm:p-4 overflow-y-auto">
                    <ul className="space-y-1 sm:space-y-2">
                        <li>
                            <a
                                href="/admin/dashboard"
                                className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white/20 text-white font-medium"
                            >
                                <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
                                <span className="truncate">Dashboard</span>
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Logout Button */}
                <div className="p-3 sm:p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-red-500/80 hover:bg-red-600 text-white transition-colors"
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        <span className="truncate">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen w-full lg:w-auto">
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 sticky top-0 z-30">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg flex-shrink-0"
                            >
                                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                            </button>
                            <div className="min-w-0">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">Dashboard</h2>
                                <p className="text-xs sm:text-sm text-gray-500 truncate hidden sm:block">Data Pendaftar PPDB</p>
                            </div>
                        </div>
                        <button
                            onClick={fetchData}
                            disabled={loading}
                            className="flex items-center gap-1.5 sm:gap-2 bg-school-green hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors disabled:opacity-50 flex-shrink-0"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                            <span className="hidden sm:inline text-sm">Refresh</span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-auto">
                    {/* Stats - Responsive Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
                        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm border border-gray-100">
                            <p className="text-gray-500 text-xs sm:text-sm">Total Pendaftar</p>
                            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{data.length}</p>
                        </div>
                        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm border border-gray-100">
                            <p className="text-gray-500 text-xs sm:text-sm">Pending</p>
                            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-600">
                                {data.filter((d) => d.status === "Pending").length}
                            </p>
                        </div>
                        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm border border-gray-100">
                            <p className="text-gray-500 text-xs sm:text-sm">Diterima</p>
                            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-school-green">
                                {data.filter((d) => d.status === "Diterima").length}
                            </p>
                        </div>
                        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm border border-gray-100">
                            <p className="text-gray-500 text-xs sm:text-sm">Ditolak</p>
                            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600">
                                {data.filter((d) => d.status === "Ditolak").length}
                            </p>
                        </div>
                    </div>

                    {/* Error State */}
                    {error && (
                        <div className="mb-4 sm:mb-6 flex items-start sm:items-center gap-2 sm:gap-3 rounded-lg bg-red-50 border border-red-200 p-3 sm:p-4 text-red-700">
                            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5 sm:mt-0" />
                            <p className="text-sm sm:text-base">{error}</p>
                        </div>
                    )}

                    {/* Filters Section */}
                    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 mb-4 sm:mb-6">
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                            <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Filter & Pencarian</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                            {/* Search Box */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari nama atau NISN..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2 sm:py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-school-green focus:border-transparent transition-all placeholder-gray-400"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        <XCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </button>
                                )}
                            </div>

                            {/* Jurusan Filter */}
                            <div className="relative">
                                <select
                                    value={selectedJurusan}
                                    onChange={(e) => setSelectedJurusan(e.target.value)}
                                    className="block w-full pl-3 sm:pl-4 pr-9 sm:pr-10 py-2 sm:py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-school-green focus:border-transparent transition-all appearance-none cursor-pointer"
                                >
                                    {uniqueJurusan.map((jurusan) => (
                                        <option key={jurusan} value={jurusan}>
                                            {jurusan}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                </div>
                            </div>

                            {/* Clear Filters */}
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <XCircle className="w-4 h-4" />
                                    Reset Filter
                                </button>
                            )}
                        </div>

                        {/* Filter Info */}
                        {hasActiveFilters && (
                            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500">
                                Menampilkan {filteredData.length} dari {data.length} pendaftar
                                {selectedJurusan !== "Semua Jurusan" && (
                                    <span className="ml-1">
                                        • Jurusan: <span className="font-medium text-school-green">{selectedJurusan}</span>
                                    </span>
                                )}
                            </p>
                        )}
                    </div>

                    {/* Desktop Table View - Hidden on mobile */}
                    <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="text-left px-4 lg:px-6 py-3 lg:py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Nama Lengkap
                                        </th>
                                        <th className="text-left px-4 lg:px-6 py-3 lg:py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            NISN
                                        </th>
                                        <th className="text-left px-4 lg:px-6 py-3 lg:py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                            Asal Sekolah
                                        </th>
                                        <th className="text-left px-4 lg:px-6 py-3 lg:py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Jurusan
                                        </th>
                                        <th className="text-left px-4 lg:px-6 py-3 lg:py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="text-left px-4 lg:px-6 py-3 lg:py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
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
                                    ) : filteredData.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                                {hasActiveFilters ? (
                                                    <div>
                                                        <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                                                        <p>Tidak ada hasil yang cocok dengan filter</p>
                                                        <button
                                                            onClick={clearFilters}
                                                            className="mt-2 text-school-green hover:underline"
                                                        >
                                                            Reset filter
                                                        </button>
                                                    </div>
                                                ) : (
                                                    "Belum ada data pendaftar"
                                                )}
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredData.map((siswa) => (
                                            <tr key={siswa.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 lg:px-6 py-3 lg:py-4 font-medium text-gray-900 text-sm">
                                                    {siswa.nama_lengkap}
                                                </td>
                                                <td className="px-4 lg:px-6 py-3 lg:py-4 text-gray-600 font-mono text-sm">
                                                    {siswa.nisn}
                                                </td>
                                                <td className="px-4 lg:px-6 py-3 lg:py-4 text-gray-600 text-sm hidden lg:table-cell">
                                                    {siswa.asal_sekolah}
                                                </td>
                                                <td className="px-4 lg:px-6 py-3 lg:py-4">
                                                    <span className="inline-flex items-center px-2 py-0.5 lg:px-2.5 lg:py-1 rounded-full text-xs font-medium bg-school-green/10 text-school-green">
                                                        {siswa.jurusan_pilihan}
                                                    </span>
                                                </td>
                                                <td className="px-4 lg:px-6 py-3 lg:py-4">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 lg:px-2.5 lg:py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                                            siswa.status
                                                        )}`}
                                                    >
                                                        {getStatusIcon(siswa.status)}
                                                        {siswa.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 lg:px-6 py-3 lg:py-4">
                                                    <select
                                                        value={siswa.status}
                                                        onChange={(e) => handleStatusChange(siswa.id, e.target.value)}
                                                        disabled={updatingId === siswa.id}
                                                        className="text-sm rounded-lg border border-gray-300 px-2 py-1 lg:px-3 lg:py-1.5 focus:border-school-green focus:outline-none focus:ring-1 focus:ring-school-green disabled:opacity-50 disabled:cursor-wait"
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

                    {/* Mobile Card View - Shown only on mobile */}
                    <div className="md:hidden space-y-3">
                        {loading ? (
                            <div className="bg-white rounded-lg p-8 text-center text-gray-500 shadow-sm border border-gray-100">
                                <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                                Memuat data...
                            </div>
                        ) : filteredData.length === 0 ? (
                            <div className="bg-white rounded-lg p-8 text-center text-gray-500 shadow-sm border border-gray-100">
                                {hasActiveFilters ? (
                                    <div>
                                        <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                                        <p className="text-sm">Tidak ada hasil yang cocok</p>
                                        <button
                                            onClick={clearFilters}
                                            className="mt-2 text-school-green hover:underline text-sm"
                                        >
                                            Reset filter
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-sm">Belum ada data pendaftar</p>
                                )}
                            </div>
                        ) : (
                            filteredData.map((siswa) => (
                                <div
                                    key={siswa.id}
                                    className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                                >
                                    {/* Card Header - Always visible */}
                                    <button
                                        onClick={() => setExpandedCard(expandedCard === siswa.id ? null : siswa.id)}
                                        className="w-full p-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex-1 min-w-0 mr-3">
                                            <h4 className="font-medium text-gray-900 text-sm truncate">{siswa.nama_lengkap}</h4>
                                            <p className="text-xs text-gray-500 font-mono mt-0.5">NISN: {siswa.nisn}</p>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <span
                                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(siswa.status)}`}
                                            >
                                                {getStatusIcon(siswa.status)}
                                                <span className="hidden xs:inline">{siswa.status}</span>
                                            </span>
                                            <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expandedCard === siswa.id ? 'rotate-90' : ''}`} />
                                        </div>
                                    </button>

                                    {/* Card Body - Expandable */}
                                    {expandedCard === siswa.id && (
                                        <div className="border-t border-gray-100 p-3 bg-gray-50/50 space-y-3">
                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-0.5">Asal Sekolah</p>
                                                    <p className="text-gray-900 text-xs font-medium">{siswa.asal_sekolah}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-0.5">Jurusan</p>
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-school-green/10 text-school-green">
                                                        {siswa.jurusan_pilihan}
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1.5">Ubah Status</p>
                                                <select
                                                    value={siswa.status}
                                                    onChange={(e) => handleStatusChange(siswa.id, e.target.value)}
                                                    disabled={updatingId === siswa.id}
                                                    className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 focus:border-school-green focus:outline-none focus:ring-1 focus:ring-school-green disabled:opacity-50 disabled:cursor-wait bg-white"
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Diterima">Diterima</option>
                                                    <option value="Ditolak">Ditolak</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
