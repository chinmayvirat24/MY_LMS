import type { AccessType, Course } from "@/lib/types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function extractYoutubeId(url: string) {
  const match =
    url.match(/v=([a-zA-Z0-9_-]{11})/) ||
    url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);

  return match?.[1] ?? "dQw4w9WgXcQ";
}

export function buildEmbedUrl(videoId: string) {
  return `https://www.youtube.com/embed/${videoId}`;
}

export function buildYoutubeThumbnail(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function formatCurrency(amount: number | null) {
  if (!amount) {
    return "Free";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (!hours) {
    return `${mins} min`;
  }

  return `${hours}h ${mins}m`;
}

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
}

export function percentage(value: number, total: number) {
  if (total === 0) {
    return 0;
  }

  return Math.round((value / total) * 100);
}

export function getAccessBadge(accessType: AccessType, price: number | null) {
  if (accessType === "free") {
    return "Free";
  }

  if (accessType === "paid") {
    return formatCurrency(price);
  }

  return "Subscription";
}

export function buildCourseArtwork(
  title: string,
  category: string,
  from: string,
  to: string
) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" fill="none">
      <rect width="1200" height="800" rx="48" fill="${from}" />
      <rect x="40" y="40" width="1120" height="720" rx="40" fill="url(#g)" />
      <circle cx="210" cy="220" r="120" fill="white" fill-opacity="0.22" />
      <circle cx="950" cy="180" r="80" fill="white" fill-opacity="0.2" />
      <path d="M782 550C894 510 1030 560 1086 668" stroke="white" stroke-opacity="0.25" stroke-width="24" stroke-linecap="round" />
      <rect x="100" y="100" width="540" height="480" rx="38" fill="white" fill-opacity="0.18" />
      <rect x="138" y="148" width="320" height="22" rx="11" fill="white" fill-opacity="0.76" />
      <rect x="138" y="196" width="236" height="18" rx="9" fill="white" fill-opacity="0.42" />
      <rect x="138" y="280" width="284" height="188" rx="28" fill="white" fill-opacity="0.3" />
      <rect x="486" y="310" width="88" height="88" rx="24" fill="white" fill-opacity="0.24" />
      <path d="M532 334L532 374L567 354L532 334Z" fill="white" fill-opacity="0.82" />
      <circle cx="840" cy="470" r="150" fill="white" fill-opacity="0.14" />
      <circle cx="806" cy="430" r="28" fill="#111827" />
      <circle cx="876" cy="430" r="28" fill="#111827" />
      <circle cx="842" cy="480" r="72" fill="white" />
      <circle cx="818" cy="454" r="12" fill="#111827" />
      <circle cx="866" cy="454" r="12" fill="#111827" />
      <ellipse cx="842" cy="492" rx="16" ry="12" fill="#111827" />
      <text x="100" y="660" fill="white" font-size="64" font-family="Inter, Segoe UI, sans-serif" font-weight="700">${title}</text>
      <text x="100" y="716" fill="white" fill-opacity="0.84" font-size="28" font-family="Inter, Segoe UI, sans-serif">${category}</text>
      <defs>
        <linearGradient id="g" x1="100" y1="100" x2="1120" y2="760" gradientUnits="userSpaceOnUse">
          <stop stop-color="${from}" />
          <stop offset="1" stop-color="${to}" />
        </linearGradient>
      </defs>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function getCourseAction(course: Course, accessible: boolean) {
  if (accessible) {
    return {
      label: "Continue Learning",
      href: `/learn/${course.slug}/${course.sections[0]?.lessons[0]?.id ?? ""}`
    };
  }

  if (course.accessType === "free") {
    return {
      label: "Enroll Free",
      href: `/courses/${course.slug}`
    };
  }

  if (course.accessType === "paid") {
    return {
      label: "Buy Now",
      href: `/checkout?course=${course.slug}`
    };
  }

  return {
    label: "Subscribe to Access",
    href: "/subscription"
  };
}
