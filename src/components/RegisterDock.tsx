import React, { MouseEventHandler, useEffect } from "react";

interface RegisterDockProps {
  onSubmitRegister: MouseEventHandler<HTMLInputElement>,
};

export default ({ onSubmitRegister }: RegisterDockProps) => {
  return (
    <section className="register-dock">
      <input type="text" placeholder="Username" className="text-input username-input" autoFocus />
      <input type="password" placeholder="Password" className="text-input password-input" />
      <input type="submit" className="submit-input" onClick={onSubmitRegister} value="Register" />
    </section>
  );
};