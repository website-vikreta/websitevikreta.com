# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> Global Navigation, Scroll States & Mobile Drawer >> Home page: invisible desktop nav links are not reachable by keyboard Tab
- Location: e2e/navigation.spec.ts:97:7

# Error details

```
Error: Keyboard focus landed on invisible nav links (add visibility:hidden or inert while hidden)

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 7

- Array []
+ Array [
+   "Services",
+   "Work",
+   "About",
+   "Blog",
+   "Careers",
+ ]
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - navigation "Main navigation" [ref=e3]:
      - link "Website Vikreta | Home" [ref=e4] [cursor=pointer]:
        - /url: /
        - img "Website Vikreta" [ref=e6]
      - list [ref=e7]:
        - listitem [ref=e8]:
          - button "Services" [ref=e9] [cursor=pointer]
        - listitem [ref=e12]:
          - link "Work" [ref=e13] [cursor=pointer]:
            - /url: /work
        - listitem [ref=e14]:
          - link "About" [ref=e15] [cursor=pointer]:
            - /url: /about
        - listitem [ref=e16]:
          - link "Blog" [ref=e17] [cursor=pointer]:
            - /url: /blog
        - listitem [ref=e18]:
          - link "Careers" [ref=e19] [cursor=pointer]:
            - /url: /careers
      - link "Contact Us" [ref=e21] [cursor=pointer]:
        - /url: /contact
        - generic [ref=e22]:
          - generic [ref=e23]: Contact Us
          - generic [aria-hidden] [ref=e24]:
            - generic [ref=e25]: C
            - generic [ref=e27]: o
            - generic [ref=e29]: "n"
            - generic [ref=e31]: t
            - generic [ref=e33]: a
            - generic [ref=e35]: c
            - generic [ref=e37]: t
            - generic [ref=e41]: U
            - generic [ref=e43]: s
  - main [ref=e47]:
    - region "Hero Website Vikreta" [ref=e48]:
      - generic [ref=e49]:
        - heading "We don't just execute. We think first." [level=1] [ref=e50]:
          - generic [ref=e52]: We
          - generic [ref=e54]: don't
          - generic [ref=e56]: just
          - generic [ref=e58]: execute.
          - generic [ref=e60]: We
          - generic [ref=e62]: think
          - generic [ref=e64]: first.
        - paragraph [ref=e65]: Website Vikreta works with businesses that want to go digital properly, or want to figure out where AI fits in what they already do. Websites, apps, automation, design. We use every relevant tool available. And we listen before we touch anything.
        - generic [ref=e66]:
          - link "Talk to Us, it's Free" [ref=e67] [cursor=pointer]:
            - /url: /contact
            - generic [ref=e68]:
              - generic [ref=e69]: Talk to Us, it's Free
              - generic [aria-hidden] [ref=e70]:
                - generic [ref=e71]: T
                - generic [ref=e73]: a
                - generic [ref=e75]: l
                - generic [ref=e77]: k
                - generic [ref=e81]: t
                - generic [ref=e83]: o
                - generic [ref=e87]: U
                - generic [ref=e89]: s
                - generic [ref=e91]: ","
                - generic [ref=e95]: i
                - generic [ref=e97]: t
                - generic [ref=e99]: "'"
                - generic [ref=e101]: s
                - generic [ref=e105]: F
                - generic [ref=e107]: r
                - generic [ref=e109]: e
                - generic [ref=e111]: e
          - link "See our work" [ref=e115] [cursor=pointer]:
            - /url: /work
            - generic [ref=e116]:
              - generic [ref=e117]: See our work
              - generic [aria-hidden] [ref=e118]:
                - generic [ref=e119]: S
                - generic [ref=e121]: e
                - generic [ref=e123]: e
                - generic [ref=e127]: o
                - generic [ref=e129]: u
                - generic [ref=e131]: r
                - generic [ref=e135]: w
                - generic [ref=e137]: o
                - generic [ref=e139]: r
                - generic [ref=e141]: k
      - link "Top rated on Upwork with 100% Job Success Score — view agency profile" [ref=e147] [cursor=pointer]:
        - /url: http://upwork.com/ag/websitevikreta
        - img [aria-hidden] [ref=e149]:
          - generic [ref=e150]: TOP RATED ON UPWORK ✱ 100% JOB SUCCESS ✱ CLICK TO HIRE ✱
    - region "Impact Statistics" [ref=e153]:
      - generic [ref=e154]:
        - heading "The Numbers So Far" [level=2] [ref=e155]:
          - generic [ref=e157]: The Numbers So Far
        - generic [ref=e158]:
          - 'region "Years working with founders and teams across the globe: 5+" [ref=e160]':
            - generic [ref=e161]: 5+
            - paragraph [ref=e163]: Years working with founders and teams across the globe
          - 'region "Projects shipped: websites, apps, automation, design: 68+" [ref=e165]':
            - generic [ref=e166]: 68+
            - paragraph [ref=e168]: "Projects shipped: websites, apps, automation, design"
          - 'region "Saved for clients since we went AI-first: 6360+hrs" [ref=e170]':
            - generic [ref=e171]: 6360+hrs
            - paragraph [ref=e173]: Saved for clients since we went AI-first
          - 'region "Tools we can use: no limitation, only solutions: unlimited" [ref=e175]':
            - paragraph [ref=e179]: "Tools we can use: no limitation, only solutions"
        - paragraph [ref=e181]: That last number is a year old. It has only gone up since.
    - generic [ref=e183]:
      - generic [ref=e184]:
        - heading "We don't build pages." [level=2] [ref=e185]:
          - generic [ref=e187]: We don't build pages.
        - heading "We build systems." [level=2] [ref=e188]:
          - generic [ref=e190]: We build systems.
        - paragraph [ref=e192]: The automation, the website, and the marketing that runs on it come from one team. Split it across three vendors who have never spoken to each other, and the work falls apart.
      - generic [ref=e193]:
        - article [ref=e195]:
          - generic [ref=e196]:
            - generic [ref=e197]:
              - generic [ref=e198]:
                - heading "AI Automation & Workflow Optimization" [level=3] [ref=e199]
                - paragraph [ref=e200]: We audit the hours your team spends on CRM, reporting, and support, then build custom AI agents and workflow automation that take that work off their plate.
              - link "Explore More" [ref=e202] [cursor=pointer]:
                - /url: /services/ai-automations
                - generic [ref=e203]:
                  - generic [ref=e204]: Explore More
                  - generic [aria-hidden] [ref=e205]:
                    - generic [ref=e206]: E
                    - generic [ref=e208]: x
                    - generic [ref=e210]: p
                    - generic [ref=e212]: l
                    - generic [ref=e214]: o
                    - generic [ref=e216]: r
                    - generic [ref=e218]: e
                    - generic [ref=e222]: M
                    - generic [ref=e224]: o
                    - generic [ref=e226]: r
                    - generic [ref=e228]: e
            - img "AI Automation & Workflow Optimization" [ref=e233]
        - article [ref=e236]:
          - generic [ref=e237]:
            - generic [ref=e238]:
              - generic [ref=e239]:
                - heading "Website Development" [level=3] [ref=e240]
                - paragraph [ref=e241]: Custom, SEO-ready websites for growing businesses. Fast to load, written to rank, and built around how you sell.
              - link "Explore More" [ref=e243] [cursor=pointer]:
                - /url: /services/web-development
                - generic [ref=e244]:
                  - generic [ref=e245]: Explore More
                  - generic [aria-hidden] [ref=e246]:
                    - generic [ref=e247]: E
                    - generic [ref=e249]: x
                    - generic [ref=e251]: p
                    - generic [ref=e253]: l
                    - generic [ref=e255]: o
                    - generic [ref=e257]: r
                    - generic [ref=e259]: e
                    - generic [ref=e263]: M
                    - generic [ref=e265]: o
                    - generic [ref=e267]: r
                    - generic [ref=e269]: e
            - img "Website Development" [ref=e274]
        - article [ref=e277]:
          - generic [ref=e278]:
            - generic [ref=e279]:
              - generic [ref=e280]:
                - heading "UI/UX Design" [level=3] [ref=e281]
                - paragraph [ref=e282]: User research, wireframes, and product design for web and mobile. Design systems and prototypes your developers can actually ship.
              - link "Explore More" [ref=e284] [cursor=pointer]:
                - /url: /services/uiux-design
                - generic [ref=e285]:
                  - generic [ref=e286]: Explore More
                  - generic [aria-hidden] [ref=e287]:
                    - generic [ref=e288]: E
                    - generic [ref=e290]: x
                    - generic [ref=e292]: p
                    - generic [ref=e294]: l
                    - generic [ref=e296]: o
                    - generic [ref=e298]: r
                    - generic [ref=e300]: e
                    - generic [ref=e304]: M
                    - generic [ref=e306]: o
                    - generic [ref=e308]: r
                    - generic [ref=e310]: e
            - img "UI/UX Design" [ref=e315]
        - article [ref=e318]:
          - generic [ref=e319]:
            - generic [ref=e320]:
              - generic [ref=e321]:
                - heading "Web & Mobile Apps / CRM Systems" [level=3] [ref=e322]
                - paragraph [ref=e323]: Custom CRMs, customer portals, internal tools, and e-commerce. Web and mobile apps built around how your business runs.
              - link "Explore More" [ref=e325] [cursor=pointer]:
                - /url: /services/web-mobile-app-development
                - generic [ref=e326]:
                  - generic [ref=e327]: Explore More
                  - generic [aria-hidden] [ref=e328]:
                    - generic [ref=e329]: E
                    - generic [ref=e331]: x
                    - generic [ref=e333]: p
                    - generic [ref=e335]: l
                    - generic [ref=e337]: o
                    - generic [ref=e339]: r
                    - generic [ref=e341]: e
                    - generic [ref=e345]: M
                    - generic [ref=e347]: o
                    - generic [ref=e349]: r
                    - generic [ref=e351]: e
            - img "Web & Mobile Apps / CRM Systems" [ref=e356]
        - article [ref=e359]:
          - generic [ref=e360]:
            - generic [ref=e361]:
              - generic [ref=e362]:
                - heading "Digital Marketing / SEO & GEO" [level=3] [ref=e363]
                - paragraph [ref=e364]: SEO, GEO, content, and paid campaigns built to bring in leads. Local SEO and growth marketing you can measure in enquiries.
              - link "Explore More" [active] [ref=e366] [cursor=pointer]:
                - /url: /services/digital-marketing
                - generic [ref=e367]:
                  - generic [ref=e368]: Explore More
                  - generic [aria-hidden] [ref=e369]:
                    - generic [ref=e370]: E
                    - generic [ref=e372]: x
                    - generic [ref=e374]: p
                    - generic [ref=e376]: l
                    - generic [ref=e378]: o
                    - generic [ref=e380]: r
                    - generic [ref=e382]: e
                    - generic [ref=e386]: M
                    - generic [ref=e388]: o
                    - generic [ref=e390]: r
                    - generic [ref=e392]: e
            - img "Digital Marketing / SEO & GEO" [ref=e397]
    - generic [ref=e399]:
      - heading "Who we've built for" [level=2] [ref=e401]:
        - generic [ref=e403]: Who we've built for
      - generic "Client logos" [ref=e405]:
        - generic [ref=e406]:
          - generic "Sustainable Bitcoin Protocol" [ref=e407]:
            - img "Sustainable Bitcoin Protocol" [ref=e408]
          - generic "Simpli Home" [ref=e409]:
            - img "Simpli Home" [ref=e410]
          - generic "Blancora" [ref=e411]:
            - img "Blancora" [ref=e412]
          - generic "Boompanda" [ref=e413]:
            - img "Boompanda" [ref=e414]
          - generic "AP Cleanco" [ref=e415]:
            - img "AP Cleanco" [ref=e416]
          - generic "Tocal" [ref=e417]:
            - img "Tocal" [ref=e418]
          - generic "Strandzboost" [ref=e419]:
            - img "Strandzboost" [ref=e420]
          - generic "Raicoon" [ref=e421]:
            - img "Raicoon" [ref=e422]
          - generic "SR Design Hub" [ref=e423]:
            - img "SR Design Hub" [ref=e424]
          - generic "Ambrosia Life Sciences" [ref=e425]:
            - img "Ambrosia Life Sciences" [ref=e426]
          - generic "Budget Renovations" [ref=e427]:
            - img "Budget Renovations" [ref=e428]
          - generic "Champion Lenders" [ref=e429]:
            - img "Champion Lenders" [ref=e430]
          - generic "Cozmo Realty" [ref=e431]:
            - img "Cozmo Realty" [ref=e432]
          - generic "Archmodal" [ref=e433]:
            - img "Archmodal" [ref=e434]
          - generic "Limra Events" [ref=e435]:
            - img "Limra Events" [ref=e436]
          - generic "Workik" [ref=e437]:
            - img "Workik" [ref=e438]
          - generic "Katalyst" [ref=e439]:
            - img "Katalyst" [ref=e440]
          - generic "Sustainable Bitcoin Protocol" [ref=e441]:
            - img "Sustainable Bitcoin Protocol" [ref=e442]
          - generic "Simpli Home" [ref=e443]:
            - img "Simpli Home" [ref=e444]
          - generic "Blancora" [ref=e445]:
            - img "Blancora" [ref=e446]
          - generic "Boompanda" [ref=e447]:
            - img "Boompanda" [ref=e448]
          - generic "AP Cleanco" [ref=e449]:
            - img "AP Cleanco" [ref=e450]
          - generic "Tocal" [ref=e451]:
            - img "Tocal" [ref=e452]
          - generic "Strandzboost" [ref=e453]:
            - img "Strandzboost" [ref=e454]
          - generic "Raicoon" [ref=e455]:
            - img "Raicoon" [ref=e456]
          - generic "SR Design Hub" [ref=e457]:
            - img "SR Design Hub" [ref=e458]
          - generic "Ambrosia Life Sciences" [ref=e459]:
            - img "Ambrosia Life Sciences" [ref=e460]
          - generic "Budget Renovations" [ref=e461]:
            - img "Budget Renovations" [ref=e462]
          - generic "Champion Lenders" [ref=e463]:
            - img "Champion Lenders" [ref=e464]
          - generic "Cozmo Realty" [ref=e465]:
            - img "Cozmo Realty" [ref=e466]
          - generic "Archmodal" [ref=e467]:
            - img "Archmodal" [ref=e468]
          - generic "Limra Events" [ref=e469]:
            - img "Limra Events" [ref=e470]
          - generic "Workik" [ref=e471]:
            - img "Workik" [ref=e472]
          - generic "Katalyst" [ref=e473]:
            - img "Katalyst" [ref=e474]
    - region "Featured Work" [ref=e475]:
      - generic [ref=e476]:
        - generic [ref=e477]:
          - heading "Proof over promises." [level=2] [ref=e478]:
            - generic [ref=e480]: Proof over promises.
          - paragraph [ref=e482]: We don't pitch what we might do. Here is what we've already shipped, and what it changed for the businesses behind it.
        - generic [ref=e483]:
          - link "Simpli Home AI AUTOMATION / MEDIA OPS Bulk media generation, automated. A media team doing bulk content generation by hand. We automated the whole pipeline inside Figma Buzz. The work just started happening faster. Read case study Simpli Home logo" [ref=e485] [cursor=pointer]:
            - /url: /work/simpli-home
            - generic [ref=e486]:
              - img "Simpli Home" [ref=e487]
              - generic [ref=e488]:
                - generic [ref=e489]: AI AUTOMATION / MEDIA OPS
                - heading "Bulk media generation, automated. A media team doing bulk content generation by hand. We automated the whole pipeline inside Figma Buzz. The work just started happening faster." [level=3] [ref=e490]
                - generic [ref=e491]: Read case study
            - img "Simpli Home logo" [ref=e498]
          - generic [ref=e499]:
            - link "Sustainable Bitcoin Protocol UI/UX DESIGN / DESIGN SYSTEM From MVP to a product people actually use. Rough flows, no design system, unclear product. We went in at the foundation and rebuilt everything. Read case study" [ref=e500] [cursor=pointer]:
              - /url: /work/sustainable-bitcoin-protocol
              - img "Sustainable Bitcoin Protocol" [ref=e501]
              - generic [ref=e502]:
                - generic [ref=e503]: UI/UX DESIGN / DESIGN SYSTEM
                - heading "From MVP to a product people actually use. Rough flows, no design system, unclear product. We went in at the foundation and rebuilt everything." [level=3] [ref=e504]
                - generic [ref=e505]: Read case study
            - link "AP Cleanco WEBSITE / MARKETING Zero to online. Properly. Garage cleaning company, no web presence at all. We built the marketing site from scratch. Local SEO baked in, loads fast, written to convert. Read case study" [ref=e509] [cursor=pointer]:
              - /url: /work/ap-cleanco
              - img "AP Cleanco" [ref=e510]
              - generic [ref=e511]:
                - generic [ref=e512]: WEBSITE / MARKETING
                - heading "Zero to online. Properly. Garage cleaning company, no web presence at all. We built the marketing site from scratch. Local SEO baked in, loads fast, written to convert." [level=3] [ref=e513]
                - generic [ref=e514]: Read case study
    - generic [ref=e518]:
      - heading "The AI stack we actually use." [level=3] [ref=e520]:
        - generic [ref=e522]: The AI stack we actually use.
      - generic [ref=e525]:
        - generic "OpenAI" [ref=e526]:
          - img "OpenAI" [ref=e527]
        - generic "Claude AI" [ref=e528]:
          - img "Claude AI" [ref=e529]
        - generic "Gemini" [ref=e530]:
          - img "Gemini" [ref=e531]
        - generic "Cursor" [ref=e532]:
          - img "Cursor" [ref=e533]
        - generic "v0" [ref=e534]:
          - img "v0" [ref=e535]
        - generic "Lovable" [ref=e536]:
          - img "Lovable" [ref=e537]
        - generic "n8n" [ref=e538]:
          - img "n8n" [ref=e539]
        - generic "Make.com" [ref=e540]:
          - img "Make.com" [ref=e541]
        - generic "Midjourney" [ref=e542]:
          - img "Midjourney" [ref=e543]
        - generic "Sora" [ref=e544]:
          - img "Sora" [ref=e545]
        - generic "Flux":
          - img "Flux"
        - generic "ElevenLabs":
          - img "ElevenLabs"
        - generic "Kling AI":
          - img "Kling AI"
        - generic "CrewAI":
          - img "CrewAI"
        - generic "LangChain":
          - img "LangChain"
        - generic "Microsoft Copilot":
          - img "Microsoft Copilot"
        - generic "OpenAI" [ref=e546]:
          - img "OpenAI" [ref=e547]
        - generic "Claude AI" [ref=e548]:
          - img "Claude AI" [ref=e549]
        - generic "Gemini" [ref=e550]:
          - img "Gemini" [ref=e551]
        - generic "Cursor" [ref=e552]:
          - img "Cursor" [ref=e553]
        - generic "v0" [ref=e554]:
          - img "v0" [ref=e555]
        - generic "Lovable" [ref=e556]:
          - img "Lovable" [ref=e557]
        - generic "n8n" [ref=e558]:
          - img "n8n" [ref=e559]
        - generic "Make.com" [ref=e560]:
          - img "Make.com" [ref=e561]
        - generic "Midjourney" [ref=e562]:
          - img "Midjourney" [ref=e563]
        - generic "Sora" [ref=e564]:
          - img "Sora" [ref=e565]
        - generic "Flux":
          - img "Flux"
        - generic "ElevenLabs":
          - img "ElevenLabs"
        - generic "Kling AI":
          - img "Kling AI"
        - generic "CrewAI":
          - img "CrewAI"
        - generic "LangChain":
          - img "LangChain"
        - generic "Microsoft Copilot":
          - img "Microsoft Copilot"
    - generic [ref=e567]:
      - heading "Work that moved numbers." [level=3] [ref=e568]:
        - generic [ref=e570]: Work that moved numbers.
      - generic [ref=e572]:
        - generic [ref=e573]: 11 hrs
        - generic [ref=e576]:
          - generic [ref=e577]: Saved per week
          - generic [ref=e578]: ·
          - generic [ref=e579]: E-commerce
        - paragraph [ref=e580]:
          - text: “
          - generic [ref=e581]: Our
          - generic [ref=e583]: team
          - generic [ref=e585]: finally
          - generic [ref=e587]: does
          - generic [ref=e589]: the
          - generic [ref=e591]: work
          - generic [ref=e593]: we
          - generic [ref=e595]: hired
          - generic [ref=e597]: them
          - generic [ref=e599]: for.
          - generic [ref=e601]: Game
          - generic [ref=e603]: changer.
          - text: ”
        - paragraph [ref=e606]: — Darcy McGilvery, Simpli Home
      - generic [ref=e608]:
        - button "View Darcy McGilvery, Simpli Home testimonial" [ref=e609] [cursor=pointer]:
          - generic [ref=e610]: D
          - generic [ref=e611]: Darcy McGilvery, Simpli Home
        - button "View Co-founder, AP Cleanco testimonial" [ref=e614] [cursor=pointer]:
          - generic [ref=e615]: P
          - generic: Co-founder, AP Cleanco
        - button "View Co-founder, Sustainable Bitcoin Protocol testimonial" [ref=e616] [cursor=pointer]:
          - generic [ref=e617]: B
          - generic: Co-founder, Sustainable Bitcoin Protocol
    - generic [ref=e619]:
      - heading "The thinking behind the work." [level=2] [ref=e621]:
        - generic [ref=e623]: The thinking behind the work.
      - generic [ref=e624]:
        - article [ref=e626]:
          - link [ref=e627] [cursor=pointer]:
            - /url: /blog/ai-and-automation/when-not-to-automate-ai-automation-limitations
            - 'img "When Not to Automate: 7 Signs a Process Isn''t Ready for AI" [ref=e629]'
          - heading [level=3] [ref=e630]:
            - 'link "When Not to Automate: 7 Signs a Process Isn''t Ready for AI" [ref=e631] [cursor=pointer]':
              - /url: /blog/ai-and-automation/when-not-to-automate-ai-automation-limitations
          - paragraph [ref=e632]: Automating a broken process only speeds up its failures. Here are seven signs a process is not ready for AI automation, and what to fix first.
          - generic [ref=e633]:
            - link "AI Automation" [ref=e634] [cursor=pointer]:
              - /url: /blog/tags/ai-automation
            - link "Risk Management" [ref=e635] [cursor=pointer]:
              - /url: /blog/tags/risk-management
            - link "Human-in-the-Loop" [ref=e636] [cursor=pointer]:
              - /url: /blog/tags/human-in-the-loop
          - generic [ref=e637]:
            - generic [ref=e638]:
              - generic "0 likes" [ref=e639]: "0"
              - generic "0 comments" [ref=e642]: "0"
            - link "Read more" [ref=e645] [cursor=pointer]:
              - /url: /blog/ai-and-automation/when-not-to-automate-ai-automation-limitations
        - article [ref=e651]:
          - link [ref=e652] [cursor=pointer]:
            - /url: /blog/educational/rethinking-ui-ux-designing-for-ai-browsers-2026
            - 'img "Designing for AI Browsers in 2026: UX for People and AI Agents" [ref=e654]'
          - heading [level=3] [ref=e655]:
            - 'link "Designing for AI Browsers in 2026: UX for People and AI Agents" [ref=e656] [cursor=pointer]':
              - /url: /blog/educational/rethinking-ui-ux-designing-for-ai-browsers-2026
          - paragraph [ref=e657]: "AI browsers now act on pages for users. Here is what that changes in UI/UX design: labels, states, stable layouts, agent-ready forms, and human confirmation."
          - generic [ref=e658]:
            - link "Industry Trends" [ref=e659] [cursor=pointer]:
              - /url: /blog/tags/industry-trends
            - link "AI Automation" [ref=e660] [cursor=pointer]:
              - /url: /blog/tags/ai-automation
            - link "Business Strategy" [ref=e661] [cursor=pointer]:
              - /url: /blog/tags/business-strategy
          - generic [ref=e662]:
            - generic [ref=e663]:
              - generic "1 like" [ref=e664]: "1"
              - generic "0 comments" [ref=e667]: "0"
            - link "Read more" [ref=e670] [cursor=pointer]:
              - /url: /blog/educational/rethinking-ui-ux-designing-for-ai-browsers-2026
        - article [ref=e676]:
          - link [ref=e677] [cursor=pointer]:
            - /url: /blog/educational/cited-chatgpt-perplexity-strategies
            - img "Master Content Strategies to Get Cited by ChatGPT and Perplexity" [ref=e679]
          - heading [level=3] [ref=e680]:
            - link "Master Content Strategies to Get Cited by ChatGPT and Perplexity" [ref=e681] [cursor=pointer]:
              - /url: /blog/educational/cited-chatgpt-perplexity-strategies
          - paragraph [ref=e682]: To improve your chances of being cited by ChatGPT and Perplexity, follow a practical checklist that focuses on quality, relevance, and authority in your content creation.
          - generic [ref=e683]:
            - link "Industry Trends" [ref=e684] [cursor=pointer]:
              - /url: /blog/tags/industry-trends
            - link "Process Optimization" [ref=e685] [cursor=pointer]:
              - /url: /blog/tags/process-optimization
            - link "Productivity & Efficiency" [ref=e686] [cursor=pointer]:
              - /url: /blog/tags/productivity-and-efficiency
          - generic [ref=e687]:
            - generic [ref=e688]:
              - generic "3 likes" [ref=e689]: "3"
              - generic "0 comments" [ref=e692]: "0"
            - link "Read more" [ref=e695] [cursor=pointer]:
              - /url: /blog/educational/cited-chatgpt-perplexity-strategies
  - region "Ready when you are." [ref=e700]:
    - generic [ref=e701]:
      - heading "Ready when you are." [level=2] [ref=e702]:
        - generic [ref=e704]: Ready when you are.
      - paragraph [ref=e706]: Free call. No commitment. Tell us what you're building, or what isn't working, and we'll tell you what we'd actually do about it. Not a pitch. Just a conversation.
      - link "Book a call" [ref=e709] [cursor=pointer]:
        - /url: /contact
        - generic [ref=e710]:
          - generic [ref=e711]: Book a call
          - generic [aria-hidden] [ref=e712]:
            - generic [ref=e713]: B
            - generic [ref=e715]: o
            - generic [ref=e717]: o
            - generic [ref=e719]: k
            - generic [ref=e723]: a
            - generic [ref=e727]: c
            - generic [ref=e729]: a
            - generic [ref=e731]: l
            - generic [ref=e733]: l
  - region "Footer" [ref=e737]:
    - generic [ref=e738]:
      - generic [ref=e739]:
        - link "Website Vikreta | Home" [ref=e740] [cursor=pointer]:
          - /url: /
          - img "Website Vikreta" [ref=e742]
        - generic [ref=e743]:
          - link "LinkedIn" [ref=e744] [cursor=pointer]:
            - /url: https://linkedin.com/company/websitevikreta
          - link "Instagram" [ref=e747] [cursor=pointer]:
            - /url: https://instagram.com/websitevikreta
          - link "WhatsApp" [ref=e750] [cursor=pointer]:
            - /url: https://wa.me/919970445198
      - generic [ref=e753]:
        - link "Let's work together Collaborate" [ref=e754] [cursor=pointer]:
          - /url: /contact
          - generic [ref=e755]:
            - paragraph [ref=e756]: Let's work together
            - generic [ref=e758]:
              - generic [ref=e759]: Collaborate
              - generic [aria-hidden] [ref=e760]:
                - generic [ref=e761]: C
                - generic [ref=e763]: o
                - generic [ref=e765]: l
                - generic [ref=e767]: l
                - generic [ref=e769]: a
                - generic [ref=e771]: b
                - generic [ref=e773]: o
                - generic [ref=e775]: r
                - generic [ref=e777]: a
                - generic [ref=e779]: t
                - generic [ref=e781]: e
        - link "Join the team Careers" [ref=e786] [cursor=pointer]:
          - /url: /careers
          - generic [ref=e787]:
            - paragraph [ref=e788]: Join the team
            - generic [ref=e790]:
              - generic [ref=e791]: Careers
              - generic [aria-hidden] [ref=e792]:
                - generic [ref=e793]: C
                - generic [ref=e795]: a
                - generic [ref=e797]: r
                - generic [ref=e799]: e
                - generic [ref=e801]: e
                - generic [ref=e803]: r
                - generic [ref=e805]: s
      - generic [ref=e810]:
        - generic [ref=e811]:
          - paragraph [ref=e812]: Quick Links
          - list [ref=e813]:
            - listitem [ref=e814]:
              - link "Home" [ref=e815] [cursor=pointer]:
                - /url: /
            - listitem [ref=e816]:
              - link "About" [ref=e817] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e818]:
              - link "Services" [ref=e819] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e820]:
              - link "Contact" [ref=e821] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e822]:
              - link "Blog" [ref=e823] [cursor=pointer]:
                - /url: /blog
            - listitem [ref=e824]:
              - link "FAQ" [ref=e825] [cursor=pointer]:
                - /url: /faq
        - generic [ref=e826]:
          - paragraph [ref=e827]: Services
          - list [ref=e828]:
            - listitem [ref=e829]:
              - link "AI Automation & Workflow Optimization" [ref=e830] [cursor=pointer]:
                - /url: /services/ai-automations
            - listitem [ref=e831]:
              - link "Website Development" [ref=e832] [cursor=pointer]:
                - /url: /services/web-development
            - listitem [ref=e833]:
              - link "Web & Mobile Apps / CRM Systems" [ref=e834] [cursor=pointer]:
                - /url: /services/web-mobile-app-development
            - listitem [ref=e835]:
              - link "UX & UI Design" [ref=e836] [cursor=pointer]:
                - /url: /services/uiux-design
            - listitem [ref=e837]:
              - link "Digital Marketing / SEO & GEO" [ref=e838] [cursor=pointer]:
                - /url: /services/digital-marketing
        - generic [ref=e839]:
          - paragraph [ref=e840]: Work
          - list [ref=e841]:
            - listitem [ref=e842]:
              - link "Case Studies" [ref=e843] [cursor=pointer]:
                - /url: /work/case-studies
            - listitem [ref=e844]:
              - link "View All Projects" [ref=e845] [cursor=pointer]:
                - /url: /work
        - generic [ref=e846]:
          - paragraph [ref=e847]: Resources
          - list [ref=e848]:
            - listitem [ref=e849]:
              - link "Careers" [ref=e850] [cursor=pointer]:
                - /url: /careers
            - listitem [ref=e851]:
              - link "Privacy Policy" [ref=e852] [cursor=pointer]:
                - /url: /legal/privacy-policy
            - listitem [ref=e853]:
              - link "Terms & Conditions" [ref=e854] [cursor=pointer]:
                - /url: /legal/terms-and-conditions
            - listitem [ref=e855]:
              - link "Disclaimer" [ref=e856] [cursor=pointer]:
                - /url: /legal/disclaimer
            - listitem [ref=e857]:
              - link "Sitemap" [ref=e858] [cursor=pointer]:
                - /url: /sitemap.xml
      - generic [ref=e859]:
        - generic [ref=e860]:
          - paragraph [ref=e861]: Contact Us
          - link "contact@websitevikreta.com" [ref=e862] [cursor=pointer]:
            - /url: mailto:contact@websitevikreta.com
            - generic [ref=e863]:
              - generic [ref=e864]: contact@websitevikreta.com
              - generic [aria-hidden] [ref=e865]:
                - generic [ref=e866]: c
                - generic [ref=e868]: o
                - generic [ref=e870]: "n"
                - generic [ref=e872]: t
                - generic [ref=e874]: a
                - generic [ref=e876]: c
                - generic [ref=e878]: t
                - generic [ref=e880]: "@"
                - generic [ref=e882]: w
                - generic [ref=e884]: e
                - generic [ref=e886]: b
                - generic [ref=e888]: s
                - generic [ref=e890]: i
                - generic [ref=e892]: t
                - generic [ref=e894]: e
                - generic [ref=e896]: v
                - generic [ref=e898]: i
                - generic [ref=e900]: k
                - generic [ref=e902]: r
                - generic [ref=e904]: e
                - generic [ref=e906]: t
                - generic [ref=e908]: a
                - generic [ref=e910]: .
                - generic [ref=e912]: c
                - generic [ref=e914]: o
                - generic [ref=e916]: m
        - link "+91 99704 45198" [ref=e918] [cursor=pointer]:
          - /url: tel:+919970445198
      - generic [ref=e919]:
        - generic [ref=e920]: © 2026 Website Vikreta. All rights reserved.
        - generic [ref=e921]: Designed & Developed with AI-first precision
  - button "Open Next.js Dev Tools" [ref=e927] [cursor=pointer]
  - alert [ref=e931]
```

