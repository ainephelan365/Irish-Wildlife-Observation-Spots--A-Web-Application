# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: src\test\playwright\add-spot-test.spec.js >> Adding a wildlife Observation spot, sighting and a review
- Location: src\test\playwright\add-spot-test.spec.js:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByPlaceholder('Enter the Observation Spot')

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
  3  | test("Adding a wildlife Observation spot, sighting and a review", async ({ page }) => {
  4  |   await page.goto("http://localhost:3000/");
  5  | 
  6  |   await page.getByRole("link", { name: "Log In" }).click();
  7  | 
  8  |   await page
  9  |     .getByRole("textbox", {
  10 |       name: "Enter email",
  11 |     })
  12 |     .fill("fairlyoddtest@gmail.com");
  13 | 
  14 |   await page
  15 |     .getByRole("textbox", {
  16 |       name: "Enter Password",
  17 |     })
  18 |     .fill("password");
  19 | 
  20 |   await page
  21 |     .getByRole("button", {
  22 |       name: "Submit",
  23 |     })
  24 |     .click();
  25 | 
  26 |   // Adding Observation Spot
  27 | 
> 28 |   await page.getByPlaceholder("Enter the Observation Spot").fill("Local national park surrounding Muckross Lake in Co.Kerry");
     |                                                             ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  29 | 
  30 |   await page
  31 |     .getByRole("textbox", {
  32 |       name: "Please add picture URL",
  33 |     })
  34 |     .fill("https://www.destinationkillarney.ie/wp-content/uploads/2017/09/Deers-Killarney-National-Park.jpg");
  35 | 
  36 |   await page.getByPlaceholder("Latitude").fill("67");
  37 |   await page.getByPlaceholder("Longitude").fill("-40");
  38 | 
  39 |   await page
  40 |     .getByRole("textbox", {
  41 |       name: "Wetland, forest, park etc",
  42 |     })
  43 |     .fill("National Park");
  44 | 
  45 |   await page
  46 |     .getByRole("button", {
  47 |       name: "Add observation Spot",
  48 |     })
  49 |     .click();
  50 | 
  51 |   await page
  52 |     .getByRole("textbox", {
  53 |       name: "Animal Species",
  54 |     })
  55 |     .fill("Tall Deer");
  56 | 
  57 |   await page
  58 |     .getByRole("textbox", {
  59 |       name: "Animal Description",
  60 |     })
  61 |     .fill("tester animal description");
  62 | 
  63 |   await page
  64 |     .getByRole("textbox", {
  65 |       name: "Sighting Season",
  66 |     })
  67 |     .fill("all year");
  68 | 
  69 |   await page
  70 |     .getByRole("button", {
  71 |       name: "Add Animal Sighting",
  72 |     })
  73 |     .click();
  74 | 
  75 |   // Adding Observation Spot
  76 | 
  77 |   await page
  78 |     .getByRole("textbox", {
  79 |       name: "Review Title",
  80 |     })
  81 |     .fill("Lovely Park");
  82 | 
  83 |   await page.locator("select[name='category']").selectOption("Positive");
  84 | 
  85 |   await page
  86 |     .getByRole("textbox", {
  87 |       name: "Write your review here",
  88 |     })
  89 |     .fill("Beautiful sights and scenery here");
  90 | 
  91 |   await page.locator("select[name='rating']").selectOption("5");
  92 | 
  93 |   await page
  94 |     .getByRole("button", {
  95 |       name: "Submit Review",
  96 |     })
  97 |     .click();
  98 | });
  99 | 
```