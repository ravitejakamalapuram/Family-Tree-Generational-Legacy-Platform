# Privacy and India Compliance Readiness

**Status:** Product/security requirements baseline; not legal advice or legal sign-off  
**Last reviewed:** 2026-11-02  
**Scope:** India-first family history platform with global access, living-person and minor records, private family collaboration, public publication and optional AI assistance.

## 1. Regulatory baseline to design against

India's Digital Personal Data Protection Act, 2023 and DPDP Rules, 2025 have a phased commencement schedule. The Rules were notified in November 2025. The commencement notification phases the principal processing obligations in sections 3–17 and Rules 3, 5–16, 22 and 23 to 18 months after Gazette publication (13 May 2027); Rule 4 has a one-year commencement (13 November 2026). Confirm exact applicability and any subsequent amendments/notifications with counsel immediately before launch.

Primary sources:
- MeitY official DPDP Rules 2025 and commencement documents: https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa
- Gazette text and phased commencement details: https://indiacode.ecourtsindia.com/rules/digital-personal-data-protection-dpdp-rules-2025-fe07b131/
- DPDP Act commencement notification (G.S.R. 843(E)): https://indiacode.ecourtsindia.com/rules/enforcement-timeline-for-the-dpdp-act-e1be0965/

The framework is based on purpose limitation, notice/transparency, consent or other permitted grounds, data minimisation, accuracy, storage limitation, safeguards, accountability and data-principal rights. The product must be designed for these requirements now rather than treating May 2027 as a future retrofit.

## 2. Product privacy defaults

1. Family spaces and all records are private by default. Public publishing is a separate opt-in workflow.
2. A family member's permission to edit a shared tree is not automatically consent from every living person whose data appears in it.
3. Store only facts needed for an explicit family-history purpose. Avoid collecting government identifiers, precise addresses, contact details, financial/health information or other sensitive material by default.
4. Living people and minors are excluded from public projections by default. Publication must evaluate facts about living relatives embedded in deceased-person stories as well.
5. Record the source, contributor, confidence/qualifier, visibility and revision history for facts. Allow correction and dispute without erasing provenance.
6. AI use is off by default for private family content until provider terms, purpose notices, transfer, retention and consent controls are approved. AI outputs remain drafts and must never silently change authoritative facts.
7. Never use family content to train or improve third-party models unless a separately reviewed, explicit, informed opt-in is implemented and legally approved.

## 3. Child and guardian data

The DPDP Rules include a verifiable parental-consent requirement for processing children's personal data, subject to the Act's applicable exemptions. The detailed rule and related Act provisions are scheduled for phased commencement in May 2027. Design the capability before launch:
- Treat a person under 18 as a child for the India policy baseline unless counsel confirms a different applicable rule.
- Do not infer that a family administrator is a child's parent or lawful guardian.
- Provide a purpose-specific guardian authorization workflow, age/guardian verification proportionate to risk, expiry/revocation, and auditable evidence.
- Minimise verification data; prefer a verification result/reference over retaining identity documents.
- Support withdrawal, correction, restriction and deletion workflows, while preserving other family members' lawful records through a reviewed redaction/pseudonymisation policy.
- Keep child data private and excluded from public and AI processing by default.

No child-data processing should be enabled in production until counsel approves the applicable lawful basis, parental-verification design, notices, exemptions and retention approach.

## 4. Consent, notices and rights operations

Before production:
- Publish clear, standalone, purpose-specific notices that identify categories of personal data, each purpose, enabled services, rights and grievance channels.
- Keep consent granular by purpose: family collaboration, public publication, media sharing, transcription/translation and AI-assisted analysis must not be bundled.
- Make withdrawal no harder than giving consent; record version, timestamp, actor, purpose, scope and evidence.
- Provide data-principal request intake for access, correction, erasure, withdrawal, grievance and nomination/other rights as applicable.
- Establish identity verification, response ownership, SLA, escalation and audit trail.
- Define retention periods per data class and delete/anonymise when purpose ends unless retention is legally required.
- Distinguish account deletion, family-space deletion, a person's request concerning their data, and removal of a contributor's account. Shared family history requires a legally reviewed resolution process.

## 5. Security safeguards

Minimum release controls:
- TLS in transit and encryption at rest for database, backups and object storage; separately managed keys and rotation.
- Least-privilege runtime/migration/worker roles; PostgreSQL RLS as defense in depth plus application authorization.
- MFA for privileged family actions where feasible; secure sessions, CSRF, rate limiting and abuse detection.
- Private object storage, short-lived signed URLs, upload type/size/signature validation, malware scanning, EXIF/location metadata minimisation and revocation.
- Immutable audit records for access-sensitive changes, role changes, consent, publication and exports; avoid logging raw personal content or secrets.
- Tested backups, restore drills, incident response, breach assessment/notification runbooks and vendor/subprocessor inventory.
- AI/search/export/background jobs must re-check current permissions and purpose at execution and delivery time.

## 6. Data location and external processors

Do not claim that the DPDP Act creates a blanket India-only data-localisation mandate. Section 16 allows the Central Government to restrict transfers to specified countries/territories, and other sectoral or contractual requirements may apply. Prefer an India primary region for database/object storage as an initial risk/latency posture, but select providers only after reviewing:
- region and backup locations, subprocessors and onward transfers;
- encryption/key ownership, access logs, deletion and backup expiry;
- incident/breach support and contractual timelines;
- AI model retention, training, abuse-monitoring, data residency and deletion terms;
- portability, exit/export and cost at realistic archive/media volumes.

No provider or AI vendor is selected by this document.

## 7. Release gates

| Gate | Required evidence | Owner |
|---|---|---|
| Before private beta | Privacy notice draft, data inventory, lawful-purpose map, role matrix, deletion/retention design, security threat review | Product + privacy counsel + engineering |
| Before any child records | Approved guardian/age verification and consent design, notices, exemptions and withdrawal handling | Privacy counsel + product |
| Before public pages | Explicit publication workflow, living/minor exclusion, consent evidence, second review, projection allowlist, revocation/cache/media tests | Product + security + counsel |
| Before AI features | Vendor DPA/terms, no-training/retention decision, purpose notice, opt-in, regional transfer review, permission-aware retrieval and deletion tests | Product + privacy counsel + security |
| Before production | RLS/IDOR/security test evidence, incident and breach runbooks, backup restore, data-principal request operations, vendor inventory and counsel sign-off | Engineering + security + operations + counsel |

## 8. Open legal/product questions (must be answered before the relevant release gate)

- Who is the Data Fiduciary: platform operator, family creator, or potentially different actors depending on purpose? Do not assume the answer.
- Which lawful grounds permit a member to add or maintain data about other living relatives who are not platform users?
- How are rights requests handled when a requested record is part of another person's family history or has multiple contributors?
- What is the legally acceptable evidence for parental/guardian authority and how long may it be retained?
- What are the applicable retention/deletion periods for each data class, including audit, backups, public projections and AI provider copies?
- What grievance channel and response process are required for the actual operating entity and launch markets?
- Are any sector-specific, cross-border, consumer-protection, intermediary or child-safety obligations applicable to chosen features?

Do not resolve these by engineering assumption. The product can build technical controls and configurable workflows, but legal counsel must determine the operating model and obligations.
