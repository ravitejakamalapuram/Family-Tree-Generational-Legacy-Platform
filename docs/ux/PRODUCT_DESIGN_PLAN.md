# Product Design Workstream — UX-001 to UX-004

**Status:** Visual direction approved by product owner; UX-001–UX-004 remain in progress pending detailed design validation and handoff. Clickable P0 prototype v0.2 and desktop/mobile review snapshots prepared.
**Owner:** Product/design workstream.
**Source inputs:** PROJECT_CHARTER, PRODUCT_REQUIREMENTS, USE_CASES, UX_SPECIFICATION.

## Objective
Turn the current UX specification into an implementation-ready product experience. The design workstream defines experience and interaction contracts; it does not implement production React components.

## Design principles
- Family history should feel like a warm, trusted archive—not an enterprise admin dashboard.
- The family tree is the signature experience, but the product must feel coherent across people, memories, stories, events, places and collaboration.
- Progressive disclosure: make common actions easy without overwhelming users with genealogical complexity.
- Preserve uncertainty and provenance in the interface; never make unknown facts look confirmed.
- Private-by-default visibility must be understandable at the moment content is created or shared.
- Design mobile-first for capture and contribution; provide a richer desktop canvas for tree exploration and family administration.
- Support long names, native scripts, mixed-language content, low bandwidth and accessible interaction.

## Approved visual direction — 2026-10-30
Product owner reviewed the desktop/mobile dashboard direction and asked the team to proceed. The approved direction is:
- Warm, neutral surfaces that make the product feel like a trusted family archive.
- Evergreen as the primary accent, with restrained supporting colors.
- A calm, editorial dashboard rather than a dense enterprise admin interface.
- Clear family-space context and navigation, with the family tree visibly central to the experience.
- Responsive behavior that adapts the same information hierarchy to mobile rather than shrinking the desktop layout.

This is approval of the visual direction, not final sign-off of every token, screen, interaction, accessibility requirement, or engineering handoff. Keep tokens provisional until contrast and regional-script checks pass.

## UX-001 — Information architecture and journeys
Deliver desktop/mobile sitemap, role-specific journeys, P0 flows, critical states and success criteria. Acceptance requires every P0 journey to be mapped and privacy/uncertainty behavior to be explicit.

## UX-002 — Visual direction and design system
Deliver reviewed color, typography, spacing, shape, elevation, motion and breakpoint tokens; reusable component states; responsive and accessibility rules. Visual direction is approved; token-level validation and regional font fallback checks remain open.

## UX-003 — High-fidelity P0 screens
Prioritize landing/auth, family onboarding, dashboard, people directory, add/edit person, person profile, family tree, member management and responsive navigation/global Add. Each screen needs desktop/mobile behavior, fictional examples, interactions, validation, permission and error states. The clickable prototype covers representative flows across these screens; it is not yet a complete nine-screen design QA pass. Version 0.2 adds a semantic list alternative for the family tree, explicit selection state, and keyboard activation (Enter/Space) on SVG person nodes.

## UX-004 — Design-to-engineering handoff
Deliver component/token inventory, screen mapping, interaction/state specifications, asset guidance, QA checklist, open decisions and explicit product/frontend sign-off.

## Product decisions for review
See `docs/ux/PRODUCT_DECISIONS.md` for proposed defaults UX-DEC-002–UX-DEC-006 covering first-person onboarding/root focus, tree entry, publication approval, Viewer/public visitor separation and design-system implementation choices. These are not accepted until product-owner approval.

## Design review gates
1. Product information architecture and P0 journeys approved.
2. Visual direction approved; token contrast, typography and regional-script checks completed.
3. High-fidelity P0 screens and responsive states approved.
4. Design handoff accepted by frontend and product owners.

## Clickable prototype v0.2
- Artifact: [prototype/index.html](prototype/index.html).
- Covers dashboard, tree selection/inspector, people search, person profile, add-person form, onboarding, memories and members.
- Includes responsive navigation, fictional sample identities, privacy/provenance labels and basic client-side interactions.
- Static HTML/CSS/JS only. No API, persistence, authentication, authorization, upload or production genealogy layout.
- Save-person and onboarding actions explicitly report that no data was saved/created.
- Browser-based visual review snapshots were prepared for desktop and mobile. They are review aids for the approved dashboard visual direction, not hosted screenshots or a complete capture of every interactive state.
- Product owner reviewed the visual direction and asked the team to proceed on 2026-10-30.
- Keyboard-only, screen-reader, regional-script, contrast and cross-browser QA remain outstanding. The semantic list alternative and keyboard tree selection are implemented but not yet accessibility-tested.

## Scope boundary
This workstream does not implement production React components. FL-008 remains the engineering implementation of the approved design system and responsive application shell. The prototype is a disposable design-validation artifact, not an application foundation or production code. The overall Phase 0 engineering gate remains open until UX handoff and backend architecture are reviewed and explicitly approved.


## Automated validation
A GitHub Actions workflow at `.github/workflows/prototype-validation.yml` extracts inline JavaScript from the prototype and runs `node --check`. The workflow has been committed; its first run is pending. This does not replace browser, responsive, keyboard or screen-reader QA.
