# Schema Constraint and Tenant-Policy Audit

**Status:** Design audit; migration implementation not yet complete  
**Date:** 2026-11-02  
**Authority:** ERD_AND_SCHEMA.md, ADR-0005, ADR-0007  
**Purpose:** Prevent a family-owned table or association from bypassing tenant isolation through a missing composite foreign key or RLS policy.

## 1. Invariants

1. Every family-owned row has a non-null `family_id` referencing `family_spaces(id)`.
2. Every relationship between two family-owned records uses a composite foreign key containing `family_id`.
3. Runtime tenant access requires an authorized FamilyContext established after membership, role, branch and record checks.
4. Every family-owned table enables and forces RLS; runtime role is neither table owner nor superuser and has no BYPASSRLS.
5. Tenant context is transaction-local and set inside the same transaction as protected queries.
6. Public reads use publication projections only; never grant public roles direct access to source tables.
7. Global `persons` rows are opaque v1 anchors, one-to-one with FamilyPerson; no cross-family reuse.

## 2. Family-owned table policy matrix

| Table | Required family scope | Required same-family references | RLS |
|---|---|---|---|
| family_spaces | id is tenant key | creator user is account-scoped; configured tree focus references family_people after table creation | id = current family |
| family_memberships | family_id | family/user unique; family-scoped membership keys | family_id |
| family_invitations | family_id | creator membership; invitation branch scopes | family_id |
| family_tree_preferences | family_id | membership and last-focused FamilyPerson | family_id |
| family_people | family_id | Person anchor unique globally; FamilySpace | family_id |
| person_names | family_id | FamilyPerson and optional Source | family_id |
| sources | family_id | creator membership | family_id |
| person_facts | family_id | FamilyPerson; creator/reviewer membership where recorded | family_id |
| fact_sources | family_id | PersonFact and Source | family_id |
| relationships | family_id | from/to FamilyPerson, source fact, creator membership | family_id |
| family_branches | family_id | root FamilyPerson and manager membership | family_id |
| family_membership_branch_scopes | family_id | membership and branch | family_id |
| family_invitation_branch_scopes | family_id | invitation and branch | family_id |
| family_branch_members | family_id | branch and FamilyPerson | family_id |
| media_assets | family_id | uploader membership; random object key | family_id |
| memories | family_id | media asset and creator membership | family_id |
| memory_tags | family_id | memory and FamilyPerson | family_id |
| stories | family_id | author membership and linked records | family_id |
| contributions | family_id | proposer membership; target validated by owning domain module | family_id |
| review_decisions | family_id | contribution and reviewer membership | family_id |
| audit_events | nullable family_id for account-level events | actor membership when family-scoped; polymorphic target must be authorized by owner module | family_id or account actor policy |
| publications | family_id | creator membership; projection rows reference publication/version | family_id |
| places | family_id | creator membership as applicable | family_id |
| events | family_id | place and creator membership | family_id |
| event_participants | family_id | event and FamilyPerson | family_id |
| export_jobs | family_id | requester membership | family_id |
| job_outbox | family_id | source aggregate must resolve within same family | family_id |

`sessions` are account-scoped (user_id) rather than family-scoped. `persons` are opaque identity anchors and contain no biography, facts, privacy or public fields; application code accesses them only through an authorized FamilyPerson operation. Any future table must be added to this matrix before migration.

## 3. Composite-FK requirements

- Use `UNIQUE(family_id,id)` on parent tables that are targets of composite references.
- FamilyPerson endpoints, fact/source associations, branch/membership scopes, media/memory tags, event/place/participant, invitation scopes, review/contribution and export requester references must include family_id in the FK.
- Avoid polymorphic target IDs as the only integrity mechanism. The owning module validates target type and family scope inside the same transaction; store a typed target FK when practical.
- Family-configured tree focus is a circular dependency: create family_spaces first, create family_people, then add the composite FK from family_spaces(id, configured_tree_focus_family_person_id) to family_people(family_id,id) using a later ALTER TABLE migration. Use a deferred constraint only if creation workflow needs it.
- Person anchor uniqueness is global `UNIQUE(person_id)`, not `UNIQUE(family_id,person_id)`.

## 4. RLS policy pattern

For each family-owned table:
- `ENABLE ROW LEVEL SECURITY` and `FORCE ROW LEVEL SECURITY`.
- `USING (family_id = NULLIF(current_setting('app.family_id', true), '')::uuid)`.
- `WITH CHECK` uses the same predicate.
- For family_spaces, compare `id` to the tenant setting.
- Runtime role has only required DML grants; migration role owns schema. Runtime role is not owner/superuser/BYPASSRLS.
- Public projection access uses a distinct policy/role and allowlisted projection tables only.
- Worker role establishes a verified family context and re-checks current authorization before work/delivery.

The setting is not an authentication mechanism. The application must authorize the requested family before setting context. Never derive tenant context directly from an untrusted path/body value.

## 5. Evidence and gaps

### Passed narrow proof
The disposable PostgreSQL/Prisma POC in PR #66 proves representative behavior for family_spaces, family_people, relationships and job_outbox:
- RLS fail-closed and two-family read/write isolation with non-owner/non-BYPASSRLS role.
- Prisma interactive transaction with transaction-local tenant context.
- Person anchor uniqueness and same-family relationship composite FKs.
- Transaction-scoped graph lock/cycle prevention.
- Transactional outbox rollback, dedupe and competing SKIP LOCKED worker claims.

### Still required before production
- Implement and test RLS policies for every row in the matrix.
- Migration tests for every composite FK and cross-family negative fixture.
- Verify family context does not leak through the selected production pooler.
- Add tests for branch/record visibility; RLS tenant scope is not sufficient for those permissions.
- Audit actor/target authorization and account-level event policy.
- Verify public projection role cannot query source tables.
- Verify worker/export/AI/search paths use the same tenant and permission policy.
- Test upgrade, rollback/compensating migrations and schema drift from a clean and prior-version database.

No POC result should be represented as proof that the full production schema is secure.
