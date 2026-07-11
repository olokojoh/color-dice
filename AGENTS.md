# Project Instructions

Preserve reusable project information in Markdown so an agent starting from scratch can understand the implementation, SEO decisions, verification evidence, and remaining work quickly. Keep `README.md`, `SEO.md`, and `progress.md` current when behavior or page strategy changes.

Avoid over-engineering. Only make changes that are directly requested or clearly necessary. Keep solutions simple and focused.

- Do not add unrelated features, refactors, comments, docstrings, type annotations, configurability, compatibility shims, or defensive handling for impossible internal states.
- Validate only at system boundaries such as user input and external APIs.
- Do not create helpers or abstractions for one-time operations.
- Delete code that is certainly unused instead of preserving compatibility aliases or removal comments.

## Source Of Truth

- Product and run instructions: `README.md`
- SEO page map and playbook evidence: `SEO.md`
- Current implementation and test handoff: `progress.md`
- Required SEO playbook: `/Users/reyn/Desktop/data/独立开发/onpage-seo-vibe-coding-playbook.md`
