# Vyke Private Ecosystem

**Owner:** Luke Vyke  
**Status:** Private repositories  
**Last Updated:** February 2026

---

## 🏗️ Repository Structure

```
~/dev/vyke/
│
├── 📁 vyke.ai/              ← WAS: djlab (renamed)
│   └── AI Music Production Tool (FastAPI + Swift + Plugin)
│
├── 📁 vyke-analyse/         ← Git submodule (czaku/vyke-analyse)
│   └── GPU-accelerated audio analysis library
│
├── 📁 vyke-produce/         ← Git submodule (czaku/vyke-produce)
│   └── Music production & Ableton generation library
│
├── 📁 vyke-play/            ← Git submodule (czaku/vyke-play)
│   └── Live performance & DJ tools library
│
├── 📁 libs/                 ← Shared dependencies
│   └── Vendored libraries (essentia, allin1, etc.)
│
├── 📁 web/                  ← Public websites
│   ├── vyke.ai/             ← Product landing page
│   └── vyke.dj/             ← Personal DJ portfolio
│
└── 📄 README.md             ← This file
```

---

## 🔒 Privacy & Security

**ALL REPOSITORIES ARE PRIVATE**

- No proprietary library code is exposed publicly
- vyke-analyse, vyke-produce, vyke-play remain private
- Only built binaries/distributions are shared (if ever)
- Website repos can be public (marketing only, no source code)

---

## 🎯 Brand Hierarchy

| Asset | Type | Purpose | Public? |
|-------|------|---------|---------|
| **vyke.dj** | Personal Brand | Luke Vyke DJ portfolio, gigs, mixes | ✅ Yes |
| **vyke.ai** | Product | AI music production tool | ✅ Yes |
| **vyke-*** | Libraries | Core proprietary technology | 🔒 Private |

---

## 🚀 Quick Start

```bash
# Clone the ecosystem
cd ~/dev/vyke

# Initialize all submodules
git submodule update --init --recursive

# Start vyke.ai development
cd vyke.ai && ./start-dev.sh

# Work on websites
cd web/vyke.dj && npm run dev
cd web/vyke.ai && npm run dev
```

---

## 📋 Submodules

```bash
# Add a submodule
git submodule add git@github.com:czaku/vyke-analyse.git vyke-analyse

# Update all submodules to latest
git submodule update --remote

# Pin submodule to specific commit
cd vyke-analyse && git checkout <commit> && cd .. && git add vyke-analyse
```

---

## 🎨 Websites

Both websites use **Next.js 14 + Framer Motion + TinaCMS** for:
- Apple-style scroll animations
- Smooth page transitions
- CMS-managed content
- Optimized performance

See individual website READMEs for details.

---

## 📚 Documentation

- [vyke.ai/README.md](./vyke.ai/README.md) - AI Tool documentation
- [ROADMAP.md](./ROADMAP.md) - Cross-project roadmap
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture

---

**© 2026 Luke Vyke - All Rights Reserved**
