"use server";

const API = `${process.env.NEXT_PUBLIC_API_URL || "https://api.bayshorecommunication.com"}/api/v1`;

export type EnterpriseInquiryInput = {
  full_name: string;
  email: string;
  company_name: string;
  company_size: string;
  phone?: string;
  message?: string;
};

export type ActionResult = { success: boolean; message: string };

// Public endpoint — visitors filling out the pricing page's "Contact Sales"
// modal may not be signed in yet, so no auth header here.
export async function submitEnterpriseInquiryAction(
  data: EnterpriseInquiryInput,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API}/sales-leads/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });
    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      const detail = body?.detail;
      const message =
        typeof detail === "string"
          ? detail
          : Array.isArray(detail)
            ? detail.map((d: any) => d?.msg).filter(Boolean).join(", ")
            : "Failed to submit inquiry. Please try again.";
      return { success: false, message };
    }

    return { success: true, message: "Inquiry submitted." };
  } catch {
    return { success: false, message: "Network error. Please try again." };
  }
}
