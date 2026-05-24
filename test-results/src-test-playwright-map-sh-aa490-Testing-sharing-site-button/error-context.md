# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: src\test\playwright\map-share-button-test.spec.js >> Testing sharing site button
- Location: src\test\playwright\map-share-button-test.spec.js:50:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('text=Tory Hill')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation "main navigation" [ref=e3]:
    - navigation "main navigation" [ref=e5]:
      - generic [ref=e6]:
        - img [ref=e7]
        - text: Irish Wildlife Observation Spots
  - generic [ref=e9]:
    - link "Home" [ref=e10] [cursor=pointer]:
      - /url: /home
    - link "About" [ref=e11] [cursor=pointer]:
      - /url: /about
    - generic [ref=e13] [cursor=pointer]: More
  - generic [ref=e17]:
    - link "Log in" [ref=e18] [cursor=pointer]:
      - /url: /login
    - link "Sign up" [ref=e19] [cursor=pointer]:
      - /url: /signup
  - generic [ref=e20]:
    - heading "Sign up or Log in..." [level=1] [ref=e22]:
      - strong [ref=e23]: Sign up or Log in...
    - img [ref=e25]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("Testing the basic Map feature, sharing spot button and", async ({ page }) => {
  4  |   await page.goto("http://localhost:3000/");
  5  | 
  6  |   // Login authenticzation
  7  | 
  8  |   await page.getByRole("link", { name: "Log in" }).click();
  9  | 
  10 |   await page
  11 |     .getByRole("textbox", {
  12 |       name: "Enter email",
  13 |     })
  14 |     .fill("fairlyoddtest@gmail.com");
  15 | 
  16 |   await page
  17 |     .getByRole("textbox", {
  18 |       name: "Enter Password",
  19 |     })
  20 |     .fill("password");
  21 | 
  22 |   await page
  23 |     .getByRole("button", {
  24 |       name: "Submit",
  25 |     })
  26 |     .click();
  27 | 
  28 |   // opening map page
  29 |   await page
  30 |     .getByRole("link", {
  31 |       name: "Country Map",
  32 |     })
  33 |     .click();
  34 | 
  35 |   await page
  36 |     .getByRole("button", {
  37 |       name: "Zoom in",
  38 |     })
  39 |     .click();
  40 | 
  41 |   // adding marker to map
  42 |   await page.locator("#map").click();
  43 | 
  44 |   // marker pop up
  45 |   await expect(page.getByText("Wildlife Spot marker added")).toBeVisible();
  46 | });
  47 | 
  48 | // testing sharing button
  49 | 
  50 | test("Testing sharing site button", async ({ page }) => {
  51 |   await page.goto("http://localhost:3000/");
  52 | 
  53 |   // Login authenticzation
  54 | 
  55 |   await page.getByRole("link", { name: "Log in" }).click();
  56 | 
  57 |   await page
  58 |     .getByRole("textbox", {
  59 |       name: "Enter email",
  60 |     })
  61 |     .fill("fairlyoddtest@gmail.com");
  62 | 
  63 |   await page
  64 |     .getByRole("textbox", {
  65 |       name: "Enter Password",
  66 |     })
  67 |     .fill("password");
  68 | 
  69 |   await page
  70 |     .getByRole("button", {
  71 |       name: "Submit",
  72 |     })
  73 |     .click();
  74 | 
  75 |   // Manages alerting pop up window
  76 | 
> 77 |   await page.locator("text=Tory Hill").click();
     |                                        ^ Error: locator.click: Test timeout of 30000ms exceeded.
  78 | 
  79 |   page.once("dialog", async (dialog) => {
  80 |     expect(dialog.message()).toContain("Wildlife Spot Link:");
  81 |     await dialog.dismiss();
  82 |   });
  83 | 
  84 |   // Pressing share button
  85 |   await page
  86 |     .getByRole("button", {
  87 |       name: "Share Wildlife Spot with friends!",
  88 |     })
  89 |     .click();
  90 | });
  91 | 
```