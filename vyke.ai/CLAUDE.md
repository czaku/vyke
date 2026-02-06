# CLAUDE.md - vyke.ai Project Rules

**This file contains mandatory rules that Claude Code MUST follow for ALL work on this project.**

---

## ABSOLUTE RULES - NEVER BREAK THESE

### 1. NO MOCKS IN PRODUCTION CODE
- **NEVER** use mock data in services or endpoints
- **NEVER** fall back to mocks when dependencies are missing
- If a dependency is missing: **DOWNLOAD IT** or **FAIL LOUDLY**
- Mock data is ONLY allowed in test files (`tests/` directory)

### 2. NO SILENT FAILURES
- **NEVER** return empty data when something fails
- **NEVER** catch exceptions and return `[]` or `{}`
- **NEVER** use `pass` in except blocks
- If something fails: **RAISE AN ERROR** with a clear message

### 3. NO NotImplementedError IN "COMPLETE" CODE
- If a function has `NotImplementedError`, it is **NOT COMPLETE**
- If a function has `pass`, it is **NOT COMPLETE**
- If a function returns hardcoded data, it is **NOT COMPLETE**
- Complete means: actual logic that does the real thing

### 4. NO FUNCTIONALITY REMOVAL
- **NEVER** remove views, endpoints, or features without explicit permission
- **NEVER** comment out working code
- **NEVER** delete files without asking first
- If refactoring: preserve ALL functionality

### 5. NO SKIPPING TESTS
- **NEVER** skip tests because "dependency not installed" - install it
- **NEVER** skip tests because "too complex" - fix them
- **NEVER** mark tests as xfail without a real bug ticket
- Only skip: tests requiring real audio files not in repo

### 6. NO LYING ABOUT COMPLETION
- **NEVER** claim a percentage without running tests
- **NEVER** update roadmap without verification
- **NEVER** say "done" without checking Definition of Done
- If unsure: say "I don't know" not "it's complete"

### 7. ALWAYS DOWNLOAD DEPENDENCIES
- If a library is needed: `pip install` it
- If a system tool is needed: `brew install` it
- If a model is needed: download it
- **NEVER** mock because "library not available"

### 8. ALWAYS RUN TESTS AFTER CHANGES
- After ANY code change: run related tests
- Before claiming "done": run full test suite
- If tests fail: FIX THEM before moving on
- No commit without passing tests

---

## WAYS OF WORKING

