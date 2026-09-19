# Data Model: Documentation Section Mapping & Schema

## README Section Mapping

| Target File | Section Name | Key Contents | Target Audience |
|-------------|--------------|--------------|-----------------|
| `README.md` | `🎨 Tailwind CSS Design System` | Global color palette, theme tokens, custom glassmorphism utilities, and animation keyframes overview | All Developers |
| `README.md` | `🛠️ Spec-Driven Development Workflow` | Flowchart, step-by-step command sequence featuring `/speckit-specify`, and optional enhancement commands | Spec Kit Developers |
| `frontend/README.md` | `🎨 Styling & Design System (Tailwind CSS)` | `tailwind.config.js`, `postcss.config.js`, `globals.css` utility classes, dark theme setup | Frontend Developers |

## Document Entity Schema

### Tailwind CSS Tokens & Classes
- **Base Background**: `bg-slate-950` (`#020617`) with subtle ambient radial glow (`from-indigo-600/10` to `violet-600/10`).
- **Glassmorphic Card**: `.glass-card` (`bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-2xl`).
- **Glassmorphic Input**: `.glass-input` (`bg-slate-950/80 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500`).
- **Primary Action Button**: `.glass-button-primary` (`bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white`).
- **Status Badges**:
  - `ACTIVE`: `bg-emerald-500/10 text-emerald-400 border-emerald-500/20` with `animate-pulse` status dot.
  - `INACTIVE`: `bg-rose-500/10 text-rose-400 border-rose-500/20`.

### Spec Kit Command Lifecycle Sequence
1. `/speckit-constitution` — Establish project principles & coverage rules.
2. `/speckit-specify` — Define functional specs, user stories (P1/P2/P3), given-when-then criteria.
3. `/speckit-plan` — Design technical context, schemas, contracts, research.
4. `/speckit-tasks` — Generate dependency-ordered, testable task breakdown.
5. `/speckit-implement` — Execute implementation tasks phase-by-phase with unit tests.
6. `/speckit-converge` — Assess codebase against spec and tasks.
