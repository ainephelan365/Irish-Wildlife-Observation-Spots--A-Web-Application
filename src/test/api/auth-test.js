import { assert } from "chai";
import { wildlifeService } from "./wildlife-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    wildlifeService.clearAuth();
    await wildlifeServiceService.createUser(maggie);
    await wildlifeService.authenticate(maggie);
    await wildlifeService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await wildlifeService.createUser(maggie);
    const response = await wildlifeService.authenticate(maggie);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await wildlifeService.createUser(maggie);
    const response = await wildlifeService.authenticate(maggie);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    wildlifeService.clearAuth();
    try {
      await wildlifeService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
