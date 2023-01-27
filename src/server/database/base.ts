import sqlite, { Database } from "better-sqlite3";

import config from "../../production.config.json" assert { type: "json" };

let database: Database;

const CREATE_ACCOUNT_TABLE = "CREATE TABLE IF NOT EXISTS account ("
  + "id INTEGER PRIMARY KEY AUTOINCREMENT,"
  + "public_id CHAR(36) NOT NULL,"
  + "username TEXT NOT NULL,"
  + "password CHAR(128) NOT NULL)";

const CREATE_ACCOUNT_AUDIT_TABLE = "CREATE TABLE IF NOT EXISTS account_audit ("
  + "id INTEGER PRIMARY KEY AUTOINCREMENT,"
  + "public_id CHAR(36) NOT NULL,"
  + "date DATETIME DEFAULT CURRENT_TIMESTAMP,"
  + "type INTEGER NOT NULL,"
  + "value TEXT NOT NULL)";

export const getDatabase = (): Database => {
  try {
    if (!database) {
      database = new sqlite(config.DATABASE ?? ":memory:");
    }
    return database;
  }
  catch (error) {
    console.error(error);
  }
  return null;
};

export const createTables = (): boolean => {
  if (!database) {
    getDatabase();
  }

  try {
    database.prepare(CREATE_ACCOUNT_TABLE).run();
    database.prepare(CREATE_ACCOUNT_AUDIT_TABLE).run();
  }
  catch (error) {
    console.error(error);
  }
  return false;
};
