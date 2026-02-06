# vyke.ai - Product Website

**AI Music Production Platform landing page**

---

## ✨ Features

- **SaaS-style landing page** with clear value proposition
- **Smooth scroll animations** with Lenis
- **Gradient accents** (teal/cyan theme)
- **Grid pattern background** for tech feel
- **Pricing table** with 3 tiers
- **Feature cards** with iconography
- **CMS-managed content** via TinaCMS

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run with TinaCMS
npm run cms:dev

# Build for production
npm run cms:build
```

---

## 🎨 Design System

### Colors
- **Background**: `#0a0a0a` (dark)
- **Surface**: `#141414` (card backgrounds)
- **Accent**: `#00d4aa` (teal/cyan)
- **Text**: White with opacity variations

### Typography
- **Display**: Space Grotesk (headings)
- **Body**: Inter (content)

---

## 📁 Structure

```
app/
├── page.tsx              # Landing page composition
├── layout.tsx            # Root layout
├── globals.css           # Styles + animations
components/
├── navigation.tsx        # Header nav
├── hero.tsx              # Hero section
├── features.tsx          # Feature grid
├── how-it-works.tsx      # 3-step workflow
├── pricing.tsx           # Pricing cards
├── footer.tsx            # Site footer
└── smooth-scroll-provider.tsx
content/
├── features/             # Feature content (TinaCMS)
├── pricing/              # Pricing content
└── site.json             # Site settings
```

---

## 📝 TinaCMS

Manage via `/admin`:
- Features
- Pricing plans
- Site metadata

---

**© 2026 vyke.ai - All Rights Reserved**
