import express from "express";

import { insertAccount, loginAccount } from "./database/account.js";

// Use the .js extension here in place of the flag:
// --experimental-specifier-resolution=node
import { ACCOUNT_ERROR_LOGOUT_FAIL, ACCOUNT_ERROR_REGISTER_FAIL, ACCOUNT_SUCCESS_LOGIN, ACCOUNT_SUCCESS_LOGOUT, ACCOUNT_SUCCESS_REGISTER, AccountResponse, NONE, SUCCESS, verifyAccountCredentials } from "../common/verify.js";

const router = express.Router();

const isAuthenticated = (
  request: express.Request, response: express.Response, next: express.NextFunction
): void => {
  if (request.session.authenticated) next()
  else next('route')
}

router.post("/register", express.json(), async (request, response) => {
  let body = ACCOUNT_ERROR_REGISTER_FAIL;
  let success = false;

  try {
    const username = request.body.username;
    const password = request.body.password;

    // Verify credentials are permitted.
    const verificationResult: AccountResponse = verifyAccountCredentials(
      username, password,
    );

    const verified = verificationResult.code === NONE;

    if (!verified) {
      body = verificationResult;
      throw new Error(verificationResult.message);
    }

    // Add account to data storage.
    const insertAccountResult = await insertAccount(username, password);
    if (insertAccountResult.code !== SUCCESS) {
      body = insertAccountResult;
      throw new Error(insertAccountResult.message);
    }

    console.info(`${ACCOUNT_SUCCESS_REGISTER.message} -- ${username}`);

    success = true;
    body = ACCOUNT_SUCCESS_REGISTER;
  }
  catch (error) {
    // TODO: Error logging.
    console.error(error);
  }
  
  return response.json({ success, body });
});

router.post("/login", express.json(), async (request, response) => {
  let body = ACCOUNT_ERROR_REGISTER_FAIL;
  let success = false;

  try {
    const username = request.body.username;
    const password = request.body.password;

    // Verify credentials are permitted.
    const verificationResult: AccountResponse = verifyAccountCredentials(
      username, password,
    );

    if (verificationResult.code !== NONE) {
      body = verificationResult;
      throw new Error(verificationResult.message);
    }

    // Attempt login
    const loginAttempt = await loginAccount(username, password);
    if (loginAttempt.code !== SUCCESS) {
      body = loginAttempt;
      throw new Error(loginAttempt.message);
    }

    console.info(`${ACCOUNT_SUCCESS_LOGIN.message} -- ${username}`);

    request.session.regenerate(error => {
      if (error) {
        throw error;
      }

      request.session.username = username;
      request.session.authenticated = true;

      request.session.save(error => {
        if (error) {
          throw error;
        }
      });
    });

    success = true;
    body = ACCOUNT_SUCCESS_LOGIN;
  }
  catch (error) {
    console.error(error);
  }

  return response.json({ success, body });
});

router.get("/logout", function (request, response) {
  let body = ACCOUNT_ERROR_LOGOUT_FAIL;
  let success = false;

  // Remove the custom authentication fields.
  request.session.username = null;
  delete request.session.username;
  request.session.authenticated = null;
  delete request.session.authenticated;

  // Save our empty session object.
  try {
    request.session.save(error => {
      if (error) throw error;
      request.session.regenerate(error => {
        if (error) throw error;
      });
    });

    body = ACCOUNT_SUCCESS_LOGOUT;
    success = true;
  }
  catch (error) {
    console.error(error);
  }

  return response.json({ success, body });
});

export default router;