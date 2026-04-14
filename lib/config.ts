export const BENNU_VIDEOS = {
  phoenix: {
    url: "https://www.youtube.com/embed/V4xpTdhsCdo",
    title: "The Phoenix Turnaround",
    description:
      "The full story — why Bennu, why now, and how we bring it back.",
  },
  blueprint: {
    url: "https://www.youtube.com/embed/mgZHmR3ePnQ",
    title: "Execution Blueprint",
    description:
      "Timelines, milestones, and exactly what we need from you.",
  },
};

export const BENNU_CLIENT = {
  companyName: "Bennu Coffee",
  contactName: "Steve Williams",
  slug: "bennu-coffee",
  welcomeHeadline: "Welcome to Genesis Labs, Steve & Stephanie.",
  welcomeBody:
    "You said yes — now let\u2019s bring Bennu back to life. Watch the orientation videos below, then click through to review and sign your engagement letters.",
  coverImageUrl: "/assets/bennu-coffee/cover-letter-infographic.png",
  location: "Austin, TX",
  locations: 3,
  date: "April 2026",
};

export interface ScopeItem {
  title: string;
  description: string;
}

export interface RoadmapPhase {
  phase: string;
  timeline: string;
  milestones: string;
}

export interface InvestmentRow {
  label: string;
  value: string;
}

export interface EngagementData {
  id: string;
  title: string;
  type: string;
  termMonths: number;
  totalValue: number;
  monthlyRate: number;
  setupFee: number | null;
  goal: string;
  scope: ScopeItem[];
  outOfScope: string[];
  roadmap: RoadmapPhase[];
  investment: {
    rows: InvestmentRow[];
    totalLabel: string;
    totalValue: string;
  };
  paymentTerms: string;
  commitment: string;
  clientResponsibilities: {
    toActivate: string[];
    during: string[];
  };
  whoDoesWhat?: {
    genesis: string[];
    bennu: string[];
  };
  communication?: { title: string; description: string }[];
  passThroughCosts?: { item: string; estimate: string }[];
}

