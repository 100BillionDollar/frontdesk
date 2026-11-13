# FrontDesk — Product Requirements Document (PRD)

> **Ek line mein idea:** Solo service professionals (doctor, physio, salon, tutor, CA, lawyer) ke liye ek "digital front desk" — booking + WhatsApp reminders + UPI payment link — sab kuch vernacular aur WhatsApp-native.

---

## 1. Problem — kya dikkat hai aur kyun matter karti hai

India ke solo consultants, physiotherapists, chhote clinics, salons, tutors, lawyers, CAs aur diagnostic sample collectors aaj bhi apna calendar **phone aur paper diary** pe chalate hain.

- Payments (UPI) aur discovery (jaise Google ya JustDial) toh digitize ho chuke hain, lekin appointment scheduling abhi bhi peeche hai — ise describe kiya gaya hai as *"one of the few remaining processes that still relies on manual effort"*.
- Iski wajah se do direct revenue losses hote hain:
  1. **No-shows** — customer time pe nahi aata, slot waste ho jaata hai.
  2. **Missed WhatsApp enquiries** — professional busy hai, reply nahi kar paata, customer kahin aur chala jaata hai.

## 2. Target User — kiske liye bana rahe hain

| Attribute | Detail |
|---|---|
| Kaun | Solo professionals aur 1–3 logon ki practices |
| Professions | Consultant, physio, chhota clinic, salon, tutor, lawyer, CA, diagnostic collector |
| Location | Tier-1 aur Tier-2 cities |
| Age | 25–50 saal |
| Tech comfort | WhatsApp aur UPI already use karte hain |
| Key constraint | **Koi receptionist nahi hai** — khud hi sab manage karte hain |

## 3. Market Timing — 2026 hi kyun sahi waqt hai

- **UPI AutoPay aur payment links** ab har jagah common hain — customer ke liye prepay karna friction-free hai.
- **WhatsApp Business API** ab templated reminders aur payments officially support karta hai.
- Industry signal: YourStory ne automated scheduling ko **"the next phase of SMB digitization"** bola hai — matlab yeh category abhi inflect kar rahi hai, market ready hai.

## 4. Competition — kaun hai aur gap kahan hai

**Global tools** — Calendly, Acuity, SimplyBook.me, Fresha:
- English-first, card-centric payments.
- UPI/WhatsApp aur vernacular users ke liye tuned nahi hain.

**Indian vertical tools** — EasySalon (salons), Practo Ray / Healcard (clinics):
- Heavy hain, ek hi vertical mein locked hain.
- Established businesses ke liye priced/positioned hain, solo professional ke liye nahi.

**Open gap (hamara sweet spot):**
> Ek **horizontal, ultra-simple, vernacular, WhatsApp-first** tool — booking + reminder + prepay link — us solo professional ke liye jisko full CRM overkill lagta hai.

## 5. Monetization — paise kaise banenge

- **Model:** Freemium.
- **Subscription:** ₹199–₹499/month per professional.
- **Add-on:** per-reminder ya per-collection micro-fee.
- **Price validation:** adjacent tools se — TuitionPlus ₹499/month pe chalta hai; WhatsApp BSP plans bade SMBs ke liye commonly ₹1,500–₹5,000/month hote hain. Matlab solo professional ke liye ₹199–₹499 ka price point realistic hai.

## 6. MVP Scope — kya banana hai (6–12 weekends ka target)

### 6.1 Functional Requirements

| ID | Feature | Description |
|---|---|---|
| FR-1 | **Booking page** | Har professional ko ek shareable link + QR code milega. Customer link kholke available slot pick karke book kar sake — sirf naam + phone number, koi account/login nahi. |
| FR-2 | **Slots & bookings** | Professional apni weekly availability set kare (default: 30-min slots, ek slot = ek booking). System double-booking prevent kare — jo booking pehle confirm ho, wahi slot le. Cancel customer aur professional dono kar sakein. |
| FR-3 | **WhatsApp confirmations & reminders** | Booking pe turant WhatsApp confirmation, aur appointment se pehle automated reminder (default: 24 ghante + 2 ghante pehle) — no-show kam karne ke liye. Do cheezein dhyaan mein: (a) message templates Meta se pre-approve karane padte hain (lead time hota hai), (b) customer ka opt-in chahiye — booking form mein consent checkbox rakhna hoga. |
| FR-4 | **UPI payment link (deposit)** | Deposit ek **per-professional toggle** hai — jo chahe on kare. On hone pe booking lifecycle: `pending-payment` → `confirmed` (pay hote hi) → `expired` (agar ~15 min mein pay nahi hua, slot release). Cancellation pe refund MVP mein manual — professional khud handle kare. |
| FR-5 | **Vernacular UI** | UI Hindi + ek regional language mein (English ke saath). Kaunsi regional language — pehle pilot city ke hisaab se decide karo. Professional onboarding mein apne page ki default language chune; customer ko booking page pe language toggle mile. |
| FR-6 | **Professional onboarding & dashboard** | Professional ka signup/login (phone + OTP kaafi hai), service aur timings ka setup, aur ek simple dashboard — aaj ki aur aane wali bookings dekhna + cancel karna. |

