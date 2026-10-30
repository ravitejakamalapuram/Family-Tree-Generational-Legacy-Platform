# UX Specification — Family Legacy

## Design direction
Warm editorial archive, not generic CRUD: warm off-white canvas, white cards, muted teal/forest accent, readable sans-serif, optional serif for stories, portrait-first person cards, clean generation lines. Responsive, keyboard accessible, clear empty states.

## Navigation
Workspace selector; Dashboard; Family Tree; People; Legacy Vault; Stories & Traditions; Events; Places; AI Historian; Members; Activity & Approvals; Settings. Mobile priorities: Home, Tree, Add, Memories, Profile.

## Screens
1. **Landing:** "Your family's story deserves to live forever." Explain tree, archive, collaboration, privacy, portability. CTAs create, join, explore public page.
2. **Authentication:** Sign up/login, verification, recovery, optional OIDC, language, secure invitation acceptance.
3. **Onboarding:** Create family, join invitation, or import. Create flow: name → description/origin → language → first known person → relationships → privacy → invite. Unknown values permitted.
4. **Dashboard:** Family name/cover; people/generation/branch counts; invitations; tree preview; milestones; new memories; activity; incomplete profiles; suggested contributions; quick actions.
5. **Interactive tree:** Search, zoom, fit, center, branch/generation filters, mode, visibility. Modes: full, ancestors, descendants, direct lineage, branch, relationship path. Select opens profile; focus centers; pan/zoom; expand/collapse; contextual add parent/partner/child. Bounded graph responses and progressive expansion.
6. **Person profile:** Header portrait/name/life dates/branch/access. Tabs Overview, Family, Timeline, Memories, Stories, Documents, Places, Sources, Contributions. Show provenance/uncertainty. Multiple life-stage photos.
7. **Add/edit person:** Progressive sections basic, names, birth/death, relationships, places, bio, media, privacy, sources. Approximate/unknown dates, regional scripts, duplicate suggestions. No auto-merge.
8. **Legacy Vault:** All/photos/video/audio/documents/stories/traditions/collections; filters by person/branch/year/event/place/type. Drag/drop, camera upload, resumable transfer.
9. **Memory detail:** Viewer, description, multiple tags, date/location/event, contributor, provenance, visibility, correction flow.
10. **Stories/oral history:** Record/upload, language, transcript, correction, optional translation, people/place links, review. Original audio/transcript retained.
11. **Branches:** Cards show branch/root/person count/generations/manager/activity. Custom grouping does not replace relationship edges.
12. **Timeline:** Chronological person/family events, filters, media cards, uncertain-date display.
13. **Events/calendar:** Month/week/list; personal/family events, participants, recurrence, invitations, RSVP, reminders, timezone-aware.
14. **Places:** Birthplaces, ancestral villages, residences, migration, events. Do not publish precise private addresses.
15. **AI Historian:** Question composer/prompts; answer with claim-level source references and limitations; distinguish verified, family-reported, approximate, disputed, AI-drafted. No direct mutation of confirmed records.
16. **Members:** Directory, invitations, roles, branch permissions, status, revoke, succession.
17. **Activity/approvals:** Proposed edits/fact/relationship changes, source evidence, reviewer context, approve/reject/comment, audit.
18. **Public pages:** Public overview and explicitly selected tree/profiles/stories. No private directory or default living/minor exposure. Revoke/unpublish.
19. **Settings:** Family details, language, roles, privacy, publication, notifications, export, deletion, succession, audit.

## Principles
Make add person/memory/story/invite discoverable. Never force unknown facts. Separate entry from verification. Explain provenance. Confirm destructive actions. Clearly indicate publication. Support elders, mobile, slow networks, keyboard and regional scripts.
