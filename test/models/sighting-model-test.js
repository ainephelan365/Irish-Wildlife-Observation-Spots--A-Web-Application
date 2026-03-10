import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testspots, testsightings, beethoven, mozart, concerto, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("sighting Model tests", () => {
  let beethovenList = null;

  setup(async () => {
    db.init("mongo");
    await db.spotStore.deleteAllspots();
    await db.sightingStore.deleteAllsightings();
    beethovenList = await db.spotStore.addspot(beethoven);
    for (let i = 0; i < testsightings.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testsightings[i] = await db.sightingStore.addsighting(beethovenList._id, testsightings[i]);
    }
  });

  test("create single sighting", async () => {
    const mozartList = await db.spotStore.addspot(mozart);
    const sighting = await db.sightingStore.addsighting(mozartList._id, concerto);
    assert.isNotNull(sighting._id);
    assertSubset(concerto, sighting);
  });

  test("create multiple sightingApi", async () => {
    const sightings = await db.spotStore.getspotById(beethovenList._id);
    assert.equal(testsightings.length, testsightings.length);
  });

  test("delete all sightingApi", async () => {
    const sightings = await db.sightingStore.getAllsightings();
    assert.equal(testsightings.length, sightings.length);
    await db.sightingStore.deleteAllsightings();
    const newsightings = await db.sightingStore.getAllsightings();
    assert.equal(0, newsightings.length);
  });

  test("get a sighting - success", async () => {
    const mozartList = await db.spotStore.addspot(mozart);
    const sighting = await db.sightingStore.addsighting(mozartList._id, concerto);
    const newsighting = await db.sightingStore.getsightingById(sighting._id);
    assertSubset(concerto, newsighting);
  });

  test("delete One sighting - success", async () => {
    const id = testsightings[0]._id;
    await db.sightingStore.deletesighting(id);
    const sightings = await db.sightingStore.getAllsightings();
    assert.equal(sightings.length, testspots.length - 1);
    const deletedsighting = await db.sightingStore.getsightingById(id);
    assert.isNull(deletedsighting);
  });

  test("get a spot - bad params", async () => {
    assert.isNull(await db.sightingStore.getsightingById(""));
    assert.isNull(await db.sightingStore.getsightingById());
  });

  test("delete One User - fail", async () => {
    await db.sightingStore.deletesighting("bad-id");
    const sightings = await db.sightingStore.getAllsightings();
    assert.equal(sightings.length, testspots.length);
  });
});
