"use client";

import { ENGAGEMENTS, type EngagementData } from "@/lib/config";

function PrintSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <h4 className="text-[11px] font-bold uppercase tracking-[0.04em] mb-2 text-black">
        {title}
      </h4>
      {children}
    </div>
  );
}

function PrintLetterContent({ engagement }: { engagement: EngagementData }) {
  return (
    <div className="break-inside-avoid-page">
      <h3 className="text-[16px] font-bold text-black mb-1">
        {engagement.title}
      </h3>
      <p className="text-[10px] text-gray-500 mb-4">
        {engagement.termMonths} months &middot; {engagement.investment.totalValue}
      </p>

      <PrintSection title="Goal">
        <p className="text-[11px] text-gray-700 leading-relaxed">
          {engagement.goal}
        </p>
      </PrintSection>

      <PrintSection title="Scope of Work">
        <div className="space-y-2">
          {engagement.scope.map((item) => (
            <div key={item.title}>
              <span className="text-[11px] font-semibold text-black">
                {item.title}:
              </span>{" "}
              <span className="text-[10px] text-gray-700">
                {item.description}
              </span>
            </div>
          ))}
        </div>
      </PrintSection>

      {engagement.outOfScope.length > 0 && (
        <PrintSection title="Out of Scope">
          <ul className="space-y-0.5">
            {engagement.outOfScope.map((item) => (
              <li key={item} className="text-[10px] text-gray-700">
                &times; {item}
              </li>
            ))}
          </ul>
        </PrintSection>
      )}

      {engagement.whoDoesWhat && (
        <PrintSection title="Who Does What">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-semibold text-black mb-1">
                Genesis Labs
              </p>
              <ul className="space-y-0.5">
                {engagement.whoDoesWhat.genesis.map((item) => (
                  <li key={item} className="text-[10px] text-gray-700">
                    &#x2713; {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-black mb-1">
                Bennu Coffee
              </p>
              <ul className="space-y-0.5">
                {engagement.whoDoesWhat.bennu.map((item) => (
                  <li key={item} className="text-[10px] text-gray-700">
                    &#x2713; {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </PrintSection>
      )}

      <PrintSection title="Roadmap">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left py-1 pr-3 font-semibold text-black">
                Phase
              </th>
              <th className="text-left py-1 pr-3 font-semibold text-black">
                Timeline
              </th>
              <th className="text-left py-1 font-semibold text-black">
                Milestones
              </th>
            </tr>
          </thead>
          <tbody>
            {engagement.roadmap.map((phase) => (
              <tr key={phase.phase} className="border-b border-gray-200">
                <td className="py-1 pr-3 text-black">{phase.phase}</td>
                <td className="py-1 pr-3 text-gray-700">{phase.timeline}</td>
                <td className="py-1 text-gray-700">{phase.milestones}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </PrintSection>

      {engagement.passThroughCosts && (
        <PrintSection title="Estimated Pass-Through Costs">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left py-1 pr-3 font-semibold text-black">
                  Item
                </th>
                <th className="text-left py-1 font-semibold text-black">
                  Monthly Est.
                </th>
              </tr>
            </thead>
            <tbody>
              {engagement.passThroughCosts.map((cost) => (
                <tr key={cost.item} className="border-b border-gray-200">
                  <td className="py-1 pr-3 text-gray-700">{cost.item}</td>
                  <td className="py-1 text-gray-700">{cost.estimate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </PrintSection>
      )}

      <PrintSection title="Investment">
        <div className="border border-gray-300 rounded p-3">
          {engagement.investment.rows.map((row) => (
            <div
              key={row.label}
              className="flex justify-between py-0.5 text-[10px]"
            >
              <span className="text-gray-700">{row.label}</span>
              <span className="font-semibold text-black">{row.value}</span>
            </div>
          ))}
          <div className="flex justify-between pt-1 mt-1 border-t border-gray-300 text-[11px]">
            <span className="font-bold text-black">
              {engagement.investment.totalLabel}
            </span>
            <span className="font-bold text-black">
              {engagement.investment.totalValue}
            </span>
          </div>
        </div>
      </PrintSection>

      <PrintSection title="Payment Terms">
        <p className="text-[10px] text-gray-700 leading-relaxed">
          {engagement.paymentTerms}
        </p>
      </PrintSection>

      <PrintSection title="Commitment Structure">
        <p className="text-[10px] text-gray-700 leading-relaxed">
          {engagement.commitment}
        </p>
      </PrintSection>

      <PrintSection title="Client Responsibilities">
        <p className="text-[10px] font-semibold text-black mb-0.5">
          To Activate:
        </p>
        <ul className="space-y-0.5 mb-2">
          {engagement.clientResponsibilities.toActivate.map((item) => (
            <li key={item} className="text-[10px] text-gray-700">
              &#x2713; {item}
            </li>
          ))}
        </ul>
        <p className="text-[10px] font-semibold text-black mb-0.5">
          During Engagement:
        </p>
        <ul className="space-y-0.5">
          {engagement.clientResponsibilities.during.map((item) => (
            <li key={item} className="text-[10px] text-gray-700">
              &#x2713; {item}
            </li>
          ))}
        </ul>
      </PrintSection>
    </div>
  );
}

interface PrintableEngagementLettersProps {
  signerName: string;
  signerDate: string;
  paymentPlan: "monthly" | "full";
  paymentLabel: string;
  paymentTotal: number;
}

export default function PrintableEngagementLetters({
  signerName,
  signerDate,
  paymentPlan,
  paymentLabel,
  paymentTotal,
}: PrintableEngagementLettersProps) {
  return (
    <div className="hidden print:block print:text-black">
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-black">
        <h1 className="text-[20px] font-bold tracking-tight">
          Bennu Coffee &mdash; Engagement Letters
        </h1>
        <p className="text-[11px] text-gray-500 mt-1">
          Genesis Labs &middot; Signed {signerDate}
        </p>
      </div>

      {/* Each engagement letter */}
      {ENGAGEMENTS.map((eng, idx) => (
        <div key={eng.id}>
          <PrintLetterContent engagement={eng} />
          {idx < ENGAGEMENTS.length - 1 && (
            <hr className="my-6 border-gray-400" />
          )}
        </div>
      ))}

      {/* Payment summary */}
      <div className="mt-6 pt-4 border-t-2 border-black">
        <h3 className="text-[14px] font-bold text-black mb-2">
          Selected Payment Plan
        </h3>
        <p className="text-[11px] text-gray-700">
          {paymentLabel} &mdash; ${paymentTotal.toLocaleString()}
          {paymentPlan === "full" && " (13% discount applied)"}
        </p>
      </div>

      {/* Signature block */}
      <div className="mt-6 pt-4 border-t-2 border-black">
        <h3 className="text-[14px] font-bold text-black mb-4">Signatures</h3>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-[10px] text-gray-500 mb-1">Bennu Coffee</p>
            <p className="text-[14px] font-semibold italic text-black border-b border-black pb-1 mb-1">
              {signerName}
            </p>
            <p className="text-[10px] text-gray-700">
              Steve Williams, Owner
            </p>
            <p className="text-[10px] text-gray-500 mt-1">
              Date: {signerDate}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 mb-1">Genesis Labs</p>
            <p className="text-[14px] font-semibold italic text-black border-b border-black pb-1 mb-1">
              Chrix Colvard
            </p>
            <p className="text-[10px] text-gray-700">
              Chrix Colvard, Founder
            </p>
            <p className="text-[10px] text-gray-500 mt-1">
              Date: 2026-04-09
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-3 border-t border-gray-300 text-center">
        <p className="text-[9px] text-gray-400">
          Genesis Labs &middot; chrix@raizethevibe.com &middot; This document was generated from the Bennu Coffee Client Portal
        </p>
      </div>
    </div>
  );
}
