<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Load decorative R3F sky effects lazily after hydration, only while visible and without reduced motion; this preserves SSR and avoids unnecessary animation work.
- Resolve semantic CSS color tokens through the browser before passing colors to Three.js; this keeps scene materials aligned with the design system.

- Live GitHub PRs come from a cached server function calling the public GitHub search API (no token); the curated list stays as a fallback if GitHub is unavailable.
