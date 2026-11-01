# Kinfolk R1 clickable prototype v0.3

Open `index.html` directly in a modern browser. No dependencies or build step are required.

## Included screens
- Account entry (public shell)
- Create-family onboarding
- Family dashboard
- People directory/search
- Add-person form
- Person profile
- Interactive family tree with semantic list alternative
- Relationship editor
- Member directory
- Invitation acceptance, with private family details withheld until the simulated post-validation state

Memories is a non-functional R2 concept preview only and is not an active R1 navigation item. First-person creation is optional; the creator may add themselves, add another known person or defer, and tree focus is configured separately.

## Limitations
This is a design-validation artifact with fictional data. It is not a production application: no API, real authentication, persistence, server-side authorization, media upload or production genealogy layout engine is included. Save/Continue actions are deliberately non-persistent.

## Validation
Playwright/Chromium captures all ten R1 prototype screens at desktop (1440px), tablet (768px), mobile (390px) and small-mobile (320px), checks horizontal overflow, exercises representative interactions and runs per-screen axe WCAG scans at desktop/mobile widths. Latest pass on the prior prototype content commit: [run #41339259200](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/actions/runs/41339259200). Screenshot artifact: [40 captures](https://github.com/ravitejakamalapuram/Family-Tree-Generational-Legacy-Platform/actions/runs/41339259200/artifacts/13096876295).

Manual keyboard-only, screen-reader, regional-script, complex-family and full contrast-matrix review remain required before release. See [P0 screen specifications](../P0_SCREEN_SPECIFICATIONS.md) and [design handoff](../DESIGN_HANDOFF.md).
