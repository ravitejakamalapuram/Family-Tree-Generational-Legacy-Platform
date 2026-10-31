# Visual Direction and Design System

**Workstream:** UX-002  
**Status:** Draft v0.2 — visual direction and implementation defaults approved; token QA pending  
**Related:** UX-001, UX-003, UX-004

## 1. Visual concept: a living family archive

The interface should feel like a contemporary family archive: warm, calm, trustworthy and human. It should not resemble a corporate CRM or genealogy spreadsheet.

- Warm paper-like neutral surfaces with restrained evergreen/teal accents.
- Portraits and archival photographs are prominent but never overwhelm names and relationships.
- Strong typographic hierarchy, generous whitespace and readable content density.
- Editorial treatment for stories and timelines; functional clarity for forms, permissions and administration.
- Relationship lines and graph nodes remain legible at multiple zoom levels.
- Color is a secondary signal; never rely on color alone for relationship type, privacy or status.

## 2. Proposed foundations

All values are provisional design tokens. The visual direction and semantic-token approach are approved; contrast, regional-script and component-state validation remain required before FL-008 implementation.

### Color tokens

| Token | Proposed value | Usage |
|---|---|---|
| canvas | #F7F6F2 | Main app background |
| surface | #FFFFFF | Cards, panels, dialogs |
| surface-muted | #F0F1EC | Secondary panels |
| ink | #202923 | Primary text |
| ink-muted | #657168 | Secondary text |
| line | #E1E5DE | Borders/dividers |
| brand | #285B4A | Primary actions, active navigation |
| brand-hover | #1F493B | Hover/pressed primary |
| brand-soft | #E8F0EB | Selected/soft brand surface |
| accent | #B9794B | Warm highlight, sparingly |
| success | #28734F | Success state |
| warning | #94651D | Warning state |
| danger | #B3433D | Destructive/error state |
| info | #386B8A | Informational state |

Use semantic aliases such as text-primary, border-subtle, action-primary and status-danger in components rather than raw palette values. Confirm WCAG AA contrast for actual text/background pairs before sign-off.

### Typography

Proposed stack:
- UI: system sans-serif baseline with tested native-script fallbacks; Inter may be preferred when available.
- Editorial/story accent: optional serif/system serif fallback, limited to selected story/legacy headings.
- Regional scripts: system font fallback with explicit testing for Telugu, Tamil, Kannada, Hindi and mixed-script names.

Type scale:
- Display: 32/40, weight 600 — landing/editorial hero only.
- H1: 28/36, weight 600.
- H2: 22/30, weight 600.
- H3: 18/26, weight 600.
- Body: 15/24, weight 400.
- Body compact: 14/20.
- Label: 13/18, weight 500.
- Caption: 12/16.

Avoid ultra-light weights and all-caps labels for long content. User-generated names must not be forced into uppercase or truncated without an accessible full value.

### Spacing, shape and elevation

Use a 4px base spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48 and 64px.

Shape:
- Small controls: 8px radius.
- Inputs/cards: 10–12px radius.
- Large panels/dialogs: 16px radius.
- Pills only for compact metadata/status, not every button.

Elevation:
- Default cards use border before shadow.
- Menus/popovers use subtle elevation.
- Dialogs use stronger separation with backdrop.
- Avoid layered shadows on every card.

### Breakpoints

| Name | Width | Behavior |
|---|---:|---|
| Small | 0–639px | Mobile navigation, single-column forms, focused tree |
| Medium | 640–1023px | Collapsible sidebar, adaptive two-column layouts |
| Large | 1024–1439px | Persistent workspace navigation, full tree canvas |
| Wide | 1440px+ | Wider tree canvas and optional inspector panel |

Use content-driven layout changes where possible; breakpoints are guidance, not rigid device categories.

## 3. Core components and behavior

### Navigation and workspace
- Workspace switcher always shows active family name and optional avatar/mark.
- Active navigation state uses shape/weight plus color.
- Mobile bottom navigation includes Home, Tree, Add, Memories, More.
- Add opens a contextual action sheet; unavailable actions are not shown.
- Never expose family/member names in a workspace switcher when the user lacks membership.

