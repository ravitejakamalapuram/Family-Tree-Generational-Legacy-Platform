# Product Design Workstream — UX-001 to UX-004

**Status:** UX-001 draft produced; awaiting product review. UX-002–UX-004 remain planned.  
**Owner:** Product/design workstream.  
**Source inputs:** PROJECT_CHARTER, PRODUCT_REQUIREMENTS, USE_CASES, UX_SPECIFICATION.

## Objective
Turn the current UX specification into an implementation-ready product experience. The current UX specification is a useful screen inventory and direction, not a finished visual design system or approved set of interaction prototypes.

## Design principles
- Family history should feel like a warm, trusted archive—not an enterprise admin dashboard.
- The family tree is the signature experience, but the product must feel coherent across people, memories, stories, events, places and collaboration.
- Progressive disclosure: make common actions easy without overwhelming users with genealogical complexity.
- Preserve uncertainty and provenance in the interface; never make unknown facts look confirmed.
- Private-by-default visibility must be understandable at the moment content is created or shared.
- Design mobile-first for capture and contribution; provide a richer desktop canvas for tree exploration and family administration.
- Support long names, native scripts, mixed-language content, low bandwidth and accessible interaction.

## UX-001 — Product information architecture and journeys
Deliver:
- Sitemap and navigation hierarchy for desktop and mobile.
- End-to-end flows: sign-up, create/join family, onboarding, add first person, add parent/partner/child, tree exploration, invite, upload memory, record story, review contribution, privacy/publication.
- Role-specific journeys for owner, contributor, reviewer and viewer.
- Empty, loading, error, offline/slow-network, permission-denied and destructive-confirmation states.
- Critical task priority and success criteria.

Acceptance:
- Every P0 journey in PRODUCT_REQUIREMENTS has a documented flow.
- Navigation labels and active-family context are consistent.
- Unknown/approximate/disputed facts and privacy choices have explicit interaction behavior.
- Desktop and mobile behavior is specified.

## UX-002 — Visual direction and design system
Deliver:
- Moodboard/reference direction and visual principles.
- Color, typography, spacing, sizing, radius, elevation, border, motion and breakpoint tokens.
- Light theme initially; dark theme decision documented rather than assumed.
- Components: buttons, inputs, selects, date/uncertain-date control, dialogs, drawers, menus, tabs, cards, person cards, relationship badges, privacy indicators, timeline items, upload states, toasts, skeletons and empty states.
- Component states: default, hover, focus, active, disabled, loading, error, selected.
- Accessibility guidance: keyboard, visible focus, contrast, semantic labels, reduced motion and screen-reader behavior.
- Responsive rules and content density.

Acceptance:
- Tokens and components are implementation-ready and internally consistent.
- Components cover all high-frequency P0 journeys.
- Accessibility and responsive rules are explicit.
- Frontend implementation can consume the design tokens without inventing visual values.

## UX-003 — High-fidelity screen specifications
Prioritize the first release:
1. Landing / authentication.
2. Create or join family onboarding.
3. Family dashboard.
4. People directory and search.
5. Add/edit person and relationship editor.
6. Person profile.
7. Family tree: full, ancestor, descendant and focused branch modes.
8. Invite/member management.
9. Responsive navigation and global add action.

For each screen provide:
- Desktop and mobile layouts.
- Component inventory and hierarchy.
- Content examples using fictional people only.
- Interactions, validation, loading/empty/error states.
- Permission and privacy states.
- Keyboard and responsive behavior.

Acceptance:
- All screens map to documented journeys and product requirements.
- No screen implies access to data the active role cannot view.
- Tree layouts demonstrate multiple partners, multiple parent types, unknown parents and blended-family cases.

## UX-004 — Design-to-engineering handoff
Deliver:
- Component/token inventory and naming conventions.
- Screen-to-component mapping.
- Interaction/state specifications.
- Asset/icon guidance and image treatment.
- Design QA checklist and acceptance sign-off.
- Open questions and decisions logged.

Acceptance:
- FE can implement the approved P0 experience without guessing major layout, behavior or visual rules.
- Product and engineering explicitly approve the first implementation slice.

## Design review gates
1. Product information architecture and P0 journeys approved.
2. Visual direction and design tokens approved.
3. High-fidelity P0 screens and responsive states approved.
4. Design handoff accepted by frontend and product owners.

## Scope boundary
This workstream does not implement React components. FL-008 remains the engineering implementation of the approved design system and responsive application shell. UX-001–UX-004 define what FL-008 and the P0 screens should build.
