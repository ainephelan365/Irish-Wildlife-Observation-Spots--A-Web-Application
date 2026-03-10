import { EventEmitter } from "events";
import { assert } from "chai";
import { wildlifeService } from "./wildlife-site-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, mozart, testspots } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("spot API tests", () => {
  let user = null;

  setup(async () => {
    wildlifeService.clearAuth();
    user = await wildlifeService.createUser(maggie);
    await wildlifeService.authenticate(maggie);
    await wildlifeService.deleteAllspots();
    await wildlifeService.deleteAllUsers();
    user = await wildlifeService.createUser(maggie);
    await wildlifeService.authenticate(maggie);
    mozart.userid = user._id;
  });

  teardown(async () => {});

  test("create spot", async () => {
    const returnedspot = await wildlifeService.createspot(mozart);
    assert.isNotNull(returnedspot);
    assertSubset(mozart, returnedspot);
  });

  test("delete a spot", async () => {
    const spot = await wildlifeService.createspot(mozart);
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
    for (let i = 0; i < testspots.length; i += 1) {
      testspots[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await wildlifeService.createspot(testspots[i]);
    }
    let returnedLists = await wildlifeService.getAllspots();
    assert.equal(returnedLists.length, testspots.length);
    await wildlifeService.deleteAllspots();
    returnedLists = await wildlifeService.getAllspots();
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
