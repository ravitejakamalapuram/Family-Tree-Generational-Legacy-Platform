# P0 High-Fidelity Screen Specifications

**Workstream:** UX-003  
**Status:** Draft v0.1 — pending visual review and prototype  
**Related:** INFORMATION_ARCHITECTURE_AND_JOURNEYS.md, DESIGN_SYSTEM.md

This document defines layout hierarchy, content, interaction and responsive behavior. It is a build specification, not a substitute for a clickable design prototype. All names and content below are fictional.

## Shared application frame

### Desktop (large)
- Left workspace sidebar: family mark/name, Home, Tree, People, Memories, Stories, Events, Places; role-aware Members, Activity and Settings near the bottom.
- Top bar: breadcrumb/current section, family-scoped search, notifications, account menu.
- Main content: max-width content region; tree screen may use full available canvas.
- Optional right inspector panel for selected person/tree context.
- Primary action appears in page header; contextual Add remains available.

### Mobile (small)
- Top app bar: active family title and account/avatar.
- Bottom navigation: Home, Tree, Add, Memories, More.
- Add opens a bottom sheet with actions.
- Complex forms use full-screen pages; no cramped modal forms.
- Tree opens in focused mode with search and a compact person inspector.

## Screen 01 — Landing and authentication

### Landing layout
1. Header: wordmark, language selector, Sign in.
2. Hero: “Your family’s story deserves to live forever.” Supporting copy about family tree, memories and private collaboration.
3. Primary CTA: Create your family. Secondary: Join a family.
4. Product preview: family tree illustration plus memory/story cards; fictional content only.
5. Trust section: private by default, source-aware history, portable family archive.
6. Footer: language, privacy, terms, help.

### Sign-in / registration
- Centered form on desktop; full-width on mobile.
- Sign-up fields: name, email, password, preferred language.
- Explain verification and account recovery.
- Do not disclose whether an email is registered through error messages.
- Password requirements visible before submission.

States: idle, submitting, validation error, generic authentication error, verification sent, rate limited.

## Screen 02 — Create or join family onboarding

### Desktop layout
- Progress rail: Account → Family → First person → First relationship → Privacy → Invite.
- Main form card with one task per step.
- Right-side explanation card: what this information is used for and privacy implications.

### Mobile layout
- Single-step form with progress indicator and Back/Continue.
- Avoid multi-column form fields.

### Steps
1. Choose Create family or Join invitation.
2. Create: family name (required), description and ancestral origin (optional).
3. Language: default family language, with later per-user preference.
4. First person: name required; allow user to choose self, known ancestor or another starting person. Do not force a living user to be root.
5. Dates: optional, with exact/about/before/after/between/unknown precision.
6. Privacy: private by default; plain-language explanation.
7. Invite: optional, can skip.

Empty/unknown values are valid. Do not create placeholder facts to force onboarding completion.

## Screen 03 — Family dashboard

### Desktop hierarchy
- Header: family name, family avatar/cover, member role and workspace switcher.
- Welcome card with one primary next action based on completion state.
- Main two-column grid:
  - Left: tree preview and “Explore family tree”.
  - Right: upcoming family events and invitations/approvals if permitted.
  - Lower row: recent memories/stories, recent activity, suggested profile improvements.
- Quick actions: Add person, Add memory, Record story, Invite member.

### Mobile hierarchy
- Family header.
- One primary next action.
- Compact tree preview.
- Upcoming event.
- Recent memories.
- Quick action sheet.

Do not show empty metrics such as “0 generations” as a failure state. Explain what can be added next. Activity is permission-filtered.

## Screen 04 — People directory

### Desktop
- Header: People, count only if count is authorized, Add person primary action.
- Search field with family-scoped placeholder.
- Filter row: branch, living/deceased/unknown where permitted, recently updated.
- Results list with portrait, display name, precision-aware life dates, branch label and privacy marker for editors.
- Pagination/infinite load with explicit end state.
- Empty state: explain that the family has no people yet; CTA Add first person.

### Mobile
- Search at top, filter sheet, compact person list, floating/contextual Add.
- Cards show name and dates without forcing horizontal scroll.

Search must not expose global Person identities or results from another family.

## Screen 05 — Add/edit person