export const ENGAGEMENTS: EngagementData[] = [
  {
    id: "digital",
    title: "Digital Footprint \u2014 12 Months",
    type: "digital",
    termMonths: 12,
    totalValue: 11000,
    monthlyRate: 500,
    setupFee: 5500,
    goal: "Establish and autonomously manage Bennu Coffee\u2019s complete digital presence across all three Austin locations. Social media, Google Maps, reviews, SMS campaigns, SEO, and customer reactivation \u2014 running 24/7 through AI agent architecture hosted in a secure cloud environment.",
    scope: [
      {
        title: "Autonomous Social Media",
        description:
          "Daily content across Instagram and Facebook capturing Bennu\u2019s voice \u2014 late-night coffee culture, Austin community moments, location highlights. AI-generated content reviewed and refined to match brand tone.",
      },
      {
        title: "Google Maps Optimization",
        description:
          "All three locations (MLK, South Congress, Highland) fully optimized \u2014 photos, descriptions, hours, Q&A, and post schedule. Ongoing monitoring and updates.",
      },
      {
        title: 'Review Generation Engine',
        description:
          'Integrated with cashierless QR ordering system. Automated \u201cHow was your visit?\u201d texts triggered post-purchase. Smart follow-ups for 4\u20135 star experiences.',
      },
      {
        title: 'Database Reactivation (\u201cThe Regular\u201d)',
        description:
          'Targeted campaigns for lapsed customers: \u201cWe miss you\u201d nudges, birthday lattes, seasonal specials. 60-day inactivity triggers. Reactivation sequences designed to feel personal, not automated.',
      },
      {
        title: "SMS Campaigns",
        description:
          "Weekly direct-line texts to your customer base: latte of the month, events at the shop, flash deals, community updates. High open rates, immediate reach.",
      },
      {
        title: 'Search Visibility (SEO)',
        description:
          'Local SEO targeting \u201c24 hour coffee Austin,\u201d \u201clate night coffee shop,\u201d and location-specific terms. Content strategy, citation building, and technical optimization.',
      },
      {
        title: "Secure Cloud Environment",
        description:
          "All agent architecture hosted in secure cloud with monitoring, maintenance, and infrastructure management included. No action required from Bennu.",
      },
    ],
    outOfScope: [
      "Paid social media advertising / Google Ads",
      "Custom website redesign or Shopify development",
      "Physical signage, print media, or traditional advertising",
      "Community Relaunch Program deliverables",
    ],
    roadmap: [
      {
        phase: "Setup & Foundation",
        timeline: "Weeks 1\u20132",
        milestones:
          "Brand voice interview \u00b7 Cloud environment provisioned \u00b7 Social media agents trained \u00b7 GMB optimization \u00b7 Cashierless system integration mapped",
      },
      {
        phase: "Activation",
        timeline: "Weeks 2\u20133",
        milestones:
          "Social posting live \u00b7 Review engine active \u00b7 First SMS campaign \u00b7 Database reactivation launched",
      },
      {
        phase: "Optimization",
        timeline: "Month 2\u20133",
        milestones:
          "Data-driven adjustments \u00b7 First monthly report \u00b7 SEO foundations \u00b7 A/B testing",
      },
      {
        phase: "Autonomous Ops",
        timeline: "Month 4\u201312",
        milestones:
          "Systems running autonomously \u00b7 Monthly reports \u00b7 Quarterly strategy reviews",
      },
    ],
    investment: {
      rows: [
        { label: "Month 1 (Setup + Launch)", value: "$5,500" },
        { label: "Months 2\u201312 (Monthly Retainer)", value: "$500/month" },
      ],
      totalLabel: "Total Engagement Value",
      totalValue: "$11,000",
    },
    paymentTerms:
      "Month 1 ($5,500) due at signing. Monthly retainer ($500) due on the 15th each month, months 2\u201312.",
    commitment:
      "Genesis Labs commits to the full 12-month engagement. Bennu Coffee is month-to-month with cancellation at any time after Month 1. Upon cancellation, all data, content, and account access returned within 5 business days.",
    clientResponsibilities: {
      toActivate: [
        "Signed engagement letter returned to Genesis Labs",
        "Month 1 payment received",
        "Access credentials provided (social media, Google Business, POS system)",
      ],
      during: [
        "Review and approve brand voice direction (Week 1 \u2014 ~1 hour)",
        "Provide access to cashierless/QR ordering system data export",
        "Monthly report review (~15 minutes/month)",
      ],
    },
  },
  {
    id: "community",
    title: "Community Relaunch Program \u2014 4 Months",
    type: "community",
    termMonths: 4,
    totalValue: 12000,
    monthlyRate: 3000,
    setupFee: null,
    goal: "Transform Bennu Coffee into Austin\u2019s recovery-friendly coffee shop through two equal pillars: (1) Recovery community employment pipeline that solves your staffing challenges. (2) QR sticker activation game powered by a Blessing Bag program that turns the unhoused situation from a perceived liability into a brand asset.",
    scope: [
      {
        title: "Pillar 1: Recovery Employment Pipeline",
        description:
          "Network activation with sober living houses, treatment centers, and peer recovery coaches. Pre-vetted candidate pipeline, hiring support with interview coordination, and outreach to ~650\u2013900 peer recovery coaches in Austin.",
      },
      {
        title: "Pillar 2: QR Sticker Game + Blessing Bags",
        description:
          "Blessing Bag program with snacks, hygiene items, note from Steve & Stephanie, and Bennu QR stickers. Recipients place stickers around Austin. Recovery event sponsorship (9\u201315 events/year). Street team coordination from 12 AM\u20132 AM on South Congress, 6th Street, Rainey.",
      },
    ],
    outOfScope: [],
    roadmap: [
      {
        phase: "Foundation",
        timeline: "Month 1",
        milestones:
          "Recovery network activated \u00b7 First candidates interviewed \u00b7 Blessing bag program designed \u00b7 Weekly meetings established",
      },
      {
        phase: "Deployment",
        timeline: "Month 2",
        milestones:
          "Blessing bags at all 3 locations \u00b7 First event sponsored \u00b7 QR tracking live \u00b7 Hiring pipeline delivering",
      },
      {
        phase: "Momentum",
        timeline: "Month 3",
        milestones:
          "Street team active \u00b7 Multiple events sponsored \u00b7 Coach network expanding \u00b7 Word-of-mouth building",
      },
      {
        phase: "Handoff",
        timeline: "Month 4",
        milestones:
          "Systems documented and handed off \u00b7 Relationships locked \u00b7 Pipeline self-sustaining",
      },
    ],
    investment: {
      rows: [
        {
          label: "Monthly Program Fee",
          value: "$3,000/month \u00d7 4 months",
        },
      ],
      totalLabel: "Total Engagement Value",
      totalValue: "$12,000",
    },
    paymentTerms:
      "$3,000 due on the 15th of each month. Pass-through costs invoiced separately.",
    commitment:
      "Genesis Labs commits to the full 4-month program; all deliverables completed and systems handed off by Month 4. Early termination by client forfeits remaining fees. All relationships, documentation, and systems transfer to Bennu upon completion.",
    clientResponsibilities: {
      toActivate: [
        "Signed engagement letter returned to Genesis Labs",
        "Month 1 payment received",
        "Introduce Chrix to staff for blessing bag training",
      ],
      during: [
        "Attend weekly in-person working meetings (Steve as point person)",
        "Curate and assemble blessing bags for all 3 locations",
        "Print QR codes and stickers (design provided by Genesis Labs)",
        "Schedule and manage street team shifts",
        "Approve event sponsorship spend and pass-through costs",
      ],
    },
    whoDoesWhat: {
      genesis: [
        "Design blessing bag contents and program",
        "Design QR stickers and tracking system",
        "Activate recovery network for hiring",
        "Identify and schedule recovery events",
        "Recruit and coordinate street team",
        "Provide weekly progress reports",
        "Train staff on blessing bag distribution",
      ],
      bennu: [
        "Curate and assemble blessing bags",
        "Print QR codes and stickers",
        "Interview and hire candidates",
        "Approve event sponsorship spend",
        "Schedule street team shifts",
        "Attend weekly working meetings",
        "Manage daily bag distribution",
      ],
    },
    communication: [
      {
        title: "Weekly In-Person Working Meetings",
        description:
          "Chrix and Steve meet once per week. Working sessions, not status calls.",
      },
      {
        title: "Point of Contact",
        description:
          "Steve Williams is primary POC. All coordination flows through Steve.",
      },
      {
        title: "Between Meetings",
        description:
          "Direct access to Chrix via text or email. Same-day response.",
      },
    ],
    passThroughCosts: [
      { item: "Blessing bag supplies", estimate: "$75\u2013150/month" },
      { item: "Street team compensation", estimate: "$100\u2013200/month" },
      { item: "Flyer printing", estimate: "$50\u2013100/month" },
      { item: "Event sponsorships", estimate: "$100\u2013300/event" },
    ],
  },
];

