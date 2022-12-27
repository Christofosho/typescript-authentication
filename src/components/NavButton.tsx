import React, { MouseEventHandler } from "react";

interface NavButtonProps {
  content: string,
  to: string,
  onNav: MouseEventHandler<HTMLButtonElement>,
};

export default ({ content, to, onNav }: NavButtonProps) => {
  return (
    <button className="button" onClick={onNav} data-destination={to}>
      {content}
    </button>
  );
};