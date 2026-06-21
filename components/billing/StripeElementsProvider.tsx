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
          theme: "stripe",
          variables: {
            colorPrimary: "#2563eb",
            borderRadius: "8px",
          },
        },
      }}
    >
      {children}
    </Elements>
  );
}
