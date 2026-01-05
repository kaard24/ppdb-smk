"use server";

import { supabase } from "@/lib/supabaseClient";

export type CheckStatusResult = {
    success: boolean;
    data?: {
        nama_lengkap: string;
        asal_sekolah: string;
        jurusan_pilihan: string;
        status: string; // "pending", "diterima", "ditolak"
        created_at: string;
    };
    error?: string;
};

export async function checkStatus(
    formData: FormData
): Promise<CheckStatusResult> {
    const nisn = formData.get("nisn") as string;

    if (!nisn) {
        return { success: false, error: "NISN harus diisi" };
    }

    const { data, error } = await supabase
        .from("calon_siswa")
        .select("nama_lengkap, asal_sekolah, jurusan_pilihan, status, created_at")
        .eq("nisn", nisn)
        .single();

    if (error) {
        if (error.code === "PGRST116") {
            return { success: false, error: "Data tidak ditemukan. Periksa kembali NISN anda." };
        }
        return { success: false, error: "Terjadi kesalahan saat mengecek status." };
    }

    return {
        success: true,
        data: {
            nama_lengkap: data.nama_lengkap,
            asal_sekolah: data.asal_sekolah,
            jurusan_pilihan: data.jurusan_pilihan,
            status: data.status || "pending", // Default to pending if null
            created_at: data.created_at,
        },
    };
}
