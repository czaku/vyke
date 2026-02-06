# Vyke Produce V3: DJLab Integration Design

**DJLab is the Orchestrator, vyke-produce is the Executor**

**Version:** 1.1 (Corrected)  
**Date:** February 6, 2026  
**Status:** Design Phase

---

## System Architecture (Corrected)

### Responsibility Separation

| Component | Role | Has LLM? | Responsibility |
|-----------|------|----------|----------------|
| **DJLab** | Orchestrator | ✅ Yes | Chat UI, conversation flow, Maestro, plugin mgmt |
| **vyke-produce** | Executor | ❌ No | Generate Ableton projects from complete specs |
| **vyke-analyse** | Analyzer | ❌ No | Analyze audio, return structured data |

### Correct Flow

```
USER → DJLab Chat UI
           ↓
    [DJLab Maestro - LLM]
    "I want to remix Madonna"
           ↓
    Ask clarifying questions
    "Key? BPM? Genre?"
           ↓
    Call vyke-analyse (if needed)
    Get analysis results
           ↓
    Build complete InspirationSet
           ↓
    Call vyke-produce.remix(InspirationSet)
           ↓
    Receive .als file path
           ↓
    Show to user
           ↓
    User: "Bass too loud"
           ↓
    [DJLab Maestro]
    Update parameters
           ↓
    Call vyke-produce.update_project(params)
           ↓
    Return updated .als
```

**Key Point:** vyke-produce NEVER talks to the user. It receives complete specifications and returns files.

---

## vyke-produce V3 Interface

### What vyke-produce Does

```python
class Producer:
    """
    Music production executor.
    
    NO LLM. NO conversation. NO orchestration.
    Just receives specs, generates Ableton projects.
    """
    
    def __init__(
        self,
        plugin_inventory: PluginInventory,      # From DJLab
        sound_vault_session: Session,           # From DJLab
        live_api: Optional[LiveAPI] = None,    # From DJLab
    ):
        self.plugins = plugin_inventory
        self.vault = SoundVaultAccess(sound_vault_session)
        self.live = live_api
    
    # ============================================================
    # V2: Direct Generation (one-shot)
    # ============================================================
    
    def generate_track(self, spec: TrackSpec) -> ProductionResult:
        """
        Generate track from complete specification.
        
        Called by DJLab after Maestro has gathered all parameters.
        """
        pass
    
    # ============================================================
    # V3: Remix from Complete InspirationSet
    # ============================================================
    
    def remix(self, inspiration_set: InspirationSet) -> ProductionResult:
        """
        Create remix from complete InspirationSet.
        
        Args:
            inspiration_set: Complete spec including:
                - main_track_path
                - stems (from vyke-analyse, called by DJLab)
                - beat_source, drop_source (optional)
                - target_genre, target_bpm, target_key
                - version_type
                - voice_drops
        
        Returns:
            ProductionResult with .als path or LiveResult
        """
        pass
    
    def reproduce_vibe(self, reference: ReferenceTrack) -> ProductionResult:
        """
        Reproduce track vibe without sampling.
        """
        pass
    
    def extract_motive(
        self,
        audio_path: str,
        time_range: TimeRange
    ) -> MotiveResult:
        """
        Extract motive (bassline/melody) → MIDI + preset.
        """
        pass
    
    # ============================================================
    # V3: Update Existing Project (for iteration)
    # ============================================================
    
    def update_project(
        self,
        project_path: str,
        changes: List[ParameterChange]
    ) -> ProductionResult:
        """
        Update existing Ableton project parameters.
        
        Called by DJLab when user says "make bass louder".
        
        Args:
            project_path: Path to existing .als file
            changes: List of parameter changes
                e.g., ["bass_track.volume", "-12dB", "-9dB"]
        
        Returns:
            Updated ProductionResult
        """
        pass
```

### Data Structures (Input from DJLab)

