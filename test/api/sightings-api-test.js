import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { wildlifeService } from "./wildlife-site-service.js";
import { maggie, mozart, testspots, testsightings, concerto } from "../fixtures.js";

suite("sighting API tests", () => {
  let user = null;
  let beethovenSonatas = null;

  setup(async () => {
    wildlifeService.clearAuth();
    user = await wildlifeService.createUser(maggie);
    await wildlifeService.authenticate(maggie);
    await wildlifeService.deleteAllspots();
    await wildlifeService.deleteAllsightings();
    await wildlifeService.deleteAllUsers();
    user = await wildlifeService.createUser(maggie);
    await wildlifeService.authenticate(maggie);
    mozart.userid = user._id;
    beethovenSonatas = await wildlifeService.createspot(mozart);
  });

  teardown(async () => {});

  test("create sighting", async () => {
    const returnedsighting = await wildlifeService.createsighting(beethovenSonatas._id, concerto);
    assertSubset(concerto, returnedsighting);
  });

  test("create Multiple sightings", async () => {
    for (let i = 0; i < testsightings.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await wildlifeService.createsighting(beethovenSonatas._id, testsightings[i]);
    }
    const returnedsightings = await wildlifeService.getAllsightings();
    assert.equal(returnedsightings.length, testsightings.length);
    for (let i = 0; i < returnedsightings.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const sighting = await wildlifeService.getsighting(returnedsightings[i]._id);
      assertSubset(sighting, returnedsightings[i]);
    }
  });

  test("Delete sightingApi", async () => {
    for (let i = 0; i < testsightings.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await wildlifeService.createsighting(beethovenSonatas._id, testsightings[i]);
    }
    let returnedsightings = await wildlifeService.getAllsightings();
    assert.equal(returnedsightings.length, testsightings.length);
    for (let i = 0; i < returnedsightings.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const sighting = await wildlifeService.deletesighting(returnedsightings[i]._id);
    }
    returnedsightings = await wildlifeService.getAllsightings();
    assert.equal(returnedsightings.length, 0);
  });

  test("denormalised spot", async () => {
    for (let i = 0; i < testsightings.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await wildlifeService.createsighting(beethovenSonatas._id, testsightings[i]);
    }
    const returnedspot = await wildlifeService.getspot(beethovenSonatas._id);
    assert.equal(returnedspot.sightings.length, testsightings.length);
    for (let i = 0; i < testsightings.length; i += 1) {
      assertSubset(testsightings[i], returnedspot.sightings[i]);
    }
  });
});
