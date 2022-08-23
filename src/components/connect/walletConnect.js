// wallet-connect.ts
import { ethers } from "ethers"; // npm install ethers
import * as config from "../config/config";
import * as utils from "../utils";
// This is the SDK provided by Wallet Connect
import WalletConnectProvider from "@walletconnect/web3-provider";

export const connect = async () => {
  try {
    const provider = new WalletConnectProvider({
      rpc: {
        [config.configVars.rpcNetwork.chainId]:
          config.configVars.rpcNetwork.rpcUrl,
      },
      chainId: config.configVars.rpcNetwork.chainId,
      bridge: "https://bridge.walletconnect.org",
    });
    await provider.enable();
    console.log(provider);
    const ethersProvider = new ethers.providers.Web3Provider(provider);

    // Subscribe to events that reload the app
    provider.on("accountsChanged", utils.reloadApp);
    provider.on("chainChanged", utils.reloadApp);
    provider.on("disconnect", utils.reloadApp);
    provider.on("connect", (error, payload) => {
      if (error) {
        console.log("connect error", error);
        throw error;
      }
      //walletConnect.connect(connector);

      // Get provided accounts and chainId
    });

    sessionStorage.setItem("walletProviderName", 'wallet-connect')
    sessionStorage.setItem("address", (await ethersProvider.listAccounts())[0])
    sessionStorage.setItem("browserWeb3Provider", ethersProvider)
    sessionStorage.setItem("serverWeb3Provider", new ethers.providers.JsonRpcProvider(config.configVars.rpcNetwork.rpcUrl))
    sessionStorage.setItem('wcProvider', provider)
    sessionStorage.setItem("connected", true)
    sessionStorage.setItem("chainId", provider.chainId)
    sessionStorage.setItem("listener", provider)

  } catch (e) {
    console.log(e);
  }
};