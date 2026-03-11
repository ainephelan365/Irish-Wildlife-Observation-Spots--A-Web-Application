import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testspots, mozart } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("spot Model tests", () => {
  setup(async () => {
    db.init("mongo");
    await db.spotStore.deleteAllspots();
    for (let i = 0; i < testspots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testspots[i] = await db.spotStore.addspot(testspots[i]);
    }
  });

  test("create a spot", async () => {
    const spot = await db.spotStore.addspot(mozart);
    assertSubset(mozart, spot);
    assert.isDefined(spot._id);
  });

  test("delete all spots", async () => {
    let returnedspots = await db.spotStore.getAllspots();
    assert.equal(returnedspots.length, 3);
    await db.spotStore.deleteAllspots();
    returnedspots = await db.spotStore.getAllspots();
    assert.equal(returnedspots.length, 0);
  });

  test("get a spot - success", async () => {
    const spot = await db.spotStore.addspot(mozart);
    const returnedspot = await db.spotStore.getspotById(spot._id);
    assertSubset(mozart, spot);
  });

  test("delete One Spot - success", async () => {
    const id = testspots[0]._id;
    await db.spotStore.deletespotById(id);
    const returnedspots = await db.spotStore.getAllspots();
    assert.equal(returnedspots.length, testspots.length - 1);
    const deletedspot = await db.spotStore.getspotById(id);
    assert.isNull(deletedspot);
  });

  test("get a spot - bad params", async () => {
    assert.isNull(await db.spotStore.getspotById(""));
    assert.isNull(await db.spotStore.getspotById());
  });

  test("delete One spot - fail", async () => {
    await db.spotStore.deletespotById("bad-id");
    const allspots = await db.spotStore.getAllspots();
    assert.equal(testspots.length, allspots.length);
  });
});
