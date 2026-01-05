"use server";

import { supabase } from "@/lib/supabaseClient";

export type Registrant = {
    nama_lengkap: string;
    asal_sekolah: string;
    jurusan_pilihan: string;
    status: string;
    created_at: string;
};

export type GetRegistrantsResult = {
    success: boolean;
    data?: Registrant[];
    error?: string;
};

export async function getRegistrants(): Promise<GetRegistrantsResult> {
    const { data, error } = await supabase
        .from("calon_siswa")
        .select("nama_lengkap, asal_sekolah, jurusan_pilihan, status, created_at")
        .order("created_at", { ascending: false });

    if (error) {
        return { success: false, error: "Gagal mengambil data pendaftar." };
    }

    return {
        success: true,
        data: data.map((d) => ({
            nama_lengkap: d.nama_lengkap,
            asal_sekolah: d.asal_sekolah,
            jurusan_pilihan: d.jurusan_pilihan,
            status: d.status || "Pending",
            created_at: d.created_at,
        })),
    };
}
