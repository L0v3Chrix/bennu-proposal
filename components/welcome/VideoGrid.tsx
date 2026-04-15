"use client";

import { useEffect, useRef } from "react";
import { BENNU_VIDEOS } from "@/lib/config";
import { trackEvent } from "@/lib/journey";

function TrackedVideo({
  video,
}: {
  video: { url: string; title: string; description: string };
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playStartRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.youtube.com") return;

      try {
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;

        if (data.event === "onStateChange") {
          const state = data.info;
          if (state === 1) {
            // Playing
            playStartRef.current = Date.now();
            trackEvent({
              type: "video_play",
              page: "/welcome/bennu-coffee",
              label: video.title,
            });
          } else if (state === 2 || state === 0) {
            // Paused or ended
            const start = playStartRef.current;
            const duration = start ? Date.now() - start : 0;
            trackEvent({
              type: "video_pause",
              page: "/welcome/bennu-coffee",
              label: video.title,
              durationMs: duration,
              meta: { ended: state === 0 ? 1 : 0 },
            });
            playStartRef.current = null;
          }
        }
      } catch {
        // Not a YouTube message
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [video.title]);

  // Enable YouTube JS API by adding enablejsapi=1
  const embedUrl = video.url.includes("?")
    ? `${video.url}&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`
    : `${video.url}?enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`;

  return (
    <div className="bg-elevated rounded-[14px] border border-border overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="aspect-video relative">
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      <div className="p-5">
        <h3 className="text-[15px] font-bold text-primary tracking-[-0.02em]">
          {video.title}
        </h3>
        <p className="text-[13px] text-secondary mt-1 leading-relaxed">
          {video.description}
        </p>
      </div>
    </div>
  );
}

export default function VideoGrid() {
  const videos = [BENNU_VIDEOS.phoenix, BENNU_VIDEOS.blueprint];

  return (
    <section className="py-12">
      <div className="max-w-[780px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video) => (
            <TrackedVideo key={video.title} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
