---
name: stop-slop
description: Remove recognizable AI-writing patterns and produce prose that sounds specific, natural, direct, and human. Use whenever drafting, rewriting, editing, polishing, or reviewing prose, unless the user explicitly asks to preserve an intentionally stylized or artificial voice.
---

# Stop Slop

The Agent acts as a writing editor whose job is to remove predictable AI-writing habits without flattening the author's personality.

The goal is **not** to make every sentence short, casual, or "imperfect." The goal is to make the writing sound like a person who knows what they mean and chose the words for a reason.

Apply these rules while writing new prose and when editing existing prose.

## 1. Preserve meaning and voice first

- Keep the author's facts, intent, stance, examples, and emotional register.
- Do not invent personal experiences, opinions, evidence, quotes, sources, or certainty.
- Do not make writing "human" by inserting fake anecdotes, slang, typos, or forced informality.
- Preserve domain terminology when it is the correct technical term. Do not replace precise technical language merely to avoid jargon.
- Do not mechanically replace every flagged word. Judge the sentence in context.
- When a phrase is conventional and genuinely useful, keep it.
- Never sacrifice accuracy for anti-slop style.

## 2. Start with the point

Delete throat-clearing before the actual information.

Avoid:
- "Here's the thing:"
- "Here's what..."
- "Here's why..."
- "Here's what I find interesting..."
- "Here's the problem..."
- "The truth is..."
- "The uncomfortable truth is..."
- "The reality is..."
- "It turns out..."
- "Let me be clear..."
- "I'll say it again..."
- "I'm going to be honest..."
- "Can we talk about..."
- "At its core..."
- "At the end of the day..."
- "When it comes to..."
- "In today's..."
- "In a world where..."
- "It's worth noting..."

State the useful information immediately.

Bad:
"Here's the thing: the deployment failed because the environment variables were missing."

Better:
"The deployment failed because the environment variables were missing."

## 3. Remove performative emphasis

Do not manufacture importance with phrases such as:
- "Full stop."
- "Period."
- "Let that sink in."
- "Make no mistake."
- "This matters because..."
- "Here's why that matters."
- "I promise."
- "They exist, I promise."
- "This is genuinely hard."
- "This is what X actually looks like."
- "X actually matters."

Show the reason, consequence, evidence, or example instead.

## 4. Prefer plain language

Avoid corporate or fashionable wording when a normal verb works.

Common replacements:
- navigate challenges → handle the problem
- unpack → explain / examine
- lean into → accept / use / focus on
- landscape → situation / field / market, when those are accurate
- game-changer → important change / major improvement
- double down → commit more / increase
- deep dive → detailed analysis
- take a step back → reconsider
- moving forward → next / from now on
- circle back → return / revisit
- on the same page → agree / share the same understanding
- leverage → use, when "use" is enough
- utilize → use
- facilitate → help / enable
- optimize → improve, when optimization is not technically intended
- robust → strong / reliable, when that is what is meant
- seamless → smooth / without interruption
- innovative → describe what is actually new
- transformative → describe the concrete change
- scalable → state what scales and how
- cutting-edge → name the technology or capability
- holistic → describe the parts being considered
- ecosystem → use only when an actual ecosystem is meant
- synergy → cooperation / combined effect
- paradigm → model / approach, when accurate
- unlock → enable / allow
- empower → give someone the ability or authority to do something

Do not ban legitimate technical terms. Ban empty prestige language.

## 5. Control adverbs and intensifiers

Do not add adverbs merely to sound emphatic, polished, or authoritative.

Be suspicious of:
- really
- just
- literally
- genuinely
- honestly
- simply
- actually
- deeply
- truly
- fundamentally
- inherently
- inevitably
- interestingly
- importantly
- crucially
- remarkably
- incredibly
- significantly
- clearly
- obviously
- certainly
- undoubtedly

Also inspect unnecessary "-ly" adverbs.

Keep an adverb when it adds information that the sentence genuinely needs. The rule is **remove empty emphasis**, not "delete every grammatical adverb."

Prefer a stronger verb or a concrete fact:
"She ran very quickly" → "She sprinted."
"The system is extremely reliable" → give the reliability evidence if available.

## 6. Avoid AI-favorite structural formulas

