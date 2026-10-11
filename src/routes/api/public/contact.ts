import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  message: z.string().trim().min(10).max(1200),
});

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip =
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

        if (isRateLimited(ip)) {
          return Response.json(
            {
              ok: false,
              error: "Too many messages from here — please email pcmeena511@gmail.com instead.",
            },
            { status: 429 },
          );
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json(
            { ok: false, error: "Something went wrong — email pcmeena511@gmail.com instead." },
            { status: 400 },
          );
        }

        const parsed = schema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { ok: false, error: "Please check your name, email and message." },
            { status: 400 },
          );
        }

        // Delivery turns on as soon as the sender domain is verified.
        return Response.json(
          {
            ok: false,
            error: "Messages aren't arriving yet — email pcmeena511@gmail.com for now.",
          },
          { status: 503 },
        );
      },
    },
  },
});
