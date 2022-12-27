import React, { createElement, MouseEventHandler, useState } from "react";
import { createRoot } from "react-dom/client";

import ButtonDock from "./components/ButtonDock";
import LoginDock from "./components/LoginDock";
import RegisterDock from "./components/RegisterDock";

type InputMouseEvent = MouseEventHandler<HTMLInputElement>;
type ButtonMouseEvent = MouseEventHandler<HTMLButtonElement>;
type HeadingMouseEvent = MouseEventHandler<HTMLHeadingElement>;

const App = () => {
  const [view, setView] = useState("home");

  const onNavigate: ButtonMouseEvent = event => {
    const target = event.target as HTMLElement;
    setView(target.dataset.destination!);
  };

  const onSubmitRegister: InputMouseEvent = event => {

  };

  const onSubmitLogin: InputMouseEvent = event => {

  };

  const onHomeClick: HeadingMouseEvent = event => {
    const target = event.target as HTMLElement;
    setView(target.dataset.destination!);
  };

  let viewComponent: JSX.Element;
  switch (view) {
    case "register":
      viewComponent = <RegisterDock onSubmitRegister={onSubmitRegister} />;
      break;
    case "login":
      viewComponent = <LoginDock onSubmitLogin={onSubmitLogin} />;
      break;
    case "home":
    default:
      viewComponent = <ButtonDock onNavigate={onNavigate} />;
      break;
  }

  return (
    <main className="content">
      <h1 className="title" onClick={onHomeClick} data-destination="home">TypeScript Authentication</h1>
      {viewComponent}
    </main>
  )
};

const rootNode = document.getElementById("root");
const root = createRoot(rootNode!);
root.render(createElement(App));