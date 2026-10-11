import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Check, Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Please tell me your name.").max(80, "That name is too long."),
  email: z.string().trim().email("That email doesn't look right.").max(160, "That email is too long."),
  message: z
    .string()
    .trim()
    .min(10, "A sentence or two helps me reply properly.")
    .max(1200, "Please keep it under 1200 characters."),
});

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

export function MessageForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [note, setNote] = useState("");

  const update =
    (field: Field) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setValues((v) => ({ ...v, [field]: value }));
      setErrors((e) => ({ ...e, [field]: undefined }));
    };

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as Field;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setStatus("sending");
    setNote("");
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const out = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && out.ok) {
        setStatus("sent");
        setValues({ name: "", email: "", message: "" });
      } else {
        setStatus("failed");
        setNote(out.error || "Something went wrong — email pcmeena511@gmail.com instead.");
      }
    } catch {
      setStatus("failed");
      setNote("Couldn't reach the site — email pcmeena511@gmail.com instead.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-primary/40 bg-primary/5 p-6">
        <div className="flex items-center gap-2 font-medium text-foreground">
          <Check className="h-4 w-4 text-primary" />
          Message sent
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks — it's on its way. I usually reply within a day.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setNote("");
          }}
          className="mt-4 text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  const busy = status === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Your name</span>
          <Input
            value={values.name}
            onChange={update("name")}
            placeholder="Jane Doe"
            autoComplete="name"
            className="rounded-lg border-border bg-card"
          />
          {errors.name && <span className="mt-1.5 block text-xs text-destructive">{errors.name}</span>}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Email</span>
          <Input
            type="email"
            value={values.email}
            onChange={update("email")}
            placeholder="jane@company.com"
            autoComplete="email"
            className="rounded-lg border-border bg-card"
          />
          {errors.email && <span className="mt-1.5 block text-xs text-destructive">{errors.email}</span>}
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
          What would you like to build or discuss?
        </span>
        <Textarea
          value={values.message}
          onChange={update("message")}
          rows={4}
          placeholder="A short note about the role, project or idea…"
          className="resize-none rounded-lg border-border bg-card"
        />
        {errors.message && (
          <span className="mt-1.5 block text-xs text-destructive">{errors.message}</span>
        )}
      </label>
      {status === "failed" && note && (
        <p className="rounded-lg border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {note}
        </p>
      )}
      <Button
        type="submit"
        disabled={busy}
        className="h-9 gap-2 rounded-md px-4 text-sm"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
        {busy ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
