import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { wildlifeService } from "./playtime-service.js";
import { maggie, seaSpot, testSpots, testTracks, concerto } from "../fixtures.js";

suite("Track API tests", () => {
  let user = null;
  let beethovenSonatas = null;

  setup(async () => {
    wildlifeService.clearAuth();
    user = await wildlifeService.createUser(maggie);
    await wildlifeService.authenticate(maggie);
    await wildlifeService.deleteAllSpots();
    await wildlifeService.deleteAllTracks();
    await wildlifeService.deleteAllUsers();
    user = await wildlifeService.createUser(maggie);
    await wildlifeService.authenticate(maggie);
    seaSpot.userid = user._id;
    beethovenSonatas = await wildlifeService.createspot(seaSpot);
  });

  teardown(async () => {});

  test("create track", async () => {
    const returnedTrack = await wildlifeService.createTrack(beethovenSonatas._id, concerto);
    assertSubset(concerto, returnedTrack);
  });

  test("create Multiple tracks", async () => {
    for (let i = 0; i < testTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await wildlifeService.createTrack(beethovenSonatas._id, testTracks[i]);
    }
    const returnedTracks = await wildlifeService.getAllTracks();
    assert.equal(returnedTracks.length, testTracks.length);
    for (let i = 0; i < returnedTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const track = await wildlifeService.getTrack(returnedTracks[i]._id);
      assertSubset(track, returnedTracks[i]);
    }
  });

  test("Delete TrackApi", async () => {
    for (let i = 0; i < testTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await wildlifeService.createTrack(beethovenSonatas._id, testTracks[i]);
    }
    let returnedTracks = await wildlifeService.getAllTracks();
    assert.equal(returnedTracks.length, testTracks.length);
    for (let i = 0; i < returnedTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const track = await wildlifeService.deleteTrack(returnedTracks[i]._id);
    }
    returnedTracks = await wildlifeService.getAllTracks();
    assert.equal(returnedTracks.length, 0);
  });

  test("denormalised spot", async () => {
    for (let i = 0; i < testTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await wildlifeService.createTrack(beethovenSonatas._id, testTracks[i]);
    }
    const returnedspot = await wildlifeService.getspot(beethovenSonatas._id);
    assert.equal(returnedspot.tracks.length, testTracks.length);
    for (let i = 0; i < testTracks.length; i += 1) {
      assertSubset(testTracks[i], returnedspot.tracks[i]);
    }
  });
});
