import { createServerFn } from "@tanstack/react-start";

export type ContributionDay = { date: string; count: number; level: number };
export type GitHubActivity = { days: ContributionDay[]; unavailable: boolean };

let cache: { at: number; days: ContributionDay[] } | null = null;

export const getGitHubActivity = createServerFn({ method: "GET" }).handler(
  async (): Promise<GitHubActivity> => {
    if (cache && Date.now() - cache.at < 60 * 60 * 1000) {
      return { days: cache.days, unavailable: false };
    }
    try {
      // Public contribution calendar, mirrored from GitHub; no account or token needed.
      const response = await fetch(
        "https://github-contributions-api.jogruber.de/v4/Pcmhacker-piro?y=last",
        { signal: AbortSignal.timeout(10000) },
      );
      if (!response.ok) {
        const body = await response.text();
        console.warn(`GitHub activity failed [${response.status}]: ${body}`);
        throw new Error("Contribution calendar unavailable");
      }
      const json: unknown = await response.json();
      if (!json || typeof json !== "object" || !("contributions" in json) || !Array.isArray(json.contributions)) {
        throw new Error("Invalid contribution calendar");
      }
      const days: ContributionDay[] = json.contributions.map((day: unknown) => {
        if (!day || typeof day !== "object" || !("date" in day) || !("count" in day) || !("level" in day) ||
          typeof day.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(day.date) ||
          !Number.isFinite(Date.parse(day.date)) || typeof day.count !== "number" ||
          !Number.isInteger(day.count) || day.count < 0 || typeof day.level !== "number" ||
          !Number.isInteger(day.level) || day.level < 0 || day.level > 4) {
          throw new Error("Invalid contribution day");
        }
        return { date: day.date, count: day.count, level: day.level };
      }).sort((a, b) => a.date.localeCompare(b.date));
      if (!days.length) throw new Error("Empty contribution calendar");
      cache = { at: Date.now(), days };
      return { days, unavailable: false };
    } catch (error) {
      console.warn("GitHub activity unavailable", error instanceof Error ? error.message : "Unknown error");
      return { days: cache?.days ?? [], unavailable: !cache };
    }
  },
);