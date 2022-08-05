import React from 'react';
import * as walletMetamask from "./metamask";
import * as walletDefi from "./defiWallet";
import * as walletConnect from "./walletConnect";
import * as utils from "../utils";
//import * as walletConnect from './walletConnect';
//import * as walletDefiwallet from "./defiWallet";
import WCQrMordal from "@walletconnect/qrcode-modal";
import WalletConnect from "@walletconnect/client";
import Popup from "reactjs-popup";
import { useEffect, useState } from 'react';
import './connectWallet.css'
import { images } from '../constants/image-constant';
const {
    metamask,
    walletConnectImage,
    crypto,
} = images;

function ConnectWallet() {
    const contentStyle = {
        marginLeft: 'auto',
        marginRight: 'auto',
    };

    async function connect(option) {
        switch (option) {
            case "defiwallet":
                await walletDefi.connect();
                break;
            case "wallet-connect":
                await walletConnect.connect();
                break;
            default:
                await walletMetamask.connect();
        }
        utils.reloadApp();
    }

    const handleClickDisconnect = () => {
        //connector.killSession();
        sessionStorage.clear();
        utils.reloadApp();
    };

    if (sessionStorage.getItem('address') != null) {
        console.log(sessionStorage.getItem('address'))
        var address = sessionStorage.getItem('address').substring(0, 6) + '...' + sessionStorage.getItem('address').substring(sessionStorage.getItem('address').length - 4)
        address = address.toUpperCase()
        return (
            <button className='connect-wallet-button' onClick={handleClickDisconnect}>{address}</button>
        );
    }

    return (
        <>
            <Popup
                trigger={<button className="connect-wallet-button">CONNECT WALLET</button>}
                modal
                contentStyle={contentStyle}
            >
                {close => (
                    <>

                        <div className="wallet-connect-container">
                            <div className="wallet-connect-content">
                                <div className='wallet-connect-card' onClick={(option) => connect('metamask')}>
                                    <img style={{ borderRadius: "10px", width: "75px", height: "auto" }} src={metamask}></img>
                                    <h1 style={{ fontFamily: 'Michroma', marginTop: '30px' }}>Metamask</h1>
                                </div>
                                <div className='wallet-connect-card' onClick={(option) => connect('wallet-connect')}>
                                    <img style={{ borderRadius: "10px", width: "75px", height: "auto" }} src={walletConnectImage}></img>
                                    <h1 style={{ fontFamily: 'Michroma', marginTop: '30px' }}>Wallet Connect</h1>
                                </div>
                                <div className='wallet-connect-card' onClick={(option) => connect('defiwallet')}>
                                    <img style={{ borderRadius: "10px", width: "75px", height: "auto", marginBottom: '10px' }} src={crypto}></img>
                                    <h1 style={{ fontFamily: 'Michroma', marginTop: '30px' }}>DeFi Wallet</h1>
                                </div>
                            </div>
                        </div>
                    </>

                )}
            </Popup>
        </>

    )

}

export default ConnectWallet;