import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { projects } from "@/lib/portfolio-data";
import { ArrowLeft, Github, ArrowUpRight, Mail, Check } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData: project }) => {
    const title = project ? `${project.name} — Prakash Meena` : "Project — Prakash Meena";
    const description = project
      ? `${project.name}: ${project.tagline}. Live demo, source code and the story behind the build.`
      : "A project by Prakash Meena.";
    const slugImage: Record<string, string> = {
      verdiqy: "/og-verdiqy.jpg",
      "novix-ui": "/og-novix-ui.jpg",
    };
    const image = project
      ? slugImage[project.slug] ?? "/og.jpg"
      : "/og.jpg";
    const imageUrl = `https://id-preview--908b13f2-f384-4573-a580-f76d98d49879.lovable.app${image}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:image", content: imageUrl },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:image", content: imageUrl },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const p = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="rail-main mx-auto max-w-3xl px-4 sm:px-5">
        <section className="rail-row flex items-center justify-between gap-3 py-4">
          <div className="flex items-center gap-3">
            <Link
              to="/projects"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-elegant"
              aria-label="Back to all projects"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="font-display text-lg font-bold tracking-tight">{p.name}</h1>
              <p className="text-xs text-muted-foreground">Projects / {p.name}</p>
            </div>
          </div>
          <ThemeToggle />
        </section>

        <section className="rail-row relative py-6">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[28px] bg-gradient-to-r from-primary/15 via-primary/5 to-primary/15 opacity-70 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-elegant">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={p.img}
                  alt={`${p.name} preview`}
                  width={1280}
                  height={720}
                  className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="rail-row grid grid-cols-3 divide-x divide-dashed divide-border">
          <a
            href={p.code}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-center gap-2 py-3.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            GitHub
          </a>
          <a
            href={p.live}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-center gap-2 py-3.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            Website
          </a>
          <a
            href="mailto:pcmeena511@gmail.com"
            className="group flex items-center justify-center gap-2 py-3.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            Contact
          </a>
        </section>

        <section className="rail-row py-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-3xl font-extrabold tracking-tight">{p.name}</h2>
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary transition-all hover:-translate-y-0.5"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> Live
            </a>
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{p.tagline}</p>
        </section>

        <section className="rail-row pb-8">
          <h3 className="font-display mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">The problem</h3>
          <p className="rounded-xl border border-border bg-card/60 p-5 text-sm leading-relaxed text-muted-foreground">
            {p.story.problem}
          </p>
        </section>

        <section className="rail-row pb-8">
          <h3 className="font-display mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">What I built</h3>
          <ul className="space-y-3">
            {p.story.built.map((point) => (
              <li
                key={point}
                className="flex gap-3 rounded-xl border border-border bg-card/60 p-4 text-sm leading-relaxed text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elegant"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                  <Check className="h-3 w-3 text-primary" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className="rail-row pb-8">
          <h3 className="font-display mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">The result</h3>
          <p className="rounded-xl border border-primary/25 bg-primary/5 p-5 text-sm leading-relaxed text-foreground">
            {p.story.result}
          </p>
        </section>

        <section className="rail-row pb-8">
          <h3 className="font-display mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">Inside the product</h3>
          <div className="space-y-6">
            {p.story.shots.map((shot) => (
              <figure key={shot.caption} className="group">
                <div className="overflow-hidden rounded-xl border border-border bg-card p-1.5 shadow-elegant transition-all duration-300 group-hover:border-primary/40">
                  <img
                    src={shot.img}
                    alt={shot.caption}
                    width={1280}
                    height={900}
                    loading="lazy"
                    className="w-full rounded-lg object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="mt-2 text-center text-xs text-muted-foreground">{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="rail-row pb-14 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-elegant">
            <div>
              <p className="text-sm font-medium">Try {p.name} live</p>
              <p className="text-xs text-muted-foreground">Opens in a new tab — no sign-up needed.</p>
            </div>
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant transition-all hover:-translate-y-0.5 hover:opacity-90"
            >
              Open {p.name} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
