import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../../constants/colors';
import SlideToggle from '../../common/SlideToggle';
import BalanceInput from './BalanceInput';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { DEPOSIT, LP } from '../../../constants/depositForm';
import { useWeb3React } from '@web3-react/core';

const Container = styled.div`
    .deposit-container {
        position: relative;
        border-top: 1px solid ${colors.borderLight};

        .MuiIconButton-root {
            padding: 5px;
            color: rgba(0, 0, 0, 0.54);
        }

        .deposit-head-text {
            padding: 15px 0;
            color: ${colors.lightGrey};
            cursor: pointer;
            user-select: none;

            .text-container {
                display: flex;
                justify-content: center;
                align-items: center;

                .text {
                    padding: 0 10px;
                }
            }

            .open {
                color: white;
                transform: rotate(180deg);
                transition: transform 0.3s;
            }

            .closed {
                transition: transform 0.3s;
            }
        }

        .deposit-expanded-hide {
            max-height: 0;
            transform: scaleY(0);
            transform-origin: top;
            transition: transform 0.3s, max-height 0.3s;
        }

        .deposit-expanded-show {
            max-height: 350px;
            transform: scaleY(1);
            transition: transform 0.3s, max-height 0.3s;
        }
    }

    .notice {
        font-size: 0.8em;
        padding-bottom: 10px;
    }

    .interaction-options {
        display: flex;
        justify-content: space-evenly;
    }

    .interaction-inputs {
        padding-bottom: 15px!important;
    }

    // MOBILE

    @media screen and (max-width: 550px) {
        .interaction-options {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            height: 100px;

            .token-toggle {
                min-width: 206px !important;

                .option {
                    min-width: 83px !important;
                }
            }
        }

        .interaction-inputs {
            margin-bottom: 15px!important;
        }
    }

    @media screen and (max-width: 450px) {
        .text-container {
            .text {
                font-size: 0.9em;
            }
        }
    }
`;

const DepositForm = ({ zeroBalance, vault, updateShareBalance, setOpenSuccessAlert, setOpenFailureAlert, setAlertText, panelOpen, shares }) => {
    const { account } = useWeb3React();

    const [action, setAction] = useState(DEPOSIT);
    const [token, setToken] = useState(LP);
    const [togglesFrozen, setTogglesFrozen] = useState(false);
    const [showDepositForm, setShowDepositForm] = useState(false);

    useEffect(() => {
        if (!panelOpen) setShowDepositForm(false);
    }, [panelOpen]);

    useEffect(() => {
        if (!showDepositForm) {
            setAction(DEPOSIT);
            setToken(LP);
        }
    }, [showDepositForm, account]);

    return (
        <Container>
            <div className="deposit-container">
                <div
                    className="content-row deposit-head-text"
                    onClick={() => setShowDepositForm(f => !f)}
                >
                    <div className="text-container">
                        <ExpandMoreIcon className={`${showDepositForm ? "open" : "closed"}`} />
                        <div className="text">Deposit / Withdraw</div>
                        <ExpandMoreIcon className={`${showDepositForm ? "open" : "closed"}`} />
                    </div>
                </div>
                <div className={`${showDepositForm ? "deposit-expanded-show" : "deposit-expanded-hide"}`}>
                    {vault.protocol === 'penguin' && <div className="content-row notice">
                        Please Note: Penguin applies a 4% withdraw fee
                    </div>}
                    <div className="content-row interaction-options">
                        <SlideToggle
                            option1="Deposit"
                            option2="Withdraw"
                            option={action}
                            setOption={setAction}
                            zeroBalance={zeroBalance}
                            freezeToggles={togglesFrozen}
                        />
                        <SlideToggle
                            className="token-toggle"
                            option1={vault.nonGeneric ? vault.LPtoken : "LP"}
                            option2="AVAX"
                            option={token}
                            setOption={setToken}
                            freezeToggles={togglesFrozen}
                            onlyOption1={vault.lpOnly}
                        />
                    </div>
                    <div className="content-row interaction-inputs">
                        <BalanceInput
                            action={action}
                            token={token}
                            updateShareBalance={updateShareBalance}
                            vault={vault}
                            setTogglesFrozen={setTogglesFrozen}
                            setOpenSuccessAlert={setOpenSuccessAlert}
                            setOpenFailureAlert={setOpenFailureAlert}
                            setAlertText={setAlertText}
                            showDepositForm={showDepositForm}
                            shares={shares}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default DepositForm;
