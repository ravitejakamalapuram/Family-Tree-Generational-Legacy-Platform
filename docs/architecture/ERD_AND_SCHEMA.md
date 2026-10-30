# Data Model, ERD and Relational Constraints

**Workstream:** ARCH-002  
**Status:** Draft v0.1 — pending architecture review  
**Related:** DATA_MODEL.md, MODULE_BOUNDARIES.md, SECURITY_PRIVACY.md

## 1. Modeling principles

- PostgreSQL is the system of record.
- Use UUID primary keys for externally referenced records; UUIDs are not authorization.
- Family-scoped records carry family_id and are queried through authorized family context.
- Prefer explicit relational constraints over application-only assumptions.
- Preserve original evidence and revisions; do not overwrite conflicting historical assertions.
- Store temporal precision and original text, not just nullable timestamps.
- Use timestamptz for instants; use local date/time plus IANA timezone for civil events.
- Use jsonb only for bounded provider metadata or extensible non-core payloads, not core relationships/permissions/facts.
- Version all schema changes with forward migrations; no production auto-sync.

## 2. Logical ERD

Core relationships:
- User 1:N FamilyMembership; FamilySpace 1:N FamilyMembership and FamilyInvitation.
- Person 1:N FamilyPerson; FamilySpace 1:N FamilyPerson.
- FamilyPerson 1:N PersonName and PersonFact.
- PersonFact M:N Source through FactSource.
- FamilyPerson 1:N Relationship as both source and target; Relationship belongs to one FamilySpace.
- FamilySpace 1:N FamilyBranch; FamilyBranch M:N FamilyPerson.
- FamilySpace 1:N MediaAsset, Memory, Story, Event, Place, Contribution and Publication.
- Memory M:N FamilyPerson through MemoryTag.
- Contribution 1:N ReviewDecision.
- Event M:N FamilyPerson through EventParticipant.

## 3. Core entities and proposed columns

### Identity and family boundary

**users**
- id uuid PK
- email_normalized citext UNIQUE NOT NULL
- display_name text NOT NULL
- preferred_language varchar(35)
- status text constrained to active, suspended, deletion_pending, deleted
- created_at, updated_at timestamptz NOT NULL

**family_spaces**
- id uuid PK
- name text NOT NULL
- slug citext UNIQUE NOT NULL (public slug is not an authorization token)
- description text NULL
- default_language varchar(35) NOT NULL
- created_by_user_id uuid FK users
- privacy_mode text constrained to private, invite_only, public_presence; default private
- version integer NOT NULL DEFAULT 1
- timestamps

**family_memberships**
- id uuid PK
- family_id uuid NOT NULL FK family_spaces
- user_id uuid NOT NULL FK users
- role text constrained to owner, admin, branch_manager, contributor, reviewer, viewer
- status text constrained to invited, active, suspended, revoked
- branch_scope jsonb NULL (temporary proposal; normalize if query-critical)
- joined_at and timestamps
- UNIQUE(family_id,user_id)
- UNIQUE(family_id,id) for scoped foreign keys

**family_invitations**
- id uuid PK; family_id uuid NOT NULL; created_by_membership_id uuid NOT NULL
- email_normalized citext NOT NULL; role; optional branch scope
- token_hash bytea UNIQUE NOT NULL (never store raw invitation token)
- expires_at timestamptz NOT NULL; accepted_at; revoked_at
- composite FK (family_id, created_by_membership_id) to membership
- index (family_id, expires_at); unique active invitation policy to be finalized

### Person identity and family representation

**persons**
- id uuid PK
- created_at, updated_at
- Holds only global identity linkage/minimal identity data. Do not put family biography, privacy, family facts or public visibility here.
- No globally searchable public identity endpoint.

**family_people**
- id uuid PK
- family_id uuid NOT NULL FK family_spaces
- person_id uuid NOT NULL FK persons
- display_name text NOT NULL
- biography text NULL
- visibility text constrained to private, family, restricted; default private
- archived_at timestamptz NULL
- version integer NOT NULL DEFAULT 1
- timestamps
- UNIQUE(family_id,id) and UNIQUE(family_id,person_id) initially; revisit if one identity may intentionally have multiple representations in the same family.
- Index (family_id, display_name) and (family_id, archived_at)

**person_names**
- id uuid PK; family_id uuid NOT NULL; family_person_id uuid NOT NULL
- name text NOT NULL; name_type text; language_tag varchar(35); script text; is_primary boolean
- valid_from, valid_to date nullable; source_id nullable
- Composite FK (family_id,family_person_id) to family_people

### Facts and provenance

**sources**
- id uuid PK; family_id uuid NOT NULL
- source_type text; title text; creator text; publisher text; source_date date
- citation text; uri text NULL; notes text; created_by_membership_id uuid
- Composite membership FK ensures creator belongs to same family.

