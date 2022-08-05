// helper/utils.ts
import { ethers } from "ethers"; // npm install ethers

import * as config from "./config/config";

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const hexToInt = (s) => {
  const bn = ethers.BigNumber.from(s);
  return parseInt(bn.toString());
};

export const reloadApp = () => {
  window.location.reload();
};

export const handleClickDisconnect = () => {
  //connector.killSession();
  sessionStorage.clear();
  reloadApp();
};