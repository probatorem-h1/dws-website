import * as utils from "../utils";
import WalletConnectProvider from "@walletconnect/web3-provider";
import * as config from "../config/config"
import { DeFiWeb3Connector } from "deficonnect"; // npm install deficonnect
import { ethers } from "ethers"; // npm install ethers





async function Listener() {
    switch (sessionStorage.getItem('walletProviderName')) {
        case "defiwallet":
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
                connector.on("session_update", (e) => {
                    console.log('lol')
                });
                connector.on("Web3ReactDeactivate", (e) => {
                    sessionStorage.clear();
                    utils.reloadApp();
                });
                connector.on("Web3ReactUpdate", (e) => {
                    sessionStorage.setItem("address", e.account)
                    sessionStorage.setItem("chainId", e.chainId)
                });
            } catch (e) {
                console.log(e)
                window.alert("Install Crypto.com DeFi Wallet");
            }
        case "wallet-connect":
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
            provider.on("chainChanged", (e) => {
                sessionStorage.setItem("chainId", utils.hexToInt(e))
                utils.reloadApp();
            });
            provider.on("accountsChanged", (e) => {
                sessionStorage.setItem("address", e[0])
                utils.reloadApp();
            });
            provider.on("disconnect", () => {
                sessionStorage.clear();
                utils.reloadApp();
            });

        } catch (e) {
            console.log(e);
        }
        case "metamask":
            window.ethereum.on("chainChanged", (e) => {
                sessionStorage.setItem("chainId", utils.hexToInt(e))
                utils.reloadApp();
            });
            window.ethereum.on("accountsChanged", (e) => {
                sessionStorage.setItem("address", e[0])
                utils.reloadApp();
            });
            window.ethereum.on("disconnect", () => {
                sessionStorage.clear();
                utils.reloadApp();
            });
    }
}
export default Listener;