import { EventEmitter } from "events";
import { assert } from "chai";
import { wildlifeService } from "./wildlife-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, seaSpot, testSpots } from "../fixtures.js";

suite("spot API tests", () => {
  let user = null;

  suiteSetup(async () => {
    try {
      user = await wildlifeService.createUser(maggie);
    } catch (e) {
      // the user might already have been created
      await wildlifeService.authenticate(maggie);
      user = await wildlifeService.getUser(maggie._id);
    }

    await wildlifeService.authenticate(maggie);
    await wildlifeService.deleteAllSpots();

    seaSpot.userid = user._id;
  });

  teardown(async () => {});

  test("create spot", async () => {
    const returnedspot = await wildlifeService.createspot(seaSpot);
    assert.isNotNull(returnedspot);
    assertSubset(seaSpot, returnedspot);
  });

  test("delete a spot", async () => {
    const spot = await wildlifeService.createspot(seaSpot);
    const response = await wildlifeService.deletespot(spot._id);
    assert.equal(response.status, 204);
    try {
      const returnedspot = await wildlifeService.getspot(spot.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No spot with this id", "Incorrect Response Message");
    }
  });

  test("create multiple spots", async () => {
    await wildlifeService.deleteAllSpots();

    for (let i = 0; i < testSpots.length; i += 1) {
      testSpots[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await wildlifeService.createspot(testSpots[i]);
    }
    let returnedLists = await wildlifeService.getallSpots();
    assert.equal(returnedLists.length, testSpots.length);
    await wildlifeService.deleteAllSpots();
    returnedLists = await wildlifeService.getallSpots();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant spot", async () => {
    try {
      const response = await wildlifeService.deletespot("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No spot with this id", "Incorrect Response Message");
    }
  });
});
