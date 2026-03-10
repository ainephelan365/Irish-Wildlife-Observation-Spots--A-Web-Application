import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { wildlifeService } from "./wildlife-site-service.js";
import { maggie, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    wildlifeService.clearAuth();
    await wildlifeService.createUser(maggie);
    await wildlifeService.authenticate(maggie);
    await wildlifeService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await wildlifeService.createUser(testUsers[i]);
    }
    await wildlifeService.createUser(maggie);
    await wildlifeService.authenticate(maggie);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await wildlifeService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await wildlifeService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await wildlifeService.deleteAllUsers();
    await wildlifeService.createUser(maggie);
    await wildlifeService.authenticate(maggie);
    returnedUsers = await wildlifeService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await wildlifeService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await wildlifeService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await wildlifeService.deleteAllUsers();
    await wildlifeService.createUser(maggie);
    await wildlifeService.authenticate(maggie);
    try {
      const returnedUser = await wildlifeService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});
