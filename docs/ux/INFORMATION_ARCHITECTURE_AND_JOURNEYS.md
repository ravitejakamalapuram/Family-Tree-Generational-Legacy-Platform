# Information Architecture and P0 Journeys

**Workstream:** UX-001  
**Status:** Draft for product review  
**Version:** 0.1  
**Inputs:** PRODUCT_REQUIREMENTS.md, USE_CASES.md, UX_SPECIFICATION.md

## 1. Product structure

### Global / public surface
- Landing
- Sign up / sign in / account recovery
- Invitation acceptance
- Published family page (only when explicitly enabled)

### Authenticated application
Persistent global context:
- Active family selector
- Global search scoped to the active family by default
- Create/add action
- Notifications
- Account and language preferences

Primary navigation:
1. Home
2. Family Tree
3. People
4. Memories
5. Stories
6. Events
7. Places
8. Members
9. Activity & Approvals (role-aware)
10. Family Settings (role-aware)

AI Historian is a contextual capability within the family workspace and may later become a primary navigation item once its permission-aware experience is validated. Do not give it equal prominence before core data workflows work well.

Mobile navigation:
- Home
- Tree
- Add
- Memories
- Profile / More

The mobile Add action opens a task-oriented sheet: Add person, Add relationship, Upload memory, Record story, Create event, Invite member. Available actions depend on role and context.

## 2. Information hierarchy

### Home
- Family identity and active workspace
- Quick actions
- Tree snapshot / continue exploring
- Recent memories and stories
- Upcoming events and milestones
- Pending invitations and approvals (permission-aware)
- Recent activity (permission-filtered)
- Incomplete profiles / contribution prompts (non-invasive)

### Family Tree
- Modes: Full tree, Ancestors, Descendants, Direct lineage, Branch, Relationship path
- Search/focus
- Generation depth and branch filters
- Fit, zoom, pan, expand/collapse
- Selected person summary and contextual actions
- Tree data loads progressively; profile details are not embedded in the entire graph response

### People
- Search and filter
- Directory/list and optional visual cards
- Person profile
- Add/edit person
- Relationship editor
- Duplicate suggestions (review only; never automatic merge)

### Memories
- All media, albums/collections, filters
- Memory detail, tags, people, place, date/event, source and visibility
- Upload/replace/correct flows preserving original assets

### Stories
- Written stories, traditions, recipes and oral histories
- Record/upload audio
- Transcript correction and optional translation
- Link people, places and events
- Draft/review/publish states

### Events and Places
- Calendar/list and event detail
- Place directory/detail and related events/people
- Historical place names and approximate location support

### Members and governance
- Member directory and invitations
- Role/branch scope
- Contribution proposals and review queue
- Activity/audit view
- Family privacy/publication and export settings

## 3. Role-aware navigation and actions

| Capability | Owner | Admin | Branch manager | Contributor | Reviewer | Viewer |
|---|---|---|---|---|---|---|
| View permitted family records | Yes | Yes | Scoped | Yes | Yes | Yes |
| Add/edit own permitted draft | Yes | Yes | Scoped | Yes | As allowed | No |
| Invite/manage members | Yes | Yes | Scoped if delegated | No | No | No |
| Change family settings | Yes | Delegated | No | No | No | No |
| Review/approve proposals | Yes | Yes | Scoped | No | Yes | No |
| Publish/unpublish public content | Yes | Delegated | No by default | No | Review only | No |
| Export family archive | Yes | Delegated | No by default | No | No | No |

The backend remains authoritative. Hiding a navigation item is usability, not authorization.

## 4. P0 journeys

### J-01 — Register and create a family
1. User creates account and verifies email.
2. User chooses Create a family or Join by invitation.
3. Create flow collects family name and optional description/origin.
4. User chooses default family language.
5. Privacy is explained; default is private.
6. User adds the first known person, with unknown facts allowed.
7. User adds a first relationship or skips.
8. User lands on the family dashboard with a guided next action.

Success: a private FamilySpace exists, creator is owner, first FamilyPerson can be created without fabricated facts.

### J-02 — Join an existing family
1. User opens invitation link.
2. Authentication or registration occurs if needed.
3. Invitation validity and intended family are explained without exposing private data to an unauthorized session.
4. User accepts.
5. Membership is created with the assigned role.
6. User enters that family workspace.

Success: invitation is single-use/expiring/revocable; membership is scoped; no other family memberships are exposed.

