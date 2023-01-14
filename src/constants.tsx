export const HOME: string = "home";
export const LOGIN: string = "login";
export const REGISTER: string = "register";

export type SendData = {
  username?: string,
  password?: string,
}

export const ERROR_NONE = { code: 0, message: "" };

const ACCOUNT_ERROR_USERNAME_CHARACTERS_MESSAGE = "Invalid character entered in username.";
const ACCOUNT_ERROR_PASSWORD_CHARACTERS_MESSAGE = "Invalid character entered in password.";
export const ACCOUNT_ERROR_USERNAME_CHARACTERS = {
  code: 1,
  message: ACCOUNT_ERROR_USERNAME_CHARACTERS_MESSAGE
};
export const ACCOUNT_ERROR_PASSWORD_CHARACTERS = {
  code: 2,
  message: ACCOUNT_ERROR_PASSWORD_CHARACTERS_MESSAGE
};

export type AccountError = typeof ERROR_NONE
    | typeof ACCOUNT_ERROR_USERNAME_CHARACTERS
    | typeof ACCOUNT_ERROR_PASSWORD_CHARACTERS;

// Usernames of 3 or more characters.
export const validUsername: RegExp = /^[A-Za-z0-9]{3,}$/;
export const validUsernameCharacters: RegExp = /^[A-Za-z0-9]*$/;
export const validPassword: RegExp = /^[A-Za-z0-9\!,\.\$\*&%\^]{12,}$/;
export const validPasswordCharacters: RegExp = /^[A-Za-z0-9\!,\.\$\*&%\^]*$/;