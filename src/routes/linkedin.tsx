import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Copy, Check, Mail, Github, Linkedin, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { stats, experiences, projects, contributions, skills } from "@/lib/portfolio-data";

const title = "Prakash Meena — Professional Profile";
const description =
  "Full-Stack Engineer · Google Student Ambassador · GSSoC 2026 rank #28 with 600 merged PRs. Experience, projects and skills.";

export const Route = createFileRoute("/linkedin")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: ProfilePage,
});

function Card({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
      {title && <h2 className="mb-4 text-xl font-semibold">{title}</h2>}
      {children}
    </section>
  );
}

function ProfilePage() {
  const [copied, setCopied] = React.useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="min-h-screen bg-muted/40 pb-16">
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/"><ArrowLeft className="mr-1 h-4 w-4" /> Portfolio</Link>
          </Button>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={copy}>
              {copied ? <Check className="mr-1 h-4 w-4" /> : <Copy className="mr-1 h-4 w-4" />}
              {copied ? "Copied" : "Copy link"}
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto mt-6 max-w-4xl space-y-4 px-4">
        <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="h-36 bg-gradient-primary sm:h-48" />
          <div className="px-6 pb-6">
            <div className="-mt-14 flex h-28 w-28 items-center justify-center rounded-full border-4 border-card bg-primary text-3xl font-bold text-primary-foreground shadow-elegant">
              PM
            </div>
            <h1 className="mt-3 text-2xl font-bold">Prakash Meena</h1>
            <p className="text-foreground/90">
              Full-Stack Engineer · Google Student Ambassador 2026 · Open Source Contributor
            </p>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> Dharwad, India · Open to internships
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild size="sm" className="rounded-full">
                <a href="mailto:pcmeena511@gmail.com"><Mail className="mr-1 h-4 w-4" /> Contact</a>
              </Button>
              <Button asChild size="sm" variant="outline" className="rounded-full">
                <a href="https://github.com/Pcmhacker-piro" target="_blank" rel="noreferrer"><Github className="mr-1 h-4 w-4" /> GitHub</a>
              </Button>
              <Button asChild size="sm" variant="outline" className="rounded-full">
                <a href="https://linkedin.com/in/prakash-meena-a46906324" target="_blank" rel="noreferrer"><Linkedin className="mr-1 h-4 w-4" /> LinkedIn</a>
              </Button>
              <Button asChild size="sm" variant="outline" className="rounded-full">
                <a href="https://x.com/pcmeena511" target="_blank" rel="noreferrer" aria-label="X profile">
                  <svg viewBox="0 0 24 24" className="mr-1 h-3.5 w-3.5" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  X
                </a>
              </Button>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.l} className="rounded-lg border border-border p-3 text-center">
                  <div className="text-lg font-bold">{s.v}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Card title="About">
          <p className={`text-sm leading-relaxed text-foreground/90 ${aboutOpen ? "" : "line-clamp-3"}`}>
            I'm a full-stack engineer who loves building fast, accessible products and contributing to open source.
            I ranked 28th of 43,000+ in GirlScript Summer of Code 2026 with 600 merged pull requests, and I've
            contributed to p5.js and Turborepo. I build with React, TypeScript, Node.js and PostgreSQL, and I enjoy
            competitive programming (1700+ LeetCode, 3★ CodeChef). Currently a Google Student Ambassador.
          </p>
          <button onClick={() => setAboutOpen(!aboutOpen)} className="mt-2 text-sm font-medium text-primary hover:underline">
            {aboutOpen ? "See less" : "...see more"}
          </button>
        </Card>

        <Card title="Featured">
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((p) => (
              <a key={p.name} href={p.live || p.code} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-lg border border-border transition hover:shadow-md">
                <img src={p.img} alt={p.name} className="aspect-video w-full object-cover" loading="lazy" />
                <div className="p-3">
                  <div className="font-semibold group-hover:text-primary">{p.name}</div>
                  <div className="text-sm text-muted-foreground">{p.tagline}</div>
                </div>
              </a>
            ))}
          </div>
        </Card>

        <Card title="Experience">
          <ul className="divide-y divide-border">
            {experiences.map((e) => (
              <li key={e.org + e.role} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-background">
                  <img src={e.logo} alt={e.org} className="h-8 w-8 object-contain" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold">{e.role}</div>
                  <div className="text-sm">{e.org}</div>
                  <div className="text-xs text-muted-foreground">{e.date} · {e.place}</div>
                  {e.points.length > 0 && (
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-foreground/90">
                      {e.points.map((pt) => <li key={pt}>{pt}</li>)}
                    </ul>
                  )}
                  <p className="mt-2 text-xs text-muted-foreground">Skills: {e.tags.join(" · ")}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Open source">
          <ul className="space-y-3">
            {contributions.map((c) => (
              <li key={c.pr}>
                <a href={`https://github.com/${c.repo}/pull/${c.pr.replace("#", "")}`} target="_blank" rel="noreferrer" className="block rounded-md p-2 transition hover:bg-accent">
                  <div className="text-sm font-medium">{c.repo} <span className="text-muted-foreground">{c.pr}</span></div>
                  <div className="text-sm text-muted-foreground">{c.text}</div>
                </a>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Skills">
          <div className="space-y-4">
            {Object.entries(skills).map(([group, list]) => (
              <div key={group}>
                <div className="mb-2 text-sm font-medium">{group}</div>
                <div className="flex flex-wrap gap-2">
                  {list.map((s) => (
                    <span key={s} className="rounded-full border border-border px-3 py-1 text-xs">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
