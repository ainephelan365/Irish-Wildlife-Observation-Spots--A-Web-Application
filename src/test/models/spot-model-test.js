import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testSpots, seaSpot } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Spot Model tests", () => {
  setup(async () => {
    db.init("mongo");
    await db.spotStore.deleteAllSpots();
    for (let i = 0; i < testSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testSpots[i] = await db.spotStore.addspot(testSpots[i]);
    }
  });

  test("create a spot", async () => {
    const spot = await db.spotStore.addspot(seaSpot);
    assertSubset(seaSpot, spot);
    assert.isDefined(spot._id);
  });

  test("delete all spots", async () => {
    let returnedspots = await db.spotStore.getallSpots();
    assert.equal(returnedspots.length, 3);
    await db.spotStore.deleteAllSpots();
    returnedspots = await db.spotStore.getallSpots();
    assert.equal(returnedspots.length, 0);
  });

  test("get a spot - success", async () => {
    const spot = await db.spotStore.addspot(seaSpot);
    const returnedspot = await db.spotStore.getspotById(spot._id);
    assertSubset(seaSpot, spot);
  });

  test("delete One spot - success", async () => {
    const id = testSpots[0]._id;
    await db.spotStore.deleteSpotById(id);
    const returnedspots = await db.spotStore.getallSpots();
    assert.equal(returnedspots.length, testSpots.length - 1);
    const deletedspot = await db.spotStore.getspotById(id);
    assert.isNull(deletedspot);
  });

  test("get a spot - bad params", async () => {
    assert.isNull(await db.spotStore.getspotById(""));
    assert.isNull(await db.spotStore.getspotById());
  });

  test("delete One spot - fail", async () => {
    await db.spotStore.deleteSpotById("bad-id");
    const allSpots = await db.spotStore.getallSpots();
    assert.equal(testSpots.length, allSpots.length);
  });
});
