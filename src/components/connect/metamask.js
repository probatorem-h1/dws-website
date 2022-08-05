// wallet-metamask.ts

// Injected wallet
// Works with MetaMask in browser or in in-app browser

import { ethers } from "ethers"; // npm install ethers
import * as config from "../config/config";
import * as utils from "../utils";

// One feature of MetaMask is that the Dapp developer
// can programmatically
// change the network that the browser
// extension is connected to.
// This feature is implemented below,
// to automatically set - up Cronos
export const switchNetwork = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: config.configVars.rpcNetwork.chainIdHex }],
    });
  } catch (e) {
    console.log(e);
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: config.configVars.rpcNetwork.chainIdHex,
          chainName: config.configVars.rpcNetwork.chainName,
          rpcUrls: [config.configVars.rpcNetwork.rpcUrl],
          nativeCurrency: config.configVars.rpcNetwork.nativeCurrency,
          blockExplorerUrls: [config.configVars.rpcNetwork.blockExplorerUrl],
        },
      ],
    });
  }
};

function handleChainChanged(chainId) {
  console.log(chainId);
}

// Main login flow for injected wallet like MetaMask
export const connect = async () => {
  try {
    if (!window.ethereum){
      alert('Install Metamask')
    }
    let chainId = await window.ethereum.request({ method: "eth_chainId" });
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // It is possible to subscribe to events chainChanged,
    // accountsChanged or disconnect,
    // and reload the Dapp whenever one of these events occurs
   /* window.ethereum.on("chainChanged", utils.reloadApp());
    window.ethereum.on("accountsChanged", utils.reloadApp());
    window.ethereum.on("disconnect", utils.reloadApp());*/

    console.log(accounts[0])
    sessionStorage.setItem("walletProviderName", 'metamask')
    sessionStorage.setItem("address", accounts[0])
    sessionStorage.setItem("browserWeb3Provider", new ethers.providers.Web3Provider(window.ethereum))
    sessionStorage.setItem("serverWeb3Provider", new ethers.providers.JsonRpcProvider(config.configVars.rpcNetwork.rpcUrl))
    sessionStorage.setItem("connected", true)
    sessionStorage.setItem("chainId", utils.hexToInt(chainId))
    sessionStorage.setItem("listener", window.ethereum)
  } catch (e) {
    window.alert(e)
    console.log(e);
  }
};