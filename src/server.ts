import express from "express";

import { fileURLToPath } from "url";
import path from "path";

import config from "./production.config.json" assert { type: "json" };

const server: express.Application = express();

// Serve the react application
server.use(express.static(
  path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "..", "public",
  )
));

// Authentication API

// Turn it on!
server.listen(config.PORT, () => {
  console.info(`Server listening on port ${config.PORT}`)
});