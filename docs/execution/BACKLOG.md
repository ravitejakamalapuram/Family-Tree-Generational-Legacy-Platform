# Master Engineering Backlog

All tasks start **Not Started**. IDs are stable. Never mark Done without evidence.

## Pre-implementation design workstreams (mandatory gate)
These workstreams are tracked separately from the stable FL implementation backlog. Complete them before FL-001/FL-002/FL-003/FL-008 implementation.
- UX-001–UX-004: information architecture/journeys, visual direction/design system, high-fidelity P0 screens, engineering handoff. See [Product Design Plan](../ux/PRODUCT_DESIGN_PLAN.md) and GitHub issues #54–#57.
- ARCH-001–ARCH-005: domain/module architecture, ERD/constraints/migrations, P0 OpenAPI, security/threat model, runtime/operations. See [Backend Architecture Plan](../architecture/BACKEND_ARCHITECTURE_PLAN.md) and GitHub issues #58–#62.

FL-008 is implementation of the approved design system and responsive shell; it is not a substitute for the UX design workstream.

## Epic 01 — Foundation (P0)
| ID | Task | Acceptance |
|---|---|---|
| FL-001 | Initialize frontend | React/TS/routing/lint/format |
| FL-002 | Initialize backend | Modular API/validation/errors |
| FL-003 | PostgreSQL | Migrations/indexes/pooling |
| FL-004 | Environments | Local/test/stage/prod |
| FL-005 | CI/CD | Lint/typecheck/tests/build |
| FL-006 | Logging | Structured logs/request IDs |
| FL-007 | Monitoring | FE/BE errors |
| FL-008 | Design system | Tokens/components/responsive shell |

## Epic 02 — Auth/family (P0)
| ID | Task | Acceptance |
|---|---|---|
| FL-009 | Registration | Create/verify |
| FL-010 | Login/session | Secure lifecycle |
| FL-011 | User profile | Name/language/settings |
| FL-012 | Create family | Owner membership |
| FL-013 | Join family | Invitation acceptance |
| FL-014 | Multiple families | One user many spaces |
| FL-015 | Family switch | No second account |
| FL-016 | Roles | Backend enforced |

## Epic 03 — Identity/people (P0)
| ID | Task | Acceptance |
|---|---|---|
| FL-017 | Global Person | Identity independent |
| FL-018 | FamilyPerson | Shared Person represented in multiple families |
| FL-019 | Add person | Basic/historical fields |
| FL-020 | Edit person | Safe partial update |
| FL-021 | Alternative names | Regional/historical |
| FL-022 | Historical dates | Exact/approximate/unknown |
| FL-023 | Profile | Overview/family |
| FL-024 | Directory | Search/pagination |
| FL-025 | Archive person | Preserve refs |
| FL-026 | Duplicate detection | Suggest; no auto-merge |

## Epic 04 — Relationship/tree (P0)
| ID | Task | Acceptance |
|---|---|---|
| FL-027 | Relationship model | Parent/partner/adoption/guardian |
| FL-028 | Add parent | Graph/permission validation |
| FL-029 | Add partner | Multiple, dated |
| FL-030 | Add child | Multiple parents |
| FL-031 | Remove relationship | Audit retained |
| FL-032 | Ancestor API | Bounded |
| FL-033 | Descendant API | Bounded |
| FL-034 | Tree UI | Custom graph |
| FL-035 | Navigation | Pan/zoom/expand |
| FL-036 | Search | Find/focus |
| FL-037 | Branch filters | Filter |
| FL-038 | Relationship calculator | Explain paths |
| FL-039 | Performance | Benchmark 5,000+ nodes |

