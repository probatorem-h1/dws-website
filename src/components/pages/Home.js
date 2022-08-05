import * as React from 'react'
import './Home.css'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/esm/Container';
import Stack from 'react-bootstrap/Stack';
import ConnectWallet from '../connect/connectWallet';
import Navbar from '../Navbar';
import { useEffect, useState } from 'react';





function Home() {
    return (
        <>
            <div style={{
                backgroundImage: "url(/images/background.jpg)",
                backgroundSize: 'Cover',
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Navbar />
                <div className='homepage-container'>
                    <h1 className='homepage-title'>DWS</h1>
                    <h2 className='homepage-acronym'>Decentralized Web3 Services</h2>
                    <a href='https://docs.dwsconsult.com' target="_blank" rel="noreferrer">
                        <button className='homepage-get-started'>LFG</button>
                    </a>
                </div>
            </div>
        </>
    );
}

export default Home;
