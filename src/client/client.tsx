import React, {
  createElement, MouseEventHandler, useState
} from "react";
import { createRoot } from "react-dom/client";

import { AccountResponse, ERROR_NONE } from "../common/verify.js";
import { HOME, LOGIN, REGISTER } from "./fetcher.js";

import Nav from "./components/Nav.js";
import Home from "./components/Home.js";
import Account from "./components/Account.js";
import Error from "./components/Error.js";

import { sendCommand } from "./fetcher.js";

type ButtonMouseEvent = MouseEventHandler<HTMLButtonElement>;
type HeadingMouseEvent = MouseEventHandler<HTMLHeadingElement>;

const App = () => {
  const [view, setView] = useState(HOME);
  const [notice, setNotice] = useState<AccountResponse>(ERROR_NONE);

  const onNavigate: ButtonMouseEvent&HeadingMouseEvent = event => {
    const target = event.target as HTMLElement;
    setNotice(ERROR_NONE);
    setView(target.dataset.destination!);
  };

  let viewComponent: JSX.Element;
  switch (view) {
    case LOGIN:
      viewComponent = <Account action={LOGIN} onSubmit={sendCommand} onNotification={setNotice} />;
      break;
    case REGISTER:
      viewComponent = <Account action={REGISTER} onSubmit={sendCommand} onNotification={setNotice} />;
      break;
    case HOME:
    default:
      viewComponent = <Home />
      break;
  }

  return (<>
    <header className="header">
      <h1 className="title" onClick={onNavigate} data-destination={HOME} tabIndex={1}>
        TypeScript Authentication
      </h1>
      <Nav onNavigate={onNavigate} active={view} />
    </header>
    <main className="content">
      {viewComponent}
      {notice.code
      ? <Error code={notice.code} message={notice.message} />
      : <div className="vertical-filler-15vh"></div>}
    </main>
  </>)
};

const rootNode = document.getElementById("root");
const root = createRoot(rootNode!);
root.render(createElement(App));