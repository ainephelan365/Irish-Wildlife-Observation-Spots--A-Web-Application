import { test, expect } from "@playwright/test";

test("Adding a wildlife Observation spot, sighting and a review", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Adding Observation Spot

  await page
    .getByRole("textbox", {
      name: "Enter the Observation Spot",
    })
    .fill("Local national park surrounding Muckross Lake in Co.Kerry");

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
      name: "Animal Species",
    })
    .fill("Tall Deer");

  await page
    .getByRole("textbox", {
      name: "Animal Description",
    })
    .fill("Deer native to Co.Kerry and spotted in various areas throughout the park");

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
    .fill("Between the deer, the herons and the kingfisher birds this national park is lovely.");

  await page.locator("select[name='rating']").selectOption("5");

  await page
    .getByRole("button", {
      name: "Submit Review",
    })
    .click();
});
