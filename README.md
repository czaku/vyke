# Vyke

**AI-Powered Music Production & Performance Ecosystem**

> *"From analysis to production to performance. MIDI-first, plugin-native, genre-intelligent."*

---

## Overview

Vyke is a three-library ecosystem for professional music production and DJ performance:

| Library | Purpose | Status |
|---------|---------|--------|
| **vyke-analyse** | GPU-accelerated track analysis | v0.3.0, Active Development |
| **vyke-produce** | AI music production for Ableton | Planning Complete |
| **vyke-play** | Live performance & Pioneer integration | Planning Complete |

---

## Quick Start

```bash
# Clone the entire ecosystem
git clone --recursive git@github.com:luke/vyke.git
cd vyke

# Initialize submodules
git submodule update --init --recursive

# Install individual libraries
cd libraries/vyke-analyse && pip install -e .
cd ../vyke-produce && pip install -e .
cd ../vyke-play && pip install -e .
```

---

## Repository Structure

```
vyke/                          # Super Repository (this repo)
├── README.md                  # This file
├── VISION.md                  # Unified vision document
├── STRATEGY.md                # Business & technical strategy
├── ROADMAP.md                 # Master roadmap across all libraries
├── docs/                      # Cross-cutting documentation
│   ├── architecture/          # System-wide architecture
│   ├── standards/             # Coding standards
│   └── decisions/             # Architecture Decision Records
├── examples/                  # Cross-library examples
├── tools/                     # Shared tooling
└── libraries/                 # Git submodules
    ├── vyke-analyse/          # Track analysis
    ├── vyke-produce/          # Music production
    └── vyke-play/             # Live performance
```

---

## Core Workflows

### 1. Track Analysis (Standalone)
```python
from vyke import analyse

result = analyse("track.mp3")
print(f"BPM: {result.bpm}, Key: {result.key}")
```

### 2. Track Production (Standalone)
```python
from vyke_produce import Studio

studio = Studio()
project = studio.create_project(genre="circuit_house", bpm=128)
project.export("output.als")
```

### 3. Remix Workflow (Analyse → Produce)
```python
from vyke import analyse
from vyke_produce import Producer

# Analyze source tracks
main_analysis = analyse("madonna.mp3")
vocal_stems = analyse.separate_stems("madonna.mp3")

# Create remix
producer = Producer()
result = producer.remix(
    main_track="madonna.mp3",
    target_genre="afro_circuit",
    vocal_stem=vocal_stems.vocals
)
```

---

## Documentation

- [VISION.md](VISION.md) - The complete vision for the Vyke ecosystem
- [STRATEGY.md](STRATEGY.md) - Development and business strategy
- [ROADMAP.md](ROADMAP.md) - Master timeline across all libraries
- [docs/architecture/](docs/architecture/) - System architecture
- [examples/](examples/) - Working examples

---

## Development

### Working with Submodules

```bash
# Update all submodules to latest
git submodule update --remote

# Work on a specific library
cd libraries/vyke-analyse
# ... make changes ...
git commit -am "Add feature"
git push

# Update super-repo reference
cd ../..
git add libraries/vyke-analyse
git commit -m "Update vyke-analyse to latest"
```

### Adding Cross-Library Features

When a feature spans multiple libraries:
1. Create ADR in `docs/decisions/`
2. Implement in respective library repos
3. Add integration example in `examples/`
4. Update master ROADMAP.md

---

## License

- **vyke-analyse**: MIT License (see libraries/vyke-analyse/LICENSE)
- **vyke-produce**: Proprietary (see libraries/vyke-produce/LICENSE)
- **vyke-play**: Proprietary (see libraries/vyke-play/LICENSE)

---

**Built for producers who want MIDI, not loops.** 🎹
