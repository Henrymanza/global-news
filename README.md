# 🌐 GeoIntel — Global Intelligence Platform

Real-time geopolitical intelligence dashboard with market impact analysis, push/email/SMS alerts, and user accounts.

---

## 🚀 QUICK START

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your API keys (see below)

# 3. Run frontend + backend together
npm start

# Or run separately:
npm run dev          # Frontend on http://localhost:5173
npm run server       # Backend on http://localhost:3001
```

---

## 🔑 API KEYS — GET THESE FREE

### 1. Anthropic (AI Analysis Engine) — REQUIRED
- Go to: https://console.anthropic.com
- Create API key → paste as `VITE_ANTHROPIC_API_KEY`

### 2. GDELT (News) — FREE, NO KEY NEEDED ✓
- Automatically used — monitors world news in 100+ languages
- No signup required

### 3. NewsAPI — FREE TIER
- Go to: https://newsapi.org
- Sign up → get API key → paste as `VITE_NEWSAPI_KEY`
- Free: 100 requests/day

### 4. Alpha Vantage (Market Data) — FREE TIER
- Go to: https://www.alphavantage.co/support/#api-key
- Get free key → paste as `VITE_ALPHAVANTAGE_KEY`
- Free: 25 requests/day

### 5. Polygon.io (Market Data) — FREE TIER
- Go to: https://polygon.io
- Sign up → get API key → paste as `VITE_POLYGON_KEY`
- Free: Unlimited delayed data (15 min delay)

### 6. Firebase (Auth + Push Notifications)
- Go to: https://console.firebase.google.com
- Create project → Add web app → Copy config
- Enable Authentication (Email/Password + Google)
- Enable Firestore Database
- Enable Cloud Messaging → get VAPID key
- Paste all values into `.env`

### 7. Email Alerts (Gmail)
- Enable 2FA on your Gmail account
- Go to: https://myaccount.google.com/apppasswords
- Create "App Password" for "Mail"
- Use your Gmail + App Password in `.env`

### 8. SMS Alerts (Twilio) — FREE TRIAL
- Go to: https://www.twilio.com
- Sign up → free trial gives $15 credit
- Get Account SID, Auth Token, Phone Number
- Paste into `.env`

---

## 🏗️ ARCHITECTURE

```
geointel/
├── src/
│   ├── main.jsx              — React entry point
│   ├── App.jsx               — Main dashboard component
│   ├── store.js              — Zustand global state
│   ├── components/
│   │   ├── AuthModal.jsx     — Sign in / Sign up modal
│   │   └── SettingsPanel.jsx — Alert preferences panel
│   └── services/
│       ├── firebase.js       — Auth + Firestore + Push tokens
│       ├── newsService.js    — GDELT + NewsAPI + Claude AI analysis
│       ├── marketService.js  — Alpha Vantage + Polygon.io
│       └── alertService.js   — Push + Email + SMS dispatch
├── server/
│   └── index.js              — Express: email (Nodemailer) + SMS (Twilio)
└── public/
    ├── firebase-messaging-sw.js  — Service worker for background push
    └── manifest.json             — PWA manifest
```

---

## 📡 DATA SOURCES

| Source | Data | Cost |
|--------|------|------|
| GDELT | Global news, TV speeches | FREE |
| NewsAPI | English news headlines | Free / Paid |
| Alpha Vantage | Stocks, Forex, Crypto | Free / Paid |
| Polygon.io | Stocks, Crypto, Options | Free / Paid |
| Anthropic Claude | AI analysis + predictions | Pay per use |
| Firebase | Auth, push notifications | Free tier |
| Nodemailer | Email via Gmail | FREE |
| Twilio | SMS alerts | Free trial |

---

## 🔔 ALERT SYSTEM

### Push Notifications
- Browser-based via Firebase Cloud Messaging
- Works on desktop + mobile (PWA installable)
- Background notifications via service worker

### Email Alerts
- HTML-formatted alerts with market impact
- Sent via Nodemailer + Gmail SMTP
- Triggered by severity threshold

### SMS Alerts
- Short text alerts via Twilio
- International phone numbers supported
- 240-minute cooldown per event

### Alert Rules
- Set minimum severity: Critical / High / Medium / Low
- Filter by regions: Middle East, Europe, Asia, etc.
- All channels have deduplication + cooldown periods

---

## 🚀 DEPLOYMENT

### Deploy to Vercel (recommended)
```bash
npm install -g vercel
vercel deploy
# Set all .env variables in Vercel dashboard
```

### Deploy to Railway (includes backend)
```bash
npm install -g railway
railway login
railway init
railway up
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["node", "server/index.js"]
```

---

## 📱 PWA (Install as App)

The platform works as an installable Progressive Web App:
- Chrome: Address bar → Install button
- iOS Safari: Share → Add to Home Screen
- Android: Browser menu → Install App

---

## ⚡ AUTO-REFRESH

- Intelligence feed: every 5 minutes
- Market data: every 30 seconds
- Server cron job: every 15 minutes (for server-side alert dispatch)

---

*Built with React + Zustand + Firebase + GDELT + NewsAPI + Alpha Vantage + Polygon.io + Twilio + Nodemailer + Claude AI*
