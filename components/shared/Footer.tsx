import { CONTACT_EMAIL } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="py-16 text-center print:hidden">
      <p className="text-[13px] text-tertiary">
        Questions?{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-secondary hover:text-primary transition-colors"
        >
          {CONTACT_EMAIL}
        </a>
      </p>
      <p className="text-[12px] text-tertiary mt-2">
        Genesis Labs &middot; 2026
      </p>
    </footer>
  );
}