```python
@dataclass
class InspirationSet:
    """
    Complete specification for remix/production.
    
    Built by DJLab Maestro through conversation with user.
    vyke-produce just executes - no questions asked.
    """
    
    # Main track (provided by DJLab)
    main_track_path: str
    
    # Stems (vyke-analyse called by DJLab already)
    vocal_stem_path: Optional[str] = None
    drum_stem_path: Optional[str] = None
    bass_stem_path: Optional[str] = None
    other_stem_path: Optional[str] = None
    
    # Inspiration sources (optional, from other tracks)
    beat_source: Optional[InspirationSource] = None
    drop_source: Optional[InspirationSource] = None
    bass_source: Optional[InspirationSource] = None
    
    # Target specs (determined by DJLab Maestro)
    target_genre: str = "house"           # "afro_circuit", "circuit_house"
    target_bpm: float = 128.0             # Determined by conversation
    target_key: str = "Am"                # Determined by conversation
    target_energy: str = "peak"           # "warmup", "peak", "afterhours"
    
    # Version type (chosen by user via DJLab UI)
    version_type: VersionType = VersionType.EXTENDED
    
    # Vocal treatment (determined by conversation)
    vocal_treatment: VocalTreatment = VocalTreatment.KEEP_LYRICS
    vocal_processing: List[str] = field(default_factory=list)
    # e.g., ["pitch_shift", "formant_preserve", "stutter_build"]
    
    # Voice drops (selected by user in DJLab)
    voice_drops: List[VoiceDrop] = field(default_factory=list)
    
    # Mixing preferences (can be overridden by user in DJLab)
    mixing_style: str = "circuit"         # Genre-specific mixing
    sidechain_amount: float = -6.0        # dB
    
    # Plugin preferences (from DJLab plugin discovery)
    preferred_bass_synth: Optional[str] = None  # "Serum 2", "Diva"
    preferred_drums: Optional[str] = None       # "Nexus 5", custom


@dataclass
class ParameterChange:
    """
    Single parameter change for update_project().
    
    Generated by DJLab Maestro from user request:
    User: "Bass too loud" → Maestro parses → ParameterChange
    """
    target: str           # "bass_track.volume"
    old_value: Any        # -12.0
    new_value: Any        # -15.0
    reason: str           # "User requested lower bass"


@dataclass
class ProductionResult:
    """
    Result from vyke-produce execution.
    
    Returned to DJLab for display to user.
    """
    success: bool
    
    # Output
    als_path: Optional[str] = None
    live_result: Optional[LiveResult] = None  # If using Live API
    
    # Metadata
    project_name: str = ""
    duration_seconds: float = 0.0
    
    # What was used (for DJLab to show user)
    plugins_used: List[str] = field(default_factory=list)
    samples_used: List[str] = field(default_factory=list)
    midi_clips_generated: int = 0
    
    # For iteration tracking
    generation_time_seconds: float = 0.0
    changes_made: List[ParameterChange] = field(default_factory=list)
```

---

## DJLab Maestro → vyke-produce Flow

### Example: Complete Remix Workflow

**Step 1-5: DJLab Maestro (LLM) does conversation**

```python
# Inside DJLab (not vyke-produce)

class DJLabMaestro:
    """LLM-powered orchestrator in DJLab."""
    
    async def handle_remix_request(self, user_input: str):
        # 1. Parse intent
        intent = await self.llm.parse_intent(user_input)
        # intent: {"workflow": "remix", "source": "madonna.mp3", "target_genre": "afro_circuit"}
        
        # 2. Check missing parameters
        missing = self.get_missing_params(intent)
        
        # 3. Ask clarifying questions
        for param in missing:
            question = await self.llm.generate_question(param)
            answer = await self.ask_user(question)
            intent[param] = answer
        
        # 4. Call vyke-analyse if needed
        if intent.needs_analysis:
            analysis = await self.vyke_analyze(intent.source_file)
            intent.analysis = analysis
        
        # 5. Build complete InspirationSet
        inspiration_set = InspirationSet(
            main_track_path=intent.source_file,
            target_genre=intent.target_genre,
            target_bpm=intent.bpm,
            target_key=intent.key,
            vocal_treatment=intent.vocal_treatment,
            # ... etc
        )
        
        # 6. Call vyke-produce (THIS IS THE LIBRARY CALL)
        result = await self.producer.remix(inspiration_set)
        
        # 7. Show result to user
        await self.show_user(result)
        
        # 8. Handle iteration
        while True:
            feedback = await self.get_user_feedback()
            if feedback == "done":
                break
            
            # Parse feedback into changes
            changes = await self.llm.parse_feedback(feedback)
            
            # Call vyke-produce.update_project()
            result = await self.producer.update_project(
                result.als_path,
                changes
            )
            
            await self.show_user(result)
```

**User Experience in DJLab:**

