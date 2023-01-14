import { SendData } from "./constants";

export const sendCommand = (command: string, data: SendData) => {
  fetch("/account/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
};