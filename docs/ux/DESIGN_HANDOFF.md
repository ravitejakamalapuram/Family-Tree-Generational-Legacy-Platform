# Design-to-Engineering Handoff

**Workstream:** UX-004  
**Status:** Draft v0.3 — visual direction and product defaults approved; accessibility QA and full review/sign-off pending  
**Related:** DESIGN_SYSTEM.md, INFORMATION_ARCHITECTURE_AND_JOURNEYS.md, P0_SCREEN_SPECIFICATIONS.md, prototype/index.html

## 1. Handoff objective
Give frontend engineering a consistent, testable contract for implementing the first release experience. Handoff is incomplete until tokens, components, screens, interaction states and responsive behavior are reviewed together.

## 2. Component inventory
Foundation: semantic color/type/spacing/shape/elevation/motion tokens, breakpoints, icon and image treatment.

Navigation/layout: AppShell, WorkspaceSwitcher, DesktopSidebar, MobileBottomNavigation, TopBar, Breadcrumbs, PageHeader, ResponsiveContentContainer, ContextualAddSheet.

Data display: PersonAvatar, PersonCard, PersonTreeNode, RelationshipEdge/Badge, PrivacyIndicator, ProvenanceIndicator, FactRow, TimelineItem, MemoryCard, StoryCard, EventCard, MemberRow, ActivityItem.

Inputs/actions: Button variants, TextField/TextArea, Select/Combobox, DatePrecisionField, LanguageSelector, VisibilitySelector, SearchField, FileUploadDropzone, Dialog/Drawer/BottomSheet, Tabs/Accordion, Toast/InlineAlert, Skeleton/EmptyState/ErrorState.

## 3. Screen-to-component mapping

| Screen | Primary components |
|---|---|
| Landing/auth | MarketingHeader, Hero, AuthForm, LanguageSelector |
| Family onboarding | Stepper, FormSection, DatePrecisionField, VisibilitySelector |
| Dashboard | AppShell, PageHeader, TreePreview, EventCard, MemoryCard, ActivityItem |
| People directory | AppShell, SearchField, FilterBar, PersonCard/List, Pagination |
| Add/edit person | FormSection, PersonAvatar, DatePrecisionField, SourcePicker, VisibilitySelector |
| Person profile | ProfileHeader, Tabs, FactRow, TimelineItem, RelationshipSummary, MemoryCard |
| Family tree | TreeCanvas, PersonTreeNode, RelationshipEdge, TreeToolbar, SearchField, PersonInspector |
| Members | MemberRow, RoleBadge, InvitationForm, PermissionSummary, ConfirmDialog |
| Global Add | ContextualAddSheet, ActionList, ContextBadge |

## 4. Interaction contracts
- Every interactive component supports visible keyboard focus.
- Buttons distinguish loading/disabled states and prevent duplicate submission.
- Forms preserve values on recoverable server/network errors.
- DatePrecisionField never silently invents day/month precision.
- VisibilitySelector explains audience and warns before any public transition.
- PersonTreeNode exposes accessible name, focusability and pressed/selected state; Enter/Space activate selection. A semantic list alternative is included in prototype v0.2. Automated keyboard activation and axe WCAG scans pass in CI; full keyboard-only and screen-reader verification remains required.
- UploadDropzone supports keyboard file selection and reports progress/errors.
- Dialog/Drawer manages focus, escape behavior and unsaved changes.
- EmptyState offers one contextual action; toasts announce status without stealing focus.

## 5. State matrix
Each major screen/component must account for default, loading, empty, validation error, server error, permission denied, read-only, saving/success, concurrent update/conflict, offline/retry, destructive confirmation, mobile layout, keyboard and screen-reader behavior.

## 6. Asset guidance
- Use fictional placeholder identities and generated/appropriately licensed imagery in prototypes.
- Do not use real family photos or personal data in public design files.
- Portrait crops should be consistent but preserve original media in product storage.
- Icons need consistent semantics and labels/tooltips where meaning is not obvious.
- Illustrations must not imply a single lineage or fixed cultural structure.

## 7. Clickable prototype
Artifact: [prototype/index.html](prototype/index.html). It demonstrates representative navigation and interactions across dashboard, tree, people search, profile, add-person, onboarding, memories and members.

Run locally by opening the HTML file in a modern browser. No build/install step is required. The artifact uses inline CSS/JavaScript and fictional sample data. It has no network/API calls, authentication, persistence, server authorization, upload pipeline or production graph algorithm. Save/Continue interactions are intentionally non-persistent. It is not production frontend code and must not be used as the basis for domain or API behavior.

## 8. Required sign-off package
1. Approved DESIGN_SYSTEM.md tokens and component variants.
2. Approved INFORMATION_ARCHITECTURE_AND_JOURNEYS.md.
3. Reviewed P0_SCREEN_SPECIFICATIONS.md with desktop/mobile states.
4. Clickable prototype review, including tree edge cases.
5. Component inventory and screen mapping.
6. Accessibility, responsive and regional-script QA.
7. Open decisions resolved or explicitly deferred with owner/date.
8. Product and frontend sign-off recorded in issue #57.

## 9. Frontend implementation guardrails
- FL-008 implements approved tokens/components and responsive shell; it must not invent a parallel design system.
- Keep genealogy domain data separate from XYFlow rendering nodes.
- Use server authorization as truth; UI permission checks are affordances only.
- Do not cache private family data across workspace switches without family-scoped query keys and cache clearing.
- Design screens around bounded API payloads and progressive graph expansion.
- Use accessible list/profile routes as fallback for complex tree canvas interactions.

UX-DEC-002–UX-DEC-006 are approved product defaults and should be reflected in implementation contracts. Automated browser QA now captures desktop/tablet/mobile/320px screenshots, checks horizontal overflow and exercises core navigation/tree/form interactions. Latest pass on current UX branch head: run #41180439258. UX-004 remains draft until all-screen visual review, full keyboard/screen-reader/regional-script QA and product/frontend sign-off are attached to issue #57. Product-default approval does not constitute engineering handoff approval.
