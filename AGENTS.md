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

- Architecture spec lives in docs/ARQUITETURA.md; update it when structure changes so other tools/devs can follow it.
- UI strings go through src/lib/i18n.tsx (`t(key)`), English is the fallback; language is detected client-side in useEffect to avoid hydration mismatch.
