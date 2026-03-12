# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build
npm run lint       # ESLint via next lint
npm run generate-images          # Generate images locally (scripts/generate-images.js)
npm run generate-remote-images   # Fetch and generate from remote (scripts/fetch-and-generate-images.js)
```

**Tests** (Playwright, requires a running server):
```bash
BASE_URL=http://localhost:3000 node tests/run-all.js
```
Tests check that `/, /shopshots, /services, /consulting, /success` load correctly: hero present, CSS loaded, `/services` and `/consulting` redirect to `/`.

## Required Environment Variables

```
ANTHROPIC_API_KEY          # Claude API (chat widget)
FAL_KEY                    # Fal.ai (photo generation)
STRIPE_SECRET_KEY          # Stripe payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
BREVO_API_KEY              # Lead capture + email notifications
NOTIFICATION_EMAIL         # Destination for lead notification emails
NEXT_PUBLIC_APP_URL        # e.g. https://madebyyuca.com
# Optional:
CHAT_SYSTEM_PROMPT         # Override default system prompt in /api/chat
NEXT_PUBLIC_TURNSTILE_SITE_KEY / TURNSTILE_SECRET_KEY
```

## Architecture

This is a **Next.js 14 App Router** site deployed on Vercel at `madebyyuca.com`.

### Pages & Routes

| Path | File | Purpose |
|---|---|---|
| `/` | `app/page.js` → `Landing.js` | Marketing landing page |
| `/shopshots` | `app/shopshots/ShopshotsClient.js` | AI product photo generator |
| `/success` | `app/success/SuccessClient.js` | Post-Stripe-payment page |
| `/services`, `/consulting` | redirect to `/` | Legacy routes |

### Performance pattern

`Landing.js` renders the nav and static HTML immediately. Heavy client-side JS (`LandingClient.js`) is loaded lazily via `LazyLandingClient.js`. The chat widget (`ChatWidget.js`) and cookie consent (`CookieConsent.js`) are bundled together and loaded only at idle time via `DeferredWidgetsClient.js` (`requestIdleCallback` with 1.5 s timeout fallback).

### API Routes

- **`/api/chat`** — Proxies to Anthropic API (`claude-sonnet-4-6`). Enforces origin allowlist. Supports `[ACTION:GENERATE_PHOTOS: ...]` and `[ACTION:CONTACT_FORM]` action tokens in LLM responses that the client parses to show UI affordances.
- **`/api/generate-photos`** — Calls Fal.ai (`fal-ai/flux/dev`) with templated prompts; returns generated image URLs.
- **`/api/create-checkout`** — Creates a Stripe Checkout session given a `priceId`.
- **`/api/lead`** — Saves a lead to Brevo (list ID 5) and sends a notification email.
- **`/api/download-zip`** — Fetches remote image URLs and streams a ZIP back to the client.
- **`/api/chatbot-html`** — Serves the standalone chatbot HTML embed.

### Chat Widget flow

`ChatWidget.js` is a pure DOM-manipulation component (no React state for the chat itself). It maintains `state.messages[]` as the conversation history, calls `/api/chat` with the full history on each send, and parses action tokens from bot responses to trigger inline UI (contact form, generate-photos link). Rate limiting: max 20 messages/minute, then 5-minute lockout.

### Stripe packs

Pack definitions (name, price, `priceId`, photo count, `locked`) live in `app/shopshots/ShopshotsClient.js`. Set `locked: false` and provide a real Stripe `priceId` to enable paid packs.

### Image domains

Allowed Next.js image domains: `fal.media`, `v3.fal.media`, `images.unsplash.com`, `madebyyuca.com` (see `next.config.js`).
