import path from "path";
import express from "express";
import session from "express-session";
declare module "express-session" {
  interface SessionData {   // Work-around to add
    username: string,       // username and authenticated
    authenticated: boolean, // to the session variable.
  }
}

import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";

import account from "./account.js";

import config from "../production.config.json" assert { type: "json" };

// Database creation
import { createTables } from "./database/base.js";
createTables();

const server: express.Application = express();

// Session handler
server.use(session({
  secret: uuidv4(),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30000, // 30 second cookie for the lols
    httpOnly: true,
    sameSite: "strict",
    secure: config.ENVIRONMENT === "production",
  },
}));

// Serve the react application
server.use(express.static(
  path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "..", "..", "public", // out of the /build/server/ folder
  )
));

server.use("/account", account);

// Turn it on!
server.listen(config.PORT, () => {
  console.info(`Server listening on port ${config.PORT}`)
});