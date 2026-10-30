# UX Specification — Family Legacy

## Design direction
Warm editorial archive, not generic enterprise CRUD: warm off-white canvas, white cards, muted teal/forest accent, readable sans-serif, optional serif for stories, portrait-first person cards, clean generation lines. Responsive, keyboard accessible, clear empty states.

## Navigation
Workspace selector; Dashboard; Family Tree; People; Legacy Vault; Stories & Traditions; Events; Places; AI Historian; Members; Activity & Approvals; Settings. Mobile priorities: Home, Tree, Add, Memories, Profile.

## Screens

### UX-01 Landing
Promise: "Your family's story deserves to live forever." Explain tree, archive, collaboration, privacy, portability. CTAs create, join, explore public page.

### UX-02 Authentication
Sign up/login, verification, recovery, optional OIDC, language, secure invitation acceptance.

### UX-03 Onboarding
Create family, join invitation, or import. Create flow: name → description/origin → language → first known person → relationships → privacy → invite. Unknown values permitted.

### UX-04 Dashboard
Family name/cover; people/generation/branch counts; invitations; tree preview; milestones; new memories; activity; incomplete profiles; contribution suggestions; quick actions.

### UX-05 Interactive tree
Toolbar: search, zoom, fit, center, branch/generation filters, mode, visibility. Modes: full, ancestors, descendants, direct lineage, branch, relationship path. Person card: portrait, name, dates. Select opens profile; focus centers; pan/zoom; expand/collapse; contextual add parent/partner/child. Bounded graph responses and progressive expansion.

### UX-06 Person profile
Header: portrait/name/life dates/branch/access. Tabs: Overview, Family, Timeline, Memories, Stories, Documents, Places, Sources, Contributions. Show provenance/uncertainty. Multiple life-stage photos.

### UX-07 Add/edit person
Progressive sections: basic, names, birth/death, relationships, places, bio, media, privacy, sources. Approximate/unknown dates, regional scripts, duplicate suggestions. No auto-merge.

### UX-08 Legacy Vault
All/photos/video/audio/documents/stories/traditions/collections; filters by person/branch/year/event/place/type. Drag/drop, camera upload, resumable transfer.

### UX-09 Memory detail
Viewer, description, multiple tags, date/location/event, contributor, provenance, visibility, correction flow.

### UX-10 Stories/oral history
Record/upload, language, transcript, correction, optional translation, people/place links, review. Original audio/transcript retained.

### UX-11 Branches
Cards show branch/root/person count/generations/manager/activity. Custom grouping does not replace relationship edges.

### UX-12 Timeline
Chronological person/family events, filters, media cards, uncertain-date display.

### UX-13 Events/calendar
Month/week/list; personal/family events, participants, recurrence, invitations, RSVP, reminders, timezone-aware.

### UX-14 Places
Birthplaces, ancestral villages, residences, migration, events. Do not publish precise private addresses.

### UX-15 AI Historian
Question composer/prompts; answer with claim-level source references and limitations; links to records. Distinguish verified, family-reported, approximate, disputed, AI-drafted. No direct mutation of confirmed records.

### UX-16 Members
Directory, invitations, roles, branch permissions, status, revoke, succession.

### UX-17 Activity/approvals
Proposed edits/fact/relationship changes, source evidence, reviewer context, approve/reject/comment, audit.

### UX-18 Public pages
Public overview and explicitly selected tree/profiles/stories. No private directory or default living/minor exposure. Revoke/unpublish.

### UX-19 Settings
Family details, language, roles, privacy, publication, notifications, export, deletion, succession, audit.

## Principles
Make add person/memory/story/invite discoverable. Never force unknown facts. Separate entry from verification. Explain provenance. Confirm destructive actions. Clearly indicate publication. Support elders, mobile, slow networks, keyboard and regional scripts.
