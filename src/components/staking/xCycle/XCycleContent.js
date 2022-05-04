import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SlideToggle from '../../common/SlideToggle';
import CycleButton from '../../common/CycleButton';
import colors from '../../../constants/colors';
import { formatTokenAmount } from '../../../constants/format';
import CycleABI from '../../../abis/Cycle.json';
import Web3 from 'web3';
import addresses from '../../../constants/addresses';
import { useWeb3React } from '@web3-react/core';
import CycleAlert from '../../common/CycleAlert';
import { MaxUint256 } from '@ethersproject/constants';
import XCYCLEbalanceValue from './XCYCLEbalanceValue';

const DEPOSIT = 1;
const WITHDRAW = 2;

const Container = styled.div`
    width: 100%;

    .input-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        border-top: 1px solid ${colors.borderLight};
        

        .stake-options {
            border-right: 1px solid ${colors.borderLight};
            padding: 20px 10px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .swap-links {
                width: 100%;
                display: flex;
                justify-content: center;
                font-size: 0.7em;
                padding-top: 10px;

                .cycle-link {
                    padding-right: 10px;
                }
            }
        }

        .cycle-claim {
            padding: 20px 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            font-family: Ubuntu Mono;
            font-weight: 700;
            letter-spacing: 0.05em;

            .claim-title-text {
                // font-size: 1.2em;
                font-size: 1em;
                color: ${colors.lightGrey};
            }

            .kickback-text {
                color: ${colors.lightGrey};
                font-size: 0.8em;
            }

            .cycle-amount {
                // font-size: 1.2em;
                font-size: 1em;
            }
        }
    }

    .input-wrapper {
        position: relative;
        margin-bottom: 30px;

        .balance-input {
            border: 1px solid ${colors.slideToggle};
            border-top: 0;
            font: inherit;
            padding: 10px;
            position: relative;
            width: 202px;
            box-sizing: border-box;
            font-family: Ubuntu Mono;
            font-weight: 700;
            letter-spacing: 0.05em;

            &::placeholder {
                color: #bbbbbb;
            }
        }
        
        .lp-balance {
            position: absolute;
            font-size: 0.7em;
            top: 47px;
            left: 11px;
            padding: 2px 0;
        }

        .max-select {
            position: absolute;
            font-size: 0.7em;
            background: ${colors.slideToggle};
            color: black;
            padding: 3px 4px;
            top: 11px;
            right: 5px;
            cursor: pointer;
            font-family: Ubuntu Mono;
            font-weight: 700;
            letter-spacing: 0.05em;
        }
    }

    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
    }

    input[type=number] {
        -moz-appearance: textfield;
    }

    // MOBILE

    @media screen and (max-width: 450px) {
        .input-grid {
            grid-template-columns: unset;
            grid-template-rows: 5fr 4fr;

            .stake-options {
                border-right: 0px;
                border-bottom: 1px solid ${colors.borderLight};
            }

            .cycle-claim {
                justify-content: space-around;
                padding: 15px 10px;
            }
        }
    }
`;

