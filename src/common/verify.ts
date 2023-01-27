import zxcvbn from "zxcvbn";

/* Success */
export const ERROR_ACCOUNT_LOGOUT_FAIL_CODE = -7;
export const ERROR_ACCOUNT_LOGIN_FAIL_CODE = -6;
export const ERROR_ACCOUNT_PASSWORD_MATCH_CODE = -5;
export const ERROR_ACCOUNT_REGISTER_FAIL_CODE = -4;
export const ERROR_ACCOUNT_REGISTER_COMPLEXITY_CODE = -3
export const ERROR_ACCOUNT_REGISTER_PASSWORD_CODE = -2;
export const ERROR_ACCOUNT_REGISTER_USERNAME_CODE = -1;
export const NONE = 0;
export const SUCCESS = 1;

const ACCOUNT_SUCCESS_REGISTER_MESSAGE = "Successfully registered account!";
const ACCOUNT_SUCCESS_LOGIN_MESSAGE = "Successfully logged in!";
const ACCOUNT_SUCCESS_LOGOUT_MESSAGE = "Successfully logged out!";

export const ACCOUNT_SUCCESS_REGISTER = {
  code: SUCCESS,
  message: ACCOUNT_SUCCESS_REGISTER_MESSAGE,
};

export const ACCOUNT_SUCCESS_LOGIN = {
  code: SUCCESS,
  message: ACCOUNT_SUCCESS_LOGIN_MESSAGE,
};

export const ACCOUNT_SUCCESS_LOGOUT = {
  code: SUCCESS,
  message: ACCOUNT_SUCCESS_LOGOUT_MESSAGE,
};


type AccountSuccess = typeof ACCOUNT_SUCCESS_REGISTER;

/* Error */

export const ERROR_NONE = { code: NONE, message: "" };

const ACCOUNT_ERROR_USERNAME_CHARACTERS_MESSAGE = "Username must be"
  + " between 3 and 32 characters in length,"
  + " and contain only alphanumeric characters. ";
const ACCOUNT_ERROR_PASSWORD_CHARACTERS_MESSAGE = "The password you have"
  + " entered does not meet complexity requirements. Password may contain"
  + " between 12 and 128 characters, lowercase and uppercase letters,"
  + " and numeric and special characters. Special characters include:"
  + " ! @ # $ % ^ & * . , _ - or a space character."
  + " You can also consider using a Pass Phrase (https://www.useapassphrase.com/)."
const ACCOUNT_ERROR_REGISTER_FAIL_MESSAGE = "Failed to register account.";
const ACCOUNT_ERROR_LOGIN_FAIL_MESSAGE = "Failed to log in.";
const ACCOUNT_ERROR_LOGOUT_FAIL_MESSAGE = "Failed to log out.";
const ACCOUNT_ERROR_PASSWORD_MATCH_MESSAGE = "Passwords do not match."

export const ACCOUNT_ERROR_USERNAME_CHARACTERS = {
  code: ERROR_ACCOUNT_REGISTER_USERNAME_CODE,
  message: ACCOUNT_ERROR_USERNAME_CHARACTERS_MESSAGE,
};

export const ACCOUNT_ERROR_PASSWORD_CHARACTERS = {
  code: ERROR_ACCOUNT_REGISTER_PASSWORD_CODE,
  message: ACCOUNT_ERROR_PASSWORD_CHARACTERS_MESSAGE,
};

export const ACCOUNT_ERROR_PASSWORD_MATCH = {
  code: ERROR_ACCOUNT_PASSWORD_MATCH_CODE,
  message: ACCOUNT_ERROR_PASSWORD_MATCH_MESSAGE,
};

export const ACCOUNT_ERROR_REGISTER_FAIL = {
  code: ERROR_ACCOUNT_REGISTER_FAIL_CODE,
  message: ACCOUNT_ERROR_REGISTER_FAIL_MESSAGE,
};

export const ACCOUNT_ERROR_LOGIN_FAIL = {
  code: ERROR_ACCOUNT_LOGIN_FAIL_CODE,
  message: ACCOUNT_ERROR_LOGIN_FAIL_MESSAGE,
};

export const ACCOUNT_ERROR_LOGOUT_FAIL = {
  code: ERROR_ACCOUNT_LOGOUT_FAIL_CODE,
  message: ACCOUNT_ERROR_LOGOUT_FAIL_MESSAGE,
};

type AccountError = typeof ERROR_NONE
    | typeof ACCOUNT_ERROR_USERNAME_CHARACTERS
    | typeof ACCOUNT_ERROR_PASSWORD_CHARACTERS
    | typeof ACCOUNT_ERROR_REGISTER_FAIL
    | typeof ACCOUNT_ERROR_LOGIN_FAIL
    | typeof ACCOUNT_ERROR_LOGOUT_FAIL;

export type AccountResponse = AccountSuccess|AccountError;

const validUsername: RegExp = /^[A-Za-z0-9]{3,32}$/;
const validPassword: RegExp = /^[A-Za-z0-9\!@#$%\^&\*\.,\s_-]{12,128}$/;

export const validUsernameCharacters: RegExp = /^[A-Za-z0-9]*$/;
export const validPasswordCharacters: RegExp = /^[A-Za-z0-9\!@#$%\^&\*\.,\s_-]*$/;

export const verifyAccountCredentials = (
  username: string|undefined,
  password: string|undefined
): AccountResponse  => {
  // Complexity requirements for username include:
  // 1. contents of only alphanumeric characters; and
  // 2. length between 3 and 32 characters.
  if (!username || !validUsername.test(username)) {
    return ACCOUNT_ERROR_USERNAME_CHARACTERS;
  }

  // Complexity requirements for password include:
  // 1. may have lowercase letter(s) (a-z);
  // 2. may have uppercase letter(s) (A-Z);
  // 3. may have numeric character(s) (0-9);
  // 4. may have special character(s) (e.g. ! @ # $ % ^ & * . , <space> _ -); and
  // 5. length between 12 and 128 characters.
  if (!password || !validPassword.test(password) || zxcvbn(password).score <= 2) {
    return ACCOUNT_ERROR_PASSWORD_CHARACTERS;
  }

  return ERROR_NONE;
};