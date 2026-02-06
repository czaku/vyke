# Vyke Master Roadmap

**Coordinated Development Across All Libraries**

**Version:** 1.2  
**Date:** February 6, 2026  
**Last Updated:** February 6, 2026

---

## Timeline Overview

```
2026
Q1          Q2          Q3          Q4
│           │           │           │
├─ vyke-analyse v0.7-0.9 ─┤           │
│   (Stems, Vocals,       │           │
│    Advanced Features)   │           │
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
| vyke-analyse | v0.7.0 | Active Development | v0.8.0 (Vocal & Intro Detection) |
| vyke-produce | - | Planning Complete | v0.1.0 (Core) |
| vyke-play | - | Planning Complete | v0.1.0 (Foundation) |

---

## What's Been Completed (vyke-analyse)

### Phase 1: Core Foundation ✅
- Audio I/O with GPU acceleration
- STFT, Mel spectrograms, filterbanks
- Core types and utilities

### Phase 2: Beat & Tempo Analysis ✅
- TCN + DBN beat tracking (98% BPM accuracy)
- Downbeat detection
- Tempo estimation with octave disambiguation

### Phase 3: Key Detection ✅
- CNN-based key detection (86% accuracy)
- Camelot notation support
- Compatible keys for harmonic mixing

### Phase 3A: Track Structure ✅
- Self-similarity matrix analysis
- Boundary detection with novelty curves
- Section classification (intro/verse/chorus/drop/outro)
- Phrase detection (8/16 bar markers)
- Mix points detection (basic)

### Phase 3B: Energy & Loudness ✅
- EBU R128 loudness (LUFS, LRA, true peak)
- Energy curves and spectral analysis
- Waveform data for UI display
- Danceability scoring

### Phase 3C: Chords & Genre ✅
- Chord detection with extended vocabulary
- Genre classification (DJ-focused taxonomy)
- Style analysis

### Phase 3D: Rekordbox Integration ✅
- Rekordbox XML export for cue points
- Beat grid export
- Collection export

### Phase 4: DJ Set Analysis ✅
- Content type detection (track vs DJ set vs podcast)
- Track boundary detection (multi-feature fusion)
- Transition analysis (type classification, quality scoring)

### Phase 5: Stem Separation ✅
- HTDemucs reimplementation (native PyTorch, no external deps)
- HPSS harmonic/percussive separation
- Pretrained weight loading from Facebook
- Unified `vyke.separate()` API with 4-stem output
- GPU/MPS/CPU device selection
- Chunked processing for long audio

---

## Q1 2026: Remaining Analysis Work

### February: Vocal & Intro Detection (vyke-analyse v0.8.0) ⏳ IN PROGRESS

**Vocal Detection:**
- [ ] Vocal activity detection per frame
- [ ] Vocal segment extraction (start/end times)
- [ ] Lead vs background vocal classification
- [ ] Vocal energy curve

**Intro/Outro Detection:**
- [ ] DJ-friendly intro detection (drums only, stable)
- [ ] Radio edit intro detection (immediate vocals)
- [ ] Outro type classification
- [ ] Mix-in/mix-out point optimization

**Deliverable:** `vyke.detect_vocals()` and enhanced intro/outro classification

---

### March: Advanced Features (vyke-analyse v0.9.0)

**Pitch & Melody:**
- [ ] CREPE-style pitch tracking
- [ ] Melody extraction
- [ ] Note onset/offset detection

**Per-Stem Analysis:**
- [ ] Drum pattern classification from stems
- [ ] Bass line analysis from stems
- [ ] Vocal characteristics from stems

**Deliverable:** Complete analysis suite ready for v1.0

---

## Q2 2026: Production Foundation

### April-May: vyke-produce Core (v0.1.0-0.3.0)

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

### May-June: Genres & Templates (vyke-produce v0.4.0-0.6.0)

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

### June-July: vyke-play Foundation (v0.1.0-0.3.0)

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

### July-August: More Genres (vyke-produce v0.7.0-0.9.0)

**New Genres:**
- [ ] Afro House
- [ ] Melodic House
- [ ] Melodic Techno
- [ ] Techno
- [ ] Trance

**Deliverable:** 7+ genre templates

### August-September: Remix Workflows (Cross-Library)

**vyke-analyse v1.0.0:**
- [ ] Stable API freeze
- [ ] Performance optimization
- [ ] Documentation complete

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

### September-October: Live Intelligence (vyke-play v0.5.0-0.7.0)

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
vyke-analyse v0.6.0 ──┐ (DONE: structure, energy, chords, genre, DJ sets)
                      │
vyke-analyse v0.7.0 ──┼──► vyke-produce v0.1.0 (DONE: stems)
   (stems ✅)         │         (can start now!)
                      │
vyke-analyse v0.8.0 ──┘ (vocals, intro/outro - in progress)
                            │
                            ▼
                      vyke-produce v1.0
                            │
                            ▼
                      vyke-play v1.0
                   (depends on both)
```

