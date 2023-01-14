import React, { useEffect } from "react";

import { ERROR_NONE, AccountError } from "../constants";

type ErrorProps = AccountError & {
  resetError: (error: AccountError) => void,
};

export default ({ resetError, code, message }: ErrorProps) => {
  useEffect(() => {
    const interval = setTimeout(() => {
      resetError(ERROR_NONE);
    }, 5000);
  }, []);

  const error = `Error (code: ${code}) - ${message}`;

  // Send an error to the console as well.
  console.error(error);

  return (
    <div className="error--account">{error}</div>
  );
};