```
User: "Remix Madonna to Afro Circuit"

DJLab: "I suggest Fm at 128 BPM for dark tribal energy. Agree?"
User: "Yes, but make it 126"

DJLab: "Keep the original lyrics or make vocal chops?"
User: "Keep lyrics, add stutter in build"

DJLab: [Shows loading spinner]
      "Separating stems..."
      "Generating drums..."
      "Mixing..."
      
DJLab: ✅ "Done! Created Afro_Circuit_Remix.als
      Bass: Serum 2, Drums: custom LAPDR pattern
      Sidechain: -6dB, Vocal stutter: bars 33-48"

User: "Bass too loud"

DJLab: → Calls vyke-produce.update_project()
      ✅ "Bass lowered 3dB (now -15dB)"
```

---

## Internal vyke-produce Architecture

Even though vyke-produce doesn't have LLM orchestration, it still needs internal organization:

### Option A: Simple Sequential (V2 Style)

```python
def remix(self, inspiration_set: InspirationSet) -> ProductionResult:
    """Simple sequential execution."""
    
    # 1. Load/generate patterns
    drums = self.generate_drums(inspiration_set)
    bass = self.generate_bass(inspiration_set)
    
    # 2. Process stems
    vocals = self.process_vocals(inspiration_set)
    
    # 3. Build arrangement
    arrangement = self.build_arrangement(inspiration_set, drums, bass, vocals)
    
    # 4. Apply mixing
    mixed = self.apply_mixing(arrangement, inspiration_set)
    
    # 5. Export
    return self.export_to_ableton(mixed)
```

### Option B: Internal Agents (No LLM, Just Workers)

For complex workflows, vyke-produce can spin off internal worker agents (NOT LLM agents, just async workers):

```python
class StemProcessingWorker:
    """Worker for stem processing. No LLM, just audio processing."""
    async def process(self, stem_path: str, treatment: str) -> ProcessedStem:
        pass

class PatternGenerationWorker:
    """Worker for MIDI pattern generation. Uses algorithms, not LLM."""
    async def generate(self, genre: str, bpm: float) -> Pattern:
        pass

class MixingWorker:
    """Worker for mixing. Applies predefined chains."""
    async def mix(self, tracks: List[Track], style: str) -> MixedProject:
        pass
```

These are **workers**, not **agents with LLM reasoning**.

### Recommendation for vyke-produce

**Use Option A (Sequential) for V3.0**, consider Option B (Workers) for V3.5+ if needed.

Reason: Music production workflows are largely deterministic and sequential. We don't need complex agent orchestration inside vyke-produce - that's DJLab's job.

---

## Key Interfaces

### DJLab → vyke-analyse

```python
# DJLab calls vyke-analyse directly
from vyke import analyse, separate_stems

analysis = analyse("madonna.mp3")
stems = separate_stems("madonna.mp3")
```

### DJLab → vyke-produce

```python
# DJLab initializes producer with its resources
from vyke_produce import Producer

producer = Producer(
    plugin_inventory=self.get_plugins(),      # DJLab provides
    sound_vault_session=self.get_db_session(), # DJLab provides
    live_api=self.live_api_service,           # DJLab provides
)

# DJLab builds InspirationSet through conversation
inspiration = InspirationSet(
    main_track_path="madonna.mp3",
    target_genre="afro_circuit",
    # ... complete spec
)

# DJLab calls producer
result = await producer.remix(inspiration)
```

### vyke-produce → DJLab

```python
# Returns result, no callbacks
return ProductionResult(
    success=True,
    als_path="/path/to/project.als",
    plugins_used=["Serum 2", "FabFilter Pro-Q 3"],
)
```

---

## Summary

### DJLab (Application Layer)
- ✅ Has LLM (Maestro)
- ✅ Manages conversation
- ✅ Orchestrates workflow
- ✅ Calls vyke-analyse for analysis
- ✅ Calls vyke-produce for generation
- ✅ Shows results to user

### vyke-produce (Library Layer)
- ❌ NO LLM
- ❌ NO conversation
- ❌ NO orchestration
- ✅ Receives complete specs
- ✅ Generates Ableton projects
- ✅ Returns files

### vyke-analyse (Library Layer)
- ❌ NO LLM (uses ML models, not LLMs)
- ✅ Receives audio files
- ✅ Returns analysis data
- ✅ Called by DJLab

---

**Correction from V3.0 Design:**

The previous version of this document incorrectly suggested vyke-produce would have LLM orchestration. That was wrong. **DJLab is the orchestrator, vyke-produce is just a tool it uses.**

This makes vyke-produce simpler, more focused, and easier to test. DJLab handles the complexity of user interaction.
