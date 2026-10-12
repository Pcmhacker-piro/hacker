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

const NOTIFY_EMAIL = "pcmeena511@gmail.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendViaResend(name: string, email: string, message: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [NOTIFY_EMAIL],
      reply_to: email,
      subject: `New message from ${name}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Resend request failed [${response.status}]: ${errorBody}`);
    throw new Error(`Resend request failed [${response.status}]: ${errorBody}`);
  }
  return true;
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

        const { name, email, message } = parsed.data;
        const digest = await crypto.subtle.digest(
          "SHA-256",
          new TextEncoder().encode(`${name}|${email}|${message}`),
        );
        const idempotencyKey = `contact-${Array.from(new Uint8Array(digest), (b) =>
          b.toString(16).padStart(2, "0"),
        )
          .join("")
          .slice(0, 24)}`;

        try {
          const sentViaResend = await sendViaResend(name, email, message);
          if (!sentViaResend) {
            const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
            await sendTemplateEmail("contact-notification", email, {
              templateData: { name, email, message },
              idempotencyKey,
              replyTo: email,
            });
          }
          return Response.json({ ok: true });
        } catch (error) {
          const code = (error as { code?: string } | null)?.code;
          const status = (error as { status?: number } | null)?.status;

          // Expected while the sender domain is still verifying DNS or emails are paused.
          if (code === "domain_not_verified" || code === "emails_disabled") {
            console.warn("contact send skipped:", code);
            return Response.json(
              {
                ok: false,
                error:
                  "The message box isn't live just yet — please email pcmeena511@gmail.com directly.",
              },
              { status: 503 },
            );
          }

          if (status === 429) {
            return Response.json(
              {
                ok: false,
                error: "Lots of messages right now — please try again in a minute.",
              },
              { status: 429 },
            );
          }

          console.error("contact send failed", error);
          return Response.json(
            {
              ok: false,
              error: "Couldn't send right now — email pcmeena511@gmail.com instead.",
            },
            { status: 503 },
          );
        }
      },
    },
  },
});
