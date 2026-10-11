import { createFileRoute, Link } from "@tanstack/react-router";
import { projects } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Prakash Meena" },
      {
        name: "description",
        content:
          "All projects by Prakash Meena: Verdiqy, a competitive programming training platform, and Novix UI, an open-source React component library.",
      },
      { property: "og:title", content: "Projects — Prakash Meena" },
      {
        property: "og:description",
        content: "Explore every project by Prakash Meena — live demos, source code and the stack behind each build.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="flex items-center justify-between gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft /> Back to home
            </Link>
          </Button>
          <a
            href="https://github.com/Pcmhacker-piro?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-foreground hover:shadow-elegant"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <h1 className="text-gradient font-display mt-8 text-3xl font-extrabold tracking-tight sm:text-4xl">
          All projects
        </h1>
        <p className="mt-2 text-muted-foreground">
          Everything I've designed, built and shipped — live demos, source code and the stack behind each one.
        </p>

        <div className="mt-10 space-y-8">
          {projects.map((p, i) => (
            <article
              key={p.name}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.img}
                  alt={`${p.name} preview`}
                  width={1280}
                  height={720}
                  className="aspect-[16/7] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>
              <div className="p-6 pt-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold tracking-tight">{p.name}</h2>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    Live
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-border bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2">
                      <span className="text-primary">▹</span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-foreground bg-foreground px-3.5 py-1.5 text-xs font-medium text-background transition-transform hover:-translate-y-0.5"
                  >
                    View Live <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={p.code}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground transition-transform hover:-translate-y-0.5 hover:border-primary/50"
                  >
                    <Github className="h-3.5 w-3.5" /> Source
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-6 text-center shadow-elegant">
          <p className="text-sm text-muted-foreground">
            More experiments and open-source work live on my GitHub.
          </p>
          <a
            href="https://github.com/Pcmhacker-piro?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-elegant transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-glow"
          >
            Browse GitHub repositories
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </main>
    </div>
  );
}