**person_facts**
- id uuid PK; family_id uuid NOT NULL; family_person_id uuid NOT NULL
- fact_type text NOT NULL; value_text text NULL; value_json jsonb NULL
- date_start date NULL; date_end date NULL
- date_precision constrained to exact_day, month, year, decade, range, unknown
- date_qualifier constrained to exact, about, before, after, between, unknown
- original_date_text text NULL; calendar_system text NULL
- assertion_status constrained to unverified, family_reported, supported, verified, disputed, rejected
- confidence numeric(4,3) NULL CHECK (confidence between 0 and 1)
- created_by_membership_id uuid; supersedes_fact_id uuid NULL
- version integer NOT NULL DEFAULT 1; timestamps
- Composite FK to family_people and membership; self-reference for supersession scoped to family.
- Competing assertions coexist; accepted/current representation is a derived selection, not destructive update.

**fact_sources**
- family_id uuid; fact_id uuid; source_id uuid; citation_detail text
- Composite primary key (family_id,fact_id,source_id)
- Composite FKs ensure fact and source share the family.

### Relationships

Relationship type codes initially include biological_parent, adoptive_parent, step_parent, guardian, other_parent, spouse and partner. Family-defined relationship types require controlled metadata, not arbitrary executable behavior.

**relationships**
- id uuid PK
- family_id uuid NOT NULL
- from_family_person_id uuid NOT NULL
- to_family_person_id uuid NOT NULL
- relationship_type text NOT NULL
- valid_from date NULL; valid_to date NULL
- status constrained to proposed, active, disputed, ended, rejected
- source_fact_id uuid NULL
- created_by_membership_id uuid NOT NULL
- version integer NOT NULL DEFAULT 1; timestamps
- Composite FKs (family_id,from_family_person_id) and (family_id,to_family_person_id) to family_people.
- CHECK(from_family_person_id <> to_family_person_id).
- Indexes (family_id,from_family_person_id,relationship_type) and (family_id,to_family_person_id,relationship_type).
- Unique active-edge strategy must account for temporal relationships and multiple legitimate partners; do not apply a simplistic unique pair constraint.
- Parentage cycle prevention requires transactional domain validation; a plain CHECK constraint cannot enforce recursive graph acyclicity.

### Branches

**family_branches**
- id uuid PK; family_id uuid NOT NULL; name text NOT NULL; description text
- root_family_person_id uuid NULL; manager_membership_id uuid NULL
- timestamps, version
- Composite FKs enforce same-family root and manager.

**family_branch_members**
- family_id uuid; branch_id uuid; family_person_id uuid
- PK (family_id,branch_id,family_person_id)
- Composite FKs enforce tenant scope.
- A person may belong to multiple custom branches.

### Media, memories and stories

**media_assets**
- id uuid PK; family_id uuid NOT NULL; uploaded_by_membership_id uuid NOT NULL
- object_key text UNIQUE NOT NULL; media_type text; mime_type text; byte_size bigint; checksum text
- original_filename text; captured_at timestamptz NULL; metadata jsonb
- scan_status text; lifecycle_status text; timestamps
- Never expose object_key as a public URL; serve through authorized short-lived access.

**memories**
- id uuid PK; family_id uuid NOT NULL; media_asset_id uuid NULL
- title text; description text; visibility text; status text; version integer; timestamps.
- Composite FK (family_id,media_asset_id) to media_assets.

**memory_tags**
- family_id, memory_id, family_person_id, tag_type
- Composite FKs ensure memory and person belong to same family.
- Additional tag targets (place/event) use typed association tables rather than polymorphic IDs without FKs.

**stories**
- id uuid PK; family_id uuid NOT NULL; title text; body text; language_tag varchar(35)
- status text; visibility text; version integer; timestamps.
- Story-person/place/event links use family-scoped join tables.
- Transcripts/translations are versioned child records and never overwrite original audio/text.

### Collaboration, audit and publication

**contributions**
- id uuid PK; family_id uuid NOT NULL; submitted_by_membership_id uuid NOT NULL
- target_type text; target_id uuid; operation text; proposal jsonb
- status constrained to pending, approved, rejected, changes_requested, withdrawn
- version integer; timestamps.
- Target validation is delegated to owning domain module; avoid relying on unconstrained polymorphic target as the only integrity mechanism.

**review_decisions**
- id uuid PK; family_id uuid NOT NULL; contribution_id uuid NOT NULL
- reviewer_membership_id uuid NOT NULL; decision text; comment text; created_at
- Composite FKs enforce family scope.

**audit_events**
- id uuid PK; family_id uuid NULL; actor_user_id uuid NULL; actor_membership_id uuid NULL
- action text; target_type text; target_id uuid; request_id uuid; metadata jsonb; created_at
- Append-only application permissions; exclude secrets and minimize copied sensitive payload.

