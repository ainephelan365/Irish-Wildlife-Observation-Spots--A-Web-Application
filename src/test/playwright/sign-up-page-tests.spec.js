import { test, expect } from "@playwright/test";

test("User sign up", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Sign up" }).click();

  await page
    .getByRole("textbox", {
      name: "Enter first name",
    })
    .fill("James");

  await page
    .getByRole("textbox", {
      name: "Enter last name",
    })
    .fill("Bond");

  await page
    .getByRole("textbox", {
      name: "Enter email",
    })
    .fill("testbond007@gmail.com");

  await page
    .getByRole("textbox", {
      name: "Password",
    })
    .fill("password");

  await page
    .getByRole("button", {
      name: "Submit",
    })
    .click();
});
