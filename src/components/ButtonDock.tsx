import React, { MouseEventHandler } from "react";

import NavButton from "./NavButton";

interface ButtonDockProps {
  onNavigate: MouseEventHandler<HTMLButtonElement>,
};

export default ({ onNavigate }: ButtonDockProps) => {
  return (
    <section className="button-dock">
      <NavButton to="register" content="Register" onNav={onNavigate} />
      <NavButton to="login" content="Login" onNav={onNavigate} />
    </section>
  );
};