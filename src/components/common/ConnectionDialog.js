import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { AVAX_MAINNET, AVAX_MAINNET_CHAIN_ID } from '../../constants/chain';
import CycleButton from './CycleButton';
import { InjectedConnector } from '@web3-react/injected-connector';
import colors from '../../constants/colors';

const injected = new InjectedConnector({ supportedChainIds: [AVAX_MAINNET] });

const StyledDialog = styled(Dialog)`
    .MuiPaper-root {
        padding: 20px;
        font-family: Ubuntu Mono;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-align: center;
        font-size: 1.3em;
        border-radius: 10px;

        .provider-notice {
            font-size: 0.8em;
            margin-top: 5px;
            border-radius: 25px;

            div {
                margin: 10px 0;
            }
        }

        .connection-notice {
            font-size: 0.8em;
            margin-top: 20px;
            color: ${colors.borderGrey};
            border-radius: 25px;
        }
    }
`;

const AVALANCHE_MAINNET_PARAMS = {
    chainId: AVAX_MAINNET_CHAIN_ID, // A 0x-prefixed hexadecimal chainId
    chainName: 'Avalanche Mainnet C-Chain',
    nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://cchain.explorer.avax.network/']
}

const ConnectionDialog = ({ open, setOpen }) => {
    const web3React = useWeb3React();

    const [hasProvider, setHasProvider] = useState(false);
    const [showChainNotice, setShowChainNotice] = useState(false);
    const [onAvaxMainnet, setOnAvaxMainnet] = useState(false);

    useEffect(() => {
        const checkHasProvider = async () => {
            await injected.getProvider().then(provider => {
                if (provider) setHasProvider(true);
            });
        }
        open && checkHasProvider();
    }, [open]);

    const handleClick = () => {
        if (onAvaxMainnet) {
            web3React.activate(injected).then(() => {
                setOpen(false);
            })
        } else {
            setShowChainNotice(true);
        }
    }

    const addChainC = () => {
        injected.getProvider().then(provider => {
            provider.request({
                method: 'wallet_addEthereumChain',
                params: [AVALANCHE_MAINNET_PARAMS]
            })
            .then(() => {
                setOnAvaxMainnet(true);
                setShowChainNotice(false);
            })
            .catch((error) => {
                console.log(error)
            })
        });
    }

    const getOnAvaxMainnet = () => {
        const onMainnet = Web3.givenProvider && Web3.givenProvider.chainId === AVAX_MAINNET_CHAIN_ID;
        setOnAvaxMainnet(onMainnet);
        if (onMainnet) setShowChainNotice(false);
    }

    useEffect(() => {
        getOnAvaxMainnet();
    }, [open]);

    const handleClose = () => {
        setOpen(false);
        setShowChainNotice(false);
    }

    return (
        <StyledDialog open={open} onClose={handleClose}>
            <div>
                Connect to Cycle
            </div>
            {!hasProvider && 
                <div className="provider-notice">
                    <div>Desktop: Install Metamask browser extension</div>
                    <div>Mobile: Access from Metamask app browser </div>
                </div>}
            {hasProvider && !onAvaxMainnet && <CycleButton
                text="Add / Switch to Avalanche"
                onClick={addChainC}
                customStyle={{
                    padding: 10,
                    marginTop: 20,
                    fontSize: '0.8em'
                }}
            />}
            {hasProvider && <CycleButton
                text="Connect Account"
                onClick={handleClick}
                customStyle={{
                    padding: 10,
                    marginTop: 20,
                    fontSize: '0.8em'
                }}
            />}
            {showChainNotice && <div className="connection-notice">
                Connect to Avalanche C-Chain
            </div>}
        </StyledDialog>
    );
}

export default ConnectionDialog;
