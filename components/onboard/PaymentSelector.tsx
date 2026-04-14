"use client";

import { PAYMENT_OPTIONS } from "@/lib/config";

interface PaymentSelectorProps {
  selected: "monthly" | "full" | null;
  onSelect: (plan: "monthly" | "full") => void;
}

export default function PaymentSelector({
  selected,
  onSelect,
}: PaymentSelectorProps) {
  return (
    <section id="payment" className="py-12">
      <div className="max-w-[780px] mx-auto px-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-[12px] font-bold">
            3
          </span>
          <h2 className="text-[24px] font-[800] tracking-[-0.03em] text-primary">
            Choose Your Payment Plan
          </h2>
        </div>
        <p className="text-[15px] text-secondary mb-8 ml-9">
          Select the payment structure that works best for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-9">
          {/* Monthly */}
          <button
            type="button"
            onClick={() => onSelect("monthly")}
            className={`text-left bg-elevated rounded-[14px] border-2 p-6 transition-all cursor-pointer ${
              selected === "monthly"
                ? "border-accent shadow-[0_0_0_1px_rgba(37,99,235,0.2)]"
                : "border-border hover:border-primary/20"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] font-bold text-primary">
                {PAYMENT_OPTIONS.monthly.label}
              </h3>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selected === "monthly"
                    ? "border-accent bg-accent"
                    : "border-border"
                }`}
              >
                {selected === "monthly" && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            </div>
            <p className="text-[13px] text-secondary mb-4">
              {PAYMENT_OPTIONS.monthly.description}
            </p>
            <div className="text-[28px] font-[800] tracking-[-0.03em] text-primary mb-4">
              ${PAYMENT_OPTIONS.monthly.total.toLocaleString()}
            </div>
            <div className="space-y-2 pt-3 border-t border-border">
              {PAYMENT_OPTIONS.monthly.breakdown.map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between text-[13px]"
                >
                  <span className="text-secondary">{row.label}</span>
                  <span className="font-medium text-primary">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-border">
              <div className="text-[13px] text-secondary">
                First payment at signing
              </div>
              <div className="text-[18px] font-bold text-primary">
                ${PAYMENT_OPTIONS.monthly.firstPayment.toLocaleString()}
              </div>
            </div>
          </button>

          {/* Pay in Full */}
          <button
            type="button"
            onClick={() => onSelect("full")}
            className={`text-left bg-elevated rounded-[14px] border-2 p-6 transition-all cursor-pointer relative ${
              selected === "full"
                ? "border-success shadow-[0_0_0_1px_rgba(5,150,105,0.2)]"
                : "border-border hover:border-primary/20"
            }`}
          >
            <span className="absolute -top-3 right-4 bg-success text-white text-[11px] font-bold px-3 py-1 rounded-full">
              Save {PAYMENT_OPTIONS.full.savingsPercent}%
            </span>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] font-bold text-primary">
                {PAYMENT_OPTIONS.full.label}
              </h3>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selected === "full"
                    ? "border-success bg-success"
                    : "border-border"
                }`}
              >
                {selected === "full" && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            </div>
            <p className="text-[13px] text-secondary mb-4">
              {PAYMENT_OPTIONS.full.description}
            </p>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-[28px] font-[800] tracking-[-0.03em] text-primary">
                ${PAYMENT_OPTIONS.full.total.toLocaleString()}
              </span>
              <span className="text-[14px] text-success font-semibold">
                Save ${PAYMENT_OPTIONS.full.savings.toLocaleString()}
              </span>
            </div>
            <div className="space-y-2 pt-3 border-t border-border">
              {PAYMENT_OPTIONS.full.breakdown.map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between text-[13px]"
                >
                  <span className="text-secondary">{row.label}</span>
                  <span
                    className={`font-medium ${
                      row.value.startsWith("\u2212")
                        ? "text-success"
                        : "text-primary"
                    }`}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-border">
              <div className="text-[13px] text-secondary">
                Full payment at signing
              </div>
              <div className="text-[18px] font-bold text-primary">
                ${PAYMENT_OPTIONS.full.firstPayment.toLocaleString()}
              </div>
            </div>
          </button>
        </div>

        <p className="text-[12px] text-tertiary mt-6 ml-9">
          Payment via check. First payment collected at kickoff meeting.
        </p>
      </div>
    </section>
  );
}