### Desktop
- Page/drawer title: Add person or Edit person.
- Sections:
  1. Identity in this family: display name, native/alternate names.
  2. Life details: birth/death date precision, place, occupation (optional).
  3. Biography.
  4. Relationships: add parent/partner/child after initial save, or continue from contextual entry.
  5. Sources and evidence.
  6. Visibility.
- Sticky footer: Cancel, Save draft/Save person.

### Mobile
- Full-screen step/accordion form.
- Save action remains reachable without covering fields.
- Date precision selector opens a clear choice sheet.

### Interaction rules
- Required: display name only.
- Unknown is an acceptable value.
- Approximate dates show the qualifier in preview.
- Duplicate suggestions are advisory, explain why they appear, and offer “This is a different person”.
- No auto-merge.
- Before changing visibility to public, show what will be exposed and require explicit confirmation; public publishing may require a separate approval workflow.

## Screen 06 — Person profile

### Header
- Portrait, display name, precision-aware life dates.
- Branch/family context.
- Actions: Edit, Add relationship, Add memory, More.
- Visibility and verification/provenance indicators are distinct.

### Tabs
Overview, Family, Timeline, Memories, Stories, Documents, Places, Sources, Contributions. Hide tabs the user cannot access; do not reveal private record existence.

### Overview
- Biography.
- Key facts with source/verification labels.
- Immediate family preview.
- Recent memories.
- Timeline highlights.

On mobile, tabs become a horizontally scrollable or menu-driven section selector with accessible focus behavior.

## Screen 07 — Interactive family tree

### Desktop
- Full canvas with left toolbar/search, central graph, optional right inspector.
- Toolbar: mode, generation depth, branch filter, fit, zoom, reset.
- Nodes use consistent portrait/name/date hierarchy.
- Selected node opens inspector with profile summary and contextual Add relationship actions.
- Graph can progressively expand ancestors/descendants.
- Relationship type has label/pattern plus color.

### Mobile
- Focused person/branch view, not a miniature desktop graph.
- Search and current focus at top.
- Graph is pannable; expand ancestors/descendants controls remain reachable.
- Tap node to open bottom inspector; open full profile as a separate navigation action.
- Provide a list-based accessible alternative.

### Edge cases to prototype
- Multiple partners across time.
- Biological and adoptive parents.
- Step-parent/guardian relationships.
- Unknown parent placeholder.
- Half-siblings and blended families.
- Conflicting/disputed relationship with visible status.
- Long names and dense branches.
- Five generations at varying zoom levels.

Do not visually imply every edge is biological. Unknown placeholders are not real people and cannot be selected as profile records.

## Screen 08 — Members and invitations

### Desktop
- Header: Members, Invite member action.
- Table/list: name, email (only where authorized), role, branch scope, status, joined date, actions.
- Invitations tab: pending, expired, revoked.
- Role editor shows permission summary before save.
- Removal/revocation dialog explains access loss and ownership transfer constraints.

### Mobile
- Member cards with role/status.
- Invite flow in a full-screen sheet.
- Role changes use explicit confirmation.

Never show email addresses to roles that do not need them. Owner cannot accidentally remove the last active owner; succession/ownership transfer is a distinct flow.

## Screen 09 — Responsive navigation and global Add

### Desktop
- Persistent sidebar with clear active workspace.
- Search and notifications in top bar.
- Global Add button with actions filtered by role and current context.

### Mobile
- Bottom nav: Home, Tree, Add, Memories, More.
- More includes People, Stories, Events, Places, Members, Activity, Settings according to role.
- Add sheet: Person, Relationship, Memory, Story, Event, Invite.
- When opened from a person context, preselect that person but show the context clearly and allow changing it.

## Prototype acceptance checklist

- [ ] All nine screens use the same token/component system.
- [ ] Desktop, tablet and mobile states specified.
- [ ] Each primary action maps to a P0 journey and API contract.
- [ ] Privacy, role and provenance states are visible and understandable.
- [ ] No screen exposes cross-family data or implies unauthorized access.
- [ ] Family tree edge cases are represented with sample data.
- [ ] Keyboard and screen-reader behavior is defined.
- [ ] Error, empty, loading, conflict and permission states included.
- [ ] Product review of unresolved UX-001 questions is complete.

UX-003 remains draft until a clickable prototype or equivalent reviewed visual artifact exists and product/design sign-off is recorded.