const XCycleRewardsContent = ({ xCYCLEbalance, updatexCYCLEbalance, panelOpen, getxCycleValue, getxCycleAPY, xCycleContract }) => {
    const web3React = useWeb3React();

    const { account, active, library } = web3React;

    const [action, setAction] = useState(DEPOSIT);
    const [inputText, setInputText] = useState("");
    const [cycleBalance, setCycleBalance] = useState('0');
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openFailureAlert, setOpenFailureAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [approveCYCLE, setApproveCYCLE] = useState(false);
    const [buttonText, setButtonText] = useState("");
    const [inputEnabled, setInputEnabled] = useState(false);
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [avaxRewardAmount, setAvaxRewardAmount] = useState('0');
    const [reinvestButtonLoading, setReinvestButtonLoading] = useState(false);
    const [actionButtonLoading, setActionButtonLoading] = useState(false);
    const [toggleFrozen, setToggleFrozen] = useState(false);
    const [kickbackAmount, setKickbackAmount] = useState(null);

    const [CycleContract, setCycleContract] = useState(null);

    useEffect(() => {
        if (active && library) {
            const web3 = new Web3(library.givenProvider);
            const _CycleContract = new web3.eth.Contract(CycleABI, addresses.cycle);
            setCycleContract(_CycleContract);
        }
    }, [active]);

    const getCycleBalance = async () => {
        if (account && CycleContract) {
            const bal = await CycleContract.methods.balanceOf(account).call();
            setCycleBalance(bal);
        }
    }

    useEffect(() => {
        getCycleBalance();
        const interval = setInterval(getCycleBalance, 20000);
        return () => clearInterval(interval);
    }, [account, CycleContract]);

    const getAvaxRewardAmount = async () => {
        if (xCycleContract) {
            const rewardAmount = await xCycleContract.methods.getRewardsEarned().call();
            setAvaxRewardAmount(rewardAmount);
        }
    }

    useEffect(() => {
        getAvaxRewardAmount();
        const interval = setInterval(getAvaxRewardAmount, 20000);
        return () => clearInterval(interval);
    }, [xCycleContract]);

    const getKickbackAmount = async () => {
        if (xCycleContract) {
            const ka = await xCycleContract.methods.getKickbackAmount().call();
            setKickbackAmount(ka);
        }
    }

    useEffect(() => {
        getKickbackAmount();
        const interval = setInterval(getKickbackAmount, 20000);
        return () => clearInterval(interval);
    }, [xCycleContract]);

    useEffect(() => {
        setInputText("");
        if (panelOpen) {
            if (action === DEPOSIT) {
                setButtonText('Deposit CYCLE');
                setInputEnabled(false);
                setToggleFrozen(true);
                account && CycleContract && CycleContract.methods
                    .allowance(account, addresses.xCycle)
                    .call()
                    .then(amount => {
                        setToggleFrozen(false);
                        if (amount === '0') {
                            setButtonEnabled(true);
                            setApproveCYCLE(true);
                            setButtonText('Approve');
                        } else {
                            setApproveCYCLE(false);
                            setButtonText(`Deposit CYCLE`);
                            setInputEnabled(true);
                        }
                    });
            } else {
                setButtonText("Withdraw CYCLE");
            }
        }
    }, [action, panelOpen, account, CycleContract]);

    useEffect(() => {
        if (inputText || (action === DEPOSIT && approveCYCLE)) {
            setButtonEnabled(true);
        } else {
            setButtonEnabled(false);
        }
    }, [inputText, action, approveCYCLE]);

    const depositCYCLE = async () => {
        if (!inputText || !account || !xCycleContract) return;

        const amount = Web3.utils.toWei(inputText);

        await xCycleContract.methods
            .deposit(amount)
            .send({ from: account })
            .on('sending', () => {
                setActionButtonLoading(true);
            })
            .on('sent', () => {
                setActionButtonLoading(true);
            })
            .on('receipt', async () => {
                setActionButtonLoading(false);
                setAlertText("Deposit Successful");
                setOpenSuccessAlert(true);
                setInputText("");
                await updatexCYCLEbalance();
                await getCycleBalance();
            })
            .on('error', () => {
                setActionButtonLoading(false);
                setAlertText("Unable to Deposit");
                setOpenFailureAlert(true);
                setInputText("");
            });
    }

    const withdrawCYCLE = async () => {
        if (!inputText || !account || !xCycleContract) return;

        const amount = Web3.utils.toWei(inputText);

        await xCycleContract.methods
            .withdraw(amount)
            .send({ from: account })
            .on('sending', () => {
                setActionButtonLoading(true);
            })
            .on('sent', () => {
                setActionButtonLoading(true);
            })
            .on('receipt', async () => {
                setActionButtonLoading(false);
                setAlertText("Withdraw Successful");
                setOpenSuccessAlert(true);
                setInputText("");
                await updatexCYCLEbalance();
                await getCycleBalance();
            })
            .on('error', () => {
                setActionButtonLoading(false);
                setAlertText("Unable to Withdraw");
                setOpenFailureAlert(true);
                setInputText("");
            });
    }

    const approveCYCLEforDeposit = () => {
        if (!account || !CycleContract) return;

        CycleContract.methods
            .approve(addresses.xCycle, MaxUint256)
            .send({ from: account })
            .on('sending', () => {
                setActionButtonLoading(true);
            })
            .on('sent', () => {
                setActionButtonLoading(true);
            })
            .on('receipt', () => {
                setActionButtonLoading(false);
                setAlertText("Approve Successful");
                setOpenSuccessAlert(true);
                setApproveCYCLE(false);
                setInputEnabled(true);
                setButtonEnabled(false);
                setButtonText(`Deposit CYCLE`);
            })
            .on('error', () => {
                setActionButtonLoading(false);
                setAlertText("Unable to Approve");
                setOpenFailureAlert(true);
            });
    }

    const executeTransaction = () => {
        if (action === DEPOSIT) {
            if (approveCYCLE) {
                approveCYCLEforDeposit();
            } else {
                depositCYCLE();
            }
        } else {
            withdrawCYCLE();
        }
    }

    const getMaxValue = () => {
        if (action === DEPOSIT) {
            setInputText(Web3.utils.fromWei(cycleBalance));
        } else {
            setInputText(Web3.utils.fromWei(xCYCLEbalance));
        }
    }

    const reinvest = () => {
        if (!account || !xCycleContract) return;

        xCycleContract.methods
            .reinvest()
            .send({ from: account })
            .on('sending', () => {
                setReinvestButtonLoading(true);
            })
            .on('sent', () => {
                setReinvestButtonLoading(true);
            })
            .on('receipt', async () => {
                setReinvestButtonLoading(false);
                setAlertText("Reinvest Successful");
                setOpenSuccessAlert(true);
                await getAvaxRewardAmount();
                await getKickbackAmount();
                await getxCycleValue();
                await getxCycleAPY();
            })
            .on('error', () => {
                setReinvestButtonLoading(false);
                setAlertText("Unable to Reinvest");
                setOpenFailureAlert(true);
            })
    }

    const zeroDeposited = !xCYCLEbalance || xCYCLEbalance === '0';

    return (
        <>
            <Container>
                {!zeroDeposited && <XCYCLEbalanceValue xCYCLEbalance={xCYCLEbalance} panelOpen={panelOpen} xCycleContract={xCycleContract} />}
                <div className="input-grid">
                    <div className="stake-options">
                        <SlideToggle 
                            option1="Deposit"
                            option2="Withdraw"
                            option={action}
                            setOption={setAction}
                            zeroBalance={zeroDeposited}
                            freezeToggles={toggleFrozen}
                        />
                        <div className="input-wrapper">
                            <input
                                type="number"
                                className="balance-input"
                                placeholder={action === DEPOSIT ? "Enter CYCLE" : "Enter xCYCLE"}
                                value={inputText}
                                onChange={e => setInputText(e.target.value)}
                                style={{
                                    width: `${zeroDeposited ? "207px" : ""}`
                                }}
                                disabled={!inputEnabled}
                            />
                            <div className="lp-balance">
                                CYCLE Balance: {formatTokenAmount(cycleBalance, 4)}
                            </div>
                            {((action === DEPOSIT && cycleBalance !== '0') || (action === WITHDRAW && xCYCLEbalance !== '0')) && 
                            <div
                                className="max-select"
                                onClick={getMaxValue}
                                style={{
                                    display: `${approveCYCLE ? "none" : "block"}`
                                }}
                            >
                                MAX
                            </div>}
                        </div>
                        <CycleButton
                            text={buttonText}
                            customStyle={{
                                padding: '8px 16px',
                                minHeight: 34
                            }}
                            onClick={executeTransaction}
                            loading={actionButtonLoading}
                            disabled={!buttonEnabled}
                        />
                    </div>
                    <div className="cycle-claim">
                        <div className="claim-title-text">
                            Rewards Accumulated
                        </div>
                        <div className="cycle-amount">
                            {formatTokenAmount(avaxRewardAmount, 5)} AVAX
                        </div>
                        <div className="kickback-text">
                            Reinvest Rewards: {kickbackAmount && formatTokenAmount(kickbackAmount, 5)} AVAX
                        </div>
                        <CycleButton
                            text={`Reinvest`}
                            customStyle={{
                                padding: '8px 16px'
                            }}
                            onClick={reinvest}
                            loading={reinvestButtonLoading}
                            disabled={avaxRewardAmount === '0'}
                        />
                    </div>
                </div>
            </Container>
            <CycleAlert
                openAlert={openSuccessAlert}
                setOpenAlert={setOpenSuccessAlert}
                type="success"
                text={alertText}
            />
            <CycleAlert
                openAlert={openFailureAlert}
                setOpenAlert={setOpenFailureAlert}
                type="error"
                text={alertText}
            />
        </>
    );
}

export default XCycleRewardsContent;
