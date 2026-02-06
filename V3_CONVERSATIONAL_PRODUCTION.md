# Vyke Produce V3: Conversational AI Producer Design

**Conversational, Multi-Turn, Autonomous Music Production**

**Version:** 1.0  
**Date:** February 6, 2026  
**Status:** Design Phase

---

## Executive Summary

V3 transforms vyke-produce from a **one-shot generator** into a **conversational AI Producer** that works collaboratively with the user (Director → Producer relationship).

**Key Innovation:** The system spins off specialized "Chef" agents for different production tasks (mixing, mastering, sound design), orchestrated by a Maestro that manages the conversation and workflow.

---

## How LLMs Are Used in V3

### 1. Intent Understanding & Planning (Claude/GPT)

**Purpose:** Understand what the user wants and create production plans

```python
# User input
user_input = "Remix Madonna to Afro Circuit"

# LLM analyzes intent
intent_analysis = await llm.analyze_intent(user_input)
# Returns:
# {
#   "workflow": "remix",
#   "source_type": "audio_file",
#   "source_description": "Madonna - Like a Prayer",
#   "target_genre": "afro_circuit",
#   "missing_parameters": ["key", "bpm", "vocal_treatment"],
#   "suggested_parameters": {
#     "key": "Fm (dark tribal energy)",
#     "bpm": "128 (peak time)"
#   }
# }
```

### 2. Clarifying Questions (Interactive)

**Purpose:** Ask smart questions when parameters are missing

```python
# Maestro determines what's needed
if intent.missing_parameters:
    question = await llm.generate_question(
        context=intent,
        missing=intent.missing_parameters[0]
    )
    # "I suggest Fm at 128 BPM for dark tribal energy. Agree?"
    
    user_answer = await ask_user(question)
    intent.update(user_answer)
```

### 3. Workflow Orchestration (State Management)

**Purpose:** Decide what to do next based on current state

```python
# During production, LLM decides next step
state = {
    "stems_separated": True,
    "vocals_analyzed": True,
    "vocal_pitch_shifted": False,
    "drums_generated": True,
    "current_issue": "vocals sound thin after pitch shift"
}

next_action = await llm.decide_next_step(state)
# Returns: {
#   "action": "consult_chef",
#   "chef_type": "mixing",
#   "task": "Add vocal thickening chain"
# }
```

### 4. Chef Specialization (Domain Experts)

**Purpose:** Each production domain has a specialized LLM prompt/persona

```python
# Mixing Chef - specialized for mixing decisions
mixing_chef = MixingChef(llm_backend)
recommendation = await mixing_chef.consult(
    track_analysis=analysis,
    issue="drop lacks impact"
)
# Returns detailed mixing recommendations
```

### 5. Explanation Generation

**Purpose:** Explain decisions to the user

```python
# After changes, explain what was done
explanation = await llm.explain_changes(
    changes=mixed_result.changes,
    user_level="intermediate"
)
# "I lowered the bass by 3dB and increased sidechain ducking to -6dB 
#  to create that classic Circuit House pump."
```

---

## The Conversational Production Workflow

### Example: Audio-to-Remix (Full Flow)

