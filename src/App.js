import * as React from 'react'
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import DecentraLink from './components/pages/DecentraLink';
import { useEffect, useState } from 'react';
import * as utils from "./components/utils";
import * as walletMetamask from "./components/connect/metamask";
import * as walletDefi from "./components/connect/defiWallet";
import * as walletConnect from "./components/connect/walletConnect";
import Listener from './components/connect/Listener';




function App() {
  Listener();
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
