import { useState } from "react";
import { BiPlus, BiTrash, BiX } from "react-icons/bi";
import { createSetupIntentAction } from "@/app/actions/billing";
import { AddCardForm } from "./AddCardForm";
import { StripeElementsProvider } from "./StripeElementsProvider";
import { PaymentCard } from "./types";

export function PaymentMethodsModal({
  cards,
  autoPayment,
  onClose,
  onSetDefault,
  onRemove,
  onCardAdded,
  onToggleAutoPayment,
}: {
  cards: PaymentCard[];
  autoPayment: boolean;
  onClose: () => void;
  onSetDefault: (id: string) => void;
  onRemove: (id: string) => void;
  onCardAdded: () => void;
  onToggleAutoPayment: () => void;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingSetup, setLoadingSetup] = useState(false);
  const [setupError, setSetupError] = useState<string | null>(null);

  const handleStartAddCard = async () => {
    setLoadingSetup(true);
    setSetupError(null);
    const res = await createSetupIntentAction();
    setLoadingSetup(false);
    if (res.ok && res.data?.client_secret) {
      setClientSecret(res.data.client_secret);
    } else {
      setSetupError(res.error || "Failed to start adding a card.");
    }
  };

  const handleCardAdded = () => {
    setClientSecret(null);
    onCardAdded();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-semibold text-gray-900">
            Manage Payment Methods
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <BiX size={20} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-6 py-5 space-y-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-14 items-center justify-center rounded-md bg-gray-900">
                  <span className="text-xs font-bold text-white">
                    {card.brand}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">
                      •••• {card.last4}
                    </p>
                    {card.isDefault && (
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    Expires {card.expiry}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {!card.isDefault && (
                  <button
                    onClick={() => onSetDefault(card.id)}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700"
                  >
                    Set as default
                  </button>
                )}
                <button
                  onClick={() => onRemove(card.id)}
                  disabled={card.isDefault}
                  title={
                    card.isDefault
                      ? "Set another card as default before removing"
                      : "Remove card"
                  }
                  className="text-gray-400 hover:text-red-600 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors p-1"
                >
                  <BiTrash size={16} />
                </button>
              </div>
            </div>
          ))}

          {clientSecret ? (
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <StripeElementsProvider clientSecret={clientSecret}>
                <AddCardForm
                  onSuccess={handleCardAdded}
                  onCancel={() => setClientSecret(null)}
                />
              </StripeElementsProvider>
            </div>
          ) : (
            <>
              <button
                onClick={handleStartAddCard}
                disabled={loadingSetup}
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 py-3 text-sm font-medium text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors disabled:opacity-60"
              >
                <BiPlus size={16} />
                {loadingSetup ? "Loading…" : "Add New Card"}
              </button>
              {setupError && (
                <p className="mt-2 text-xs text-red-600">{setupError}</p>
              )}
            </>
          )}

          <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4 mt-2">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Automatic Payments
              </p>
              <p className="text-xs text-gray-500">
                {autoPayment
                  ? "Your default card will be charged automatically each cycle."
                  : "You'll need to manually pay each invoice before it's due."}
              </p>
            </div>
            <button
              type="button"
              onClick={onToggleAutoPayment}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors ${
                autoPayment ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  autoPayment ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="border-t border-gray-100 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
