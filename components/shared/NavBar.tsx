export default function NavBar({ clientName }: { clientName: string }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-3.5 bg-white/92 backdrop-blur-[12px] border-b border-border print:hidden">
      <div>
        <div className="text-[15px] font-[800] tracking-[-0.04em] text-primary">
          Genesis Labs
        </div>
        <div className="text-[11px] text-tertiary font-medium tracking-[0.02em] mt-px">
          Client Portal
        </div>
      </div>
      <div className="flex items-center gap-5">
        <a
          href="/pitch-deck"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-secondary hover:text-primary transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          Your Pitch Deck
        </a>
        <div className="text-[13px] text-secondary font-semibold tracking-[-0.01em]">
          {clientName}
        </div>
      </div>
    </nav>
  );
}
