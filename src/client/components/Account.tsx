import React, { ChangeEvent, FormEventHandler, useState } from "react";

import { REGISTER, ResponseData } from "../fetcher.js";

import {
  ACCOUNT_ERROR_PASSWORD_CHARACTERS,
  ACCOUNT_ERROR_PASSWORD_MATCH,
  ACCOUNT_ERROR_REGISTER_FAIL,
  ACCOUNT_ERROR_USERNAME_CHARACTERS,
  AccountResponse,
  ERROR_NONE,
  NONE,
  validPasswordCharacters,
  validUsernameCharacters,
  verifyAccountCredentials
} from "../../common/verify.js";


type AccountSubmitFunction = {
  (
    action: string,
    data: { username: string, password: string, },
    callback: (data: ResponseData) => void): void,
};

interface AccountProps {
  action: string,
  onSubmit: AccountSubmitFunction,
  onNotification: (notice: AccountResponse) => void,
};

export default ({ action, onSubmit, onNotification }: AccountProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (action === REGISTER && !validUsernameCharacters.test(event.currentTarget.value)) {
      return onNotification(ACCOUNT_ERROR_USERNAME_CHARACTERS);
    }
    setUsername(event.currentTarget.value);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (action === REGISTER && !validPasswordCharacters.test(event.currentTarget.value)) {
      return onNotification(ACCOUNT_ERROR_PASSWORD_CHARACTERS);
    }
    setPassword(event.currentTarget.value);
  };

  const onPasswordConfirm = (event: ChangeEvent<HTMLInputElement>) => {
    if (action !== REGISTER) {
      // Ignore the second password input if we are not registering.
      return;
    }

    if (!validPasswordCharacters.test(event.currentTarget.value)) {
      return onNotification(ACCOUNT_ERROR_PASSWORD_CHARACTERS);
    }

    setPasswordConfirmation(event.currentTarget.value);
  }

  const handleSubmissionResponse = (data: ResponseData) => {
    onNotification(data.body ?? ACCOUNT_ERROR_REGISTER_FAIL);
  };

  const submitAccount: FormEventHandler = async event => {
    event.preventDefault();

    onNotification(ERROR_NONE);

    if (action === REGISTER) {
      if (password !== passwordConfirmation) {
        return onNotification(ACCOUNT_ERROR_PASSWORD_MATCH);
      }

      const result = verifyAccountCredentials(username, password);

      if (result.code !== ERROR_NONE.code) {
        return onNotification(result);
      }
    }

    onSubmit(`/account/${action}`,
      { username, password },
      handleSubmissionResponse
    );
  }

  return (
    <section className={action}>
      <form className={`${action}__form`} onSubmit={submitAccount}>
        <input type="text" className="text-input username-input" autoFocus
          placeholder="Username" onChange={onUsernameChange} value={username} />
        <input type="password" className="text-input password-input"
          placeholder="Password" onChange={onPasswordChange} value={password} />
        {action === REGISTER && <input type="password" className="text-input password-input"
          placeholder="Re-enter password" onChange={onPasswordConfirm}
          value={passwordConfirmation} />}
        <input type="submit" className="submit-input" value="Submit" />
      </form>
    </section>
  );
};