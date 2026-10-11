import { createServerFn } from "@tanstack/react-start";

export type LivePR = {
  title: string;
  repo: string;
  number: number;
  url: string;
  mergedAt: string;
};

export type LivePRData = { total: number; items: LivePR[] };

const USER = "Pcmhacker-piro";
const TTL_MS = 10 * 60 * 1000;
let cache: { at: number; data: LivePRData } | null = null;

export const getMergedPRs = createServerFn({ method: "GET" }).handler(
  async (): Promise<LivePRData> => {
    if (cache && Date.now() - cache.at < TTL_MS) return cache.data;
    const res = await fetch(
      `https://api.github.com/search/issues?q=author:${USER}+type:pr+is:merged&sort=updated&order=desc&per_page=12`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "prakash-portfolio",
        },
      },
    );
    if (!res.ok) {
      console.warn("GitHub PR fetch failed", res.status);
      if (cache) return cache.data;
      throw new Error(`GitHub request failed [${res.status}]`);
    }
    const json = (await res.json()) as {
      total_count: number;
      items: Array<{
        title: string;
        number: number;
        html_url: string;
        repository_url: string;
        closed_at: string;
        pull_request?: { merged_at?: string | null };
      }>;
    };
    const data: LivePRData = {
      total: json.total_count,
      items: json.items.map((i) => ({
        title: i.title,
        number: i.number,
        url: i.html_url,
        repo: i.repository_url.replace("https://api.github.com/repos/", ""),
        mergedAt: i.pull_request?.merged_at ?? i.closed_at,
      })),
    };
    cache = { at: Date.now(), data };
    return data;
  },
);
