"use client";

import Image from "next/image";

export default function Infographic({ src, alt }: { src: string; alt: string }) {
  return (
    <section className="py-12">
      <div className="max-w-[780px] mx-auto px-6">
        <div className="rounded-[14px] border border-border overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]">
          <Image
            src={src}
            alt={alt}
            width={1536}
            height={2752}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
