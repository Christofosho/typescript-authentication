import React, { MouseEventHandler } from "react";

interface LoginDockProps {
  onSubmitLogin: MouseEventHandler<HTMLInputElement>,
};

export default ({ onSubmitLogin }: LoginDockProps) => {
  return (
    <section className="login-dock">
      <input type="text" placeholder="Username" className="text-input username-input" autoFocus />
      <input type="password" placeholder="Password" className="text-input password-input" />
      <input type="submit" className="submit-input" onClick={onSubmitLogin} value="Login" />
    </section>
  );
};