import React, { useContext } from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import WalletIcon from '@material-ui/icons/AccountBalanceWalletRounded';
import { useWeb3React } from '@web3-react/core';
import { InjectedContext } from '../../../App';
import colors from '../../../constants/colors';
import CloseIcon from '@material-ui/icons/Close';

const ExplorerLink = "https://snowtrace.io/address/";

const StyledWallet = styled.div`
    .wallet-icon {
        color: ${colors.pallet.one};
        padding: 10px;  
    }

    .wallet-icon:hover {
        border-radius: 5px;
        border: 0.5px white solid;
    }

    .wallet-address {
        color: ${colors.pallet.one};
        height: 48px;
        font-size: 0.75em;
        font-weight: 500;
        display: flex;
        align-items: center;
        user-select: none;
        cursor: pointer;
        padding-left: 15px;
        padding-right: 15px;
    }


    .disconnect-button:hover {
        background-color: red;
    }

    .address:hover {
        transform: scale(1.15);
    }

    .connect {
        font-size: small;
        padding-left: 5px;
    }

    // MOBILE

    @media screen and (max-width: 650px) {
        .wallet-address {
            font-size: 0.625em;
            padding-left: 0;
            padding-right: 0;
        }

        .disconnect-button {
            position: relative;
            display:flex;
            background-color: transparent;
            color: white;
            border: 2px white solid;
            border-radius: 50%;
            cursor: pointer;
            text-align: center;
            padding: 3px;
        }

        .connect {
            display: none;
        }
    }



    @media screen and (max-width: 450px) {
        .wallet-address {
            font-size: 0.625em;
        }
    }
`;

const openLink = link => window.open(link, "_blank");

const Wallet = () => {
    const web3React = useWeb3React();

    const { account, active, deactivate } = web3React;

    const { setConnectionDialogOpen } = useContext(InjectedContext);

    return (
        <StyledWallet>
            {!active && 
                <IconButton
                    className="wallet-icon"
                    onClick={() => setConnectionDialogOpen(true)}
                >
                    <WalletIcon />
                    <div className="connect">CONNECT</div>
                </IconButton>
            }
            {account && 
                <div className="wallet-address">
                    <div className="address"
                        onClick={() => openLink(ExplorerLink+account)}
                    >
                        {account.substr(0, 6)}
                    </div> 
                </div>  
            }
        </StyledWallet>  
    );
}

export default Wallet;
