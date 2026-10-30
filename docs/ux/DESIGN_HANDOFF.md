# Design-to-Engineering Handoff

**Workstream:** UX-004  
**Status:** Draft v0.1 — pending final design review  
**Related:** DESIGN_SYSTEM.md, INFORMATION_ARCHITECTURE_AND_JOURNEYS.md, P0_SCREEN_SPECIFICATIONS.md

## 1. Handoff objective

Give frontend engineering a consistent, testable contract for implementing the first release experience. This handoff is not complete until tokens, components, screens, interaction states and responsive behavior are reviewed together.

## 2. Component inventory

### Foundation
- Color and semantic tokens.
- Typography and text styles.
- Spacing, sizing, radius, border, elevation and motion tokens.
- Breakpoints and responsive container rules.
- Icon sizing and illustration/photo treatment.

### Navigation and layout
- AppShell
- WorkspaceSwitcher
- DesktopSidebar
- MobileBottomNavigation
- TopBar
- Breadcrumbs
- PageHeader
- ResponsiveContentContainer
- ContextualAddSheet

### Data display
- PersonAvatar
- PersonCard
- PersonTreeNode
- RelationshipEdge/RelationshipBadge
- PrivacyIndicator
- ProvenanceIndicator
- FactRow
- TimelineItem
- MemoryCard
- StoryCard
- EventCard
- MemberRow
- ActivityItem

### Inputs and actions
- Button variants
- TextField/TextArea
- Select/Combobox
- DatePrecisionField
- LanguageSelector
- VisibilitySelector
- SearchField
- FileUploadDropzone
- Dialog/Drawer/BottomSheet
- Tabs/Accordion
- Toast/InlineAlert
- Skeleton/EmptyState/ErrorState

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
- PersonTreeNode exposes an accessible name and selection state; graph has a keyboard/list alternative.
- UploadDropzone supports keyboard file selection and reports progress/errors.
- Dialog/Drawer manages focus, escape behavior and unsaved changes.
- EmptyState offers one contextual action; no dead ends.
- Toasts announce status without stealing focus.

## 5. State matrix

Each major screen/component must account for:
- Default.
- Loading.
- Empty.
- Validation error.
- Server error.
- Permission denied.
- Read-only.
- Saving/success.
- Concurrent update/conflict.
- Offline/retry where relevant.
- Destructive confirmation.
- Narrow/mobile layout.
- Keyboard and screen-reader behavior.

## 6. Asset guidance

- Use fictional placeholder identities and generated/appropriately licensed imagery in prototypes.
- Do not use real family photos or personal data in public design files.
- Portrait crops should be consistent but preserve original media in product storage.
- Icons should be semantically consistent and accompanied by labels/tooltips where meaning is not obvious.
- Illustrations must not imply that every family has a single lineage, one mother/father pair or a fixed cultural structure.

## 7. Engineering handoff package

Required before UX-004 completion:
1. Approved DESIGN_SYSTEM.md tokens and component variants.
2. Approved INFORMATION_ARCHITECTURE_AND_JOURNEYS.md.
3. Reviewed P0_SCREEN_SPECIFICATIONS.md with desktop/mobile states.
4. Clickable prototype or equivalent reviewable screen artifact.
5. Component inventory and screen mapping.
6. Accessibility and responsive QA checklist.
7. Open design decisions resolved or explicitly deferred with owner/date.
8. Product and frontend sign-off recorded in issue #57.

## 8. Frontend implementation guardrails

- FL-008 implements approved tokens/components and responsive shell; it must not invent a parallel design system.
- Keep genealogy domain data separate from XYFlow rendering nodes.
- Use server authorization as truth; UI permission checks are affordances only.
- Do not cache private family data across workspace switches without family-scoped query keys and cache clearing.
- Design screens around bounded API payloads and progressive graph expansion.
- Use accessible list/profile routes as fallback for complex tree canvas interactions.

UX-004 remains draft until a prototype/handoff review and sign-off are attached to issue #57.
