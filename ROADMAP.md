# Vyke Master Roadmap

**Coordinated Development Across All Libraries**

**Version:** 1.0  
**Date:** February 6, 2026  
**Last Updated:** February 6, 2026

---

## Timeline Overview

```
2026
Q1          Q2          Q3          Q4
│           │           │           │
├─ vyke-analyse v0.4-0.6 ─┤           │
│   (Structure, Stems,    │           │
│    Loudness, Chords)    │           │
│                         │           │
└──────┬──────────────────┘           │
       │                              │
       ▼                              │
├──────── vyke-produce v1.0 ──────────┤
│   (Core, Plugins, Genres,           │
│    Ableton Export)                  │
│                                     │
└──────────────┬──────────────────────┘
               │
               ▼
        ├──── vyke-play v1.0 ─────┐
        │   (Pioneer, Auto-DJ)    │
        └─────────────────────────┘
```

---

## Current Status (February 2026)

| Library | Version | Status | Next Milestone |
|---------|---------|--------|----------------|
| vyke-analyse | v0.3.0 | Active Development | v0.4.0 (Structure) |
| vyke-produce | - | Planning Complete | v0.1.0 (Core) |
| vyke-play | - | Planning Complete | v0.1.0 (Foundation) |

---

## Q1 2026: Analysis Foundation

### February: Structure & Phrases (vyke-analyse v0.4.0)

**Week 1-2: Vocal Detection**
- [ ] Vocal activity detection per frame
- [ ] Vocal segment extraction (start/end times)
- [ ] Lead vs background vocal classification
- [ ] Vocal energy curve

**Week 3-4: Intro/Outro Detection**
- [ ] DJ-friendly intro detection (drums only, stable)
- [ ] Radio edit intro detection (immediate vocals)
- [ ] Outro type classification
- [ ] Mix-in/mix-out point optimization

**Deliverable:** `vyke.detect_vocals()` and intro/outro classification

### March: Loudness & Energy (vyke-analyse v0.5.0)

**Week 1-2: EBU R128 Loudness**
- [ ] Integrated LUFS measurement
- [ ] Loudness Range (LRA)
- [ ] True peak detection
- [ ] Momentary/short-term loudness curves

**Week 3-4: Energy Analysis**
- [ ] RMS energy curves
- [ ] Spectral energy bands (bass/mid/high)
- [ ] Danceability scoring
- [ ] Energy profile classification

**Deliverable:** Professional loudness metering and energy analysis

---

## Q2 2026: Production Foundation

### April: vyke-produce Core (v0.1.0-0.3.0)

**Week 1-2: Project Setup**
- [ ] Repository structure
- [ ] Plugin scanner implementation
- [ ] Basic plugin profiles (Serum 2, Nexus 5, Diva)
- [ ] Configuration system

**Week 3-4: Ableton Integration**
- [ ] Live API client
- [ ] ALS XML generator
- [ ] Track/clip/device management
- [ ] Hybrid output (Live API + ALS)

**Week 5-6: Pattern Generation**
- [ ] Drum pattern templates (4/4, breakbeat)
- [ ] Bassline generation
- [ ] Chord progression library
- [ ] Melody generation basics

**Deliverable:** Can generate basic Ableton projects

### May: Genres & Templates (vyke-produce v0.4.0-0.6.0)

**Week 1-3: Circuit House**
- [ ] Circuit House template
- [ ] Drum patterns (4-on-floor, sidechain)
- [ ] Bass sounds (sub, reese)
- [ ] Lead sounds (supersaw, pluck)
- [ ] Effect chains

**Week 4-6: Afro Circuit**
- [ ] Afro Circuit template
- [ ] LAPDR rhythmic framework
- [ ] Five Rhythmic Axes
- [ ] Six Drop Systems
- [ ] Tribal percussion

**Deliverable:** 2 complete genre templates

### June: vyke-play Foundation (v0.1.0-0.3.0)

**Week 1-2: Pro DJ Link**
- [ ] Protocol implementation
- [ ] CDJ discovery
- [ ] Status reading (BPM, key, position)
- [ ] Device abstraction

**Week 3-4: Hardware Control**
- [ ] Load control
- [ ] Sync/tempo adjustment
- [ ] Cue point management
- [ ] Error handling

**Deliverable:** Can read and control Pioneer hardware

---

## Q3 2026: Integration & Polish

### July: More Genres (vyke-produce v0.7.0-0.9.0)

**New Genres:**
- [ ] Afro House
- [ ] Melodic House
- [ ] Melodic Techno
- [ ] Techno
- [ ] Trance

**Deliverable:** 7+ genre templates

### August: Remix Workflows (Cross-Library)

**vyke-analyse v0.6.0:**
- [ ] Chord detection
- [ ] Genre classification
- [ ] Stem separation (Demucs)

**vyke-produce v0.9.0:**
- [ ] InspirationSet protocol
- [ ] Remix workflow
- [ ] Vibe reproduction
- [ ] Sound Vault integration

**Integration:**
- [ ] End-to-end remix workflow
- [ ] Stem-based generation
- [ ] Reference track matching

**Deliverable:** Complete remix workflow (analyse → produce)

### September: Live Intelligence (vyke-play v0.5.0-0.7.0)

**Week 1-2: Track Recommendations**
- [ ] Harmonic mixing (Camelot)
- [ ] Energy matching
- [ ] BPM compatibility
- [ ] Genre flow

**Week 3-4: Mix Assistance**
- [ ] Optimal mix points
- [ ] Transition suggestions
- [ ] Beat grid alignment
- [ ] Phase correction

**Deliverable:** Intelligent DJ assistance

---

## Q4 2026: Release & Scale

### October: vyke-produce v1.0

