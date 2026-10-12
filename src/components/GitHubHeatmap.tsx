import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowUpRight, Github } from "lucide-react";
import { getGitHubActivity } from "@/lib/github-activity.functions";
import type { ContributionDay } from "@/lib/github-activity.functions";

const PROFILE = "https://github.com/Pcmhacker-piro?tab=overview";

function Calendar() {
  const { data } = useSuspenseQuery({
    queryKey: ["github-contribution-calendar"],
    queryFn: () => getGitHubActivity(),
    staleTime: 60 * 60 * 1000,
    retry: false,
  });
  if (data.unavailable || !data.days.length) {
    return <p className="py-5 text-sm text-muted-foreground">Activity is temporarily unavailable. <a className="underline underline-offset-4" href={PROFILE} target="_blank" rel="noreferrer">View on GitHub</a></p>;
  }
  const first = data.days[0];
  if (!first) return null;
  const offset = new Date(`${first.date}T00:00:00Z`).getUTCDay();
  const cells: Array<ContributionDay | null> = [
    ...Array.from({ length: offset }, () => null), ...data.days,
  ];
  while (cells.length % 7) cells.push(null);
  const weeks = Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7));
  const total = data.days.reduce((sum, day) => sum + day.count, 0);
  let previousMonth = "";
  const labels = weeks.map((week) => {
    const day = week.find((item) => item !== null);
    if (!day) return "";
    const month = day.date.slice(0, 7);
    if (month === previousMonth) return "";
    previousMonth = month;
    return new Date(`${day.date}T00:00:00Z`).toLocaleDateString("en", { month: "short", timeZone: "UTC" });
  });

  return (
    <>
      <div className="github-calendar-scroll mt-4 overflow-x-auto pb-2" tabIndex={0} role="region" aria-label="GitHub contribution calendar, past year">
        <div className="github-calendar">
          <div className="github-calendar-labels" aria-hidden="true"><span>Mon</span><span>Wed</span><span>Fri</span></div>
          <div className="github-calendar-weeks">
            {weeks.map((week, index) => (
              <div className="github-calendar-week" key={index}>
                <span className="github-calendar-month" aria-hidden="true">{labels[index]}</span>
                {week.map((day, row) => day ? (
                  <span key={day.date} className={`github-calendar-day github-level-${day.level}`}
                    title={`${day.count} ${day.count === 1 ? "contribution" : "contributions"} on ${new Date(`${day.date}T00:00:00Z`).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}`}
                    aria-label={`${day.date}: ${day.count} contributions`} />
                ) : <span key={`empty-${row}`} className="github-calendar-day invisible" />)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <p><strong className="font-medium text-foreground">{total.toLocaleString("en")}</strong> contributions in the last year</p>
        <div className="flex items-center gap-1.5" aria-label="Darker green indicates more contributions"><span className="mr-1">Less</span>{[0, 1, 2, 3, 4].map((level) => <span key={level} className={`github-calendar-day github-level-${level}`} aria-hidden="true" />)}<span className="ml-1">More</span></div>
      </div>
    </>
  );
}

export function GitHubHeatmap() {
  return (
    <div className="mb-5 border-y border-dashed border-border py-4">
      <div className="flex items-center justify-between gap-3 text-xs">
        <h3 className="flex items-center gap-2 font-medium"><Github className="h-3.5 w-3.5" />GitHub activity</h3>
      </div>
      <Suspense fallback={<div className="mt-4 h-32 animate-pulse rounded-md bg-muted" role="status" aria-label="Loading GitHub activity" />}><Calendar /></Suspense>
    </div>
  );
}