```
USER: "Remix Madonna to Afro Circuit"

V3-MAESTRO: Analyzing intent...
          → Detected: remix workflow
          → Target genre: afro_circuit
          → Missing: key, bpm, vocal treatment

V3-MAESTRO: "I suggest Fm at 128 BPM for dark tribal energy. Agree?"

USER: "Yes, but make it 126 BPM"

V3-MAESTRO: ✓ Key: Fm, BPM: 126
          → Spinning off StemSeparationAgent...

[BACKGROUND: StemSeparationAgent runs Demucs]
          → vocals.wav, drums.wav, bass.wav, other.wav

V3-MAESTRO: "Original vocals are in C major. I'll pitch-shift to Fm 
          with formant preservation. Keep the lyrics or make chops?"

USER: "Keep lyrics but add some stutter effect in the build"

V3-MAESTRO: ✓ Vocal treatment: pitch_shift + formant_preserve + stutter_build
          → Consulting VocalChef...

[VocalChef analyzes and recommends processing chain]

V3-MAESTRO: → Spinning off DrumGenerationAgent...

[DrumGenerationAgent creates LAPDR patterns]

V3-MAESTRO: → Consulting AfroCircuitChef for percussion...

[AfroCircuitChef selects tribal samples from Sound Vault]

V3-MAESTRO: → Spinning off ArrangementAgent...

[ArrangementAgent builds 16/8/32/16/32/32 structure]

V3-MAESTRO: → Consulting MixingChef...

[MixingChef designs sidechain and EQ]

V3-MAESTRO: → Consulting MasteringChef...

[MasteringChef sets LUFS targets]

V3-MAESTRO: → Spinning off ExportAgent...

[ExportAgent generates Ableton project]

V3-MAESTRO: ✅ Done! Created Afro_Circuit_Remix.als
          "I used heavy sidechain (-6dB ducking) and added 
           tribal percussion (telecoteco pattern). 
           Check the breakdown at 1:30 - vocal stutter on 1/16 grid."

USER: "Bass too loud, needs more sidechain"

V3-MAESTRO: → Consulting MixingChef...
          → Updating project parameters...
          ✅ Bass lowered 3dB, sidechain threshold -20dB → -15dB
          
V3-MAESTRO: "Better? The bass now ducks -8dB on kick hits."

USER: "Perfect! Add filter sweep on build (bars 33-48)"

V3-MAESTRO: → Consulting SoundDesignChef...
          → Adding Autofilter with automation...
          ✅ Filter sweep: 200Hz → 20kHz over 16 bars
          
V3-MAESTRO: "Filter sweep added. Want me to add a riser sample too?"
```

---

## Agent System Architecture (Wickit-Inspired)

### Core Concept: The Music Bakery

Based on **wickit**'s "Ancient Magic" pattern (from ralfiepretzel):

```
┌─────────────────────────────────────────────────────────────┐
│                    V3 Music Bakery                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🎵 MAESTRO (The Conductor)                                │
│     • Orchestrates the entire production                    │
│     • Manages conversation state                            │
│     • Decides when to spin off agents                       │
│     • Handles user Q&A                                      │
│     • Maintains production context                          │
│                                                              │
│  ┌─────────────┬─────────────┬─────────────┐               │
│  │ 🧙 VOCAL    │ 🧙 DRUM     │ 🧙 BASS     │               │
│  │   CHEF      │   CHEF      │   CHEF      │               │
│  │             │             │             │               │
│  │ • Pitch     │ • Patterns  │ • Sound     │               │
│  │ • Time      │ • Layering  │   design    │               │
│  │   stretch   │ • Humanize  │ • Groove    │               │
│  │ • Formant   │             │             │               │
│  └─────────────┴─────────────┴─────────────┘               │
│  ┌─────────────┬─────────────┬─────────────┐               │
│  │ 🧙 MIXING   │ 🧙 MASTER   │ 🧙 ARRANGE  │               │
│  │   CHEF      │   CHEF      │   CHEF      │               │
│  │             │             │             │               │
│  │ • Levels    │ • LUFS      │ • Structure │               │
│  │ • EQ        │ • Limiting  │ • Energy    │               │
│  │ • Comp      │ • Width     │ • Transitions│              │
│  │ • FX chains │             │             │               │
│  └─────────────┴─────────────┴─────────────┘               │
│  ┌─────────────┬─────────────┬─────────────┐               │
│  │ 🧙 SOUND    │ 🧙 GENRE    │ 🧙 PLUGIN   │               │
│  │   DESIGN    │   CHEF      │   CHEF      │               │
│  │   CHEF      │             │             │               │
│  │             │ • Style     │ • Selection │               │
│  │ • Synth     │ • Patterns  │ • Chains    │               │
│  │   patches   │ • Rules     │ • Fallbacks │               │
│  │ • Macros    │             │             │               │
│  └─────────────┴─────────────┴─────────────┘               │
│                                                              │
│  🤖 AGENTS (Workers)                                        │
│  ┌─────────────┬─────────────┬─────────────┐               │
│  │ • StemSep   │ • Generate  │ • Export    │               │
│  │ • Analyze   │ • Mix       │ • Render    │               │
│  │ • Process   │ • Master    │ • Validate  │               │
│  └─────────────┴─────────────┴─────────────┘               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Agent Types

#### 1. Maestro Agent (Always Active)

**Role:** Central orchestrator, conversation manager

**Responsibilities:**
- Parse user intent
- Maintain conversation state
- Decide when to spin off specialist agents
- Route Chef consultations
- Present results to user
- Handle iteration requests

**State Machine:**
```python
class MaestroState(Enum):
    IDLE = "idle"
    GATHERING_PARAMS = "gathering_params"  # Asking questions
    PLANNING = "planning"                   # Creating production plan
    EXECUTING = "executing"                 # Running agents
    CONSULTING = "consulting"               # Talking to Chefs
    REVIEWING = "reviewing"                 # Presenting results
    ITERATING = "iterating"                 # Making changes
    COMPLETE = "complete"
