"use client";

import { useState } from "react";
import EngagementLetters from "./EngagementLetter";
import CredentialForm from "./CredentialForm";
import PaymentSelector from "./PaymentSelector";
import SignatureSection from "./SignatureSection";
import PrintableEngagementLetters from "./PrintableEngagementLetters";
import { PAYMENT_OPTIONS } from "@/lib/config";
import { buildJourneySummary } from "@/lib/journey";

export default function OnboardForm() {
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [paymentPlan, setPaymentPlan] = useState<"monthly" | "full" | null>(
    null
  );
  const [signerName, setSignerName] = useState("");
  const [signerDate, setSignerDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCredentialChange = (name: string, value: string) => {
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!signerName.trim() || !signerDate || !paymentPlan) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/onboard/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          signerName: signerName.trim(),
          signerDate,
          paymentPlan,
          credentials,
          journey: buildJourneySummary(),
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setIsSubmitted(true);
    } catch {
      alert(
        "There was an error submitting. Please try again or contact chrix@raizethevibe.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (isSubmitted) {
    const selectedPlan = paymentPlan
      ? PAYMENT_OPTIONS[paymentPlan]
      : null;

    return (
      <>
        {/* Screen-only confirmation */}
        <section className="py-24 print:hidden">
          <div className="max-w-[780px] mx-auto px-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-light border border-success-border mb-6">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#059669"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-[32px] font-[800] tracking-[-0.04em] text-primary mb-4">
              You&apos;re all set.
            </h2>
            <p className="text-[16px] text-secondary max-w-[480px] mx-auto leading-relaxed">
              Your engagement letters are signed and your information has been
              submitted. Chrix will reach out to schedule your kickoff meeting.
            </p>

            {/* Print / Save button */}
            <button
              type="button"
              onClick={handlePrint}
              className="mt-8 inline-flex items-center gap-2 bg-primary text-white text-[15px] font-semibold px-8 py-4 rounded-[10px] hover:bg-primary/90 transition-colors shadow-[0_1px_3px_rgba(0,0,0,0.06)] cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Save Your Engagement Letters
            </button>
            <p className="text-[12px] text-tertiary mt-2">
              Opens print dialog &mdash; choose &ldquo;Save as PDF&rdquo; to keep a copy for your records
            </p>

            <div className="mt-8 p-5 bg-surface rounded-[14px] border border-border inline-block text-left">
              <div className="text-[13px] text-tertiary mb-1">Next steps:</div>
              <ul className="space-y-2 text-[14px] text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">1.</span>
                  Chrix will schedule your kickoff meeting
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">2.</span>
                  Bring your check to the meeting
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">3.</span>
                  Brand voice interview + systems setup begins
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Print-only: full engagement letters with signature */}
        <PrintableEngagementLetters
          signerName={signerName}
          signerDate={signerDate}
          paymentPlan={paymentPlan!}
          paymentLabel={selectedPlan?.label ?? ""}
          paymentTotal={selectedPlan?.total ?? 0}
        />
      </>
    );
  }

  return (
    <>
      <EngagementLetters />
      <CredentialForm
        credentials={credentials}
        onChange={handleCredentialChange}
      />
      <PaymentSelector selected={paymentPlan} onSelect={setPaymentPlan} />
      <SignatureSection
        paymentPlan={paymentPlan}
        signerName={signerName}
        signerDate={signerDate}
        onSignerNameChange={setSignerName}
        onSignerDateChange={setSignerDate}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