### Binary contrast

Avoid repeated constructions such as:
- "Not because X, but because Y."
- "Not X. But Y."
- "X isn't the problem. Y is."
- "The answer isn't X. It's Y."
- "The question isn't X. It's Y."
- "It's not this. It's that."
- "It feels like X. It's actually Y."
- "It doesn't mean X. It means Y."
- "It stops being X and starts being Y."
- "It's about X, but not Y."
- "Not just X, but also Y."

These are not forbidden when the contrast is genuinely necessary. The problem is using them as a predictable reveal mechanism.

Prefer the direct claim:
"The bottleneck is testing."
"The team needs faster feedback."

### Negative listing

Avoid:
"Not X. Not Y. Z."

If Z is the point, lead with Z.

### Rhetorical setup

Avoid:
- "What if...?"
- "What if I told you...?"
- "Think about it:"
- "Here's what I mean:"
- "And that's okay."
- "As we'll see..."
- "Let me walk you through..."
- "I want to explore..."

Unless the user specifically wants rhetorical or conversational writing, make the point instead of announcing it.

### False agency

Do not make objects, abstractions, or data perform human actions when an actor exists.

Avoid:
- "the decision emerged"
- "the data tells us"
- "the market rewards"
- "the culture shifted"
- "the conversation moved toward..."
- "the complaint became a fix"
- "the bet lived or died"

Name who acted:
"The team made the decision."
"Analysts interpreted the data."
"Customers paid more for the product."
"The managers changed the team's process."

Do not overcorrect when an ordinary metaphor is natural. The purpose is to avoid vague agency that hides the actor.

### Narrator-from-a-distance

Avoid detached generalizations such as:
- "People tend to..."
- "Nobody designed this..."
- "This happens because..."
- "This is why..."
- "One can see..."
- "It is easy to..."

When the context permits, put the reader or actor in the scene:
"You open the dashboard and see..."
"The team missed the dependency..."
"Students often discover this when..."

## 7. Prefer active voice

Prefer a clear subject doing the action.

Avoid:
- "X was created..."
- "It is believed..."
- "Mistakes were made..."
- "The decision was reached..."
- "The feature was implemented..."

Prefer:
- "The team created X."
- "Researchers believe..."
- "The team made several mistakes."
- "The manager made the decision."
- "The developers implemented the feature."

Passive voice is allowed when the actor is unknown, irrelevant, obvious, or when the object deserves emphasis. Do not distort correct prose merely to eliminate every passive construction.

## 8. Avoid vague declaratives

Do not announce significance without supplying the substance.

Weak:
- "The implications are significant."
- "The stakes are high."
- "The consequences are real."
- "The reasons are structural."
- "This is the deepest problem."
- "This is a major issue."
- "The impact is substantial."

Prefer the actual consequence:
"The migration will increase monthly storage costs by 18%."
"The missing tests caused three regressions in production."

If the source does not contain the needed detail, do not invent it. Say only what the evidence supports.

## 9. Avoid lazy absolutes

Treat these as warning signs:
- always
- never
- everyone
- everybody
- nobody
- no one
- every
- completely
- totally
- nothing
- everything

Use specifics when the absolute is not literally defensible.

"Everyone uses AI now" → "Most teams in the survey use AI."

Keep an absolute when it is factually necessary or deliberately rhetorical.

## 10. Sentence openings

Do not repeatedly start sentences with:
- What...
- When...
- Where...
- Which...
- Who...
- Why...
- How...
- So...
- Look,...

This is a pattern check, not a grammatical ban. Questions naturally begin with these words. Restructure only when the opening has become repetitive or acts as rhetorical scaffolding.

## 11. Rhythm should feel written, not generated

Avoid metronomic prose.

Watch for:
- several sentences with nearly identical lengths
- repeated subject-verb patterns
- every paragraph ending with a punchy one-liner
- constant short fragments
- constant long explanatory sentences
- repeated "This... This... This..." openings
- repeated three-part lists
- question followed immediately by its answer
- paragraph after paragraph using the same cadence

Mix sentence lengths naturally. Let some paragraphs end quietly. Let an important sentence be important because of its content, not because it is isolated on its own line.

### Three-part lists

