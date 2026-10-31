import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import fs from "node:fs";

const file = pathToFileURL(resolve("docs/ux/prototype/index.html")).href;
fs.mkdirSync("artifacts/prototype-qa", { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ reducedMotion: "reduce" });
const page = await context.newPage();
const failures = [];

try {
  for (const viewport of [
    { name: "desktop", width: 1440, height: 1000 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "mobile", width: 390, height: 844 },
    { name: "small-mobile", width: 320, height: 740 }
  ]) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(file);
    await page.screenshot({ path: `artifacts/prototype-qa/${viewport.name}.png`, fullPage: true });
    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth
    }));
    if (overflow.scrollWidth > overflow.clientWidth + 1) {
      failures.push(`${viewport.name}: horizontal overflow ${overflow.scrollWidth}px > ${overflow.clientWidth}px`);
    }
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(file);

  // Primary navigation and person search.
  await page.getByRole("button", { name: /people/i }).first().click();
  if (!(await page.locator("#people").evaluate(el => el.classList.contains("active")))) failures.push("People navigation did not activate People screen.");
  await page.locator("#peopleSearch").fill("Nora");
  if (!(await page.locator("#peopleList .personrow").filter({ hasText: "Nora" }).isVisible())) failures.push("People search hid the matching person.");

  // Tree keyboard selection and semantic list synchronization.
  await page.getByRole("button", { name: /family tree/i }).first().click();
  const node = page.locator(".tree-person").first();
  await node.focus();
  await page.keyboard.press("Enter");
  if ((await node.getAttribute("aria-pressed")) !== "true") failures.push("Enter did not select the focused tree node.");
  await page.locator("#listView").click();
  if (!(await page.locator("#treeList").isVisible())) failures.push("Semantic tree list did not open.");
  const listChoice = page.locator("[data-person-choice]").first();
  await listChoice.click();
  if ((await listChoice.getAttribute("aria-pressed")) !== "true") failures.push("Semantic list selection did not synchronize selected state.");

  // Add-person and onboarding actions must be clearly non-persistent.
  await page.locator('[data-screen="dashboard"]').first().click();
  await page.locator('[data-go="add"]').first().click();
  await page.locator("#fullName").fill("QA Example");
  await page.locator("#savePerson").click();
  if (!(await page.locator("#saveStatus").innerText()).includes("No data was sent or saved")) failures.push("Add-person prototype does not clearly disclose non-persistence.");
  await page.locator('[data-screen="dashboard"]').first().click();
  await page.locator('[data-go="onboarding"]').first().click();
  await page.locator("#continueOnboarding").click();
  if (!(await page.locator("#onboardStatus").innerText()).includes("No family space was created")) failures.push("Onboarding prototype does not clearly disclose non-persistence.");

  // Automated WCAG scan at desktop and mobile widths.
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    for (const violation of results.violations) {
      failures.push(`axe ${viewport.width}px [${violation.impact}] ${violation.id}: ${violation.help} (${violation.nodes.length} nodes)`);
      for (const node of violation.nodes) failures.push(`  target ${node.target.join(" ")} — ${node.failureSummary || "see axe details"}`);
    }
  }
} finally {
  await browser.close();
}

if (failures.length) {
  console.error("Prototype browser QA failures:\n- " + failures.join("\n- "));
  process.exitCode = 1;
} else {
  console.log("Prototype browser QA passed: desktop/tablet/mobile widths, no horizontal overflow, key navigation/tree/form flows, and automated WCAG scans.");
}