**Key Dependencies:**
- vyke-produce can start development after vyke-analyse v0.7.0 (stems ready)
- vyke-play requires vyke-analyse v0.8.0+ for track library with full metadata
- vyke-play optionally uses vyke-produce for live generation

---

## Library-Specific Milestones

### vyke-analyse

| Version | Date | Features | Status |
|---------|------|----------|--------|
| v0.1.0 | Jan 15 | Audio I/O, GPU spectrograms | ✅ Done |
| v0.2.0 | Jan 25 | Beat/tempo tracking (98% accuracy) | ✅ Done |
| v0.3.0 | Feb 1 | Key detection (86% accuracy) | ✅ Done |
| v0.4.0 | Feb 3 | Track structure, phrases, mix points | ✅ Done |
| v0.5.0 | Feb 4 | Energy, loudness, waveform | ✅ Done |
| v0.6.0 | Feb 5 | Chords, genre, Rekordbox export, DJ sets | ✅ Done |
| **v0.7.0** | **Feb 6** | **Stem separation (HTDemucs, HPSS)** | **✅ Done** |
| **v0.8.0** | **Feb 15** | **Vocal detection, intro/outro types** | **⏳ In Progress** |
| v0.9.0 | Mar 1 | Pitch tracking, per-stem analysis | Planned |
| v1.0.0 | Mar 15 | Stable API, optimization | Planned |

### vyke-produce

| Version | Date | Features | Status |
|---------|------|----------|--------|
| v0.1.0 | Apr 15 | Core architecture, plugin scanner | Planned |
| v0.3.0 | May 15 | Ableton export working | Planned |
| v0.5.0 | Jun 15 | Circuit House template | Planned |
| v0.7.0 | Jul 31 | 5+ genres | Planned |
| v0.9.0 | Sep 15 | Remix workflows | Planned |
| v1.0.0 | Oct 31 | Production release | Planned |

### vyke-play

| Version | Date | Features | Status |
|---------|------|----------|--------|
| v0.1.0 | Jun 30 | Pro DJ Link, status reading | Planned |
| v0.3.0 | Aug 15 | Hardware control | Planned |
| v0.5.0 | Sep 15 | Track recommendations | Planned |
| v0.7.0 | Oct 15 | Mix assistance | Planned |
| v0.9.0 | Nov 15 | Auto-DJ modes | Planned |
| v1.0.0 | Nov 30 | Full release | Planned |

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

### Rekordbox Export ✅ DONE
**Timeline:** February 2026
**Libraries:** analyse

- ✅ vyke-analyse exports cue points to Rekordbox XML
- ✅ Beat grid export
- ✅ Collection export
- vyke-play will read/write Rekordbox databases (future)
- USB export with AI-curated playlists (future)

---

## Risk Adjustments

### Contingency Plans

**If stem separation is delayed:**
- Ship vyke-analyse v0.7.0 with Demucs only
- Add UVR/MDX-Net in v0.7.1

**If vocal detection is delayed:**
- Use stem-based vocal detection from separation
- Delay intro/outro classification

**If Pioneer integration is blocked:**
- Focus on USB export mode
- Delay hardware control to v1.1

### Scope Reduction Options

**Minimum Viable Ecosystem (if needed):**
- vyke-analyse: BPM, key, structure, stems (Demucs only)
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

**Next Milestone:** February 15, 2026 - vyke-analyse v0.8.0 (Vocal Detection & Enhanced Intro/Outro)
