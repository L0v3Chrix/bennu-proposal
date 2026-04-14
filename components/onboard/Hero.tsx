import { BENNU_CLIENT } from "@/lib/config";

export default function Hero() {
  return (
    <section className="pt-[140px] pb-12 relative print:hidden">
      <div className="absolute top-[60px] -left-[20%] -right-[20%] bottom-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(37,99,235,0.04)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-[780px] mx-auto px-6 relative">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.06em] text-accent uppercase bg-accent-light border border-accent-border px-3.5 py-1 rounded-full mb-5">
          Client Portal
        </span>
        <h1 className="text-[clamp(28px,5vw,42px)] font-[800] tracking-[-0.04em] leading-[1.1] text-primary">
          Welcome, Steve &amp; Stephanie.
        </h1>
        <p className="text-[16px] text-secondary leading-relaxed mt-5 max-w-[600px]">
          Review your engagement letters below, provide your account
          credentials, choose your payment plan, and sign to activate. If you
          haven&apos;t watched the orientation videos yet,{" "}
          <a
            href="/welcome/bennu-coffee"
            className="text-accent hover:underline font-medium"
          >
            go back to your welcome page
          </a>
          .
        </p>

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
  );
}