**publications**
- id uuid PK; family_id uuid NOT NULL; created_by_membership_id uuid NOT NULL
- status constrained to draft, pending_review, published, revoked
- projection_version integer; published_at; revoked_at; timestamps.
- Published person/relationship/content projection rows are versioned and contain only approved fields.
- Public IDs are random non-sequential identifiers; public endpoints read projection tables only.

### Events, places and operations

**places**
- id uuid PK; family_id uuid NOT NULL; name text NOT NULL
- historical_names jsonb; latitude numeric NULL; longitude numeric NULL; precision text; visibility text
- Avoid exact private home coordinates in public projections.

**events**
- id uuid PK; family_id uuid NOT NULL; title text NOT NULL; event_type text
- starts_at timestamptz NULL; ends_at timestamptz NULL
- local_start timestamp NULL; local_end timestamp NULL; timezone_id text NULL
- date_precision text; place_id uuid NULL; visibility text; version integer
- Define whether all-day/historical events use local dates rather than instants.

**event_participants**
- family_id, event_id, family_person_id, participation_type
- Composite FKs enforce family scope.

**sessions**
- id uuid PK; user_id uuid NOT NULL; refresh_token_hash bytea; expires_at; revoked_at; device metadata; timestamps.
- Store hashes, rotate refresh tokens and revoke token families on reuse detection.

**export_jobs**
- id uuid PK; family_id uuid NOT NULL; requested_by_membership_id uuid NOT NULL
- format text; status text; progress integer; object_key text NULL; expires_at; timestamps.

## 4. Critical database constraints

1. Every family-owned row has a non-null family_id.
2. Composite FKs (family_id, child_id) enforce same-family links.
3. A relationship cannot connect a FamilyPerson from another family.
4. Family membership uniqueness prevents duplicate membership records.
5. Relationship self-edge is rejected.
6. Parentage cycle detection is transactional application logic, protected against concurrent writes using a family-scoped lock/serialization strategy.
7. Fact and source references cannot cross families.
8. Memory tags cannot reference people from another family.
9. Invitation token is stored only as a hash and expires/revokes.
10. Public projection rows contain only approved fields and are versioned.
11. Optimistic concurrency uses integer version or ETag; stale writes return conflict.
12. Audit records are append-only for application roles.

## 5. Tenant isolation and PostgreSQL RLS

Recommended defense-in-depth:
- All repository methods require an authorized FamilyContext.
- Every query explicitly scopes by family_id.
- Consider RLS policies as an additional barrier after validating the connection-pool model.
- Set tenant context transaction-locally inside a transaction; never rely on session-level state that can leak through pooled connections.
- App DB role must not own tables or have BYPASSRLS.
- Background jobs establish a verified family context before accessing tenant rows.
- Public projection tables have separate access policies/roles.

RLS must not replace application authorization or tests.

## 6. Index strategy

Initial indexes:
- family_memberships(user_id,status) and unique (family_id,user_id).
- family_people(family_id,display_name) and (family_id,person_id).
- person_facts(family_id,family_person_id,fact_type).
- relationships(family_id,from_family_person_id,relationship_type,status).
- relationships(family_id,to_family_person_id,relationship_type,status).
- memories(family_id,created_at); media_assets(family_id,created_at).
- events(family_id,starts_at).
- GIN/FTS indexes only after defining language-aware search behavior.
- Add partial indexes for active/pending states when query plans justify them.

## 7. Migration and deletion strategy

- Use versioned SQL migrations reviewed in PR.
- Migrations are forward-only in production; rollback is a tested compensating migration, not an assumption.
- Avoid destructive column changes in one deployment; use expand/migrate/contract.
- Never use ORM schema push/sync in production.
- Soft archive FamilyPerson while preserving relationship and memory references.
- Hard deletion requires policy evaluation, export/retention rules and shared identity analysis.
- Deleting a FamilySpace must not delete a Person identity still referenced by another FamilySpace.
- Backup and restore must include relational data and media object manifests/checksums.

## 8. Open decisions for review

1. Are global Person rows minimal opaque identity anchors, or should there be no cross-family global identity matching at all in v1? Discovery/matching must remain private.
2. Should family_people enforce one representation per global Person per family, or permit multiple contextual representations?
3. Use citext extension or normalized text for email/slug uniqueness?
4. Use PostgreSQL enums, check constraints or lookup tables for relationship/fact status codes?
5. Use PostGIS now or keep coordinates and precision metadata until place search needs spatial queries?
6. Which RLS policies and database roles are practical for the chosen ORM/pooler?
7. How to model fact values: typed tables per fact domain versus typed scalar columns plus validated JSON for less common facts?
8. What exact audit retention and account deletion obligations apply?

ARCH-002 remains draft until ERD, constraints, query patterns and migration strategy are reviewed and open decisions are recorded.
