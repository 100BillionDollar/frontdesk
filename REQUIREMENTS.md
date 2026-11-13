# FrontDesk — Product Requirements Document (PRD)

🇬🇧 **English** | 🇮🇳 [Hinglish](REQUIREMENTS.hi.md)

> **The idea in one line:** A "digital front desk" for solo service professionals (doctor, physio, salon, tutor, CA, lawyer) — booking + WhatsApp reminders + UPI payment links — all vernacular and WhatsApp-native.

---

## 1. Problem — what hurts and why it matters

India's solo consultants, physiotherapists, small clinics, salons, tutors, lawyers, CAs and diagnostic sample collectors still run their calendars on **phone calls and paper diaries**.

- Payments (UPI) and discovery (Google, JustDial) have already digitized, but appointment scheduling lags behind — it has been described as *"one of the few remaining processes that still relies on manual effort"*.
- This causes two direct revenue losses:
  1. **No-shows** — the customer doesn't turn up on time and the slot is wasted.
  2. **Missed WhatsApp enquiries** — the professional is busy, can't reply, and the customer goes elsewhere.

## 2. Target User — who we are building for

| Attribute | Detail |
|---|---|
| Who | Solo professionals and practices of 1–3 people |
| Professions | Consultant, physio, small clinic, salon, tutor, lawyer, CA, diagnostic collector |
| Location | Tier-1 and Tier-2 cities |
| Age | 25–50 years |
| Tech comfort | Already use WhatsApp and UPI |
| Key constraint | **No receptionist** — they manage everything themselves |

## 3. Market Timing — why 2026 is the right moment

- **UPI AutoPay and payment links** are now ubiquitous — prepaying is friction-free for customers.
- **WhatsApp Business API** now officially supports templated reminders and payments.
- Industry signal: YourStory has called automated scheduling **"the next phase of SMB digitization"** — the category is inflecting right now, and the market is ready.

## 4. Competition — who's out there and where the gap is

**Global tools** — Calendly, Acuity, SimplyBook.me, Fresha:
- English-first, card-centric payments.
- Not tuned for UPI/WhatsApp or vernacular users.

**Indian vertical tools** — EasySalon (salons), Practo Ray / Healcard (clinics):
- Heavy, and locked into a single vertical.
- Priced and positioned for established businesses, not solo professionals.

**Open gap (our sweet spot):**
> A **horizontal, ultra-simple, vernacular, WhatsApp-first** tool — booking + reminder + prepay link — for the solo professional who finds a full CRM overkill.

## 5. Monetization — how the money comes in

- **Model:** Freemium.
- **Subscription:** ₹199–₹499/month per professional.
- **Add-on:** per-reminder or per-collection micro-fee.
- **Price validation:** from adjacent tools — TuitionPlus runs at ₹499/month; WhatsApp BSP plans for larger SMBs commonly cost ₹1,500–₹5,000/month. A ₹199–₹499 price point for a solo professional is therefore realistic.

## 6. MVP Scope — what to build (target: 6–12 weekends)

### 6.1 Functional Requirements

| ID | Feature | Description |
|---|---|---|
| FR-1 | **Booking page** | Every professional gets a shareable link + QR code. A customer opens the link, picks an available slot and books — just name + phone number, no account or login. |
| FR-2 | **Slots & bookings** | The professional sets their weekly availability (default: 30-min slots, one slot = one booking). The system prevents double-booking — the first confirmed booking wins the slot. Both the customer and the professional can cancel. |
| FR-3 | **WhatsApp confirmations & reminders** | Instant WhatsApp confirmation on booking, plus automated reminders before the appointment (default: 24 hours + 2 hours before) to reduce no-shows. Two things to keep in mind: (a) message templates must be pre-approved by Meta (there's lead time), (b) customer opt-in is required — the booking form needs a consent checkbox. |
| FR-4 | **UPI payment link (deposit)** | The deposit is a **per-professional toggle** — each professional opts in. When on, the booking lifecycle is: `pending-payment` → `confirmed` (as soon as paid) → `expired` (if unpaid after ~15 min, the slot is released). Refunds on cancellation are manual in the MVP — the professional handles them. |
| FR-5 | **Vernacular UI** | UI in Hindi + one regional language (alongside English). Which regional language — decide based on the first pilot city. The professional picks their page's default language during onboarding; the customer gets a language toggle on the booking page. |
| FR-6 | **Professional onboarding & dashboard** | Professional signup/login (phone + OTP is enough), service and timings setup, and a simple dashboard — view today's and upcoming bookings + cancel. |

### 6.2 Out of Scope (do NOT build in the MVP)

- ❌ EMR / health records
- ❌ Staff management / multi-staff
- ❌ Full CRM features
- ❌ Analytics dashboards

### 6.3 Build Order (suggested phasing)

1. **Phase 1 (weekends 1–4):** FR-6 basic + FR-1 + FR-2 — the booking core end-to-end. A booking must work via the link, nothing more.
2. **Phase 2 (weekends 5–8):** FR-3 — WhatsApp confirmations + reminders. (Start template approval during Phase 1 — Meta's approval takes time.)
3. **Phase 3 (weekends 9–12):** FR-4 payments + FR-5 vernacular polish.

### 6.4 Typical User Flow (example)

1. A physio puts their FrontDesk link on their WhatsApp status / Google profile.
2. A customer opens the link → chooses an available slot → enters name + phone number, ticks the WhatsApp-updates consent checkbox.
3. Pays a ₹100 deposit via a UPI link (if the professional has the deposit toggle on).
4. Both get a WhatsApp confirmation.
5. The customer receives an automated WhatsApp reminder before the appointment.

## 7. Tech Stack — what we'll use and why

| Layer | Choice | Why |
|---|---|---|
| Frontend | **React PWA** | App-like mobile UX without app-store friction; opens directly from a link/QR. |
| Backend | **FastAPI (Python)** | The async model is ideal for WhatsApp/UPI **webhooks** and reminder **schedulers**. |
| Future AI | Python ecosystem | Adding AI features later (no-show prediction, vernacular chat booking) becomes trivial. |
| Messaging | WhatsApp Business API | Templated confirmations/reminders are officially supported. |
| Payments | Payment links from a licensed PA/PG (UPI) | We don't become a fintech ourselves — use a licensed provider. |

## 8. Full-Scale Roadmap — after the MVP

1. **Multi-staff support** — for teams larger than 1–3.
2. **Vertical templates** — separate presets for clinic vs salon vs tutor.
3. **Analytics** — bookings, no-shows, revenue trends.
4. **Review collection** — ask the customer for a review after the appointment.
5. **AI voice/chat booking** — customers book directly via chat/voice on WhatsApp.

Long-term vision: become a **vertical SaaS suite** for each profession.

## 9. Success Metrics — how we'll know the MVP worked

These targets are suggestions — adjust after the pilot:

- **~10 paying professionals within 3 months** of launch.
- **≥5 bookings/week** per active professional through their link.
- **No-show rate ~30% lower than baseline** for reminder-enabled bookings.

If these numbers don't materialize, revisit positioning or pricing before scaling.

## 10. Regulation & Compliance — how much risk

**At the MVP stage the risk is LOW:**

- The **DPDP Act** applies (we store names + phone numbers), but obligations **phase in until 13 May 2027** — there is time.
- We are **not a fintech** — payment links go through a licensed PA/PG (payment aggregator/gateway); we never handle the money ourselves.
- The MVP **stores no health records**, so medical-data regulations aren't triggered.

> **Bottom line:** Compliance activates at scale, not at validation. Build and validate now; compliance comes later.
