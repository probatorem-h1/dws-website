// wallet-defiwallet.ts
import { ethers } from "ethers"; // npm install ethers
import * as config from "../config/config";
import * as utils from "../utils";
// This is the SDK provided by Crypto.com DeFi Wallet
import { DeFiWeb3Connector } from "deficonnect"; // npm install deficonnect

// Main login flow for Crypto.com DeFi Wallet with Wallet Extension
// The connector must be activated, then it exposes a provider
// that is used by the ethers Web3Provider constructor.
export const connect = async () => {
  try {
    const connector = new DeFiWeb3Connector({
      supportedChainIds: [config.configVars.rpcNetwork.chainId],
      rpc: {
        [config.configVars.rpcNetwork.chainId]:
          config.configVars.rpcNetwork.rpcUrl,
      },
      pollingInterval: 15000,
    });
    await connector.activate();
    const provider = await connector.getProvider();
    const web3Provider = new ethers.providers.Web3Provider(provider);
    // Subscribe to events that reload the app
    connector.on("session_update", utils.reloadApp);
    connector.on("Web3ReactDeactivate", utils.reloadApp);
    connector.on("Web3ReactUpdate", utils.reloadApp);

    sessionStorage.setItem("walletProviderName", 'defiwallet')
    sessionStorage.setItem("address", (await web3Provider.listAccounts())[0])
    sessionStorage.setItem("browserWeb3Provider", web3Provider)
    sessionStorage.setItem("serverWeb3Provider", new ethers.providers.JsonRpcProvider(config.configVars.rpcNetwork.rpcUrl))
    sessionStorage.setItem("connected", true)
    sessionStorage.setItem("chainId", provider.chainId)
    sessionStorage.setItem("listener", connector)

  } catch (e) {
    console.log(e)
  }
};