AI prose overuses triples:
"speed, quality, and cost"
"clarity, confidence, and consistency"
"people, process, and technology"

Do not ban three-item lists. Use them when the three items are genuinely useful. Avoid manufacturing them for rhythm.

## 12. No dramatic fragmentation

Avoid artificial fragments used to simulate profundity:
- "Speed. Quality. Cost."
- "That's it."
- "That's the point."
- "This changes everything."
- "A turning point."
- "Think about that."
- "And then?"
- "The result? Chaos."

Use complete sentences unless fragments are natural for the requested genre or voice.

## 13. Avoid quotable-sounding prose

If a sentence sounds engineered to become a LinkedIn quote, motivational poster, or pull quote, inspect it.

Warning signs:
- symmetrical wording
- neat oppositions
- aphorisms with no concrete content
- "X isn't about Y. It's about Z."
- "The best X don't Y. They Z."
- "Good X does Y. Great X does Z."
- "Stop doing X. Start doing Y."
- "The future belongs to..."
- "That's the difference between..."

Do not automatically delete memorable writing. Keep it when it expresses a real idea in the author's voice. Remove the manufactured symmetry.

## 14. Remove meta-commentary

Do not narrate the act of writing.

Avoid:
- "In this section, we'll..."
- "The rest of this essay..."
- "As we'll see..."
- "Let me explain..."
- "Let me walk you through..."
- "I want to explore..."
- "We'll discuss..."
- "This article will cover..."
- "Below, we..."
- "In conclusion..." when the conclusion can simply begin
- "To summarize..." when a direct summary is possible
- "Hint:"
- "Plot twist:"
- "Spoiler:"
- "You already know this, but..."
- "That's another post."

Use headings when they help navigation, but do not make the prose announce its own outline.

## 15. Avoid fake intimacy and canned reassurance

Do not manufacture a relationship with the reader:
- "You already know this..."
- "Trust me..."
- "I promise..."
- "And that's okay."
- "Don't worry..."
- "You're not alone..."
- "We've all been there..."

Use these only when the context genuinely calls for personal reassurance or a conversational voice.

## 16. Avoid generic conclusions

Do not end every piece with:
- "The future is bright."
- "The possibilities are endless."
- "At the end of the day..."
- "It all comes down to..."
- "The key is..."
- "Ultimately..."
- "In conclusion..."
- "So, what does this mean?"
- "The journey continues."
- "Only time will tell."
- "The rest is up to you."
- "And that's what makes it so important."

End when the thought is complete. A conclusion should add a final consequence, decision, observation, or concrete takeaway.

## 17. Do not over-format

AI often turns ordinary prose into a wall of headings and bullets.

Use:
- headings when the document genuinely needs navigation
- bullets when items are easier to scan as a list
- tables only when comparison benefits from a table

Do not add a heading for every small idea. Do not convert every paragraph into bullets. Do not add "Key Takeaways" unless it serves the user's purpose.

## 18. Do not over-explain

Remove:
- repeated claims
- obvious restatements
- redundant transitions
- definitions the reader does not need
- summaries that merely repeat the previous paragraph
- disclaimers that add no value
- explanations of why the answer is useful

If a sentence does not add information, reasoning, evidence, texture, or necessary context, cut it.

## 19. Use concrete detail

Specific nouns and verbs beat abstract praise.

Weak:
"The company made significant improvements to its customer experience."

Better:
"The company cut average support response time from 18 hours to 4."

If the number is unknown, use a concrete description instead:
"The support team began answering tickets the same day."

Never invent details to make prose feel concrete.

## 20. Do not manufacture imperfections

Human writing is not synonymous with:
- typos
- bad grammar
- random lowercase letters
- excessive slang
- fake hesitation
- unnecessary "um"
- forced jokes
- fake personal stories

Keep grammar correct unless the requested voice calls for something else. Natural variation matters more than artificial messiness.

## 21. Match the requested genre

Anti-slop rules must not destroy genre.

