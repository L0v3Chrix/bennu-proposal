import { NextRequest, NextResponse } from "next/server";

const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1493332224416944158/ZkmlIouDKEV9PkBAmcMjSB-fuzSLgPCYOdhqZThAy5VouqwenHxDj0fKg6UKvBY61dzH";

export async function POST(request: NextRequest) {
  try {
    const { event, page, label, userAgent: ua } = await request.json();

    if (event !== "page_visit") {
      return NextResponse.json({ ok: true });
    }

    const ip =
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip") ??
      "unknown";
    const userAgent = ua ?? request.headers.get("user-agent") ?? "unknown";
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "America/Chicago",
      dateStyle: "short",
      timeStyle: "medium",
    });

    const isMobile = /mobile|iphone|android/i.test(userAgent);
    const device = isMobile ? "Mobile" : "Desktop";

    const pageLabels: Record<string, string> = {
      "/welcome/bennu-coffee": "Welcome Page",
      "/onboard/bennu-coffee": "Onboarding Portal",
    };
    const pageName = pageLabels[page] ?? page;

    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `**Steve is on the portal** — ${pageName}`,
        embeds: [
          {
            title: `Page Visit: ${pageName}`,
            color: 0x2563eb,
            fields: [
              { name: "Page", value: label || pageName, inline: true },
              { name: "Device", value: device, inline: true },
              { name: "Time", value: timestamp, inline: true },
            ],
            footer: { text: `IP: ${ip}` },
          },
        ],
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Track error:", error);
    return NextResponse.json({ ok: true });
  }
}
