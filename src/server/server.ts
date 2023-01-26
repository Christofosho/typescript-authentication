import express from "express";

import { fileURLToPath } from "url";
import path from "path";

// Use the .js extension here in place of the flag:
// --experimental-specifier-resolution=node
import { ACCOUNT_SUCCESS_REGISTER, AccountResponse, NONE, verifyAccountCredentials } from "../common/verify.js";

import config from "../production.config.json" assert { type: "json" };

const server: express.Application = express();

// Serve the react application
server.use(express.static(
  path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "..", "public",
  )
));

// Authentication API
server.post("/account/register", express.json(), (request, response) => {
  try {

    // Verify credentials are permitted.
    const verificationResult: AccountResponse = verifyAccountCredentials(
      request.body.username,
      request.body.password,
    );

    const verified = verificationResult.code === NONE;

    if (!verified) {
      throw verificationResult.message;
    }

    // Add account to data storage.
    // const addAccountResult = addAccount(username, password);

    // const added = addAccountResult.code === SUCCESS;
    // if (!added) {
    //   throw addAccountResult.message;
    // }

    return response.json({
      success: true,
      body: ACCOUNT_SUCCESS_REGISTER, // TODO: addAccountResult after storage
    });
  }
  catch (error) {
    // TODO: Error logging.
    console.error(error);
  }
  
  return response.json({ success: false });
});

// Turn it on!
server.listen(config.PORT, () => {
  console.info(`Server listening on port ${config.PORT}`)
});