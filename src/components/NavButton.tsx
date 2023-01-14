import React, { MouseEventHandler } from "react";

interface NavButtonProps {
  tabIndex: number,
  to: string,
  onNav: MouseEventHandler<HTMLButtonElement>,
  active: boolean,
  content?: string,
};

export default ({ tabIndex, to, onNav, active, content }: NavButtonProps) => {
  // Keeping class building logic outside of the JSX.
  let className = "nav-button";
  if (active) {
    className += " nav-button--active";
  }
  return (
    <button tabIndex={tabIndex} className={className} onClick={onNav} data-destination={to}>
      {content ?? to}
    </button>
  );
};