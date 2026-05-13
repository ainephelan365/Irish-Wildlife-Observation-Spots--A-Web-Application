import { assert } from "chai";
import { wildlifeService } from "./wildlife-service.js";
import { decodeToken } from "../../api/jwt-utils.js";
import { maggie } from "../fixtures.js";

suite("Authentication API tests", () => {
  suiteSetup(async () => {
    wildlifeService.clearAuth();

    try {
      await wildlifeService.createUser(maggie);
    } catch (e) {
      // user may already exist
    }

    await wildlifeService.authenticate(maggie);
  });

  test("authenticate", async () => {
    const response = await wildlifeService.authenticate(maggie);

    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const response = await wildlifeService.authenticate(maggie);

    const userInfo = decodeToken(response.token);

    assert.equal(userInfo.email, maggie.email);
    assert.exists(userInfo.userId);
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
