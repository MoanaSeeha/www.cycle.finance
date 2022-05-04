import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import WebFont from 'webfontloader';

WebFont.load({
    google: {
        families: [
            'Montserrat: 400, 500, 600',
            'Ubuntu Mono: 400, 700'
        ]
    }
})

const getLibrary = (provider) => {
    return new Web3(provider);
}

ReactDOM.render(
    <React.StrictMode>
        <Web3ReactProvider getLibrary={getLibrary}>
            <App />
        </Web3ReactProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
