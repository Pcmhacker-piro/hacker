import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HeroBanner } from "@/components/HeroBanner";
import { Reveal } from "@/components/Reveal";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import verdiqyAsset from "@/assets/verdiqy-screenshot.png.asset.json";
const verdiqyImg = verdiqyAsset.url;
import novixAsset from "@/assets/novix-screenshot.png.asset.json";
const novixImg = novixAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prakash Meena — Full-Stack Engineer & Open Source Contributor" },
      {
        name: "description",
        content:
          "Portfolio of Prakash Chand Meena: full-stack engineer, GSSoC 2026 top-30 contributor, builder of Verdiqy and Novix UI.",
      },
      { property: "og:title", content: "Prakash Meena — Portfolio" },
      {
        property: "og:description",
        content: "Full-stack engineer, open source contributor and competitive programmer from IIIT Dharwad.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const socials = [
  { label: "GitHub", href: "https://github.com/", Icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: Linkedin },
  { label: "X", href: "https://x.com/", Icon: Twitter },
  { label: "Email", href: "mailto:pcmeena511@gmail.com", Icon: Mail },
];

const stats = [
  { v: "28th", l: "GSSoC 2026 global rank" },
  { v: "600", l: "PRs merged" },
  { v: "1700+", l: "LeetCode rating" },
  { v: "3★", l: "CodeChef" },
];

