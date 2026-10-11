import verdiqyImg from "@/assets/verdiqy.jpg";
import novixImg from "@/assets/novix.jpg";
import inamigosLogo from "@/assets/inamigos-logo.png.asset.json";
import eliteCodersLogo from "@/assets/elite-coders-logo.png.asset.json";

export const stats = [
  { v: "28th", l: "GSSoC 2026 global rank" },
  { v: "700+", l: "LeetCode problems solved" },
  { v: "1700+", l: "LeetCode rating" },
  { v: "3★", l: "CodeChef" },
];

export const experiences = [
  {
    org: "Google",
    role: "Google Student Ambassador 2026",
    date: "Apr 2026 – Present",
    place: "India · Remote",
    mark: "G",
    logo: "https://icons.duckduckgo.com/ip3/google.com.ico",
    metrics: [],
    points: [],
    tags: ["Public Speaking", "Community Building"],
  },
  {
    org: "GirlScript Summer of Code",
    role: "Open Source Contributor",
    date: "Apr 2026 – Sep 2026",
    place: "India · Remote",
    mark: "GS",
    logo: "https://icons.duckduckgo.com/ip3/gssoc.girlscript.tech.ico",
    metrics: [
      { v: "#28", l: "of 43,000+" },
      { v: "Top 0.1%", l: "Global ranking" },
      { v: "1,200+", l: "Issues resolved" },
      { v: "49", l: "Repositories" },
    ],
    points: [
      "Increased feature coverage by 30% and reduced bug backlog by 40% across contributed projects.",
    ],
    tags: ["Open Source", "Git", "Software Development"],
  },
  {
    org: "InAmigos Foundation (IAF)",
    role: "AI Web Development Intern",
    date: "Jul 2026 – Aug 2026",
    place: "Remote",
    mark: "IA",
    logo: inamigosLogo.url,
    metrics: [
      { v: "6", l: "UX flows" },
      { v: "4", l: "Sections shipped" },
    ],
    points: [
      "Designed a Figma prototype for the NGO website, mapping UX flows for donation, volunteer registration, impact showcase, testimonials, campaigns, and events.",
      "Launched a 4-section website (Home, About, Services, Contact) using AI-assisted generation tools on a real use case.",
    ],
    tags: ["Figma", "UX", "AI Tools", "Web"],
  },
  {
    org: "Elite Coders",
    role: "Open Source Contributor",
    date: "Jun 2026 – Aug 2026",
    place: "India · Remote",
    mark: "EC",
    logo: eliteCodersLogo.url,
    metrics: [
      { v: "#286", l: "Worldwide rank" },
      { v: "620", l: "Leaderboard score" },
    ],
    points: [
      "Placed in Tier-1 Elite at ECSoC 2026.",
    ],
    tags: ["Open Source", "Java", "Back-End Web Development"],
  },
];

export const projects = [
  {
    name: "Verdiqy",
    img: verdiqyImg,
    tagline: "Unified competitive programming training platform",
    stack: ["React 19", "TypeScript", "TanStack Start", "PostgreSQL", "Gemini API"],
    live: "https://verdiqy.vercel.app/",
    code: "https://github.com/Pcmhacker-piro/verdiqy-showcase",
    points: [
      "Sheet builder for custom practice sets from a 12,000+ problem bank, plus Codeforces profile comparison.",
      "Contest tracker across Codeforces, LeetCode and CodeChef with an analytics dashboard.",
      "Hint-only AI Mentor for spoiler-free guidance and a ranked solution-video pipeline.",
    ],
  },
  {
    name: "Novix UI",
    img: novixImg,
    tagline: "Open-source React component library",
    stack: ["TypeScript", "Tailwind CSS v4", "Radix UI", "Motion"],
    live: "https://novixui.com/",
    code: "https://github.com/Pcmhacker-piro/novixui-showcase",
    points: [
      "Published @novix-ui/react with 500+ accessible components in strict TypeScript.",
      "Token-driven OKLCH theming with instant dark mode and zero hardcoded colors.",
      "Scaffolding CLI (@novix-ui/cli) and a spring-physics motion system, fully tree-shakeable.",
    ],
  },
];

export const contributions = [
  { repo: "processing/p5.js", pr: "#9170", text: "Fixed negative divisor handling in p5.Vector.rem()." },
  { repo: "processing/p5.js", pr: "#9186", text: "Stopped shuffle() from mutating typed arrays; all 26 tests passing." },
  { repo: "processing/p5.js", pr: "#9192", text: "Automated TypeScript declaration generation for npm and CI releases." },
  { repo: "vercel/turborepo", pr: "#14060", text: "Fixed stale cache hits between staging and production builds in the hashing engine." },
];

export const skills: Record<string, string[]> = {
  Languages: ["Java", "C++", "Python", "JavaScript", "TypeScript", "SQL"],
  Frontend: ["React.js", "Next.js", "Tailwind CSS", "Recoil", "HTML5", "CSS3"],
  Backend: ["Node.js", "Express.js", "REST", "Prisma", "Zod", "Socket.IO", "NextAuth"],
  Databases: ["PostgreSQL", "MongoDB", "Firestore"],
  "Cloud & DevOps": ["Docker", "Kubernetes", "AWS", "Nginx", "GitHub Actions"],
  Architecture: ["Turborepo", "Microservices", "Pub/Sub", "WebRTC", "Load Balancing"],
};

