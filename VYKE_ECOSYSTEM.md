# Vyke Ecosystem Architecture

**Private Monorepo with Public Marketing Sites**

---

## 🏗️ Overview

```
~/dev/vyke/                          # Private ecosystem root
│
├── 📁 vyke.ai/                      # ← WAS: djlab (renamed)
│   └── AI Music Production Platform
│       ├── backend/                 # FastAPI orchestrator
│       ├── native/                  # Swift macOS app
│       ├── plugin/                  # VST3/AU plugin
│       └── wickit/                  # LLM orchestration
│
├── 📁 vyke-analyse/                 # Git submodule (private)
│   └── GPU-accelerated audio analysis
│
├── 📁 vyke-produce/                 # Git submodule (private)
│   └── Music production library
│
├── 📁 vyke-play/                    # Git submodule (private)
│   └── Live performance/DJ tools
│
├── 📁 libs/                         # Shared dependencies
│   └── Vendored libraries
│
└── 📁 web/                          # Public websites
    ├── vyke.ai/                     # Product landing page
    └── vyke.dj/                     # Personal DJ portfolio
```

---

## 🎯 Brand Architecture

| Domain | Purpose | Visibility | Repo |
|--------|---------|------------|------|
| **vyke.ai** | AI Music Tool Product | Public | czaku/vyke.ai (private) |
| **vyke.dj** | Luke Vyke DJ Brand | Public | (separate, future) |
| **vyke-analyse** | Analysis Library | 🔒 Private | czaku/vyke-analyse |
| **vyke-produce** | Production Library | 🔒 Private | czaku/vyke-produce |
| **vyke-play** | Performance Library | 🔒 Private | czaku/vyke-play |

---

## 🔒 Privacy Strategy

### What Stays Private
- All library source code (vyke-analyse, vyke-produce, vyke-play)
- vyke.ai orchestrator implementation
- Training data and models
- Proprietary algorithms

### What's Public
- Marketing websites (web/)
- API documentation
- User guides
- Built binaries (future distribution)

---

## 🔄 Migration Plan: DJLab → vyke.ai

### Phase 1: Preparation (Current)
1. ✅ Create vyke ecosystem structure
2. ✅ Build marketing websites
3. ⏳ Finalize V2 in djlab

### Phase 2: Rename & Move
1. Copy djlab contents to ~/dev/vyke/vyke.ai/
2. Systematic find/replace:
   - `DJLab` → `vyke.ai` (brand references)
   - `djlab` → `vykeai` (code references)
   - Keep internal class names if too disruptive
3. Update GitHub repo name: czaku/djlab → czaku/vyke.ai
4. Set up redirects/notes in old repo

### Phase 3: Integration
1. Link vyke-analyse as submodule
2. Link vyke-produce as submodule
3. Link vyke-play as submodule
4. Update import paths
5. Test complete integration

---

## 🧩 Component Responsibilities

### vyke.ai (Orchestrator)
```python
# Has LLM (Claude)
from vyke.analyse import AudioAnalyzer
from vyke.produce import ProjectGenerator
from vyke.play import LiveEngine

class VykeAI:
    def __init__(self):
        self.analyzer = AudioAnalyzer()
        self.producer = ProjectGenerator()
        self.performer = LiveEngine()
        self.maestro = MaestroOrchestrator(llm=claude)
    
    async def produce(self, request: ProductionRequest):
        # Orchestration logic here
        analysis = await self.analyzer.analyze(request.audio)
        project = await self.producer.generate(analysis)
        return project
```

### vyke-analyse (Library)
- NO LLM
- GPU-accelerated analysis
- Returns structured data only
- Import: `from vyke import analyse`

### vyke-produce (Library)
- NO LLM
- Generates Ableton projects
- Receives complete specifications
- Import: `from vyke import produce`

### vyke-play (Library)
- NO LLM
- Live performance tools
- DJ mixing capabilities
- Import: `from vyke import play`

---

## 🌐 Website Architecture

### web/vyke.ai (Product)
- **Tech**: Next.js 14 + Framer Motion + TinaCMS
- **Style**: SaaS/Tech aesthetic, teal/cyan accents
- **Content**: Features, pricing, documentation
- **URL**: vyke.ai

### web/vyke.dj (Personal)
- **Tech**: Next.js 14 + Framer Motion + TinaCMS
- **Style**: Apple-style scroll animations, artistic
- **Content**: Mixes, tour dates, bio, booking
- **URL**: vyke.dj

---

## 📦 Development Workflow

```bash
# Daily workflow
cd ~/dev/vyke

# Update all libraries
git submodule update --remote

# Work on orchestrator
cd vyke.ai && code .

# Work on websites
cd web/vyke.dj && npm run dev
cd web/vyke.ai && npm run dev

# Commit library changes
cd vyke-analyse
git add . && git commit -m "feat: new analysis feature"
git push
cd ~/dev/vyke
git add vyke-analyse && git commit -m "chore: update analyse submodule"
```

---

## 🎨 Visual Identity

### vyke.ai (Product)
- **Colors**: Teal `#00d4aa`, Cyan `#00b4d8`, Dark `#0a0a0a`
- **Font**: Space Grotesk (display), Inter (body)
- **Vibe**: Professional, tech-forward, trustworthy

### vyke.dj (Personal)
- **Colors**: Pink `#ff3366`, Purple, Black
- **Font**: Inter
- **Vibe**: Artistic, dynamic, premium

---

## 🚀 Deployment

### vyke.ai App
- Backend: Fly.io / Railway / VPS
- Native: Mac App Store + Direct
- Plugin: Manual download

### Websites
- Both: Vercel
- TinaCMS: Vercel + Tina Cloud

---

## 📋 Checklist for Rename

- [ ] Complete V2 in djlab
- [ ] Create vyke.ai directory structure
- [ ] Copy all djlab code
- [ ] Mass rename DJLab → vyke.ai
- [ ] Update import paths
- [ ] Test backend services
- [ ] Test native app build
- [ ] Test plugin build
- [ ] Rename GitHub repo
- [ ] Update CI/CD pipelines
- [ ] Deploy websites
- [ ] Update documentation
- [ ] Archive old repo

---

**© 2026 Luke Vyke - All Rights Reserved**
