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
  const viewports = [
    { name: "desktop", width: 1440, height: 1000 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "mobile", width: 390, height: 844 },
    { name: "small-mobile", width: 320, height: 740 }
  ];
  const screens = ["auth", "onboarding", "dashboard", "people", "add", "profile", "tree", "relationship", "members", "invite"];
  const openScreen = async id => {
    await page.goto(file);
    await page.evaluate(screenId => {
      document.querySelectorAll(".screen").forEach(node => node.classList.toggle("active", node.id === screenId));
      document.getElementById("crumb").textContent = screenId;
      document.getElementById("workspaceCrumb").textContent = screenId === "auth" ? "Kinfolk" : screenId === "invite" ? "Invitation" : "The Morgan family";
      document.body.classList.toggle("public-entry", screenId === "auth" || screenId === "invite");
    }, id);
  };

  // Capture every R1 screen at every target viewport and check for horizontal overflow.
  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    for (const screen of screens) {
      await openScreen(screen);
      const heading = await page.locator(`.screen#${screen} h1`).first().count();
      if (!heading) failures.push(`${screen}: missing primary page heading`);
      await page.screenshot({ path: `artifacts/prototype-qa/${screen}-${viewport.name}.png`, fullPage: true });
      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth
      }));
      if (overflow.scrollWidth > overflow.clientWidth + 1) {
        failures.push(`${screen} @ ${viewport.name}: horizontal overflow ${overflow.scrollWidth}px > ${overflow.clientWidth}px`);
      }
    }
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(file);

  // Primary navigation and person search.
  await page.getByRole("button", { name: /people/i }).first().click();
  if (!(await page.locator("#people").evaluate(el => el.classList.contains("active")))) failures.push("People navigation did not activate People screen.");
  await page.locator("#peopleSearch").fill("Nora");
  const noraRow = page.locator("#peopleList .personrow").nth(1);
  await noraRow.waitFor({ state: "visible" });
  if (!(await noraRow.innerText()).includes("Nora")) failures.push("People search did not retain the matching Nora row.");

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

  // Verify account, relationship and invitation actions clearly remain non-persistent.
  await openScreen("auth");
  if (await page.locator(".side").isVisible()) failures.push("Unauthenticated account entry shows authenticated family navigation.");
  if ((await page.locator("#workspaceCrumb").innerText()) !== "Kinfolk") failures.push("Public account entry exposes a family workspace label.");
  await page.locator("#registerPreview").click();
  if (!(await page.locator("#authStatus").innerText()).includes("no account was created")) failures.push("Account prototype does not disclose non-persistence.");
  await openScreen("relationship");
  await page.locator("#saveRelationship").click();
  if (!(await page.locator("#relationshipStatus").innerText()).includes("no relationship was created")) failures.push("Relationship prototype does not disclose non-persistence.");
  await openScreen("invite");
  if (await page.locator(".side").isVisible()) failures.push("Pre-validation invitation shows authenticated family navigation.");
  if ((await page.locator("#workspaceCrumb").innerText()) !== "Invitation") failures.push("Pre-validation invitation exposes a family workspace label.");
  if (await page.locator("#validatedInvite").isVisible()) failures.push("Invitation details were exposed before token validation.");
  if ((await page.locator("#invite").innerText()).includes("The Morgan family")) failures.push("Private family name was exposed before token validation.");
  await page.locator("#showValidatedInvite").click();
  if (!(await page.locator("#validatedInvite").isVisible())) failures.push("Validated invitation state did not open.");
  await page.locator("#acceptInvite").click();
  if (!(await page.locator("#acceptStatus").innerText()).includes("no membership was created")) failures.push("Invitation prototype does not disclose non-persistence.");

  // Automated WCAG scans on every R1 screen at desktop and mobile widths.
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    for (const screen of screens) {
      await openScreen(screen);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      for (const violation of results.violations) {
        failures.push(`axe ${screen} ${viewport.width}px [${violation.impact}] ${violation.id}: ${violation.help} (${violation.nodes.length} nodes)`);
        for (const node of violation.nodes) failures.push(`  target ${node.target.join(" ")} — ${node.failureSummary || "see axe details"}`);
      }
    }
  }
} finally {
  await browser.close();
}

if (failures.length) {
  console.error("Prototype browser QA failures:\n- " + failures.join("\n- "));
  process.exitCode = 1;
} else {
  console.log("Prototype browser QA passed: all R1 screens at desktop/tablet/mobile/320px, no horizontal overflow, key navigation/tree/form flows, and per-screen axe WCAG scans at desktop/mobile.");
}
