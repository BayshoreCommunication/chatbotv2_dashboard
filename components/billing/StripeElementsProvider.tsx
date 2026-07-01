"use client";

import { Elements } from "@stripe/react-stripe-js";
import { ReactNode } from "react";
import { getStripe } from "@/lib/stripe";

export function StripeElementsProvider({
  clientSecret,
  children,
}: {
  clientSecret: string;
  children: ReactNode;
}) {
  return (
    <Elements
      stripe={getStripe()}
      options={{
        clientSecret,
        appearance: {
          theme: "flat",
          variables: {
            colorPrimary: "#2563eb",
            colorBackground: "#ffffff",
            colorText: "#111827",
            colorDanger: "#dc2626",
            colorTextSecondary: "#6b7280",
            colorTextPlaceholder: "#9ca3af",
            fontFamily:
              "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
            fontSizeBase: "14px",
            borderRadius: "12px",
            spacingUnit: "4px",
            spacingGridRow: "20px",
          },
          rules: {
            ".Input": {
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "12px 14px",
              boxShadow: "none",
              fontSize: "14px",
              lineHeight: "20px",
              backgroundColor: "#ffffff",
              transition: "border-color 0.15s ease, box-shadow 0.15s ease",
            },
            ".Input:focus": {
              border: "1px solid #2563eb",
              boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.12)",
              outline: "none",
            },
            ".Input::placeholder": {
              color: "#9ca3af",
            },
            ".Label": {
              color: "#374151",
              fontSize: "13px",
              fontWeight: "500",
              marginBottom: "6px",
            },
            ".Tab": {
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
              padding: "10px 14px",
              backgroundColor: "#f9fafb",
              boxShadow: "none",
            },
            ".Tab:hover": {
              border: "1px solid #d1d5db",
              backgroundColor: "#f3f4f6",
            },
            ".Tab--selected": {
              border: "1px solid #2563eb",
              backgroundColor: "#eff6ff",
              color: "#2563eb",
              boxShadow: "none",
            },
            ".TabIcon--selected": {
              fill: "#2563eb",
            },
            ".TabLabel--selected": {
              color: "#2563eb",
            },
            ".Error": {
              color: "#dc2626",
              fontSize: "12px",
            },
            ".CheckboxInput": {
              borderRadius: "4px",
              border: "1px solid #d1d5db",
            },
            ".CheckboxInput--checked": {
              backgroundColor: "#2563eb",
              border: "1px solid #2563eb",
            },
          },
        },
      }}
    >
      {children}
    </Elements>
  );
}