**Final Polish:**
- [ ] 7+ complete genre templates
- [ ] Professional mixing chains
- [ ] Mastering templates
- [ ] Comprehensive documentation
- [ ] Video tutorials

**Deliverable:** Production-ready music generation

### November: vyke-play v1.0

**Auto-DJ Modes:**
- [ ] Assistant mode (suggestions)
- [ ] Co-Pilot mode (auto-load)
- [ ] Full Auto mode (complete automation)
- [ ] Safety features (human override)

**Hardware:**
- [ ] CDJ-3000 full support
- [ ] XDJ-XZ full support
- [ ] DJM mixer integration
- [ ] USB export with cues

**Deliverable:** Complete live performance system

### December: Ecosystem v1.0

**Integration:**
- [ ] DJLab 3.0 integration
- [ ] Sound Vault full integration
- [ ] Cross-library examples
- [ ] User documentation

**Release:**
- [ ] vyke-analyse v1.0
- [ ] vyke-produce v1.0
- [ ] vyke-play v1.0
- [ ] Ecosystem launch

---

## Dependency Graph

```
vyke-analyse v0.4.0 ──┐
                      │
vyke-analyse v0.5.0 ──┼──► vyke-produce v0.1.0
                      │         (can start after 0.5)
vyke-analyse v0.6.0 ──┘
                            │
                            ▼
                      vyke-produce v1.0
                            │
                            ▼
                      vyke-play v1.0
                   (depends on both)
```

**Key Dependencies:**
- vyke-produce can start development after vyke-analyse v0.5.0
- vyke-play requires vyke-analyse v0.6.0+ for track library
- vyke-play optionally uses vyke-produce for live generation

---

## Library-Specific Milestones

### vyke-analyse

| Version | Date | Features | DJLab Integration |
|---------|------|----------|-------------------|
| v0.4.0 | Feb 28 | Vocal detection, intro/outro types | 2.0.x |
| v0.5.0 | Mar 31 | LUFS, energy curves | 2.0.x |
| v0.6.0 | Apr 30 | Chords, genre classification | 2.1.x |
| v0.7.0 | May 31 | Stem separation (Demucs) | 2.1.x |
| v0.8.0 | Jun 30 | DJ set analysis | 2.2.x |
| v0.9.0 | Aug 31 | Advanced features | 3.0.x |
| v1.0.0 | Oct 31 | Stable API | 3.0.x |

### vyke-produce

| Version | Date | Features | DJLab Integration |
|---------|------|----------|-------------------|
| v0.1.0 | Apr 15 | Core architecture, plugin scanner | 2.1.x |
| v0.3.0 | Apr 30 | Ableton export working | 2.1.x |
| v0.5.0 | May 31 | Circuit House template | 2.2.x |
| v0.7.0 | Jul 15 | 5+ genres | 3.0.x |
| v0.9.0 | Aug 31 | Remix workflows | 3.0.x |
| v1.0.0 | Oct 31 | Production release | 3.0.x |

### vyke-play

| Version | Date | Features | DJLab Integration |
|---------|------|----------|-------------------|
| v0.1.0 | Jun 30 | Pro DJ Link, status reading | 3.0.x |
| v0.3.0 | Jul 31 | Hardware control | 3.0.x |
| v0.5.0 | Aug 31 | Track recommendations | 3.0.x |
| v0.7.0 | Sep 30 | Mix assistance | 3.1.x |
| v0.9.0 | Nov 15 | Auto-DJ modes | 3.1.x |
| v1.0.0 | Nov 30 | Full release | 3.1.x |

---

## Cross-Cutting Features

### Sound Vault Integration
**Timeline:** Q2-Q3 2026
**Libraries:** analyse, produce

- vyke-analyse analyzes samples for Sound Vault
- vyke-produce queries Sound Vault for generation
- Shared database schema

### DJLab Integration
**Timeline:** Ongoing
**Libraries:** all

- DJLab provides plugin inventory to produce
- DJLab provides Sound Vault DB session
- DJLab provides Live API connection
- DJLab orchestrates cross-library workflows

### Rekordbox Export
**Timeline:** Q2 2026
**Libraries:** analyse, play

- vyke-analyse exports cue points to Rekordbox XML
- vyke-play reads/writes Rekordbox databases
- USB export with AI-curated playlists

---

## Risk Adjustments

### Contingency Plans

**If vyke-analyse v0.4.0 slips:**
- Delay vyke-produce start by 2 weeks
- Focus on core functionality first

**If stem separation is delayed:**
- Ship vyke-analyse v0.6.0 without stems
- Add stems in v0.7.0

**If Pioneer integration is blocked:**
- Focus on USB export mode
- Delay hardware control to v1.1

### Scope Reduction Options

**Minimum Viable Ecosystem (if needed):**
- vyke-analyse: BPM, key, basic structure only
- vyke-produce: 3 genres (Circuit, Afro Circuit, Techno)
- vyke-play: Assistant mode only, no hardware control

---

## Review Schedule

| Review | Date | Focus |
|--------|------|-------|
| Q1 Review | Mar 31 | vyke-analyse progress, produce readiness |
| Q2 Review | Jun 30 | produce progress, play readiness |
| Q3 Review | Sep 30 | integration testing, v1.0 planning |
| Year-End | Dec 31 | v1.0 release retrospective |

---

## How to Update This Roadmap

1. **Library Updates:** Each library updates its own ROADMAP.md
2. **Cross-Library Changes:** Update this master ROADMAP.md
3. **New Dependencies:** Update Dependency Graph section
4. **Slippage:** Document in Risk Adjustments, update timelines
5. **Reviews:** Update at quarterly reviews

---

**Next Milestone:** February 28, 2026 - vyke-analyse v0.4.0 (Structure + Vocal Detection)
