import React from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import * as utils from "../utils";
import * as config from "../config/config";
import ConnectWallet from "../connect/connectWallet";
import './DecentraLink.css'
import { useEffect, useState } from 'react';
import Navbar from '../Navbar';
const axios = require('axios').default;






function DecentraLink() {
    let address = ''
    if (sessionStorage.getItem('address') != null) {
        address = sessionStorage.getItem('address').substring(0, 6) + '...' + sessionStorage.getItem('address').substring(sessionStorage.getItem('address').length - 4)
    }
    address = address.toUpperCase()
    let username = ''
    let guildName = ''
    let rsaToken = ''

    const [isTransacting, setIsTransacting] = useState(false);
    const [finished, setFinished] = useState(false);
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    function getDiscordID() {
        let path = []
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        rsaToken = urlParams.get('info')
        username = urlParams.get('username')
        guildName = urlParams.get('guildName')
        path.push(username)
        path.push(guildName)
        return path


    }
    getDiscordID()

    async function linkDiscord(e) {
        e.preventDefault()
        const wallet = sessionStorage.getItem("browserWeb3Provider")
            .getSigner();
        setIsTransacting(true)
        let signature = await wallet.signMessage(rsaToken);
        const data = JSON.stringify({
            sigHash: signature,
            token: rsaToken,
            walletID: sessionStorage.getItem("address"),
        });
        try {
            let response = await axios.post('https://divinelink.thedivinefemininenft.art', data)
            console.log(response.status)
            if (response.data == 'Success!') {
                setIsTransacting(false)
                setFinished(true)
                await sleep(3000)
                setFinished(false)
            } else {
                window.alert(response.data)
                setIsTransacting(false)
            }
        } catch (e) {
            window.alert('Internal Error')
            setIsTransacting(false)


        }



    }

    return (
        <>
            <div style={{ height: '100vh', backgroundColor:'#231f20' }}>
                <Navbar />
                <div className="decentra-container">
                    <h1 className="decentra-header">DECENTRA LINK</h1>
                    {isTransacting ? (<Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'black' }}
                        open={isTransacting}
                        onClick={!isTransacting}
                    >
                        <h1 style={{ fontSize: '40px', marginRight: '20px', fontFamily: 'Michroma' }}>Linking...</h1><CircularProgress color="inherit" />
                    </Backdrop>) : <></>}
                    {finished ? (<Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'black' }}
                        open={finished}
                        onClick={!finished}
                    >
                        <h1 style={{ fontSize: '40px', textAlign: 'center', fontFamily: 'Michroma' }}>Wallet Linked! <br /> <h3 style={{ fontSize: '25px', textAlign: 'center', fontFamily: 'Josefin Sans' }}>Your Role Will Be Assigned Shortly</h3></h1>
                    </Backdrop>) : <></>}
                    <div className="connect-wrapper">
                        <div className="info-column">
                            <div style={{ color: 'white', fontFamily: 'Michroma', fontWeight: 'bold', fontSize: '20px' }}>Wallet Address:</div>
                            <div style={{ color: 'white', fontFamily: 'Michroma', fontWeight: 'bold', fontSize: '20px' }}>{address}</div>
                        </div>
                        <div className="account-guild-wrapper">
                            <div className="info-column">
                                <div style={{ color: 'white', fontFamily: 'Michroma', fontWeight: 'bold', fontSize: '20px' }}>Discord User:</div>
                                <div style={{ color: 'white', fontFamily: 'Michroma', fontWeight: 'bold', fontSize: '20px' }}>{username}</div>
                            </div>
                            <div className="info-column">
                                <div style={{ color: 'white', fontFamily: 'Michroma', fontWeight: 'bold', fontSize: '20px' }}>Server:</div>
                                <div style={{ color: 'white', fontFamily: 'Michroma', fontWeight: 'bold', fontSize: '20px' }}>{guildName}</div>
                            </div>

                        </div>
                        <div className="warning-section">
                            <div className='warning-section-header'>By clicking LINK WALLET you are:</div>
                            <ul className="warning-section-list">
                                <li>Linking your wallet to: {username} & {guildName}</li>

                            </ul>
                        </div>
                        <div>
                            <form onSubmit={linkDiscord}>
                                <button type='submit' className="inputButton">LINK WALLET</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default DecentraLink;