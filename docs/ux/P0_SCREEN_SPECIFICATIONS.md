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

| R1 P0 screen | Key experience | Prototype coverage |
|---|---|---|
| Landing/auth | Trust-led entry, sign-in, registration, verification and recovery | Not implemented; specification-only |
| Create/join onboarding | Family name/language, optional first person, privacy and invitation entry | Simplified family setup step; invite acceptance not implemented |
| Family dashboard | Next action, tree preview, quick actions and recent people | Dashboard screen |
| People directory | Family-scoped search, list and add person | People screen with client-side search |
| Add/edit person | Name, date precision, relationship context, biography, visibility and provenance | Add-person form |
| Person profile | Identity, facts, family, provenance and privacy | Profile screen |
| Interactive family tree | Select nodes, inspect person, navigate profile and add relative | Tree screen with illustrative SVG graph |
| Relationship editor | Create/correct parent, partner, guardian/adoptive and other edges with evidence and conflict preview | Not implemented as a separate screen; add-person form only sketches relationship context |
| Members/invitations | Member roles/status, invite, accept and revoke context | Read-only members sample; invitation flows not implemented |

Memories and stories are R2 experiences. The prototype contains a static Memories concept screen for product direction only; it is not an R1 acceptance screen and must not be exposed as a working R1 feature.

### Onboarding interaction
Production flow is Account → Family → optional first person (creator, another known person, or defer) → optional first relationship → Privacy → Invite. The creator is not assumed to be the genealogical root. Prototype v0.2 exposes a reduced Family/language step only. Unknown values are valid; do not create placeholder facts to force completion.

### Landing/auth interaction
- Explain private-by-default family spaces and distinguish account creation from creating/joining a family.
- Registration, login, verification and recovery are separate states with non-enumerating error copy.
- Show password requirements and accessible validation; never expose session tokens.
- Invitation links resolve into an authenticated acceptance flow without revealing private family data before authorization.

### Relationship editor interaction
- Start from a selected FamilyPerson or an explicit Add relationship action.
- Select relationship category and direction; support multiple parents/partners, adoptive/step/guardian relationships and temporal validity.
- Show both people, the proposed edge, known dates/source and any detected conflict before save.
- Never silently convert relationship types or infer biological parentage.
- Concurrent graph conflicts return a recoverable conflict state and preserve the existing relationship.

### Members/invitations interaction
- Show role, status and branch scope only to authorized members.
- Invitation creation captures recipient, role and optional branch scope; explain the exact permission being granted.
- Acceptance confirms intended account/email, family name only after token validation, expiry and role.
- Revocation/removal explains impact and prevents removing/demoting the last Owner without a recovery path.

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
- [ ] All nine R1 screens use the approved token/component system.
- [ ] Desktop, tablet and mobile visual QA completed.
- [ ] Each primary action maps to a reviewed R1 journey and API contract.
- [ ] Privacy, role and provenance states are validated with product/design.
- [ ] Tree edge cases and accessible list alternative are fully demonstrated.
- [ ] Keyboard-only and screen-reader reviews completed.
- [ ] Error, loading, conflict and permission states are demonstrated.
- [ ] Regional-script and long-name rendering reviewed.
- [ ] Product review of unresolved UX-001 questions is complete.

### Tree entry behavior

Restore the last-focused person in the active family; otherwise use the configured tree focus; otherwise show a guided empty state. Never infer a root from age or family hierarchy.

### Publication and visitor access

Publishing is off by default. Owner/delegated Admin may approve deceased-person content; living-person, minor or sensitive disclosures require applicable subject/guardian consent and a second authorized reviewer. Child-data handling must additionally meet applicable verifiable parental-consent and age/guardian verification requirements before production use; see [Privacy and Compliance Readiness](../product/PRIVACY_AND_COMPLIANCE_READINESS.md). Authenticated Viewer access is governed by membership, role, branch and record visibility; public visitors receive only the allowlisted published projection. These are product rules, not a substitute for legal review or executable authorization tests.

## Automated browser QA evidence
A Playwright/axe CI workflow captures desktop (1440px), tablet (768px), mobile (390px) and small-mobile (320px) screenshots; checks document horizontal overflow; exercises navigation, tree keyboard selection, semantic-list synchronization and non-persistent form feedback; and runs axe WCAG scans at desktop/mobile widths. Latest pass on the current UX branch head: [run #41180439258](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/actions/runs/41180439258). Screenshots are attached to the workflow run as the `prototype-browser-qa-screenshots` artifact. This is automated smoke/accessibility scanning, not manual screen-reader, all-screen or complex-family validation.

## Prototype limitations
The artifact at [prototype/index.html](prototype/index.html) is static HTML/CSS/JavaScript. It has no backend, auth, persistence, authorization, API calls, media upload or production graph algorithm. “Save” and “Continue” are deliberately non-persistent. The artifact has automated viewport and axe smoke validation, but manual all-screen, complex-family, regional-script, keyboard-only and screen-reader validation remains open.

UX-003 remains draft until visual review, required edge-case/accessibility QA and product/design sign-off are recorded.


## Visual direction decision update — 2026-10-30
The product owner approved the warm-neutral/evergreen, calm editorial direction with a family-tree-centered dashboard hierarchy. This approval does not waive the responsive, accessibility, contrast, regional-script or edge-case acceptance criteria above. The tree screen must provide a semantic list alternative, and unknown relationship placeholders must remain visibly distinct from person records.
