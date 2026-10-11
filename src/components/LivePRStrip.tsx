import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, GitMerge } from "lucide-react";
import { getMergedPRs } from "@/lib/github-prs.functions";

function ago(iso: string) {
  const d = (Date.now() - new Date(iso).getTime()) / 86400000;
  if (d < 1) return "today";
  if (d < 30) return `${Math.floor(d)}d ago`;
  if (d < 365) return `${Math.floor(d / 30)}mo ago`;
  return `${Math.floor(d / 365)}y ago`;
}

export function LivePRStrip() {
  const { data, isError } = useQuery({
    queryKey: ["github-merged-prs"],
    queryFn: () => getMergedPRs(),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });

  if (isError) return null;

  return (
    <div className="mb-4 overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
      <div className="flex items-center justify-between gap-3 border-b border-dashed border-border px-4 py-2.5 text-xs">
        <span className="inline-flex items-center gap-2 font-medium text-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Live from GitHub
        </span>
        <a
          href="https://github.com/pulls?q=author%3APcmhacker-piro+is%3Apr+is%3Amerged"
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          {data ? (
            <>
              <span className="font-semibold text-foreground">{data.total}</span> merged pull requests →
            </>
          ) : (
            "Loading…"
          )}
        </a>
      </div>
      <div className="flex snap-x gap-3 overflow-x-auto p-3 [scrollbar-width:thin]">
        {data
          ? data.items.map((pr) => (
              <a
                key={pr.url}
                href={pr.url}
                target="_blank"
                rel="noreferrer"
                className="group flex w-64 shrink-0 snap-start flex-col rounded-xl border border-border bg-background/60 p-3 text-sm transition-all hover:-translate-y-0.5 hover:border-primary/50"
              >
                <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                  <GitMerge className="h-3.5 w-3.5 text-primary" />
                  <span className="truncate">{pr.repo}</span>
                  <span className="ml-auto shrink-0">#{pr.number}</span>
                </div>
                <div className="mt-2 line-clamp-2 leading-snug">{pr.title}</div>
                <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
                  merged {ago(pr.mergedAt)}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
              </a>
            ))
          : Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 w-64 shrink-0 animate-pulse rounded-xl bg-muted/50" />
            ))}
      </div>
    </div>
  );
}