## Epic 05 — Legacy Vault (P0/P1)
| ID | Task | Acceptance |
|---|---|---|
| FL-040 | Object storage | Secure private store |
| FL-041 | Signed upload | Validated URL |
| FL-042 | Media metadata | Description/date/place |
| FL-043 | Person tags | Multiple people |
| FL-044 | Gallery | Albums/filters |
| FL-045 | Video | Secure playback |
| FL-046 | Documents | Secure preview |
| FL-047 | Stories | Create/edit |
| FL-048 | Audio | Browser recording |
| FL-049 | Media permissions | Enforced |
| FL-050 | Collections | Group memories |

## Epic 06 — Collaboration (P1)
| ID | Task | Acceptance |
|---|---|---|
| FL-051 | Invitations | Create/accept/expire/revoke |
| FL-052 | Contributions | Submit proposals |
| FL-053 | Approvals | Approve/reject |
| FL-054 | Audit | Actor/change history |
| FL-055 | Activity | Permission-filtered |
| FL-056 | Branch managers | Scoped roles |
| FL-057 | Member removal | Safe revocation |

## Epic 07 — Events/places (P1)
| ID | Task | Acceptance |
|---|---|---|
| FL-058 | Events | CRUD |
| FL-059 | Participants | Link people |
| FL-060 | Calendar | Month/week/list |
| FL-061 | Recurrence | Timezone-correct |
| FL-062 | Reminders | Preferences |
| FL-063 | Places | Place records |
| FL-064 | Migration map | Plot movements |

## Epic 08 — Multilingual (P1)
| ID | Task | Acceptance |
|---|---|---|
| FL-065 | i18n | Namespaces |
| FL-066 | Telugu | Complete UI |
| FL-067 | Tamil | Complete UI |
| FL-068 | Kannada | Complete UI |
| FL-069 | Hindi | Complete UI |
| FL-070 | Native names | Store/search |
| FL-071 | Localized dates | Locale display |

## Epic 09 — Public pages (P1; security-sensitive)
| ID | Task | Acceptance |
|---|---|---|
| FL-072 | Public settings | Explicit presence |
| FL-073 | Publication | Approval |
| FL-074 | Public profiles | Published fields |
| FL-075 | Public tree | Authorized nodes/edges |
| FL-076 | Public stories | Approved only |
| FL-077 | Unpublish | Revoke |
| FL-078 | Privacy tests | Automated leakage tests |

## Epic 10 — AI (P2)
| ID | Task | Acceptance |
|---|---|---|
| FL-079 | Provider abstraction | Independent interface |
| FL-080 | Authorized retrieval | Accessible records only |
| FL-081 | Q&A | Source-linked |
| FL-082 | Relationship explanation | Graph powered |
| FL-083 | Biography | Sourced draft |
| FL-084 | Transcription | Original retained |
| FL-085 | Translation | Original preserved |
| FL-086 | Photo suggestions | Human confirmation |
| FL-087 | Missing data | No assertions |

## Epic 11 — Preservation (P2)
| ID | Task | Acceptance |
|---|---|---|
| FL-088 | GEDCOM import | Validated |
| FL-089 | GEDCOM export | Supported data |
| FL-090 | Complete archive | Metadata/media |
| FL-091 | Family book | PDF |
| FL-092 | Succession | Ownership transfer |
| FL-093 | Backups | Scheduled DB/media |
| FL-094 | Recovery | Restore verified |
| FL-095 | Deletion | Secure lifecycle |

## Epic 12 — Production readiness
| ID | Task | Acceptance |
|---|---|---|
| FL-096 | API integration tests | Critical flows |
| FL-097 | Authorization tests | Cross-family blocked |
| FL-098 | Graph integrity tests | Invalid edges |
| FL-099 | Performance tests | Large graph |
| FL-100 | Accessibility | Keyboard/screen reader |
| FL-101 | Responsive QA | Mobile flows |
| FL-102 | Security review | Auth/media/privacy/API |
| FL-103 | Load test | Capacity measured |
| FL-104 | Production deploy | Verified release |

Each issue needs context, goal, acceptance criteria, dependencies, test expectations and docs. Keep IDs stable; update status only with evidence.