# Test source

```ts
  21  |       '/services/ai-automations',
  22  |       '/services/web-development',
  23  |       '/services/web-mobile-app-development',
  24  |       '/services/uiux-design',
  25  |       '/services/digital-marketing',
  26  |     ];
  27  |     for (const href of serviceLinks) {
  28  |       const link = await nav.getServiceLink(href);
  29  |       await expect(link).toBeVisible();
  30  |     }
  31  | 
  32  |     // Top-level nav links
  33  |     await expect(nav.header.locator('a[href="/work"]').first()).toBeVisible();
  34  |     await expect(nav.header.locator('a[href="/about"]').first()).toBeVisible();
  35  |     await expect(nav.header.locator('a[href="/blog"]').first()).toBeVisible();
  36  |     await expect(nav.header.locator('a[href="/careers"]').first()).toBeVisible();
  37  | 
  38  |     // Contact CTA
  39  |     await expect(nav.contactCta).toBeVisible();
  40  |     await expect(nav.contactCta).toContainText('Contact Us');
  41  |   });
  42  | 
  43  |   test('Navbar transforms height and background on scroll', async ({
  44  |     page,
  45  |     basePage,
  46  |     nav,
  47  |   }) => {
  48  |     await page.setViewportSize({ width: 1440, height: 900 });
  49  |     await basePage.navigate('/');
  50  | 
  51  |     // Initial state: h-20
  52  |     await nav.verifyScrolledState(false);
  53  | 
  54  |     // Scroll down >40px
  55  |     await basePage.scrollTo(100);
  56  | 
  57  |     // Scrolled state: h-14 with backdrop
  58  |     await nav.verifyScrolledState(true);
  59  | 
  60  |     // Scroll back to top
  61  |     await basePage.scrollTo(0);
  62  |     await nav.verifyScrolledState(false);
  63  |   });
  64  | 
  65  |   test('Mobile navigation drawer opens, expands services accordion, and closes cleanly', async ({
  66  |     page,
  67  |     basePage,
  68  |     nav,
  69  |   }) => {
  70  |     await page.setViewportSize({ width: 390, height: 844 });
  71  |     await basePage.navigate('/services');
  72  | 
  73  |     // Verify no horizontal overflow in mobile viewport
  74  |     await basePage.verifyNoHorizontalOverflow();
  75  | 
  76  |     // Open drawer
  77  |     await nav.openMobileDrawer();
  78  | 
  79  |     // Expand services accordion
  80  |     await nav.expandMobileServices();
  81  |     await expect(nav.mobileDrawer.locator('a[href="/services/ai-automations"]').first()).toBeVisible();
  82  |     await expect(nav.mobileDrawer.locator('a[href="/services/web-development"]').first()).toBeVisible();
  83  | 
  84  |     // Close drawer
  85  |     await nav.closeMobileDrawer();
  86  |   });
  87  | 
  88  |   test('Home page hides desktop nav links until the first scroll', async ({ page, basePage, nav }) => {
  89  |     await page.setViewportSize({ width: 1440, height: 900 });
  90  |     await basePage.navigate('/');
  91  |     const links = nav.header.locator('ul').first();
  92  |     await expect(links).toHaveClass(/opacity-0/);
  93  |     await basePage.scrollTo(100);
  94  |     await expect(links).toHaveClass(/opacity-100/);
  95  |   });
  96  | 
  97  |   test('Home page: invisible desktop nav links are not reachable by keyboard Tab', async ({ page, basePage, nav }) => {
  98  |     // Known site bug: hidden links still take keyboard focus (Navbar.tsx needs `invisible`).
  99  |     // test.fail() keeps the suite green while the bug is open, and starts failing once it's fixed.
  100 |     test.fail();
  101 |     await page.setViewportSize({ width: 1440, height: 900 });
  102 |     await basePage.navigate('/');
  103 | 
  104 |     const hiddenList = nav.header.locator('ul').first();
  105 |     await expect(hiddenList).toHaveClass(/opacity-0/);
  106 | 
  107 |     // Tab through the first 15 stops; none may land inside the hidden list.
  108 |     const focusedInsideHiddenList: string[] = [];
  109 |     for (let i = 0; i < 15; i++) {
  110 |       await page.keyboard.press('Tab');
  111 |       const hit = await hiddenList.evaluate((ul) => {
  112 |         const el = document.activeElement;
  113 |         return el && ul.contains(el) ? (el.textContent ?? '').trim() : null;
  114 |       });
  115 |       if (hit) focusedInsideHiddenList.push(hit);
  116 |     }
  117 | 
  118 |     expect(
  119 |       focusedInsideHiddenList,
  120 |       'Keyboard focus landed on invisible nav links (add visibility:hidden or inert while hidden)'
> 121 |     ).toEqual([]);
      |       ^ Error: Keyboard focus landed on invisible nav links (add visibility:hidden or inert while hidden)
  122 |   });
  123 | 
  124 |   test('Footer renders all key links and legal navigation', async ({
  125 |     page,
  126 |     basePage,
  127 |   }) => {
  128 |     await basePage.navigate('/');
  129 | 
  130 |     const footer = page.getByRole('region', { name: 'Footer' });
  131 |     await footer.scrollIntoViewIfNeeded();
  132 |     await expect(footer).toBeVisible();
  133 | 
  134 |     // Check legal links
  135 |     await expect(footer.locator('a[href*="/legal/privacy-policy"]').first()).toBeVisible();
  136 |     await expect(footer.locator('a[href*="/legal/terms-and-conditions"]').first()).toBeVisible();
  137 |     await expect(footer.locator('a[href*="/legal/disclaimer"]').first()).toBeVisible();
  138 |   });
  139 | });
  140 | 
```