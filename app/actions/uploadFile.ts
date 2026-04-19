"use server";

import { auth } from "@/auth";

interface UploadResult {
  ok: boolean;
  url?: string;
  error?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.bayshorecommunication.com";

async function getToken(): Promise<string | null> {
  const session = await auth();
  return (session?.user as { accessToken?: string } | undefined)?.accessToken ?? null;
}

async function uploadToBackend(formData: FormData, endpoint: string): Promise<UploadResult> {
  const token = await getToken();
  if (!token) return { ok: false, error: "Not authenticated." };

  try {
    const response = await fetch(`${API_URL}/api/v1/upload/${endpoint}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      return { ok: false, error: body?.detail || `Upload failed (${response.status}).` };
    }

    const data = await response.json();
    return { ok: true, url: data.url };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Upload error:", msg);
    return { ok: false, error: `Upload failed: ${msg}` };
  }
}

export async function uploadWidgetImageAction(formData: FormData): Promise<UploadResult> {
  return uploadToBackend(formData, "widget/image");
}

export async function uploadWidgetVideoAction(formData: FormData): Promise<UploadResult> {
  return uploadToBackend(formData, "widget/video");
}
