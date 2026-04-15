"use client";

import { useState, useRef } from "react";
import { ENGAGEMENTS, type EngagementData } from "@/lib/config";
import { trackEvent } from "@/lib/journey";

function LetterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <h4 className="text-[13px] font-bold text-primary uppercase tracking-[0.04em] mb-3">
        {title}
      </h4>
      {children}
    </div>
  );
}

function LetterContent({ engagement }: { engagement: EngagementData }) {
  return (
    <div className="bg-elevated rounded-[14px] border border-border p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
      {/* Goal */}
      <LetterSection title="Goal">
        <p className="text-[14px] text-secondary leading-relaxed">
          {engagement.goal}
        </p>
      </LetterSection>

      {/* Scope */}
      <LetterSection title="Scope of Work">
        <div className="space-y-4">
          {engagement.scope.map((item) => (
            <div key={item.title}>
              <h5 className="text-[14px] font-semibold text-primary">
                {item.title}
              </h5>
              <p className="text-[13px] text-secondary leading-relaxed mt-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </LetterSection>

      {/* Out of Scope */}
      {engagement.outOfScope.length > 0 && (
        <LetterSection title="Out of Scope">
          <ul className="space-y-1.5">
            {engagement.outOfScope.map((item) => (
              <li
                key={item}
                className="text-[13px] text-secondary flex items-start gap-2"
              >
                <span className="text-tertiary mt-0.5">&times;</span>
                {item}
              </li>
            ))}
          </ul>
        </LetterSection>
      )}

      {/* Who Does What */}
      {engagement.whoDoesWhat && (
        <LetterSection title="Who Does What">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-[13px] font-semibold text-primary mb-2">
                Genesis Labs (Strategy + Coordination)
              </h5>
              <ul className="space-y-1.5">
                {engagement.whoDoesWhat.genesis.map((item) => (
                  <li
                    key={item}
                    className="text-[13px] text-secondary flex items-start gap-2"
                  >
                    <span className="text-accent">&#x2713;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-[13px] font-semibold text-primary mb-2">
                Bennu Coffee (Execution)
              </h5>
              <ul className="space-y-1.5">
                {engagement.whoDoesWhat.bennu.map((item) => (
                  <li
                    key={item}
                    className="text-[13px] text-secondary flex items-start gap-2"
                  >
                    <span className="text-accent">&#x2713;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </LetterSection>
      )}

      {/* Communication */}
      {engagement.communication && (
        <LetterSection title="Communication">
          <div className="space-y-3">
            {engagement.communication.map((item) => (
              <div key={item.title}>
                <h5 className="text-[14px] font-semibold text-primary">
                  {item.title}
                </h5>
                <p className="text-[13px] text-secondary mt-0.5">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </LetterSection>
      )}

      {/* Roadmap */}
      <LetterSection title="Roadmap">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 font-semibold text-primary">
                  Phase
                </th>
                <th className="text-left py-2 pr-4 font-semibold text-primary">
                  Timeline
                </th>
                <th className="text-left py-2 font-semibold text-primary">
                  Milestones
                </th>
              </tr>
            </thead>
            <tbody>
              {engagement.roadmap.map((phase) => (
                <tr key={phase.phase} className="border-b border-border-light">
                  <td className="py-3 pr-4 font-medium text-primary">
                    {phase.phase}
                  </td>
                  <td className="py-3 pr-4 text-secondary">
                    {phase.timeline}
                  </td>
                  <td className="py-3 text-secondary">{phase.milestones}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LetterSection>

      {/* Pass-through costs */}
      {engagement.passThroughCosts && (
        <LetterSection title="Estimated Pass-Through Costs (Bennu Controls)">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 font-semibold text-primary">
                    Item
                  </th>
                  <th className="text-left py-2 font-semibold text-primary">
                    Monthly Estimate
                  </th>
                </tr>
              </thead>
              <tbody>
                {engagement.passThroughCosts.map((cost) => (
                  <tr key={cost.item} className="border-b border-border-light">
                    <td className="py-2 pr-4 text-secondary">{cost.item}</td>
                    <td className="py-2 text-secondary">{cost.estimate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </LetterSection>
      )}

      {/* Investment */}
      <LetterSection title="Investment">
        <div className="bg-surface rounded-[10px] border border-border p-5">
          {engagement.investment.rows.map((row) => (
            <div
              key={row.label}
              className="flex justify-between py-2 text-[14px]"
            >
              <span className="text-secondary">{row.label}</span>
              <span className="font-semibold text-primary">{row.value}</span>
            </div>
          ))}
          <div className="flex justify-between pt-3 mt-2 border-t border-border text-[15px]">
            <span className="font-bold text-primary">
              {engagement.investment.totalLabel}
            </span>
            <span className="font-bold text-primary">
              {engagement.investment.totalValue}
            </span>
          </div>
        </div>
      </LetterSection>

      {/* Payment Terms */}
      <LetterSection title="Payment Terms">
        <p className="text-[13px] text-secondary leading-relaxed">
          {engagement.paymentTerms}
        </p>
      </LetterSection>

      {/* Commitment */}
      <LetterSection title="Commitment Structure">
        <p className="text-[13px] text-secondary leading-relaxed">
          {engagement.commitment}
        </p>
      </LetterSection>

      {/* Client Responsibilities */}
      <LetterSection title="Client Responsibilities">
        <div className="space-y-4">
          <div>
            <h5 className="text-[13px] font-semibold text-primary mb-2">
              To Activate:
            </h5>
            <ul className="space-y-1.5">
              {engagement.clientResponsibilities.toActivate.map((item) => (
                <li
                  key={item}
                  className="text-[13px] text-secondary flex items-start gap-2"
                >
                  <span className="text-accent">&#x2713;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-[13px] font-semibold text-primary mb-2">
              During Engagement:
            </h5>
            <ul className="space-y-1.5">
              {engagement.clientResponsibilities.during.map((item) => (
                <li
                  key={item}
                  className="text-[13px] text-secondary flex items-start gap-2"
                >
                  <span className="text-accent">&#x2713;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </LetterSection>
    </div>
  );
}

export default function EngagementLetters() {
  const [activeTab, setActiveTab] = useState<string>(ENGAGEMENTS[0].id);
  const tabStartRef = useRef<number>(Date.now());

  const handleTabSwitch = (newTabId: string) => {
    const currentTab = ENGAGEMENTS.find((e) => e.id === activeTab);
    if (currentTab) {
      const duration = Date.now() - tabStartRef.current;
      trackEvent({
        type: "section_view",
        page: "/onboard/bennu-coffee",
        label: currentTab.title,
        durationMs: duration,
      });
      trackEvent({
        type: "tab_switch",
        page: "/onboard/bennu-coffee",
        label: `${currentTab.title} → ${ENGAGEMENTS.find((e) => e.id === newTabId)?.title}`,
      });
    }
    tabStartRef.current = Date.now();
    setActiveTab(newTabId);
  };

  return (
    <section id="engagement" className="py-12">
      <div className="max-w-[780px] mx-auto px-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-[12px] font-bold">
            1
          </span>
          <h2 className="text-[24px] font-[800] tracking-[-0.03em] text-primary">
            Review Your Engagement Letters
          </h2>
        </div>
        <p className="text-[15px] text-secondary mb-8 ml-9">
          Read through both engagement letters carefully. These outline exactly
          what we&apos;ll deliver, the timeline, and your investment.
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 ml-9">
          {ENGAGEMENTS.map((eng) => (
            <button
              key={eng.id}
              onClick={() => handleTabSwitch(eng.id)}
              className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold transition-all cursor-pointer ${
                activeTab === eng.id
                  ? "bg-primary text-white"
                  : "bg-elevated text-secondary border border-border hover:border-primary/20"
              }`}
            >
              {eng.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="ml-9">
          {ENGAGEMENTS.map((eng) => (
            <div
              key={eng.id}
              className={activeTab === eng.id ? "block" : "hidden"}
            >
              <LetterContent engagement={eng} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
