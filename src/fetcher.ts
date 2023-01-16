import { AccountResponse } from "./verify";

export const HOME: string = "home";
export const LOGIN: string = "login";
export const REGISTER: string = "register";

export type SendData = {
  username?: string,
  password?: string,
};

export type ResponseData = {
  success: boolean,
  body: AccountResponse,
};

export const sendCommand = async (
  command: string,
  data: SendData,
  callback: (data: ResponseData) => void
) => {
  const response = await fetch(command, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const data: ResponseData = await response.json();
    callback(data);
  }
};