"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/journey";

export default function JourneyTracker({
  page,
  label,
}: {
  page: string;
  label: string;
}) {
  const sentRef = useRef(false);

  useEffect(() => {
    // Track page visit locally
    trackEvent({ type: "page_visit", page, label });

    // Fire Discord alert (once per page load)
    if (!sentRef.current) {
      sentRef.current = true;
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "page_visit",
          page,
          label,
          userAgent: navigator.userAgent,
        }),
      }).catch(() => {});
    }

    // Track scroll depth
    let maxDepth = 0;
    const handleScroll = () => {
      const depth = Math.round(
        ((window.scrollY + window.innerHeight) /
          document.documentElement.scrollHeight) *
          100
      );
      if (depth > maxDepth) {
        maxDepth = depth;
        if (depth % 25 === 0 && depth > 0) {
          trackEvent({
            type: "scroll_depth",
            page,
            label: `${depth}%`,
            meta: { depth },
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, label]);

  return null;
}
