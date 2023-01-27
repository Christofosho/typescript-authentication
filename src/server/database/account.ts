import * as argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import { getDatabase } from "./base.js";
import { ACCOUNT_ERROR_LOGIN_FAIL, ACCOUNT_ERROR_REGISTER_FAIL, ACCOUNT_SUCCESS_LOGIN, ACCOUNT_SUCCESS_REGISTER, AccountResponse } from "../../common/verify.js";

const ACCOUNT_CREATION = 1;

const SELECT_ACCOUNT_COUNT_BY_USERNAME
  = "SELECT COUNT(*) count FROM account WHERE username=(?)";
const SELECT_ACCOUNT_BY_USERNAME
  = "SELECT username, password FROM account WHERE username=(?)";
const INSERT_ACCOUNT
  = "INSERT INTO account (public_id, username, password) VALUES (?, ?, ?)";
const INSERT_ACCOUNT_AUDIT
  = "INSERT INTO account_audit (public_id, type, value) VALUES (?, ?, ?)";

export const insertAccount = async (
  username: string, password: string
): Promise<AccountResponse> => {
  const db = getDatabase();
  if (!db) {
    console.error("addAccount: Failed to retrieve database.");
    return ACCOUNT_ERROR_REGISTER_FAIL;
  }

  // Check for existing user with username.
  try {
    const select = db.prepare(SELECT_ACCOUNT_COUNT_BY_USERNAME).get(username);

    if (select?.count) {
      // Account with username exists.
      throw new Error(`${ACCOUNT_ERROR_REGISTER_FAIL.message} -- Exists: ${username}`);
    }
  }
  catch (error) {
    console.error(error);
    return ACCOUNT_ERROR_REGISTER_FAIL;
  }

  // Insert username/password into account table.
  try {
    db.prepare(INSERT_ACCOUNT).run(uuidv4(), username, await argon2.hash(password));
    db.prepare(INSERT_ACCOUNT_AUDIT).run(uuidv4(), ACCOUNT_CREATION, username);
  }
  catch (error) {
    console.error(error);
    return ACCOUNT_ERROR_REGISTER_FAIL;
  }

  return ACCOUNT_SUCCESS_REGISTER;
};

export const loginAccount = async (
  username: string, password: string
): Promise<AccountResponse> => {
  const db = getDatabase();
  if (!db) {
    console.error("addAccount: Failed to retrieve database.");
    return ACCOUNT_ERROR_REGISTER_FAIL;
  }

  // Check for existing user with username.
  try {
    const select = db.prepare(SELECT_ACCOUNT_BY_USERNAME).get(username);

    if (!select) {
      // Account with username does not exist.
      throw new Error(`${ACCOUNT_ERROR_LOGIN_FAIL.message} -- Does not exist: ${username}`);
    }

    // TODO: Rate limit on account_audit

    if (await argon2.verify(select.password, password)) {
      return ACCOUNT_SUCCESS_LOGIN;
    }
  }
  catch (error) {
    console.error(error);
  }

  return ACCOUNT_ERROR_LOGIN_FAIL;
};