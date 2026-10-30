# Product Design Workstream — UX-001 to UX-004

**Status:** UX-001–UX-004 draft artifacts produced; clickable P0 prototype v0.1 and desktop/mobile review snapshots prepared; awaiting product/design review.  
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

## UX-001 — Information architecture and journeys
Deliver desktop/mobile sitemap, role-specific journeys, P0 flows, critical states and success criteria. Acceptance requires every P0 journey to be mapped and privacy/uncertainty behavior to be explicit.

## UX-002 — Visual direction and design system
Deliver reviewed color, typography, spacing, shape, elevation, motion and breakpoint tokens; reusable component states; responsive and accessibility rules. Tokens remain provisional until contrast and regional-script checks are completed.

## UX-003 — High-fidelity P0 screens
Prioritize landing/auth, family onboarding, dashboard, people directory, add/edit person, person profile, family tree, member management and responsive navigation/global Add. Each screen needs desktop/mobile behavior, fictional examples, interactions, validation, permission and error states. The first clickable prototype covers representative flows across these screens; it is not yet a complete nine-screen design QA pass.

## UX-004 — Design-to-engineering handoff
Deliver component/token inventory, screen mapping, interaction/state specifications, asset guidance, QA checklist, open decisions and explicit product/frontend sign-off.

## Design review gates
1. Product information architecture and P0 journeys approved.
2. Visual direction and design tokens approved.
3. High-fidelity P0 screens and responsive states approved.
4. Design handoff accepted by frontend and product owners.

## Clickable prototype v0.1
- Artifact: [prototype/index.html](prototype/index.html).
- Covers dashboard, tree selection/inspector, people search, person profile, add-person form, onboarding, memories and members.
- Includes responsive navigation, fictional sample identities, privacy/provenance labels and basic client-side interactions.
- Static HTML/CSS/JS only. No API, persistence, authentication, authorization, upload or production genealogy layout.
- Save-person and onboarding actions explicitly report that no data was saved/created.
- Browser-based visual review snapshots have been prepared for desktop and mobile. These are review aids for the intended dashboard visual direction, not hosted screenshots or a complete capture of every interactive state.
- Product owner review is pending. Capture approval/change requests before further visual iteration.
- Keyboard-only, screen-reader, regional-script, contrast and cross-browser QA remain outstanding.

## Scope boundary
This workstream does not implement production React components. FL-008 remains the engineering implementation of the approved design system and responsive application shell. The prototype is a disposable design-validation artifact, not an application foundation or production code. No engineering implementation gate has been passed.
