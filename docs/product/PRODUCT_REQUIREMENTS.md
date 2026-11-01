# Product Requirements — Family Legacy

**Version:** 1.0 | **Date:** 2026-10-30

## Objective
A private, collaborative platform documenting ancestry, relationships, memories, events, places and history, preserving knowledge across generations.

## Modules

### Family spaces
Create/join multiple spaces; name, slug, description, cover, origin, language, privacy, owner, members, branches and publication settings. Independent roles, data and access. Family switching on one account.

### Identity and people
In v1, each FamilyPerson has its own opaque Person identity anchor (one-to-one); the same real-world person appearing in another family receives a separate anchor. Cross-family identity matching/linking is disabled. FamilyPerson stores family-specific name, biography, privacy and presentation. Support aliases/native scripts/nicknames/historical spellings; birth/death, occupation, education, achievements, languages, places, biography and multiple photos. Dates can be exact, approximate, before/after, ranges or unknown. Store provenance/confidence/verification. Suggest duplicates only within the active family; never auto-merge or reveal cross-family matches.

### Relationships
Biological/adoptive/step/guardian parentage; spouse/partner; sibling/half-sibling where explicit; family-defined links. Relationships are family-scoped and connect FamilyPerson records. Multiple partners and relationship periods. Derive inverse labels where possible. Support unknown parents. Detect invalid parentage cycles/conflicts. Multiple relationship paths allowed. Preserve provenance/history.

### Family tree
Full, ancestor, descendant, direct-lineage, branch and relationship-path modes; search/focus; zoom/pan/fit/expand/collapse; branch/generation filters; progressive loading; profile navigation. Layout understands generations, partners, multiple parents and blended families.

### Person profile
Tabs: Overview, Family, Timeline, Memories, Stories, Documents, Places, Sources, Contributions. Multiple life-stage photos, relationship summary, milestones, provenance/uncertainty and field access.

### Legacy Vault
Photos/video/audio/documents/stories/traditions/recipes/achievements/heirlooms; collections; people/place/event/date tags; original media/metadata; private/family visibility; resumable upload; optional audio recording/transcription.

### Collaboration
Owner, Administrator, Branch Manager, Contributor, Reviewer, Viewer. Expiring/revocable invitations. Propose edits and relationship/fact changes. Approvals, audit, disputes/corrections, branch authority. Concurrency protection; no silent overwrite.

### Events
Birthdays, births, marriage, education, achievements, retirement, remembrance; reunions, festivals, gatherings, village visits, meetings. Participants, location, dates, recurrence, invitations, RSVP, reminders and media. Timezone-aware recurrence.

### Places
Birthplaces, ancestral villages, historic residences, migration paths and event locations; historical place names; do not publish precise home addresses by default.

### AI Family Historian
Authorized Q&A, deterministic relationship explanations, draft biographies/timelines from sourced facts, transcription/translation, story organization, photo-tag and missing-data suggestions. Claim-level sources/limitations. AI output stays draft until human confirmation. Preserve originals. No private-data model training without informed opt-in.

### Public pages
Explicit family public presence; selected people/facts/media/stories; published projection only; living people/minors private by default; unpublish/revoke; no automatic family-wide publication.

### Preservation
GEDCOM import/export; complete archive with metadata/media; family book/PDF; succession; backups/restoration; integrity checks; portability/deletion. Core export free.

## Journeys
Create: register → family → language/privacy → first person → relationships → generations → invite.
Add memory: select person/event/collection → upload/record → metadata/tags → visibility → review if required → preserve original.
Elder story: record → transcribe → correct → optionally translate → link people/places → review/publish.
Relationship: select two people → calculate paths → explain → explore.
Family history: select branch/period → select content → sourced draft → review → export.

## Quality
Tenant isolation; role/record authorization; responsive/accessibility; bounded graph queries; resumable media; search performance; audit/concurrency; backup/restore; export round-trip; localization/native-script search; AI provider independence.