```

#### 2. Chef Agents (On-Demand Specialists)

**Role:** Domain experts consulted for specific decisions

**Examples:**
- `MixingChef`: Recommends EQ, compression, levels
- `MasteringChef`: Recommends LUFS, limiting, width
- `VocalChef`: Recommends pitch/time processing
- `AfroCircuitChef`: Genre-specific knowledge
- `SerumChef`: Sound design for Serum

**Invocation Pattern:**
```python
# Maestro decides to consult a Chef
if issue.domain == "mixing":
    chef = MixingChef(
        llm_backend=claude,
        knowledge_base=mixing_knowledge,
        plugin_inventory=available_plugins
    )
    recommendation = await chef.consult(
        track_analysis=analysis,
        issue=issue.description,
        constraints=user_constraints
    )
```

#### 3. Worker Agents (Task Executors)

**Role:** Execute specific production tasks

**Examples:**
- `StemSeparationAgent`: Runs Demucs
- `PatternGenerationAgent`: Creates MIDI patterns
- `MixingAgent`: Applies mixing parameters
- `ExportAgent`: Generates Ableton project

**Lifecycle:**
```python
# Spin off agent
agent = StemSeparationAgent(
    input_file="madonna.mp3",
    output_dir="/tmp/stems"
)

# Run asynchronously
result = await agent.run()

# Agent terminates when done
```

---

## Do We Build Our Own System or Use Wickit?

### Option A: Use wickit (Existing Framework)

**Pros:**
- ✅ Proven in ralfiepretzel (production code)
- ✅ 65% code reuse across projects
- ✅ 7 weeks vs 10 weeks (faster)
- ✅ Battle-tested agent patterns
- ✅ Built-in security (guardian module)
- ✅ Same team maintains it

**Cons:**
- ❌ Dependency on external library
- ❌ May need customization for music domain
- ❌ Less control over internals

**How It Works:**
```python
from wickit.maestro import Maestro
from wickit.wizards import Wizard

# Maestro orchestrates
maestro = Maestro()

# Define Chefs as Wizards
class MixingChef(Wizard):
    domain = "mixing"
    
    async def consult(self, context):
        # Use LLM to generate recommendations
        return await self.llm.generate(
            prompt=mixing_prompt,
            context=context
        )

# Worker agents as Skills
from wickit.tricks import Skill

class StemSeparationSkill(Skill):
    async def execute(self, input_file):
        return await separate_stems(input_file)