### Buttons
Variants: primary, secondary, tertiary/ghost, destructive. Sizes: compact, default, large. States: default, hover, focus-visible, pressed, disabled, loading.
- One primary action per modal/form section.
- Destructive actions are visually distinct and require confirmation.
- Loading buttons retain width and expose progress to assistive technology.

### Form controls
Text input, textarea, select/combobox, date precision input, language selector, checkbox, radio, switch and file picker.
- Labels remain visible; placeholders are examples, not labels.
- Inline validation explains how to fix the problem.
- Date entry supports exact, about, before, after, between and unknown; never coerce year-only input to a full date.
- Native-script input and long names must be tested.
- Privacy controls explain who can see content in plain language.

### Person card and relationship node
- Primary identity: display name; dates are secondary and precision-aware.
- Portrait/avatar fallback works without an image.
- Family branch and relationship badges are optional metadata.
- Privacy state is visible to authorized editors.
- Node selection and keyboard focus are visually distinct.
- Tree edge types use labels/line patterns as well as color.
- Multiple parents/partners and unknown branches must not overlap or become visually ambiguous.

### Privacy and provenance indicators
Use consistent text labels and icons: Private, Family, Restricted, Published, Draft, Family reported, Supported by source, Verified, Disputed and Approximate date.
Do not use a single green checkmark to imply historical certainty. Distinguish source presence from verification status.

### Dialogs, drawers and sheets
- Dialog for short confirmation or focused decisions.
- Drawer/side panel for person preview and filters on desktop.
- Full-screen sheet/page on mobile for complex editing.
- Escape closes only when no unsaved data would be lost; otherwise confirm discard.

### Feedback and loading
- Toasts for transient success/failure; persistent inline alerts for consequential problems.
- Skeletons only when layout is predictable.
- Empty states explain why the area is empty and provide one relevant action.
- Retryable network errors retain entered data.
- Upload progress includes pause/retry/failure state.

## 4. Family tree visual language

- Person nodes use consistent geometry and text hierarchy.
- Couple/partner groupings are distinct from parent-child edges.
- Relationship types remain distinguishable without relying only on color.
- Unknown parent placeholders are clearly marked as unknown, not as real people.
- Multiple-parent/blended-family cases must not be forced into a single biological lineage.
- At low zoom, collapse detail to readable identity markers; at high zoom, show dates and selected metadata.
- Selected person state persists while expanding a branch.
- Provide a non-canvas list/accessible alternative for navigating graph content.

## 5. Motion and interaction

- Use short, purposeful transitions for opening panels, selection and navigation.
- Avoid decorative parallax or continuous motion.
- Respect prefers-reduced-motion.
- Graph pan/zoom must not hijack keyboard focus or scroll unexpectedly.
- Drag interactions need keyboard/tap alternatives.

## 6. Accessibility requirements

Target WCAG 2.2 AA:
- Contrast for text and controls.
- Visible focus and logical focus order.
- Keyboard access to all actions.
- Semantic headings, labels, landmarks and status announcements.
- Touch targets sized for mobile use.
- Error summary and field-level association.
- Reduced motion support.
- Do not communicate status or relationship type by color alone.
- Provide accessible tree navigation beyond a canvas-only interaction.

## 7. Design QA checklist

- [ ] Contrast checked for token combinations.
- [ ] Telugu/Tamil/Kannada/Hindi mixed-script rendering reviewed.
- [ ] Long names and dates do not break cards/forms.
- [ ] Mobile layouts tested at narrow widths.
- [ ] Keyboard-only journey completed.
- [ ] Screen-reader labels and status updates checked.
- [ ] Reduced-motion mode checked.
- [ ] Privacy and provenance states are understandable.
- [ ] Family tree handles multiple parents/partners/unknown ancestors.
- [ ] Empty, loading, error, permission and conflict states specified.

## 8. Open decisions for review

1. Confirmed 2026-10-30: warm neutral + evergreen visual direction approved; continue validation rather than reopening visual-direction exploration.
2. Confirm Inter/system sans stack and whether a serif accent is needed.
3. Decide whether dark theme is explicitly out of initial release.
4. Confirm whether the design system will use Tailwind tokens only or a small CSS-variable token layer shared with tree styling.
5. Validate color contrast and regional font fallbacks with actual UI prototypes.

UX-002 visual direction is approved; the design system remains a draft until token contrast, regional-script fallback and the remaining design decisions are validated.
