export interface JourneyEvent {
  type: "page_visit" | "video_play" | "video_pause" | "section_view" | "scroll_depth" | "cta_click" | "tab_switch";
  page: string;
  label: string;
  timestamp: number;
  durationMs?: number;
  meta?: Record<string, string | number>;
}

const STORAGE_KEY = "bennu_journey";

export function getJourney(): JourneyEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function trackEvent(event: Omit<JourneyEvent, "timestamp">) {
  if (typeof window === "undefined") return;
  const journey = getJourney();
  journey.push({ ...event, timestamp: Date.now() });
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(journey));
}

export function getSessionStart(): number {
  const journey = getJourney();
  return journey.length > 0 ? journey[0].timestamp : Date.now();
}

export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${minutes}m ${remaining}s`;
}

export function buildJourneySummary(): {
  totalTime: string;
  pageVisits: string[];
  videoEngagement: string[];
  sectionTimes: string[];
  scrollDepth: number;
  tabSwitches: string[];
} {
  const events = getJourney();
  if (events.length === 0) {
    return {
      totalTime: "0s",
      pageVisits: [],
      videoEngagement: [],
      sectionTimes: [],
      scrollDepth: 0,
      tabSwitches: [],
    };
  }

  const sessionStart = events[0].timestamp;
  const totalTime = formatDuration(Date.now() - sessionStart);

  const pageVisits = events
    .filter((e) => e.type === "page_visit")
    .map((e) => {
      const time = new Date(e.timestamp).toLocaleTimeString();
      return `${e.label} (${time})`;
    });

  const videoEvents = events.filter(
    (e) => e.type === "video_play" || e.type === "video_pause"
  );
  const videoMap = new Map<string, number>();
  const videoStarts = new Map<string, number>();

  for (const e of videoEvents) {
    if (e.type === "video_play") {
      videoStarts.set(e.label, e.timestamp);
    } else if (e.type === "video_pause") {
      const start = videoStarts.get(e.label);
      if (start) {
        const prev = videoMap.get(e.label) ?? 0;
        videoMap.set(e.label, prev + (e.timestamp - start));
        videoStarts.delete(e.label);
      }
    }
  }

  // Count still-playing videos
  for (const [label, start] of videoStarts) {
    const prev = videoMap.get(label) ?? 0;
    videoMap.set(label, prev + (Date.now() - start));
  }

  const videoEngagement = Array.from(videoMap.entries()).map(
    ([label, ms]) => `${label}: ${formatDuration(ms)}`
  );

  const sectionEvents = events.filter((e) => e.type === "section_view");
  const sectionTimes = sectionEvents
    .filter((e) => e.durationMs)
    .map((e) => `${e.label}: ${formatDuration(e.durationMs!)}`);

  const maxScroll = events
    .filter((e) => e.type === "scroll_depth")
    .reduce((max, e) => Math.max(max, (e.meta?.depth as number) ?? 0), 0);

  const tabSwitches = events
    .filter((e) => e.type === "tab_switch")
    .map((e) => e.label);

  return {
    totalTime,
    pageVisits,
    videoEngagement,
    sectionTimes,
    scrollDepth: maxScroll,
    tabSwitches,
  };
}
