# Research: Spec Kit Development Workflow Documentation

## Executive Summary
Research on best practices for documenting Spec-Driven Development workflows using GitHub Spec Kit commands in root repository `README.md` files.

---

## 1. Documentation Structure & Flowchart Visuals

### Decision
Use standard ASCII art diagrams combined with GitHub-Flavored Markdown headings and badges to visualize the Spec Kit lifecycle:
`Constitution` → `Specify` → `Plan` → `Tasks` → `Implement` → `Converge`.

### Rationale
- Plain ASCII art diagrams render reliably across all markdown viewers (GitHub, VS Code, Antigravity IDE, Gitlab, Bitbucket) without requiring external image assets or script dependencies.
- Clear step-by-step descriptions allow human developers and AI pair programmers to instantly know which command to execute next.

---

## 2. Command Pipeline Reference

| Phase | Command | Output Artifact | Purpose |
|-------|---------|-----------------|---------|
| Governance | `/speckit-constitution` | `.specify/memory/constitution.md` | Establish non-negotiable project rules & quality gates |
| Specification | `/speckit-specify` | `specs/<NNN-feature>/spec.md` | Create user stories, acceptance criteria & edge cases |
| Planning | `/speckit-plan` | `specs/<NNN-feature>/plan.md` | Create technical architecture, contracts & data models |
| Task Breakdown | `/speckit-tasks` | `specs/<NNN-feature>/tasks.md` | Generate dependency-ordered actionable task checklist |
| Execution | `/speckit-implement` | Source Code + Test Suites | Execute tasks, write tests, & verify coverage gates |
| Convergence | `/speckit-converge` | Audit Report | Compare codebase against spec and append remaining work |

---

## 3. Additional Quality Enhancements

- **/speckit-clarify**: De-risks ambiguous requirements before planning.
- **/speckit-analyze**: Validates consistency across spec, plan, and tasks.
- **/speckit-checklist**: Generates custom quality review checklists.