const experiences = [
  {
    org: "Google",
    role: "Google Student Ambassador 2026",
    date: "Apr 2026 – Present",
    place: "India · Remote",
    mark: "G",
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
    metrics: [
      { v: "#28", l: "of 43,000+" },
      { v: "600", l: "PRs merged" },
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

const projects = [
  {
    name: "Verdiqy",
    img: verdiqyImg,
    tagline: "Unified competitive programming training platform",
    stack: ["React 19", "TypeScript", "TanStack Start", "PostgreSQL", "Gemini API"],
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
    points: [
      "Published @novix-ui/react with 500+ accessible components in strict TypeScript.",
      "Token-driven OKLCH theming with instant dark mode and zero hardcoded colors.",
      "Scaffolding CLI (@novix-ui/cli) and a spring-physics motion system, fully tree-shakeable.",
    ],
  },
];

const contributions = [
  { repo: "processing/p5.js", pr: "#9170", text: "Fixed negative divisor handling in p5.Vector.rem()." },
  { repo: "processing/p5.js", pr: "#9186", text: "Stopped shuffle() from mutating typed arrays; all 26 tests passing." },
  { repo: "processing/p5.js", pr: "#9192", text: "Automated TypeScript declaration generation for npm and CI releases." },
  { repo: "vercel/turborepo", pr: "#14060", text: "Fixed stale cache hits between staging and production builds in the hashing engine." },
];

const skills: Record<string, string[]> = {
  Languages: ["Java", "C++", "Python", "JavaScript", "TypeScript", "SQL"],
  Frontend: ["React.js", "Next.js", "Tailwind CSS", "Recoil", "HTML5", "CSS3"],
  Backend: ["Node.js", "Express.js", "REST", "Prisma", "Zod", "Socket.IO", "NextAuth"],
  Databases: ["PostgreSQL", "MongoDB", "Firestore"],
  "Cloud & DevOps": ["Docker", "Kubernetes", "AWS", "Nginx", "GitHub Actions"],
  Architecture: ["Turborepo", "Microservices", "Pub/Sub", "WebRTC", "Load Balancing"],
};

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () =>
      setT(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono tabular-nums">{t || "--:--:--"} IST</span>;
}

function SectionTitle({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="mb-6 scroll-mt-24 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
      {children}
    </h2>
  );
}

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-md border border-border bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
      {children}
    </span>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3 text-sm">
          <span className="font-mono font-medium">pcmeena</span>
          <nav className="hidden gap-5 sm:flex text-muted-foreground">
            <a href="#experience" className="hover:text-foreground">Experience</a>
            <a href="#projects" className="hover:text-foreground">Projects</a>
            <a href="#skills" className="hover:text-foreground">Skills</a>
            <a href="#contact" className="hover:text-foreground">Contact</a>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6">
        <section className="animate-float-in pt-8 pb-16">
          <HeroBanner />
          <div className="mb-8 flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" /> Open to internships
            </span>
            <Clock />
          </div>
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card font-mono text-2xl font-semibold text-primary">
              PM
            </div>
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Prakash Meena</h1>
              <p className="mt-1 text-muted-foreground">Full-Stack Engineer · Open Source · Competitive Programmer</p>
            </div>
          </div>
          <p className="mt-8 text-lg leading-relaxed">
            I build, break, and ship things — from component libraries to training platforms.
          </p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>• CSE undergrad at IIIT Dharwad, Karnataka.</li>
            <li>• Ranked 28th globally in GSSoC 2026 among 43,000+ contributors.</li>
            <li>• Currently building Verdiqy and Novix UI.</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="mailto:pcmeena511@gmail.com" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
              Send an email
            </a>
            {socials.slice(0, 3).map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent">
                <s.Icon className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-primary" />
                {s.label}
              </a>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="bg-card p-4">
                <div className="text-2xl font-semibold">{s.v}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12">
          <SectionTitle id="experience">Experience</SectionTitle>
          <div>
            {experiences.map((e, i) => (
              <Reveal key={e.org} delay={i * 100}>
              <article className="group relative grid grid-cols-[40px_minmax(0,1fr)] gap-4 pb-8 sm:grid-cols-[44px_minmax(0,1fr)] sm:gap-5" aria-label={`${e.role} at ${e.org}`}>
                <div className="relative">
                  <div aria-hidden="true" className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted font-mono text-sm font-semibold transition-colors duration-300 group-hover:bg-accent sm:h-11 sm:w-11">{e.mark}</div>
                  {i < experiences.length - 1 && <div aria-hidden="true" className="absolute bottom-0 left-1/2 top-12 w-px bg-border" />}
                </div>
                <div className="min-w-0 border-b border-border pb-8">
                <div className="flex flex-col items-start justify-between gap-2 sm:flex-row">
                  <div>
                    <h3 className="text-sm font-semibold sm:text-base">{e.role}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{e.org} · Internship</p>
                  </div>
                  <div className="shrink-0 text-xs leading-relaxed text-muted-foreground sm:text-right">
                    <div>{e.date}</div>
                    <div>{e.place}</div>
                  </div>
                </div>
                {e.metrics.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-6">
                  {e.metrics.map((m) => (
                    <div key={m.l}>
                      <div className="text-xl font-semibold text-primary">{m.v}</div>
                      <div className="text-xs text-muted-foreground">{m.l}</div>
                    </div>
                  ))}
                </div>
                )}
                {e.points.length > 0 && (
                <ul className="mt-5 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {e.points.map((p) => (
                    <li key={p}>• {p}</li>
                  ))}
                </ul>
                )}
                <div className="mt-5 flex flex-wrap gap-2">
                  {e.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                </div>
              </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="py-12">
          <SectionTitle id="projects">Projects</SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={i * 120}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl">
                <div className="overflow-hidden border-b border-border">
                  <img src={p.img} alt={`${p.name} preview`} width={1280} height={720} loading="lazy" className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-semibold">{p.name}</h3>
                <p className="text-[13px] text-muted-foreground">{p.tagline}</p>
                <ul className="mt-3 flex-1 space-y-1.5 text-[13px] leading-snug text-muted-foreground">
                  {p.points.map((pt) => (
                    <li key={pt}>• {pt}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
                </div>
              </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="py-12">
          <SectionTitle id="open-source">Open source contributions</SectionTitle>
          <div className="divide-y divide-border rounded-2xl border border-border bg-card">
            {contributions.map((c) => (
              <div key={c.pr} className="flex gap-4 p-4 text-sm">
                <span className="shrink-0 font-mono text-primary">{c.pr}</span>
                <div>
                  <div className="font-mono text-xs text-muted-foreground">{c.repo}</div>
                  <div className="mt-1">{c.text}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12">
          <SectionTitle id="skills">Skills</SectionTitle>
          <div className="space-y-4">
            {Object.entries(skills).map(([k, v]) => (
              <div key={k} className="grid gap-2 sm:grid-cols-[140px_1fr]">
                <div className="text-sm text-muted-foreground">{k}</div>
                <div className="flex flex-wrap gap-2">
                  {v.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12">
          <SectionTitle id="education">Education</SectionTitle>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-semibold">IIIT Dharwad</h3>
            <p className="text-sm text-muted-foreground">B.Tech in Computer Science & Engineering · CGPA 7.23 · Expected 2028</p>
          </div>
        </section>

        <section className="py-16">
          <SectionTitle id="contact">Contact</SectionTitle>
          <h3 className="text-2xl font-semibold">Let's build something together.</h3>
          <p className="mt-2 text-muted-foreground">Dharwad, Karnataka, India · pcmeena511@gmail.com</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent">
                <s.Icon className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-primary" />
                {s.label}
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        © 2026 Prakash Meena
      </footer>
    </div>
  );
}
