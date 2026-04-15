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
      <div className="text-[13px] text-secondary font-semibold tracking-[-0.01em]">
        {clientName}
      </div>
    </nav>
  );
}
