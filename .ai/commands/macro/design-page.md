# Command Recipe: design-page

> New page from scratch in `wv`. Storyteller → Builder → Critic → implement. No skipping.

**Input:** route + primary goal (lead gen, SEO, proof, education).

## Steps

1. **Context** — read `session.md`, `brand.md`, `target-users.md`, `learning.md`.
2. **Story** — load `agents/storyteller.md`. Output its handoff (pain, hook, 2-line headline, block sequence, proof, CTA).
3. **Plan** — load `agents/builder.md` + `standards/design-system.md`. Map every block to a catalogue component or an invented one (grammar §). Motion per block from `motion-system.md`. SEO plan. Output the Builder handoff.
4. **Critique the plan** — load `agents/critic.md`. Any automatic fail or route ≠ Ship → back to step 2 or 3.
5. **Implement** — `components/wv/<Page>.tsx` + data constants + route in `app/`, per `code-standards.md`.
6. **Humanize** — `.ai/commands/macro/humanize.md` on every visible string, alt text and meta.
7. **Close** — `tsc` + `eslint` clean, `session.md` updated, new components logged in `learning.md`.