### Before Starting Any Task
1. **READ** the full request carefully
2. **ASK** if anything is unclear
3. **CHECK** what already exists (don't duplicate)
4. **PLAN** the approach (write it down if complex)
5. **CONFIRM** understanding before coding

### During Implementation
1. **ONE THING AT A TIME** - finish before starting next
2. **TEST AS YOU GO** - don't save testing for the end
3. **COMMIT OFTEN** - small, focused commits
4. **STOP IF STUCK** - ask for help, don't hack around
5. **READ ERROR MESSAGES** - don't ignore them

### When Something Breaks
1. **STOP** - don't keep going
2. **READ** the error message fully
3. **UNDERSTAND** what broke and why
4. **FIX** the root cause, not symptoms
5. **VERIFY** the fix works
6. **CHECK** nothing else broke

### Communication Rules
1. **ANSWER QUESTIONS DIRECTLY** - don't deflect
2. **ADMIT MISTAKES** - don't hide them
3. **ASK BEFORE REMOVING** - anything
4. **REPORT BLOCKERS** - immediately
5. **BE HONEST** - about progress and problems

---

## DEFINITION OF DONE (DoD)

### For Any Endpoint/API
- [ ] Endpoint exists and responds (not 404/500)
- [ ] Returns real data (not mocks, not empty)
- [ ] Handles errors properly (returns error JSON, not crashes)
- [ ] Has at least one passing test
- [ ] Documented in API docs or README
- [ ] Accessible from UI (if applicable)

### For Any Service
- [ ] All methods implemented (no NotImplementedError)
- [ ] Uses real dependencies (not mocks)
- [ ] Has error handling (try/except with proper errors)
- [ ] Has passing unit tests
- [ ] Integrated with relevant endpoints

### For Any UI View
- [ ] View renders without errors
- [ ] Connects to real backend endpoints
- [ ] Shows real data (not placeholder text)
- [ ] Has loading states
- [ ] Has error states
- [ ] Is accessible from navigation

### For Any Feature (End-to-End)
- [ ] UI exists and is navigable
- [ ] Backend endpoint exists and works
- [ ] Data flows from UI → API → Service → Database → back
- [ ] Error cases handled at all layers
- [ ] Full user journey works (can complete the task)

### For Any Bug Fix
- [ ] Bug is reproducible before fix
- [ ] Fix addresses root cause
- [ ] Bug is not reproducible after fix
- [ ] No new bugs introduced
- [ ] Related tests pass
- [ ] No functionality removed

### For Any Commit
- [ ] All related tests pass
- [ ] No linting errors
- [ ] Commit message describes what changed
- [ ] No unrelated changes included
- [ ] Build succeeds (if applicable)

---

## VERIFICATION CHECKLIST

### Before Saying "Done"
```
[ ] Did I run the tests? What's the pass rate?
[ ] Did I test manually? Does it actually work?
[ ] Did I remove any functionality? (NOT ALLOWED)
[ ] Did I use any mocks in production code? (NOT ALLOWED)
[ ] Did I skip any tests? (NOT ALLOWED)
[ ] Can a user actually use this feature end-to-end?
[ ] Would I bet money this works?
```

### Before Updating Roadmap/Percentages
```
[ ] Did I run the FULL test suite?
[ ] How many tests pass? How many fail?
[ ] Did I manually verify each "complete" feature?
[ ] Am I being honest or optimistic?
[ ] Would the user agree this is complete?
```

### Before Creating a PR
```
[ ] All tests pass locally
[ ] No mocks in production code
[ ] No NotImplementedError
[ ] No removed functionality
[ ] Clear commit messages
[ ] Documentation updated
```

---

## RED FLAGS - STOP AND ASK

If you find yourself doing any of these, STOP and ask for guidance:

1. Writing `return []` or `return {}` in a catch block
2. Writing `except: pass`
3. Writing `raise NotImplementedError`
4. Commenting out code
5. Deleting files
6. Skipping tests
7. Using mock data outside of tests
8. Saying "this should work" without testing
9. Updating percentages without running tests
10. Moving on while tests are failing

---

## PENALTIES FOR BREAKING RULES

If any of these rules are broken:
1. STOP all work immediately
2. ACKNOWLEDGE the mistake
3. REVERT the problematic changes
4. FIX properly following the rules
5. VERIFY with tests before continuing

---

## MEASURING REAL PROGRESS

### True Completion Criteria
- **Working** = User can complete the task end-to-end
- **Tested** = Automated tests pass, manual test works
- **Integrated** = UI connects to API connects to service
- **No Mocks** = Real data, real logic, real dependencies

### Progress Calculation
```
Real Progress = (Features that WORK end-to-end) / (Total Features) × 100

NOT:
- Lines of code written
- Files created
- Tests that exist (but skip)
- Endpoints that return mock data
```

---

## PROJECT STRUCTURE

```
djlab/
├── api/                    # FastAPI backend
│   ├── app/
│   │   ├── api/           # API endpoints
│   │   ├── models/        # SQLModel database models
│   │   ├── services/      # Business logic
│   │   └── database.py    # Database connection
│   ├── tests/             # Python tests (mocks allowed here)
│   └── requirements.txt   # Python dependencies
├── native/                 # SwiftUI macOS app
│   └── vyke.ai/
│       ├── Views/         # SwiftUI views
│       └── Services/      # Backend service, etc.
└── docs/                   # Documentation
```

---

## KEY ARCHITECTURE DECISIONS

### Playlist Types
```python
class PlaylistType(str, Enum):
    STANDARD = "standard"       # Normal library playlist
    DJ_PLAYLIST = "dj_playlist" # DJ-ready curated playlist
    DJ_SET = "dj_set"          # Planned/recorded DJ set
    SMART = "smart"
    CRATE = "crate"
```

### Track Flow
- Tracks in Library (standard tracks)
- Tracks promoted to DJ Library (`in_dj_library=True`)
- DJ Tracks added to DJ Playlists
- DJ Playlists converted to DJ Sets

---

**This document is mandatory. Every piece of work must be checked against these rules.**
