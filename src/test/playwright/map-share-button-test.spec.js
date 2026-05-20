import { test, expect } from "@playwright/test";

test("Testing the basic Map feature, sharing spot button and", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // opening map page
  await page
    .getByRole("link", {
      name: "Country Map",
    })
    .click();

  await page
    .getByRole("button", {
      name: "Zoom in",
    })
    .click();

  // adding marker to map
  await page.locator("#map").click();

  // marker pop up
  await expect(page.getByText("Wildlife Spot marker added")).toBeVisible();
});

test("Testing sharing site button", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Manages alerting pop up window
  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toContain("Spot link copied successfully!");
  });

  // Pressing share button
  await page
    .getByRole("button", {
      name: "Share Wildlife Spot with friends!",
    })
    .click();
});
