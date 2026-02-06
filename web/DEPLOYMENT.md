# Website Deployment Guide

Both websites deploy from this `web/` directory using Vercel.

---

## 📁 Structure

```
web/
├── vyke.ai/          # Product landing → vyke.ai
├── vyke.dj/          # DJ portfolio → vyke.dj
└── DEPLOYMENT.md     # This file
```

---

## 🚀 Initial Setup

### 1. Install Dependencies

```bash
cd ~/dev/vyke/web/vyke.ai
npm install

cd ~/dev/vyke/web/vyke.dj
npm install
```

### 2. Vercel Setup

**vyke.ai (Product):**
```bash
cd ~/dev/vyke/web/vyke.ai
vercel --prod
# Set domain: vyke.ai
```

**vyke.dj (Portfolio):**
```bash
cd ~/dev/vyke/web/vyke.dj
vercel --prod
# Set domain: vyke.dj
```

---

## 📋 Vercel Configuration

### Build Settings

**Framework Preset:** Next.js

**Build Command:**
```bash
# For vyke.ai
cd web/vyke.ai && npm run build

# For vyke.dj  
cd web/vyke.dj && npm run build
```

**Output Directory:**
- vyke.ai: `web/vyke.ai/.next`
- vyke.dj: `web/vyke.dj/.next`

### Environment Variables

**vyke.ai:**
```
NEXT_PUBLIC_TINA_CLIENT_ID=
TINA_TOKEN=
```

**vyke.dj:**
```
NEXT_PUBLIC_TINA_CLIENT_ID=
TINA_TOKEN=
```

---

## 🔄 Deployment Workflow

### Option A: Vercel Git Integration (Recommended)

1. Connect GitHub repo `czaku/vyke` to Vercel
2. Set root directory for each project:
   - vyke.ai: `web/vyke.ai`
   - vyke.dj: `web/vyke.dj`
3. Auto-deploys on every push to main

### Option B: Manual Deploy

```bash
# Deploy vyke.ai
cd ~/dev/vyke/web/vyke.ai && vercel --prod

# Deploy vyke.dj
cd ~/dev/vyke/web/vyke.dj && vercel --prod
```

---

## 📝 Content Updates (TinaCMS)

Content updates don't require redeployment:

1. Go to `/admin` on the live site
2. Edit content via TinaCMS
3. Changes save to Git
4. Vercel auto-rebuilds

---

## 🎨 Local Development

```bash
# Terminal 1 - vyke.ai
cd ~/dev/vyke/web/vyke.ai
npm run dev
# http://localhost:3000

# Terminal 2 - vyke.dj
cd ~/dev/vyke/web/vyke.dj
npm run dev
# http://localhost:3001
```

---

## 🔧 Troubleshooting

### Build Fails
```bash
# Clear cache
cd web/[site] && rm -rf .next node_modules && npm install
```

### TinaCMS Not Working
- Check `TINA_CLIENT_ID` and `TINA_TOKEN` env vars
- Ensure Tina Cloud project is set up

---

**Last Updated:** February 2026
