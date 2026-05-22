import { test, expect } from "@playwright/test";

test("Testing the basic Map feature, sharing spot button and", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Login authenticzation

  await page.getByRole("link", { name: "Log in" }).click();

  await page
    .getByRole("textbox", {
      name: "Enter email",
    })
    .fill("fairlyoddtest@gmail.com");

  await page
    .getByRole("textbox", {
      name: "Enter Password",
    })
    .fill("password");

  await page
    .getByRole("button", {
      name: "Submit",
    })
    .click();

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

// testing sharing button

test("Testing sharing site button", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Login authenticzation

  await page.getByRole("link", { name: "Log in" }).click();

  await page
    .getByRole("textbox", {
      name: "Enter email",
    })
    .fill("fairlyoddtest@gmail.com");

  await page
    .getByRole("textbox", {
      name: "Enter Password",
    })
    .fill("password");

  await page
    .getByRole("button", {
      name: "Submit",
    })
    .click();

  // Manages alerting pop up window

  await page.locator("text=Tory Hill").click();

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toContain("Wildlife Spot Link:");
    await dialog.dismiss();
  });

  // Pressing share button
  await page
    .getByRole("button", {
      name: "Share Wildlife Spot with friends!",
    })
    .click();
});
