import React, { ChangeEvent, FormEventHandler, useEffect, useState } from "react";

import {
  AccountError,
  validPassword,
  validPasswordCharacters,
  validUsername,
  validUsernameCharacters,
  ACCOUNT_ERROR_PASSWORD_CHARACTERS,
  ACCOUNT_ERROR_USERNAME_CHARACTERS
} from "../constants";


type AccountSubmitFunction = {
  (action: string, data: { username: string, password: string, }): void,
};

interface AccountProps {
  action: string,
  onSubmit: AccountSubmitFunction,
  onError: (error: AccountError) => void,
};

export default ({ action, onSubmit, onError }: AccountProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!validUsernameCharacters.test(event.currentTarget.value)) {
      return onError(ACCOUNT_ERROR_USERNAME_CHARACTERS);
    }
    setUsername(event.currentTarget.value);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!validPasswordCharacters.test(event.currentTarget.value)) {
      return onError(ACCOUNT_ERROR_PASSWORD_CHARACTERS);
    }
    setPassword(event.currentTarget.value);
  };

  const submitAccount: FormEventHandler = async event => {
    event.preventDefault();

    if (!validUsername.test(username)) {
      return onError(ACCOUNT_ERROR_USERNAME_CHARACTERS);
    }
    if (!validPassword.test(password)) {
      return onError(ACCOUNT_ERROR_PASSWORD_CHARACTERS);
    }
    onSubmit(`/account/${action}`, { username, password });
  }

  return (
    <section className={action}>
      <form className={`${action}__form`} onSubmit={submitAccount}>
        <input type="text" className="text-input username-input" autoFocus
          placeholder="Username" onChange={onUsernameChange} value={username} />
        <input type="password" className="text-input password-input"
          placeholder="Password" onChange={onPasswordChange} value={password} />
        <input type="submit" className="submit-input" value="Submit" />
      </form>
    </section>
  );
};