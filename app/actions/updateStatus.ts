"use server";

import { createClient } from "@supabase/supabase-js";

export type UpdateStatusResult = {
    success: boolean;
    error?: string;
};

// Create admin client with service role key (bypasses RLS)
function getAdminClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        throw new Error("Missing Supabase environment variables for admin client");
    }

    return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}

export async function updateStudentStatus(
    id: string,
    status: string
): Promise<UpdateStatusResult> {
    if (!id || !status) {
        return { success: false, error: "ID dan status harus diisi" };
    }

    const validStatuses = ["Pending", "Diterima", "Ditolak"];
    if (!validStatuses.includes(status)) {
        return { success: false, error: "Status tidak valid" };
    }

    try {
        const supabaseAdmin = getAdminClient();

        const { data, error } = await supabaseAdmin
            .from("calon_siswa")
            .update({ status })
            .eq("id", id)
            .select();

        console.log("Update result - data:", data, "error:", error);

        if (error) {
            return { success: false, error: error.message };
        }

        if (!data || data.length === 0) {
            return { success: false, error: "Tidak ada data yang diupdate" };
        }

        return { success: true };
    } catch (err) {
        console.error("Update error:", err);
        return { success: false, error: "Gagal mengupdate status. Pastikan SUPABASE_SERVICE_ROLE_KEY sudah dikonfigurasi." };
    }
}


