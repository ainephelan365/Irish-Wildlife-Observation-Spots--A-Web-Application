import { test, expect } from "@playwright/test";

test("Adding a wildlife Observation spot, sighting and a review", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "Log In" }).click();

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

  // Adding Observation Spot

  await page.getByPlaceholder("Enter the Observation Spot").fill("Local national park surrounding Muckross Lake in Co.Kerry");

  await page
    .getByRole("textbox", {
      name: "Please add picture URL",
    })
    .fill("https://www.destinationkillarney.ie/wp-content/uploads/2017/09/Deers-Killarney-National-Park.jpg");

  await page.getByPlaceholder("Latitude").fill("67");
  await page.getByPlaceholder("Longitude").fill("-40");

  await page
    .getByRole("textbox", {
      name: "Wetland, forest, park etc",
    })
    .fill("National Park");

  await page
    .getByRole("button", {
      name: "Add observation Spot",
    })
    .click();

  await page
    .getByRole("textbox", {
      name: "Animal Species",
    })
    .fill("Tall Deer");

  await page
    .getByRole("textbox", {
      name: "Animal Description",
    })
    .fill("tester animal description");

  await page
    .getByRole("textbox", {
      name: "Sighting Season",
    })
    .fill("all year");

  await page
    .getByRole("button", {
      name: "Add Animal Sighting",
    })
    .click();

  // Adding Observation Spot

  await page
    .getByRole("textbox", {
      name: "Review Title",
    })
    .fill("Lovely Park");

  await page.locator("select[name='category']").selectOption("Positive");

  await page
    .getByRole("textbox", {
      name: "Write your review here",
    })
    .fill("Beautiful sights and scenery here");

  await page.locator("select[name='rating']").selectOption("5");

  await page
    .getByRole("button", {
      name: "Submit Review",
    })
    .click();
});
