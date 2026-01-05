"use server";

import { z } from "zod";
import { supabase } from "@/lib/supabaseClient";

const pendaftaranSchema = z.object({
    nama_lengkap: z.string().min(3, "Nama lengkap minimal 3 karakter"),
    nisn: z.string().length(10, "NISN harus 10 digit"),
    asal_sekolah: z.string().min(3, "Nama sekolah minimal 3 karakter"),
    jurusan_pilihan: z.string().min(1, "Pilih jurusan"),
});

export type PendaftaranResult = {
    success: boolean;
    message?: string;
    error?: string;
};

export async function submitPendaftaran(
    formData: FormData
): Promise<PendaftaranResult> {
    const rawData = {
        nama_lengkap: formData.get("nama_lengkap"),
        nisn: formData.get("nisn"),
        asal_sekolah: formData.get("asal_sekolah"),
        jurusan_pilihan: formData.get("jurusan_pilihan"),
    };

    // Validate with Zod
    const validation = pendaftaranSchema.safeParse(rawData);
    if (!validation.success) {
        const errorMessage = validation.error.issues
            .map((e) => e.message)
            .join(", ");
        return { success: false, error: errorMessage };
    }

    const data = validation.data;

    // Insert into Supabase
    const { error } = await supabase.from("calon_siswa").insert([
        {
            nama_lengkap: data.nama_lengkap,
            nisn: data.nisn,
            asal_sekolah: data.asal_sekolah,
            jurusan_pilihan: data.jurusan_pilihan,
        },
    ]);

    if (error) {
        // Handle unique constraint violation for NISN
        if (error.code === "23505") {
            return { success: false, error: "NISN sudah terdaftar" };
        }
        return { success: false, error: error.message };
    }

    return { success: true, message: "Pendaftaran berhasil!" };
}
