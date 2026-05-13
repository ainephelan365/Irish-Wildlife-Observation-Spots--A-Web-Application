import { assert } from "chai";
import { db } from "../../models/db.js";
import { testSpots, seaSpot } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Spot Model tests", () => {
  setup(async () => {
    await db.init("mongo");
    await db.spotStore.deleteAllSpots();
    for (let i = 0; i < testSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testSpots[i] = await db.spotStore.addSpot(testSpots[i]);
    }
  });

  test("create a spot", async () => {
    const spot = await db.spotStore.addSpot(seaSpot);
    assertSubset(seaSpot, spot);
    assert.isDefined(spot._id);
  });

  test("delete all spots", async () => {
    let returnedspots = await db.spotStore.getAllSpots();
    assert.equal(returnedspots.length, 3);
    await db.spotStore.deleteAllSpots();
    returnedspots = await db.spotStore.getAllSpots();
    assert.equal(returnedspots.length, 0);
  });

  test("get a spot - success", async () => {
    const spot = await db.spotStore.addSpot(seaSpot);
    const returnedspot = await db.spotStore.getSpotById(spot._id);
    assertSubset(seaSpot, spot);
  });

  test("delete One spot - success", async () => {
    const id = testSpots[0]._id;
    await db.spotStore.deleteSpotById(id);
    const returnedspots = await db.spotStore.getAllSpots();
    assert.equal(returnedspots.length, testSpots.length - 1);
    const deletedspot = await db.spotStore.getSpotById(id);
    assert.isNull(deletedspot);
  });

  test("get a spot - bad params", async () => {
    assert.isNull(await db.spotStore.getSpotById(""));
    assert.isNull(await db.spotStore.getSpotById());
  });

  test("delete One spot - fail", async () => {
    await db.spotStore.deleteSpotById("bad-id");
    const allSpots = await db.spotStore.getAllSpots();
    assert.equal(testSpots.length, allSpots.length);
  });
});
