import { assert } from "chai";
import { ERROR_ACCOUNT_REGISTER_COMPLEXITY_CODE, ERROR_ACCOUNT_REGISTER_PASSWORD_CODE, ERROR_ACCOUNT_REGISTER_USERNAME_CODE, SUCCESS, verifyAccountCredentials } from "../../verify.js";

const GOOD_USERNAME = "user";
const GOOD_PASSWORD = "A!b.C,d@e%F2";

// sanitizePassword
describe("sanitize.ts", () => {
  describe("sanitizeAccountCredentials", () => {
    it("should verify acceptable username and password", () => {
      const response = verifyAccountCredentials(GOOD_USERNAME, GOOD_PASSWORD);
      assert.equal(response.code, SUCCESS);
    });

    it("should check username length", () => {
      const response = verifyAccountCredentials("u", GOOD_PASSWORD);
      assert.equal(response.code, ERROR_ACCOUNT_REGISTER_USERNAME_CODE, "Too short");

      const response2 = verifyAccountCredentials("username".repeat(5), GOOD_PASSWORD);
      assert.equal(response2.code, ERROR_ACCOUNT_REGISTER_USERNAME_CODE, "Too long");
    });

    it("should check username characters", () => {
      const response = verifyAccountCredentials("user$", GOOD_PASSWORD);
      assert.equal(response.code,
        ERROR_ACCOUNT_REGISTER_USERNAME_CODE,
        "Special character at end"
      );

      const response2 = verifyAccountCredentials("!user", GOOD_PASSWORD);
      assert.equal(response2.code,
        ERROR_ACCOUNT_REGISTER_USERNAME_CODE,
        "Special character at front"
      );

      const response3 = verifyAccountCredentials("$%&", GOOD_PASSWORD);
      assert.equal(response3.code,
        ERROR_ACCOUNT_REGISTER_USERNAME_CODE,
        "All special characters"
      );

      const response4 = verifyAccountCredentials("user name", GOOD_PASSWORD);
      assert.equal(response4.code,
        ERROR_ACCOUNT_REGISTER_USERNAME_CODE,
        "Contains space"
      );
    });

    it("should check password length", () => {
      // Too short
      const response = verifyAccountCredentials(GOOD_USERNAME, GOOD_PASSWORD.slice(1));
      assert.equal(response.code,
        ERROR_ACCOUNT_REGISTER_PASSWORD_CODE,
        "Too short"
      );

      const response2 = verifyAccountCredentials(GOOD_USERNAME, GOOD_PASSWORD.repeat(11));
      assert.equal(response2.code,
        ERROR_ACCOUNT_REGISTER_PASSWORD_CODE,
        "Too long"
      );
    });

    it("should check password for lowercase character", () => {
      const pw = GOOD_PASSWORD.toUpperCase();
      const response = verifyAccountCredentials(GOOD_USERNAME, pw);
      assert.equal(response.code, ERROR_ACCOUNT_REGISTER_PASSWORD_CODE);
    });

    it("should check password for uppercase character", () => {
      const pw = GOOD_PASSWORD.toLowerCase();
      const response = verifyAccountCredentials(GOOD_USERNAME, pw);
      assert.equal(response.code, ERROR_ACCOUNT_REGISTER_PASSWORD_CODE);
    });

    it("should check password for numeric character", () => {
      const pw = GOOD_PASSWORD.replace(/2/, ".");
      const response = verifyAccountCredentials(GOOD_USERNAME, pw);
      assert.equal(response.code, ERROR_ACCOUNT_REGISTER_PASSWORD_CODE);
    });

    it("should check password for special character", () => {
      const pw = GOOD_PASSWORD.replaceAll(/[\!\.,@%]/g, "4");
      const response = verifyAccountCredentials(GOOD_USERNAME, pw);
      assert.equal(response.code, ERROR_ACCOUNT_REGISTER_PASSWORD_CODE);
    });

    it("should check password for zxcvbn score > 2", () => {
      // Using the sample password from the zxcvbn repository.
      const response = verifyAccountCredentials(GOOD_USERNAME, "Tr0ub4dour&3");
      assert.equal(response.code, ERROR_ACCOUNT_REGISTER_COMPLEXITY_CODE);
    });
  })
})