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

        <div className="mt-10 grid grid-cols-1 border-y border-dashed border-border sm:grid-cols-2">
          {projects.map((p, i) => (
            <article
              key={p.name}
              className={`group flex flex-col p-4 sm:p-5 ${i % 2 === 0 ? "sm:border-r sm:border-dashed sm:border-border" : ""} ${i >= 2 ? "border-t border-dashed border-border" : ""} ${i === 1 ? "border-t border-dashed border-border sm:border-t-0" : ""}`}
            >
              <Link to="/projects/$slug" params={{ slug: p.slug }} className="block rounded-2xl border border-border bg-muted/40 p-4 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-elegant">
                <div className="overflow-hidden rounded-lg">
                  <img src={p.img} alt={`${p.name} preview`} width={1280} height={720} loading="lazy" className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
                </div>
              </Link>
              <div className="mt-4 flex items-center justify-between gap-2">
                <h2 className="font-semibold tracking-tight">{p.name}</h2>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Live
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.tagline}</p>
              <div className="mt-auto flex items-end justify-end pt-4">
                <Link to="/projects/$slug" params={{ slug: p.slug }} className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">
                  View Project <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
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
