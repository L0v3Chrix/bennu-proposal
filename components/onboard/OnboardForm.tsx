"use client";

import { useState } from "react";
import EngagementLetters from "./EngagementLetter";
import CredentialForm from "./CredentialForm";
import PaymentSelector from "./PaymentSelector";
import SignatureSection from "./SignatureSection";

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

  if (isSubmitted) {
    return (
      <section className="py-24">
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