```

### Option B: Build Custom (LangGraph)

**Pros:**
- ✅ Full control over architecture
- ✅ Purpose-built for music production
- ✅ No external dependencies
- ✅ Can optimize for real-time/audio

**Cons:**
- ❌ 10 weeks vs 7 weeks (slower)
- ❌ Must solve problems wickit already solved
- ❌ More maintenance burden
- ❌ Reinventing the wheel

**How It Works:**
```python
from langgraph.graph import StateGraph

# Define state
class ProductionState(TypedDict):
    user_input: str
    parameters: dict
    stems: dict
    mix_settings: dict
    messages: list

# Build graph manually
workflow = StateGraph(ProductionState)
workflow.add_node("parse_intent", parse_intent_node)
workflow.add_node("ask_params", ask_params_node)
workflow.add_node("separate_stems", stem_separation_node)
# ... 10+ more nodes

# Conditional routing
workflow.add_conditional_edges(
    "check_params",
    route_based_on_completeness,
    {"complete": "execute", "incomplete": "ask_params"}
)
```

### Recommendation: Hybrid Approach

**Decision:** Use wickit core + custom music extensions

**Architecture:**
```
┌─────────────────────────────────────────────────────────────┐
│  wickit (Core Framework)                                    │
│  ├── maestro (orchestration)                                │
│  ├── wizards (Chefs)                                        │
│  ├── tricks (reusable skills)                               │
│  ├── recipes (workflows)                                    │
│  └── guardian (security)                                    │
├─────────────────────────────────────────────────────────────┤
│  vyke-produce (Music-Specific Extensions)                   │
│  ├── MusicMaestro (extends Maestro)                         │
│  ├── *Chef classes (extend Wizard)                          │
│  │   ├── MixingChef                                         │
│  │   ├── MasteringChef                                      │
│  │   ├── VocalChef                                          │
│  │   └── GenreChefs (AfroCircuitChef, etc.)                 │
│  ├── MusicSkills (extend Trick)                             │
│  │   ├── StemSeparation                                     │
│  │   ├── PatternGeneration                                  │
│  │   └── AbletonExport                                      │
│  └── MusicRecipes (extend Recipe)                           │
│      ├── RemixRecipe                                        │
│      ├── TextToTrackRecipe                                  │
│      └── ReproductionRecipe                                 │
└─────────────────────────────────────────────────────────────┘
```

**Benefits:**
- Get wickit's proven foundation
- Focus on music-specific logic
- Contribute improvements back to wickit
- 7-week timeline achievable

---

## Implementation Phases

### Phase 1: Core Orchestration (Weeks 1-2)
- Integrate wickit.maestro
- Build MusicMaestro subclass
- Implement conversation state management
- Basic intent parsing

### Phase 2: Chef Development (Weeks 3-4)
- Build MixingChef, MasteringChef, VocalChef
- Create Chef knowledge bases
- Implement consultation patterns

### Phase 3: Worker Agents (Weeks 5-6)
- StemSeparationAgent
- PatternGenerationAgent
- MixingAgent
- ExportAgent

### Phase 4: Recipes (Weeks 7-8)
- RemixRecipe
- TextToTrackRecipe
- Integration with V2 services

### Phase 5: Polish (Weeks 9-10)
- Error handling
- Edge cases
- Testing
- Documentation

**Total: 10 weeks (or 7 with full wickit reuse)**

---

## Open Questions

1. **Real-time Constraints:** Can we do real-time generation during chat, or is it batch?
2. **State Persistence:** How long do we keep agent sessions? (suggest: 24h default)
3. **Cost Management:** LLM calls per production? (estimate: 50-100 calls per remix)
4. **Parallel Agents:** How many agents can run simultaneously? (suggest: 3 max)
5. **User Override:** How to let user take control mid-production?

---

**Next Steps:**
1. Review wickit codebase for integration points
2. Define MusicMaestro interface
3. Create first Chef prototype (MixingChef)
4. Build proof-of-concept RemixRecipe
