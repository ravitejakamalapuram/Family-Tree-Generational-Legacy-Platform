# P0 High-Fidelity Screen Specifications

**Workstream:** UX-003  
**Status:** Draft v0.3 — product defaults approved; screen-completeness and manual QA pending  
**Related:** INFORMATION_ARCHITECTURE_AND_JOURNEYS.md, DESIGN_SYSTEM.md, prototype/index.html

This document defines layout hierarchy, content, interaction and responsive behavior. All names and content are fictional. The prototype is a visual interaction aid, not an API-backed application.

## Shared application frame

### Desktop
- Left workspace sidebar: family mark/name, Home, Tree, People, Memories, Stories, Events, Places; role-aware Members, Activity and Settings.
- Top bar: breadcrumb/current section, family-scoped search, notifications, account menu.
- Main content: max-width content region; tree screen may use full canvas and inspector.
- Primary action in page header; contextual Add remains available.

### Mobile
- Top app bar: active family title and account/avatar.
- Bottom navigation: Home, Tree, Add, Memories, More.
- Add opens a contextual sheet in production; complex forms use full-screen pages.
- Tree opens in focused mode, with search and compact inspector.

## Screen specifications and prototype mapping

| Screen | Key experience | Prototype coverage |
|---|---|---|
| Landing/auth | Trust-led entry, sign-in and registration | Not implemented; remains specification-only |
| Create/join onboarding | Family name, language, first person, privacy, invite | Simplified family setup step |
| Family dashboard | Next action, tree preview, quick actions, recent people | Dashboard screen |
| People directory | Family-scoped search, list, add person | People screen with client-side search |
| Add/edit person | Name, date precision, relationship, biography, visibility | Add-person form |
| Person profile | Identity, facts, family, provenance and privacy | Profile screen |
| Interactive family tree | Select nodes, inspect person, navigate profile/add relative | Tree screen with illustrative SVG graph |
| Members/invitations | Roles, status, invite and permission context | Read-only members sample |
| Responsive navigation/global Add | Desktop sidebar and mobile bottom navigation | Responsive nav; Add opens add-person screen |

### Onboarding interaction
Production flow is Account → Family → optional first person (creator, another known person, or defer) → optional first relationship → Privacy → Invite. The creator is not assumed to be the genealogical root. Prototype v0.2 exposes a reduced Family/language step only. Unknown values are valid; do not create placeholder facts to force completion.

### Add/edit person interaction
- Display name is the only required field.
- Date precision options include Exact, About, Before, After, Between and Unknown.
- Relationship context is optional and family-scoped.
- Private-to-family is the default; public publishing is a separate explicit workflow and is not offered in the prototype. Living people/minors and sensitive attributes are excluded from public projection by default; required consent and second-review checks are enforced server-side.
- Duplicate suggestions are advisory only; never auto-merge.
- Prototype validation is local and does not save data.

### Person profile interaction
- Keep privacy separate from provenance and verification.
- Hide inaccessible tabs and facts in production; do not reveal private record existence.
- Prototype content is fictional and static.

### Family tree interaction
- Desktop: toolbar, graph canvas, selected-person inspector.
- Mobile: focused branch and list-based alternative are required in production.
- Unknown parent placeholders are not person records.
- Prototype graph is a small illustrative sample, not a genealogy layout engine.
- Required review cases remain: multiple partners, biological/adoptive parents, step-parent/guardian, unknown parents, half-siblings, blended families, disputed relationships, long names and five generations.

## Prototype acceptance checklist

- [x] A clickable prototype artifact exists for representative P0 journeys.
- [x] Fictional data only; private-by-default cues and provenance labels are represented.
- [x] Dashboard, tree selection, people search, profile, add-person and onboarding interactions are represented.
- [ ] All nine screens use the approved token/component system.
- [ ] Desktop, tablet and mobile visual QA completed.
- [ ] Each primary action maps to a reviewed P0 journey and API contract.
- [ ] Privacy, role and provenance states are validated with product/design.
- [ ] Tree edge cases and accessible list alternative are fully demonstrated.
- [ ] Keyboard-only and screen-reader reviews completed.
- [ ] Error, loading, conflict and permission states are demonstrated.
- [ ] Regional-script and long-name rendering reviewed.
- [ ] Product review of unresolved UX-001 questions is complete.

### Tree entry behavior\nRestore the last-focused person in the active family; otherwise use the configured tree focus; otherwise show a guided empty state. Never infer a root from age or family hierarchy.\n\n### Publication and visitor access\nPublishing is off by default. Owner/delegated Admin may approve deceased-person content; living-person, minor or sensitive disclosures require applicable subject/guardian consent and a second authorized reviewer. Authenticated Viewer access is governed by membership, role, branch and record visibility; public visitors receive only the allowlisted published projection. These are product rules, not a substitute for legal review or executable authorization tests.\n\n## Automated browser QA evidence\nA Playwright/axe CI workflow now captures desktop (1440px), tablet (768px), mobile (390px) and small-mobile (320px) screenshots; checks document horizontal overflow; exercises navigation, tree keyboard selection, semantic-list synchronization, non-persistent form feedback; and runs axe WCAG scans at desktop/mobile widths. Latest pass on the current UX branch head: [run #41180439258](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/actions/runs/41180439258). Screenshots are attached to the workflow run as the `prototype-browser-qa-screenshots` artifact. This is automated smoke/accessibility scanning, not manual screen-reader, all-screen or complex-family validation.\n\n## Prototype limitations
The artifact at [prototype/index.html](prototype/index.html) is static HTML/CSS/JavaScript. It has no backend, auth, persistence, authorization, API calls, media upload or production graph algorithm. “Save” and “Continue” are deliberately non-persistent. The artifact has automated viewport and axe smoke validation, but manual all-screen, complex-family, regional-script, keyboard-only and screen-reader validation remains open.

UX-003 remains draft until visual review, required edge-case/accessibility QA and product/design sign-off are recorded.


## Visual direction decision update — 2026-10-30
The product owner approved the warm-neutral/evergreen, calm editorial direction with a family-tree-centered dashboard hierarchy. This approval does not waive the responsive, accessibility, contrast, regional-script or edge-case acceptance criteria above. The tree screen must provide a semantic list alternative, and unknown relationship placeholders must remain visibly distinct from person records.
