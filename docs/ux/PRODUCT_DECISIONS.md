# UX Product Decisions — Phase 0

**Status:** Accepted product defaults
**Approved:** 2026-10-31 by product owner
**Purpose:** Record cross-screen product behaviors that affect UX, permissions and API contracts.

## UX-DEC-002 — First person and family root

**Decision:** During family creation, let the creator choose whether to add themselves, another known person, or defer adding a person. Do not assume the creator is the genealogical root. A family space can exist temporarily without a person record. When a first person is added, the creator can designate a tree starting focus separately from the person's identity.

**Reasoning:** Family histories may begin with an elder, ancestor, couple or branch rather than the account owner. Forcing self-first creates inaccurate trees and can expose living-person data unnecessarily.

## UX-DEC-003 — Default tree entry

**Decision:** If the user has a last-focused person in the active family, restore that focus. Otherwise use the family's configured tree focus. If neither exists, show a guided empty state that asks the user to add a first known person or choose an existing one. Do not silently select the oldest person or infer a family root.

**Reasoning:** Preserves continuity without inventing genealogical hierarchy.

## UX-DEC-004 — Public publication approval

**Decision:** Public publishing is off by default and is a separate, explicit workflow. Publishing deceased-person content may be approved by an Owner or delegated Admin. Any publication that includes a living person, minor, contact detail, precise location or other sensitive attribute requires explicit subject/guardian consent where applicable and a second authorized reviewer. Living people and minors remain excluded from public projections by default.

**Reasoning:** Keeps public sharing deliberate and adds friction where disclosure can cause lasting harm. Legal/consent requirements must be reviewed before production; this product decision does not substitute for jurisdiction-specific legal review.

## UX-DEC-005 — Viewer versus public visitor

**Decision:** An authenticated Viewer sees only records permitted by family membership, role, branch scope and record visibility. An unauthenticated public visitor sees only the allowlisted, currently published projection. Public visitors do not receive membership lists, private family names/relationships, unpublished facts, private media URLs, internal IDs or hidden branches.

**Reasoning:** Family membership and public publication are separate access channels. Public pages must not become a shortcut into private family records.

## UX-DEC-006 — Design-system implementation defaults

**Decision:**
- Use system sans-serif as the reliable UI baseline with tested native-script fallbacks; retain Inter as an optional preferred face when available.
- Keep serif editorial styling limited to selected story/legacy headings; it is not required for the core application.
- Exclude dark theme from the initial release unless accessibility testing or user research identifies a compelling requirement.
- Maintain canonical CSS custom properties for semantic tokens and map them into Tailwind utilities if Tailwind is selected. Components must consume semantic aliases, not hard-coded palette values.

**Reasoning:** Reduces font-loading and regional-script risk, keeps the archive feel restrained, and provides one source of truth for visual tokens.

## Implementation and validation notes

These decisions are accepted product defaults. They authorize design and contract work to proceed; they do not constitute Phase 0 UX handoff sign-off, legal approval, security sign-off, or authorization to publish real personal data. Publication, consent, Viewer and public-projection rules require executable authorization tests and legal/privacy review before production release.
