import React from "react";

import { AccountResponse } from "../../common/verify";

export default ({ code, message }: AccountResponse) => {
  const error = `${code > 0 ? "Success: " : "Error:"} ${message}`;
  const className = `error${
    code > 0 ? " error--success" : " error--failure"
  }`;
  return (
    <div className={className}>{error}</div>
  );
};