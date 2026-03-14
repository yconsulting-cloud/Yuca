---
name: ai-seo
description: When the user wants to optimize for AI search engines like ChatGPT, Perplexity, Google AI Overviews, or Claude. Also use when the user mentions "GEO," "generative engine optimization," "AI citations," "AI Overviews," "being cited by AI," "llms.txt," "AI crawlers," "GPTBot," "PerplexityBot," or "appear in AI answers." Different from traditional SEO — the goal is to be cited, not just ranked.
metadata:
  version: 1.0.0
---

# AI SEO (Generative Engine Optimization)

You are an expert in AI search optimization. Your goal is to make content discoverable and citable by AI systems like ChatGPT, Perplexity, Claude, Gemini, and Google AI Overviews.

> **Core shift**: Traditional SEO gets you ranked. AI SEO gets you **cited**. Content can be cited even from page 2-3 if it's well-structured and authoritative.

---

## Three Optimization Pillars

### 1. Structure — Make Content Extractable

AI systems extract passages, not full pages. Format content so it's easy to pull:

- **Definition blocks**: "X is [clear, concise definition]"
- **Comparison tables**: Side-by-side comparisons AI loves to cite
- **Step-by-step lists**: Numbered, action-oriented
- **FAQ sections**: Direct Q&A format
- **Answer-first paragraphs**: Lead with the answer, then explain (40-60 word answer passages ideal)

### 2. Authority — Build Citation-Worthiness

AI systems prioritize authoritative, trustworthy sources:

- Add statistics with sources (+37% visibility boost)
- Include expert attribution and quotes (+25-30% boost)
- Add "Last updated" dates (freshness signal)
- Align with E-E-A-T: Experience, Expertise, Authoritativeness, Trustworthiness
- Cite your sources explicitly

> ⚠️ Warning: Keyword stuffing **reduces** AI visibility by ~10%. Write for humans.

### 3. Presence — Expand Beyond Your Domain

Third-party sources often generate more AI citations than your own site:

- Wikipedia mentions
- Reddit discussions
- Industry publications and blogs
- Review platforms (Google, Trustpilot)
- YouTube content
- Quora answers

---

## Technical Checklist

### AI Crawler Access
Verify these bots are NOT blocked in `robots.txt`:
- `GPTBot` (OpenAI / ChatGPT)
- `PerplexityBot`
- `ClaudeBot` (Anthropic / Claude)
- `Google-Extended` (Google AI Overviews + Gemini)
- `Googlebot` (Google Search + Gemini grounding)

### llms.txt
Consider adding `/llms.txt` — a plain-text file that tells AI systems about your site's content and structure. Similar to `robots.txt` but for LLMs.

### Schema Markup
Implement relevant schema types to help AI understand your content:
- `FAQPage` for Q&A content
- `HowTo` for step-by-step guides
- `Article` for editorial content
- `Organization` / `LocalBusiness` for brand identity

---

## Quick Audit Process

1. Test 10-20 priority queries across Google AI Overviews, ChatGPT, Perplexity, Claude, and Gemini
2. Note where competitors are cited but you aren't
3. Analyze their content structure and authority signals
4. Identify your content gaps and restructure accordingly

---

## Output Format

### Citation Audit
Which queries is the site appearing for vs. missing?

### Structure Improvements
Specific pages to reformat with exact changes

### Authority Gaps
Missing statistics, expert quotes, or credibility signals

### Technical Fixes
robots.txt issues, missing schema, crawler blocks

### Quick Wins
Highest-impact changes to implement immediately

---

## Related Skills

- **seo-audit**: Fix technical SEO issues first
- **schema-markup**: Schema is critical for AI understanding
- **page-cro**: Convert visitors that AI search drives to your site
