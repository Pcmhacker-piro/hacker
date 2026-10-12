import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { toast } from "sonner";

const EMAIL = "pcmeena511@gmail.com";

function copyEmail(): Promise<void> {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(EMAIL);
  }
  // Fallback for browsers that block the async clipboard API.
  const ta = document.createElement("textarea");
  ta.value = EMAIL;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  ta.remove();
  return Promise.resolve();
}

export function CopyEmailButton({
  variant = "icon",
  className = "",
}: {
  variant?: "icon" | "full";
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    try {
      await copyEmail();
    } catch {
      toast.error("Couldn't copy", { description: EMAIL });
      return;
    }
    setCopied(true);
    toast.success("Copied!", { description: EMAIL });
    window.setTimeout(() => setCopied(false), 1600);
  };

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`group inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent ${className}`}
      >
        {copied ? (
          <Check className="h-4 w-4 text-primary" />
        ) : (
          <Mail className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-primary" />
        )}
        {copied ? "Copied!" : "Copy email"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Copy email ${EMAIL}`}
      title={`Copy ${EMAIL}`}
      className={`flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground shadow-sm transition-all hover:border-primary/60 hover:bg-accent hover:text-foreground hover:shadow-md ${className}`}
    >
      {copied ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
    </button>
  );
}
