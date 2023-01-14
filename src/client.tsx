import React, { createElement, MouseEventHandler, useState } from "react";
import { createRoot } from "react-dom/client";

import { AccountError } from "./constants";
import { HOME, LOGIN, REGISTER } from "./constants";
import { ERROR_NONE } from "./constants";

import Nav from "./components/Nav";
import Home from "./components/Home";
import Account from "./components/Account";
import Error from "./components/Error";

import { sendCommand } from "./fetcher";

type ButtonMouseEvent = MouseEventHandler<HTMLButtonElement>;
type HeadingMouseEvent = MouseEventHandler<HTMLHeadingElement>;

const App = () => {
  const [view, setView] = useState(HOME);
  const [error, setError] = useState<AccountError>(ERROR_NONE);

  const onNavigate: ButtonMouseEvent = event => {
    const target = event.target as HTMLElement;
    setView(target.dataset.destination!);
  };

  const onHomeClick: HeadingMouseEvent = event => {
    const target = event.target as HTMLElement;
    setView(target.dataset.destination!);
  };

  let viewComponent: JSX.Element;
  switch (view) {
    case LOGIN:
      viewComponent = <Account action={LOGIN} onSubmit={sendCommand} onError={setError} />;
      break;
    case REGISTER:
      viewComponent = <Account action={REGISTER} onSubmit={sendCommand} onError={setError} />;
      break;
    case HOME:
    default:
      viewComponent = <Home />
      break;
  }

  return (<>
    <header className="header">
      <h1 className="title" onClick={onHomeClick} data-destination={HOME}>
        TypeScript Authentication
      </h1>
      <Nav onNavigate={onNavigate} active={view} />
    </header>
    <main className="content">
      {viewComponent}
      {error.code
      ? <Error resetError={setError} code={error.code} message={error.message} />
      : null}
    </main>
    <footer></footer>
  </>)
};

const rootNode = document.getElementById("root");
const root = createRoot(rootNode!);
root.render(createElement(App));