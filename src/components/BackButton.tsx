import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type BackButtonProps = {
  /** Where the button goes — keep this list in sync with the site's pages. */
  to: "/" | "/projects";
  /** Visible label, e.g. "Back to home". */
  label: string;
};

/**
 * The one back control used across the site, so going from one page to
 * another always looks and behaves the same way.
 */
export function BackButton({ to, label }: BackButtonProps) {
  return (
    <Button asChild variant="ghost" size="sm" className="-ml-2 text-muted-foreground hover:text-foreground">
      <Link to={to}>
        <ArrowLeft />
        {label}
      </Link>
    </Button>
  );
}