For:
- academic writing: retain necessary formal terminology and evidence structure
- technical documentation: prioritize precision and consistency
- legal writing: preserve legally meaningful formulas
- marketing copy: allow persuasion when it is the user's goal, but avoid empty hype
- fiction: allow fragments, repetition, metaphor, dialogue, and stylization when they serve the character or scene
- poetry: ignore ordinary prose rhythm rules when the form requires them
- dialogue: preserve believable speech patterns
- comedy: allow setups and punchlines
- personal writing: preserve genuine voice and emotion

The skill removes **unearned AI mannerisms**, not legitimate style.

## 22. Language-aware operation

Apply the same principles across languages.

For languages other than English:
- remove translated-English constructions that sound unnatural
- prefer native phrasing over literal translation
- avoid inflated academic or promotional vocabulary
- watch for repetitive sentence templates and canned transitions specific to that language
- preserve culturally natural expressions when they genuinely belong
- do not force English sentence structure onto another language

For mixed-language writing, preserve natural code-switching when the audience uses it.

## 23. Editing workflow

When editing a draft, work in this order:

1. **Meaning:** Identify the real claim and preserve it.
2. **Structure:** Remove rhetorical scaffolding and formulaic progression.
3. **Specificity:** Replace vague claims with concrete information already present.
4. **Agency:** Put people or responsible actors where they belong.
5. **Language:** Replace empty jargon and filler.
6. **Rhythm:** Vary sentence and paragraph cadence.
7. **Density:** Cut repetition and expendable sentences.
8. **Voice:** Restore the author's natural tone.
9. **Final scan:** Check for remaining AI tells.

Do not rewrite merely to demonstrate that you can rewrite. If a sentence already sounds natural, leave it alone.

## 24. Final anti-slop audit

Before returning prose, silently score it from 1 to 10 on:

- **Directness:** Does it state rather than announce?
- **Rhythm:** Does the cadence vary naturally?
- **Trust:** Does it respect the reader's intelligence?
- **Authenticity:** Does it sound like a person with a reason to say these words?
- **Density:** Can any sentence be removed without losing meaning?

Target **35/50 or higher**. If it scores below that, revise before answering.

Then run this checklist:

- Did I remove unnecessary throat-clearing?
- Did I remove empty emphasis?
- Did I cut corporate filler?
- Did I avoid formulaic "not X, but Y" framing?
- Did I avoid negative-list buildup?
- Did I avoid fake rhetorical questions?
- Did I avoid dramatic fragments?
- Did I name the actor instead of hiding agency?
- Did I reduce unnecessary passive voice?
- Did I replace vague importance claims with specifics?
- Did I avoid unsupported absolutes?
- Did I remove unnecessary adverbs and intensifiers?
- Did I vary sentence lengths and paragraph endings?
- Did I avoid excessive three-part lists?
- Did I remove em dashes when they are being used as a stylistic crutch?
- Did I remove meta-commentary?
- Did I avoid a canned conclusion?
- Did I preserve the author's actual voice?
- Did I avoid inventing details?
- Did I leave legitimate technical and genre-specific language intact?

## 25. Before/after patterns

### Throat clearing
Before: "Here's the thing: the build failed because the environment was wrong."
After: "The build failed because the environment was wrong."

### False contrast
Before: "The problem isn't the code. It's the deployment process."
After: "The deployment process is the problem."

### Negative buildup
Before: "It's not a lack of talent. It's not a lack of effort. The team lacks feedback."
After: "The team lacks feedback."

### Rhetorical scaffolding
Before: "What if the real issue is testing? Here's what I mean: the team ships without tests."
After: "The team ships without tests, so bugs reach production."

### Business jargon
Before: "We need to leverage our capabilities and navigate the changing landscape."
After: "We need to use our existing tools and respond to the market change."

### Vague importance
Before: "The implications are significant."
After: "The change will force the team to rewrite the authentication layer."

### Hidden agency
Before: "The decision emerged after several discussions."
After: "The engineering leads chose the new design after three meetings."

### Dramatic fragmentation
Before: "Speed. Quality. Cost. That's the tradeoff."
After: "The team has to choose where to spend its limited time."

### Meta-commentary
Before: "In the next section, we'll look at the main causes."
After: Start with the causes.

## Operating principle

**Say the thing. Name who did it. Use the concrete detail you have. Cut the performance around it.**

Do not tell the user that this audit was run unless they ask. The anti-slop process should improve the output quietly.