### 6.2 Out of Scope (MVP mein NAHI banana)

- ❌ EMR / health records
- ❌ Staff management / multi-staff
- ❌ Full CRM features
- ❌ Analytics dashboards

### 6.3 Build Order (suggested phasing)

1. **Phase 1 (weekends 1–4):** FR-6 basic + FR-1 + FR-2 — booking core end-to-end. Link se booking ho jaaye, bas.
2. **Phase 2 (weekends 5–8):** FR-3 — WhatsApp confirmations + reminders. (Template approval Phase 1 mein hi start kar do — Meta ka approval time lagta hai.)
3. **Phase 3 (weekends 9–12):** FR-4 payments + FR-5 vernacular polish.

### 6.4 Typical User Flow (example)

1. Physio apna FrontDesk link WhatsApp status / Google profile pe daalta hai.
2. Customer link kholta hai → available slot choose karta hai → naam + phone number deta hai, WhatsApp updates ka consent checkbox tick karta hai.
3. UPI link se ₹100 deposit pay karta hai (agar professional ne deposit toggle on kiya hai).
4. Dono ko WhatsApp pe confirmation milta hai.
5. Appointment se pehle customer ko automated WhatsApp reminder jaata hai.

## 7. Tech Stack — kya use karenge aur kyun

| Layer | Choice | Kyun |
|---|---|---|
| Frontend | **React PWA** | App-jaise mobile UX bina app-store friction ke; link/QR se directly khul jaata hai. |
| Backend | **FastAPI (Python)** | Async model WhatsApp/UPI **webhooks** aur reminder **schedulers** ke liye ideal hai. |
| Future AI | Python ecosystem | Baad mein AI features (no-show prediction, vernacular chat booking) add karna trivial ho jaata hai. |
| Messaging | WhatsApp Business API | Templated confirmations/reminders officially supported. |
| Payments | Licensed PA/PG ke payment links (UPI) | Khud fintech nahi banna — licensed provider use karna hai. |

## 8. Full-Scale Roadmap — MVP ke baad kya

1. **Multi-staff support** — 1–3 se bade teams ke liye.
2. **Vertical templates** — clinic vs salon vs tutor ke alag-alag presets.
3. **Analytics** — bookings, no-shows, revenue trends.
4. **Review collection** — appointment ke baad customer se review maangna.
5. **AI voice/chat booking** — customer WhatsApp pe chat/voice se hi book kar sake.

Long-term vision: har profession ke liye ek **vertical SaaS suite** ban jaana.

## 9. Success Metrics — MVP kaamyab hua, kaise pata chalega

Yeh targets suggestions hain — pilot ke baad adjust karo:

- Launch ke **3 mahine mein ~10 paying professionals**.
- Har active professional ke **≥5 bookings/week** link ke through.
- Reminder-enabled bookings ka **no-show rate baseline se ~30% kam**.

Agar yeh numbers nahi aa rahe, toh scale karne se pehle positioning ya pricing pe wapas jao.

## 10. Regulation & Compliance — kitna risk hai

**MVP stage pe risk LOW hai:**

- **DPDP Act** apply hota hai (hum names + phone numbers store karenge), lekin obligations **13 May 2027 tak phase-in** ho rahi hain — abhi time hai.
- Hum **fintech nahi hain** — payment links ke liye licensed PA/PG (payment aggregator/gateway) use karenge, khud paisa handle nahi karenge.
- MVP mein **health records store nahi** kar rahe, toh medical-data regulations trigger nahi hote.

> **Bottom line:** Compliance scale pe activate hoti hai, validation pe nahi. Abhi build karo, validate karo; compliance baad mein aayegi.
