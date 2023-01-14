import React, { MouseEventHandler } from "react";

import { REGISTER, LOGIN } from "../constants";

import NavButton from "./NavButton";

interface ButtonProps {
  onNavigate: MouseEventHandler<HTMLButtonElement>,
  active: string,
};

export default ({ onNavigate, active }: ButtonProps) => {
  return (
    <nav className="nav">
      <NavButton tabIndex={2} to={REGISTER} onNav={onNavigate} active={active === REGISTER} />
      <NavButton tabIndex={3} to={LOGIN} onNav={onNavigate} active={active === LOGIN} />
    </nav>
  );
};