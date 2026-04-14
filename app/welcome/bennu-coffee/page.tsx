import Link from "next/link";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import Infographic from "@/components/welcome/Infographic";
import VideoGrid from "@/components/welcome/VideoGrid";
import { BENNU_CLIENT } from "@/lib/config";

export const metadata = {
  title: `Welcome — ${BENNU_CLIENT.companyName} | Genesis Labs`,
};

export default function WelcomePage() {
  return (
    <>
      <NavBar clientName={BENNU_CLIENT.companyName} />

      {/* Hero */}
      <section className="pt-[140px] pb-12 relative">
        <div className="absolute top-[60px] -left-[20%] -right-[20%] bottom-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(37,99,235,0.04)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-[780px] mx-auto px-6 relative">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.06em] text-accent uppercase bg-accent-light border border-accent-border px-3.5 py-1 rounded-full mb-5">
            Client Portal
          </span>
          <h1 className="text-[clamp(28px,5vw,42px)] font-[800] tracking-[-0.04em] leading-[1.1] text-primary">
            {BENNU_CLIENT.welcomeHeadline}
          </h1>
          <p className="text-[16px] text-secondary leading-relaxed mt-5 max-w-[600px]">
            {BENNU_CLIENT.welcomeBody}
          </p>

          {/* Meta row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-border">
            {[
              { label: "Date", value: BENNU_CLIENT.date },
              { label: "Location", value: BENNU_CLIENT.location },
              { label: "Locations", value: String(BENNU_CLIENT.locations) },
              { label: "Engagements", value: "2" },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-[11px] font-medium text-tertiary uppercase tracking-[0.06em]">
                  {item.label}
                </div>
                <div className="text-[15px] font-semibold text-primary mt-1">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infographic */}
      <Infographic
        src={BENNU_CLIENT.coverImageUrl}
        alt="Bennu Resurrection: A Strategic Growth Framework"
      />

      {/* Videos */}
      <section className="py-8">
        <div className="max-w-[780px] mx-auto px-6">
          <h2 className="text-[24px] font-[800] tracking-[-0.03em] text-primary mb-2">
            Watch These First
          </h2>
          <p className="text-[15px] text-secondary mb-6">
            Two short videos that explain the strategy and execution plan in
            detail.
          </p>
        </div>
      </section>
      <VideoGrid />

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-[780px] mx-auto px-6 text-center">
          <Link
            href="/onboard/bennu-coffee"
            className="inline-flex items-center gap-2 bg-primary text-white text-[15px] font-semibold px-8 py-4 rounded-[10px] hover:bg-primary/90 transition-colors shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]"
          >
            Review &amp; Sign Your Engagement Letters
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
