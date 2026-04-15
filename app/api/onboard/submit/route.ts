import { NextRequest, NextResponse } from "next/server";
import { PAYMENT_OPTIONS, ENGAGEMENTS, CREDENTIAL_FIELDS } from "@/lib/config";

const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1493332224416944158/ZkmlIouDKEV9PkBAmcMjSB-fuzSLgPCYOdhqZThAy5VouqwenHxDj0fKg6UKvBY61dzH";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { signerName, signerDate, paymentPlan, credentials, journey } = body;

    if (!signerName?.trim() || !signerDate || !paymentPlan) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (paymentPlan !== "monthly" && paymentPlan !== "full") {
      return NextResponse.json(
        { error: "Invalid payment plan" },
        { status: 400 }
      );
    }

    const ip =
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip") ??
      "unknown";
    const userAgent = request.headers.get("user-agent") ?? "unknown";
    const timestamp = new Date().toISOString();

    const plan = PAYMENT_OPTIONS[paymentPlan as keyof typeof PAYMENT_OPTIONS];

    // Build credential summary
    const allFields = [
      ...CREDENTIAL_FIELDS.socialMedia.fields,
      ...CREDENTIAL_FIELDS.pos.fields,
      ...CREDENTIAL_FIELDS.community.fields,
    ];

    const credentialLines = allFields
      .filter((f) => credentials[f.name])
      .map(
        (f) =>
          `**${f.label}:** ${f.type === "password" ? "••••••••" : credentials[f.name]}`
      );

    // Build Discord embed
    const embed = {
      title: "Bennu Coffee — Onboarding Form Submitted",
      color: 0x059669,
      fields: [
        {
          name: "Signer",
          value: signerName,
          inline: true,
        },
        {
          name: "Date Signed",
          value: signerDate,
          inline: true,
        },
        {
          name: "Payment Plan",
          value: `${plan.label} — $${plan.total.toLocaleString()}`,
          inline: false,
        },
        {
          name: "Due at Signing",
          value: `$${plan.firstPayment.toLocaleString()}`,
          inline: true,
        },
        {
          name: "Engagements",
          value: ENGAGEMENTS.map((e) => e.title).join("\n"),
          inline: false,
        },
      ],
      footer: {
        text: `IP: ${ip} | ${timestamp}`,
      },
    };

    if (credentialLines.length > 0) {
      embed.fields.push({
        name: "Credentials Provided",
        value: credentialLines.join("\n"),
        inline: false,
      });
    }

    // Journey report
    if (journey) {
      const journeyLines: string[] = [];

      if (journey.totalTime) {
        journeyLines.push(`**Total Session Time:** ${journey.totalTime}`);
      }

      if (journey.pageVisits?.length > 0) {
        journeyLines.push(
          `**Pages Visited:** ${journey.pageVisits.join(" → ")}`
        );
      }

      if (journey.videoEngagement?.length > 0) {
        journeyLines.push(
          `**Video Watch Time:**\n${journey.videoEngagement.join("\n")}`
        );
      }

      if (journey.sectionTimes?.length > 0) {
        journeyLines.push(
          `**Section Time:**\n${journey.sectionTimes.join("\n")}`
        );
      }

      if (journey.scrollDepth) {
        journeyLines.push(`**Max Scroll Depth:** ${journey.scrollDepth}%`);
      }

      if (journey.tabSwitches?.length > 0) {
        journeyLines.push(
          `**Tab Switches:** ${journey.tabSwitches.join(", ")}`
        );
      }

      if (journeyLines.length > 0) {
        embed.fields.push({
          name: "Customer Journey",
          value: journeyLines.join("\n"),
          inline: false,
        });
      }
    }

    // Post to Discord
    const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `**New onboarding submission from ${signerName}** (Bennu Coffee)`,
        embeds: [embed],
      }),
    });

    if (!discordResponse.ok) {
      console.error(
        "Discord webhook failed:",
        discordResponse.status,
        await discordResponse.text()
      );
    }

    return NextResponse.json({
      success: true,
      message: "Onboarding form submitted successfully",
      signerName,
      paymentPlan: plan.label,
      total: plan.total,
    });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