### J-03 — Add a person
1. Start from global Add or a contextual tree action.
2. Select relationship intent when launched from a person (parent, partner, child, other).
3. Enter name; choose language/script and optional aliases.
4. Enter life dates using exact, approximate, before/after, range or unknown precision.
5. Add optional place, biography and source.
6. Review family visibility and save.
7. If a possible duplicate is detected, show explainable suggestions; user can review or continue creating a distinct person.

Success: Person and FamilyPerson are created correctly; family-specific details remain scoped; unknown facts are allowed; no automatic merge.

### J-04 — Add or correct a relationship
1. Select a person and choose Add relationship.
2. Choose relationship type and target person or create a new person.
3. Enter dates/qualifiers and source/evidence if known.
4. Show a preview of the resulting graph and any detected conflict/cycle.
5. Confirm and save.
6. If a correction affects historical data, create a revision/audit entry rather than silently overwriting.

Success: edge connects two FamilyPerson records in the same family; relationship type and provenance are retained; invalid graph changes are rejected clearly.

### J-05 — Explore family tree
1. Open tree from navigation or dashboard.
2. Initial bounded graph is centered on a configured root or last focused person.
3. Search for a person and focus the node.
4. Expand ancestors/descendants/branch progressively.
5. Select a node to open a compact summary; open full profile separately.
6. Switch tree mode or filter generations/branch.
7. On mobile, use a focused single-person/branch view with clear back navigation.

Success: no unbounded fetch; selected focus is preserved; multiple partners/parents and unknown branches remain understandable.

### J-06 — Upload a memory
1. Start from Memories or a person's profile.
2. Select file or capture from device.
3. Upload progress/retry is visible.
4. Add description, approximate date, place, event and people tags.
5. Select visibility; private/family defaults are explicit.
6. Save draft or submit for review according to role/policy.
7. Original media remains preserved.

Success: upload ownership, file validation and permissions are enforced; failed uploads can resume/retry; no accidental public exposure.

### J-07 — Record a family story
1. Start from Stories or contextual person profile.
2. Record/upload audio or enter text.
3. Choose source language.
4. If transcription is available, display it as a draft.
5. Contributor corrects transcript and links people/places/events.
6. Preserve original audio and transcript version.
7. Submit for review or keep private draft.

Success: AI output never silently becomes verified fact; source and correction history remain visible.

### J-08 — Invite a member and review a contribution
1. Authorized member sends an invitation with role and optional branch scope.
2. Invitee accepts via secure invitation flow.
3. Contributor proposes a fact or relationship change with source/context.
4. Reviewer sees before/after, evidence and impact.
5. Reviewer approves, rejects or requests clarification.
6. Decision and actor are audited.

Success: least privilege; branch scope is respected; no silent overwrite; decision history is retained.

## 5. Cross-cutting interaction states
Every P0 screen must define:
- Initial loading and skeleton behavior.
- Empty state with one clear next action.
- Validation and server error states.
- Network interruption/retry behavior where applicable.
- Permission denied and unavailable/deleted record states.
- Conflict/concurrent-edit state.
- Destructive confirmation and undo/recovery where safe.
- Privacy/visibility state and publication warning.
- Keyboard focus, touch targets and screen-reader labels.

## 6. Responsive behavior
- Desktop: persistent workspace navigation and broad tree canvas; inspector/profile panel may sit alongside graph.
- Tablet: collapsible navigation and reduced inspector width; graph remains pannable.
- Mobile: compact bottom navigation, contextual Add sheet, focused tree mode, full-screen edit forms, no dense multi-column data entry.
- Do not rely on hover for essential actions.
- Long regional names and native scripts must wrap without truncation that hides identity.

## 7. Product questions and proposed defaults

See [PRODUCT_DECISIONS.md](PRODUCT_DECISIONS.md) for UX-DEC-002–UX-DEC-006 proposals. Until approved, treat them as working assumptions only.
1. UX-DEC-002 proposes allowing the creator to add themselves, another person, or defer; never assume the creator is the genealogical root.
2. UX-DEC-003 proposes last-focused person, then configured focus, then a guided empty state.
3. UX-DEC-004 proposes Owner/delegated Admin publication, with second review and consent safeguards for living/minor/sensitive content.
4. UX-DEC-005 proposes member-authorized data for Viewers and allowlisted published projections only for public visitors.

These proposals require product-owner approval before UX-001 is marked complete or publication/access behavior is implemented.