export const PAYMENT_OPTIONS = {
  monthly: {
    label: "Monthly Payments",
    description:
      "Pay each engagement separately on a monthly billing cycle.",
    total: 23000,
    firstPayment: 8500,
    breakdown: [
      { label: "Digital \u2014 Month 1 (Setup + Launch)", value: "$5,500" },
      { label: "Digital \u2014 Months 2\u201312 ($500/mo)", value: "$5,500" },
      {
        label: "Community \u2014 Months 1\u20134 ($3,000/mo)",
        value: "$12,000",
      },
    ],
  },
  full: {
    label: "Pay in Full",
    description:
      "One payment for both engagements. Immediate start, simplified billing.",
    total: 20000,
    firstPayment: 20000,
    savings: 3000,
    savingsPercent: 13,
    breakdown: [
      { label: "Digital Footprint (12 months)", value: "$11,000" },
      { label: "Community Relaunch (4 months)", value: "$12,000" },
      { label: "Bundle Discount", value: "\u2212$3,000" },
    ],
  },
};

export const CREDENTIAL_FIELDS = {
  socialMedia: {
    title: "Social Media & Google",
    fields: [
      { name: "ig_login", label: "Instagram Login", type: "text" as const },
      { name: "ig_pass", label: "Instagram Password", type: "password" as const },
      { name: "fb_login", label: "Facebook Login", type: "text" as const },
      { name: "fb_pass", label: "Facebook Password", type: "password" as const },
      { name: "gmb_email", label: "Google Business Email", type: "email" as const },
      { name: "gmb_pass", label: "Google Business Password", type: "password" as const },
    ],
  },
  pos: {
    title: "QR / POS System",
    fields: [
      { name: "pos_name", label: "POS System Name", type: "text" as const },
      { name: "pos_login", label: "POS Admin Login", type: "text" as const },
      { name: "pos_pass", label: "POS Admin Password", type: "password" as const },
      { name: "sms_platform", label: "SMS Platform", type: "text" as const },
    ],
  },
  community: {
    title: "Community Relaunch Info",
    fields: [
      { name: "num_employees", label: "Current Employee Count (all locations)", type: "text" as const },
      { name: "meeting_pref", label: "Preferred Day/Time for Weekly Meetings", type: "text" as const },
      { name: "recovery_contacts", label: "Known Recovery Community Contacts (if any)", type: "textarea" as const },
      { name: "exclusions", label: "Organizations You DO NOT Want Us to Contact", type: "textarea" as const },
    ],
  },
};

export const CONTACT_EMAIL = "chrix@raizethevibe.com";
