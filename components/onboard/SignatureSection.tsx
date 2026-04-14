"use client";

import { ENGAGEMENTS, PAYMENT_OPTIONS } from "@/lib/config";

interface SignatureSectionProps {
  paymentPlan: "monthly" | "full" | null;
  signerName: string;
  signerDate: string;
  onSignerNameChange: (value: string) => void;
  onSignerDateChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function SignatureSection({
  paymentPlan,
  signerName,
  signerDate,
  onSignerNameChange,
  onSignerDateChange,
  onSubmit,
  isSubmitting,
}: SignatureSectionProps) {
  const selectedPlan = paymentPlan
    ? PAYMENT_OPTIONS[paymentPlan]
    : null;
  const dueAmount = selectedPlan
    ? `$${selectedPlan.firstPayment.toLocaleString()}`
    : "$\u2014";
  const dueLabel =
    paymentPlan === "full"
      ? "one-time payment"
      : "first monthly payment";

  const canSubmit = signerName.trim() && signerDate && paymentPlan;

  return (
    <section id="sign" className="py-12">
      <div className="max-w-[780px] mx-auto px-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-[12px] font-bold">
            4
          </span>
          <h2 className="text-[24px] font-[800] tracking-[-0.03em] text-primary">
            Sign &amp; Activate
          </h2>
        </div>
        <p className="text-[15px] text-secondary mb-8 ml-9">
          By signing below, you agree to the terms of both engagement letters
          and authorize Genesis Labs to begin work.
        </p>

        <div className="ml-9">
          {/* Summary */}
          <div className="bg-surface rounded-[10px] border border-border p-5 mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {ENGAGEMENTS.map((eng) => (
                <span
                  key={eng.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-semibold bg-accent-light text-accent border border-accent-border"
                >
                  {eng.title}
                </span>
              ))}
            </div>
            {selectedPlan && (
              <div className="flex justify-between items-center pt-3 border-t border-border">
                <span className="text-[14px] text-secondary">
                  {paymentPlan === "full"
                    ? "Pay in Full"
                    : "Monthly Payments"}
                </span>
                <span className="text-[18px] font-bold text-primary">
                  ${selectedPlan.total.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Due at signing */}
          {selectedPlan && (
            <div className="bg-success-light border border-success-border rounded-[10px] p-4 mb-6 text-center">
              <span className="text-[14px] text-success font-semibold">
                Due at signing: {dueAmount} ({dueLabel})
              </span>
            </div>
          )}

          {/* Signature grid */}
          <div className="bg-elevated rounded-[14px] border border-border p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Client side */}
              <div>
                <h4 className="text-[13px] font-bold text-primary mb-4">
                  Bennu Coffee
                </h4>
                <div className="mb-4">
                  <label className="block text-[12px] font-medium text-secondary mb-1.5">
                    Signature
                  </label>
                  <input
                    type="text"
                    value={signerName}
                    onChange={(e) => onSignerNameChange(e.target.value)}
                    placeholder="Type your full name to sign"
                    className="w-full px-3 py-2.5 bg-surface border border-border rounded-[10px] text-[14px] text-primary placeholder:text-tertiary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors font-medium italic"
                  />
                </div>
                <div className="text-[13px] text-secondary mb-3">
                  Steve Williams, Owner
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-secondary mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    value={signerDate}
                    onChange={(e) => onSignerDateChange(e.target.value)}
                    className="w-full px-3 py-2.5 bg-surface border border-border rounded-[10px] text-[14px] text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors"
                  />
                </div>
              </div>

              {/* Genesis Labs side */}
              <div>
                <h4 className="text-[13px] font-bold text-primary mb-4">
                  Genesis Labs
                </h4>
                <div className="mb-4">
                  <label className="block text-[12px] font-medium text-secondary mb-1.5">
                    Signature
                  </label>
                  <input
                    type="text"
                    value="Chrix Colvard"
                    readOnly
                    className="w-full px-3 py-2.5 bg-surface border border-border rounded-[10px] text-[14px] text-tertiary font-medium italic cursor-not-allowed"
                  />
                </div>
                <div className="text-[13px] text-secondary mb-3">
                  Chrix Colvard, Founder
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-secondary mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    value="2026-04-09"
                    readOnly
                    className="w-full px-3 py-2.5 bg-surface border border-border rounded-[10px] text-[14px] text-tertiary cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="mt-8 pt-6 border-t border-border text-center">
              <button
                type="button"
                onClick={onSubmit}
                disabled={!canSubmit || isSubmitting}
                className="inline-flex items-center gap-2 bg-accent text-white text-[15px] font-semibold px-10 py-4 rounded-[10px] hover:bg-accent/90 transition-colors shadow-[0_1px_3px_rgba(0,0,0,0.06)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? "Submitting..." : "Sign & Submit"}
              </button>
              {!paymentPlan && (
                <p className="text-[12px] text-red-500 mt-3">
                  Please select a payment plan above before signing.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
