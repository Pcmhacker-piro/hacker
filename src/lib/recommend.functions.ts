import { createServerFn } from "@tanstack/react-start";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, Output, jsonSchema } from "ai";

// Plain-text catalog the model can choose from (kept in sync with the projects section).
const CATALOG = [
  {
    name: "Verdiqy",
    summary:
      "Unified competitive programming training platform. React 19, TypeScript, TanStack Start, PostgreSQL, Gemini API. Sheet builder from a 12,000+ problem bank, Codeforces profile comparison, contest tracker across Codeforces/LeetCode/CodeChef with analytics dashboard, hint-only AI mentor, ranked solution-video pipeline.",
  },
  {
    name: "Novix UI",
    summary:
      "Open-source React component library. TypeScript, Tailwind CSS v4, Radix UI, Motion. 500+ accessible components, OKLCH token theming with dark mode, scaffolding CLI, spring-physics motion system, tree-shakeable.",
  },
];

export type Recommendation = { name: string; reason: string };
export type RecommendResult = { picks: Recommendation[]; summary: string; error: string | null };

type Out = { summary: string; picks: Recommendation[] };

export const recommendProjects = createServerFn({ method: "POST" })
  .inputValidator((input: { query: string }) => {
    const query = String(input?.query ?? "").trim().slice(0, 500);
    if (query.length < 3) throw new Error("Please describe what you'd like to see.");
    return { query };
  })
  .handler(async ({ data }): Promise<RecommendResult> => {
    const apiKey = process.env['LOVABLE_API_KEY'];
    if (!apiKey) return { picks: [], summary: "", error: "AI is not configured yet." };

    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });

    try {
      const result = streamText({
        model: provider.responses("openai/gpt-6-astra"),
        instructions:
          "You recommend projects from a developer's portfolio to a visitor. Only choose from the catalog. Order picks by relevance; include only genuinely relevant ones (may be empty). Reasons: one short, friendly sentence addressed to the visitor. Summary: one sentence.\n\nCatalog:\n" +
          CATALOG.map((p) => `- ${p.name}: ${p.summary}`).join("\n"),
        prompt: `Visitor wants to see: ${data.query}`,
        output: Output.object({
          schema: jsonSchema<Out>({
            type: "object",
            additionalProperties: false,
            required: ["summary", "picks"],
            properties: {
              summary: { type: "string" },
              picks: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["name", "reason"],
                  properties: {
                    name: { type: "string", enum: CATALOG.map((p) => p.name) },
                    reason: { type: "string" },
                  },
                },
              },
            },
          }),
        }),
        maxRetries: 0,
        providerOptions: {
          openai: {
            forceReasoning: true,
            reasoningEffort: "low",
            reasoningSummary: "auto",
            store: false,
            include: ["reasoning.encrypted_content"],
          },
        },
      });
      const out = (await result.output) as Out;
      return { picks: out.picks ?? [], summary: out.summary ?? "", error: null };
    } catch (e) {
      const status = (e as { statusCode?: number })?.statusCode;
      console.error("recommendProjects failed", status, e);
      const error =
        status === 429
          ? "Too many requests right now — please try again in a moment."
          : status === 402 || status === 403
            ? "The AI assistant is temporarily unavailable."
            : "Couldn't get recommendations. Please try again.";
      return { picks: [], summary: "", error };
    }
  });
