"use client";

import { CREDENTIAL_FIELDS } from "@/lib/config";

interface CredentialFormProps {
  credentials: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

export default function CredentialForm({
  credentials,
  onChange,
}: CredentialFormProps) {
  const sections = [
    CREDENTIAL_FIELDS.socialMedia,
    CREDENTIAL_FIELDS.pos,
    CREDENTIAL_FIELDS.community,
  ];

  return (
    <section id="credentials" className="py-12">
      <div className="max-w-[780px] mx-auto px-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-[12px] font-bold">
            2
          </span>
          <h2 className="text-[24px] font-[800] tracking-[-0.03em] text-primary">
            Access Credentials
          </h2>
        </div>
        <p className="text-[15px] text-secondary mb-8 ml-9">
          We need access to your existing accounts to get started. All
          information is encrypted and used exclusively for this engagement.
        </p>

        <div className="space-y-6 ml-9">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-elevated rounded-[14px] border border-border p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <h3 className="text-[15px] font-bold text-primary mb-4">
                {section.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.fields.map((field) => (
                  <div
                    key={field.name}
                    className={
                      field.type === "textarea" ? "md:col-span-2" : ""
                    }
                  >
                    <label className="block text-[12px] font-medium text-secondary mb-1.5">
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        value={credentials[field.name] || ""}
                        onChange={(e) => onChange(field.name, e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2.5 bg-surface border border-border rounded-[10px] text-[14px] text-primary placeholder:text-tertiary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors resize-none"
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={credentials[field.name] || ""}
                        onChange={(e) => onChange(field.name, e.target.value)}
                        className="w-full px-3 py-2.5 bg-surface border border-border rounded-[10px] text-[14px] text-primary placeholder:text-tertiary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <p className="text-[12px] text-tertiary flex items-center gap-1.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            All information is encrypted and used exclusively for this
            engagement.
          </p>
        </div>
      </div>
    </section>
  );
}
