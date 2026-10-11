import avatar from "@/assets/prakash.png.asset.json";
import { stats, experiences, projects, contributions, skills } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent as RMouseEvent } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HeroBanner } from "@/components/HeroBanner";
import { Reveal } from "@/components/Reveal";
import { Github, Linkedin, Twitter, Mail, ChevronDown, ArrowUpRight, Pin, Command, Moon, Sun, Copy, Sparkles, Loader2 } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

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
  { label: "GitHub", href: "https://github.com/Pcmhacker-piro", Icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/prakash-meena-a46906324", Icon: Linkedin },
  { label: "X", href: "https://x.com/pcmeena511", Icon: Twitter },
  { label: "Email", href: "mailto:pcmeena511@gmail.com", Icon: Mail },
];


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
    <h2 id={id} className="mb-6 scroll-mt-24 font-display text-xl font-bold tracking-tight text-foreground">
      {children}
    </h2>
  );
}

function Tag({ children }: { children: string }) {
  return (
    <span className="cursor-default rounded-md border border-border bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent hover:text-foreground hover:shadow-elegant">
      {children}
    </span>
  );
}

function Index() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <SideIndex />

      <main className="rail-main mx-auto max-w-3xl px-4 sm:px-5">
        <section className="animate-float-in pb-8">
          <HeroBanner />
          <div className="rail-row relative flex items-center gap-4 py-3">
            <div className="h-[88px] w-[88px] shrink-0 overflow-hidden rounded-xl border border-border bg-card p-1 shadow-elegant">
              <img src={avatar.url} alt="Prakash Meena" width={80} height={80} className="h-full w-full rounded-lg object-cover" />
            </div>
            <div className="min-w-0 pt-4">
              <h1 className="font-display text-2xl font-bold tracking-tight sm:text-[26px]">Prakash Meena</h1>
              <p className="text-sm text-muted-foreground">Full-Stack Engineer · Open Source · CP</p>
            </div>
            <div className="absolute right-0 top-3 flex items-center gap-1">
              <Button asChild variant="ghost" size="sm"><Link to="/linkedin">Profile <ArrowUpRight /></Link></Button>
              <CommandPalette />
              <ThemeToggle />
            </div>
          </div>

          <div className="rail-row pt-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-medium text-primary">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" /> Open to internships
              </span>
              <Clock />
            </div>
            <p className="text-[15px] leading-relaxed">
              Full-stack engineer. I love building, breaking, and shipping things.
            </p>
            <ul className="mt-4 space-y-1.5 pl-4 text-[15px] text-muted-foreground">
              <li className="list-disc">CSE undergrad at <strong className="font-semibold text-foreground">IIIT Dharwad</strong>, Karnataka.</li>
              <li className="list-disc">Ranked <strong className="font-semibold text-foreground">28th globally</strong> in GSSoC 2026 among 43,000+ contributors.</li>
              <li className="list-disc">Currently building <strong className="font-semibold text-foreground">Verdiqy</strong>, <strong className="font-semibold text-foreground">Novix UI</strong>, and more.</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href="mailto:pcmeena511@gmail.com" className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow-elegant transition-all hover:-translate-y-0.5 hover:opacity-90">
                Send an email
              </a>
              <Link to="/projects" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm transition-all hover:-translate-y-0.5 hover:bg-accent">
                View projects
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">Here are my <span className="font-semibold text-foreground">socials</span></p>
            <div className="mt-2 flex flex-wrap gap-2">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs transition-all hover:-translate-y-0.5 hover:bg-accent">
                  <s.Icon className="h-3.5 w-3.5 transition-colors group-hover:text-primary" />
                  {s.label}
                </a>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.l} className="rounded-lg border border-border bg-card p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40">
                  <div className="text-xl font-semibold">{s.v}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rail-row py-10">
          <SectionTitle id="experience">Experience</SectionTitle>
          <div>
            {experiences.map((e, i) => (
              <Reveal key={e.org} delay={i * 100}>
                <ExperienceItem e={e} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="rail-row py-10">
          <SectionTitle id="projects">Projects</SectionTitle>
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={i * 120}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-elegant transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-glow"
            >
              View all projects
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </section>

        <section className="rail-row py-10">
          <SectionTitle id="open-source">Open source contributions</SectionTitle>
          <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-elegant transition-shadow duration-300 hover:shadow-glow">
            {contributions.map((c) => (
              <a
                key={c.pr}
                href={`https://github.com/${c.repo}/pull/${c.pr.replace("#", "")}`}
                target="_blank"
                rel="noreferrer"
                className="group flex gap-4 p-4 text-sm transition-colors hover:bg-accent/50"
              >
                <span className="shrink-0 font-mono text-primary group-hover:underline">{c.pr}</span>
                <div>
                  <div className="font-mono text-xs text-muted-foreground">{c.repo}</div>
                  <div className="mt-1">{c.text}</div>
                </div>
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 self-center text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </a>
            ))}
          </div>
        </section>

        <section className="rail-row py-10">
          <SectionTitle id="skills">Skills</SectionTitle>
          <div className="space-y-1 rounded-2xl border border-border bg-card p-4 shadow-elegant sm:p-5">
            {Object.entries(skills).map(([k, v]) => (
              <div key={k} className="grid gap-2 rounded-xl p-2 transition-colors hover:bg-accent/40 sm:grid-cols-[140px_1fr]">
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

        <section className="rail-row py-10">
          <SectionTitle id="education">Education</SectionTitle>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow">
            <h3 className="font-semibold">IIIT Dharwad</h3>
            <p className="text-sm text-muted-foreground">B.Tech in Computer Science & Engineering · CGPA 7.23 · Expected 2028</p>
          </div>
        </section>

        <section className="rail-row py-12">
          <SectionTitle id="contact">Contact</SectionTitle>
          <h3 className="text-gradient text-3xl font-semibold tracking-tight">Let's build something together.</h3>
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

      <footer className="relative py-10 text-center text-xs text-muted-foreground">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <span className="text-gradient font-medium">© 2026 Prakash Meena</span>
        <span className="mt-1 block text-[11px]">Designed & built with care · Dharwad, India</span>
      </footer>
    </div>
  );
}

type Experience = (typeof experiences)[number];

function ExperienceItem({ e }: { e: Experience }) {
  const [open, setOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const detailsId = `experience-${e.mark.toLowerCase()}`;

  return (
    <article className="border-b border-dashed border-border" aria-label={`${e.role} at ${e.org}`}>
      <Button
        variant="ghost"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={detailsId}
        className="grid h-auto w-full grid-cols-[40px_minmax(0,1fr)_16px] items-start gap-x-3 gap-y-1 whitespace-normal rounded-none px-0 py-5 text-left sm:grid-cols-[40px_minmax(0,1fr)_auto_16px] sm:items-center sm:gap-x-4"
      >
        <span className="row-span-2 flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-border bg-card font-mono text-sm font-semibold shadow-sm sm:row-span-1">
          {logoFailed ? (
            <span aria-hidden="true">{e.mark}</span>
          ) : (
            <img
              src={e.logo}
              alt={`${e.org} logo`}
              width={44}
              height={44}
              loading="lazy"
              onError={() => setLogoFailed(true)}
              className="h-full w-full object-contain p-1.5"
            />
          )}
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold sm:text-base">{e.role}</span>
          <span className="mt-1 block text-xs font-normal text-muted-foreground sm:text-sm">{e.org}</span>
        </span>
        <span className="col-start-2 row-start-2 text-xs font-normal leading-relaxed sm:col-start-3 sm:row-start-1 sm:text-right">
          <span className="block">{e.date}</span>
          <span className="block text-muted-foreground">{e.place}</span>
        </span>
        <ChevronDown aria-hidden="true" className={`col-start-3 row-start-1 mt-1 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none sm:col-start-4 sm:mt-0 ${open ? "rotate-180" : ""}`} />
      </Button>

        <div
          id={detailsId}
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
          aria-hidden={!open}
        >
          <div className="overflow-hidden">
            <div className="pb-5 pl-[52px] sm:pl-14">
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
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {e.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
            </div>
          </div>
        </div>
    </article>
  );
}

function ProjectCard({ p }: { p: (typeof projects)[number] }) {
  const ref = useRef<HTMLElement>(null);
  const onMove = (ev: RMouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (ev.clientX - r.left) / r.width;
    const y = (ev.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 12}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
  return (
    <div className="h-full [perspective:1200px]">
      <article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))", transformStyle: "preserve-3d" }}
        className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-3 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:border-primary/40 hover:shadow-2xl"
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--primary) 14%, transparent), transparent 60%)" }}
        />
        <div className="relative rounded-xl border border-border bg-muted/50 px-4 pt-7 shadow-inner" style={{ transform: "translateZ(40px)" }}>
          <span className="absolute right-3 top-2 grid h-6 w-6 place-items-center rounded-md border border-border bg-background text-muted-foreground shadow-sm">
            <Pin className="h-3 w-3" />
          </span>
          <div className="overflow-hidden rounded-t-lg border border-b-0 border-border shadow-lg">
            <img src={p.img} alt={`${p.name} preview`} width={1280} height={720} loading="lazy" className="aspect-[16/8] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
          </div>
        </div>
        <div className="relative flex flex-1 flex-col px-1.5 pb-1 pt-3" style={{ transform: "translateZ(24px)" }}>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold tracking-tight">{p.name}</h3>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Live
            </span>
          </div>
          <p className="mt-1 line-clamp-1 flex-1 text-[13px] text-muted-foreground">{p.tagline}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.stack.slice(0, 4).map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-foreground bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-transform hover:-translate-y-0.5">
              View Live <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}

const indexLinks = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "open-source", label: "Open Source" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

function SideIndex() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    for (const link of indexLinks) {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="fixed left-[calc(50%+24rem)] top-1/2 z-30 hidden -translate-y-1/2 lg:block" style={{ perspective: "600px" }}>
      <div className="flex flex-col items-end gap-1">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60">Index</div>
        {indexLinks.map((link) => {
          const isActive = active === link.id;
          return (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`group relative block rounded-md px-3 py-1.5 text-sm transition-all duration-300 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:[transform:rotateY(-8deg)_translateX(-4px)] ${
                isActive
                  ? "text-foreground font-medium"
                  : "text-muted-foreground/70 hover:text-foreground"
              }`}
            >
              <span
                className={`absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary transition-all duration-300 ${
                  isActive ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                }`}
              />
              {link.label}
            </a>
          );
        })}
      </div>
    </aside>
  );
}

function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    window.dispatchEvent(new Event("theme-change"));
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="flex h-7 items-center gap-1 rounded-md border border-border bg-card px-1.5 text-[11px] text-muted-foreground shadow-sm transition-all hover:bg-accent hover:text-foreground hover:border-primary/60 hover:shadow-md"
      >
        <Command className="h-3 w-3" />
        <span className="font-mono text-[10px]">K</span>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for a command to run..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Sections">
            {indexLinks.map((link) => (
              <CommandItem key={link.id} onSelect={() => go(link.id)}>
                <ArrowUpRight className="h-4 w-4" />
                {link.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => { setOpen(false); window.location.href = "mailto:pcmeena511@gmail.com"; }}>
              <Mail className="h-4 w-4" />
              Send an email
            </CommandItem>
            <CommandItem onSelect={() => { navigator.clipboard?.writeText("pcmeena511@gmail.com"); setOpen(false); }}>
              <Copy className="h-4 w-4" />
              Copy email address
            </CommandItem>
            <CommandItem onSelect={toggleTheme}>
              <Sun className="h-4 w-4 dark:hidden" />
              <Moon className="hidden h-4 w-4 dark:block" />
              Toggle theme
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Socials">
            {socials.map((s) => (
              <CommandItem key={s.label} onSelect={() => { window.open(s.href, "_blank"); setOpen(false); }}>
                <s.Icon className="h-4 w-4" />
                {s.label}
                <CommandShortcut>↗</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

