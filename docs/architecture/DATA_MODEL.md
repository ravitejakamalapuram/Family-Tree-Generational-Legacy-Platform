# Data Model and Domain Invariants

## Identity model
Person = underlying identity; FamilySpace = tenant; FamilyPerson = family-specific representation; Relationship = edge between two FamilyPerson records in one space. Person may have multiple FamilyPerson rows. Display name, biography, privacy and family facts can differ; do not synchronize automatically.

## Entities
User, FamilySpace, FamilyMembership, Person, FamilyPerson, PersonName, PersonFact, Relationship, Source, FactSource, Place, PersonPlace, FamilyBranch, Event, EventParticipant, MediaAsset, MemoryTag, Story, Document, Contribution, Approval, Notification, AuditLog, FamilySetting, Publication, ArchiveExport.

## Invariants
Relationships connect FamilyPerson records from the same family. Composite FKs enforce tenant boundary. No self-edge. Prevent duplicate active equivalent edges and parentage cycles. Do not impose one-parent/one-spouse model. Shared identity does not imply shared access. Hard deletion must account for other family representations. Identity merges are explicit/reviewed/audited.

## Relationship types
Directional parent_of with subtype biological/adoptive/step/guardian/other; spouse_of/partner_of with dates/status; explicit social/family-defined links. Derive inverse labels when possible.

## Dates
date_value; end_date_value; date_precision (day/month/year/decade/unknown); date_qualifier (exact/about/before/after/between); calendar_system; original_date_text. Never represent year-only as exact day.

## Provenance
Assertions retain creator/time/source/confidence/verification/revision. Competing assertions coexist. Review selects accepted representation without destroying evidence. Status: unverified, family_reported, supported, verified, disputed, rejected. Confidence is not verification.

## Privacy
Contextual private/family/explicit-public/restricted. Family setting does not publish every record. Public API reads published projection.

## Multilingual
BCP 47 tags; preserve original language; translations are separate records with source/target language, provider/reviewer/status. Never overwrite original. Search supports native scripts.

## Indexes
family_memberships(user_id,family_id,status); family_persons(family_id,person_id); relationships(family_id,from_person_id); relationships(family_id,to_person_id); events(family_id,start_at); media_assets(family_id,created_at); person_facts(family_person_id,fact_type); GIN/full-text as justified.

Use reviewed versioned migrations; no production schema auto-sync.
