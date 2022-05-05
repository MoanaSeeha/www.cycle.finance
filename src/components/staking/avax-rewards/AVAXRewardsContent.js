import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SlideToggle from '../../common/SlideToggle';
import CycleButton from '../../common/CycleButton';
import colors from '../../../constants/colors';
import { formatTokenAmount } from '../../../constants/format';
import CycleABI from '../../../abis/Cycle.sol/Cycle.json';
import Web3 from 'web3';
import addresses from '../../../constants/addresses';
import { useWeb3React } from '@web3-react/core';
import CycleAlert from '../../common/CycleAlert';
import { MaxUint256 } from '@ethersproject/constants';
import CurrentValueCYCLE from './CurrentValueCYCLE';

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
                font-size: 1.2em;
                color: ${colors.lightGrey};
            }

            .cycle-amount {
                font-size: 1.2em;
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

const AVAXRewardsContent = ({ cycleStaked, updateCycleStaked, panelOpen, AVAXRewardsContract, PriceHelperContract }) => {
    const web3React = useWeb3React();

    const { account, active, library } = web3React;

    // 1 - Stake, 2 - Withdraw
    const [action, setAction] = useState(1);
    const [inputText, setInputText] = useState("");
    const [cycleBalance, setCycleBalance] = useState('0');
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openFailureAlert, setOpenFailureAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [approveCYCLE, setApproveCYCLE] = useState(false);
    const [buttonText, setButtonText] = useState("");
    const [inputEnabled, setInputEnabled] = useState(false);
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [cycleEarned, setCycleEarned] = useState('0');
    const [claimButtonLoading, setClaimButtonLoading] = useState(false);
    const [CycleButtonLoading, setCycleButtonLoading] = useState(false);
    const [toggleFrozen, setToggleFrozen] = useState(false);

    const [CycleContract, setCycleContract] = useState(null);

    useEffect(() => {
        if (active && library) {
            const web3 = new Web3(library.givenProvider);
            const _CycleContract = new web3.eth.Contract(CycleABI, addresses.cycle);
            setCycleContract(_CycleContract);
        }
    }, [active]);

    const getCycleBalance = async () => {
        account && CycleContract && await CycleContract.methods
            .balanceOf(account)
            .call()
            .then(bal => setCycleBalance(bal));
    }

    useEffect(() => {
        getCycleBalance();
        const interval = setInterval(getCycleBalance, 20000);
        return () => clearInterval(interval);
    }, [account, CycleContract]);

    const getAVAXearned = async () => {
        account && AVAXRewardsContract && await AVAXRewardsContract.methods
            .earned(account)
            .call()
            .then(amount => {
                setCycleEarned(amount);
            });
    }

    useEffect(() => {
        getAVAXearned();
        const interval = setInterval(getAVAXearned, 60000);
        return () => clearInterval(interval);
    }, [account, AVAXRewardsContract]);

    useEffect(() => {
        setInputText("");
        if (panelOpen) {
            if (action === 1) {
                setButtonText('Stake CYCLE');
                setInputEnabled(false);
                setToggleFrozen(true);
                account && CycleContract && CycleContract.methods
                    .allowance(account, addresses.avaxRewards)
                    .call()
                    .then(amount => {
                        setToggleFrozen(false);
                        if (amount === '0') {
                            setButtonEnabled(true);
                            setApproveCYCLE(true);
                            setButtonText('Approve');
                        } else {
                            setApproveCYCLE(false);
                            setButtonText(`Stake CYCLE`);
                            setInputEnabled(true);
                        }
                    });
            } else {
                setButtonText("Withdraw CYCLE");
            }
        }
    }, [action, panelOpen, account, CycleContract]);

    useEffect(() => {
        if (inputText || (action === 1 && approveCYCLE)) {
            setButtonEnabled(true);
        } else {
            setButtonEnabled(false);
        }
    }, [inputText, action, approveCYCLE]);

    const depositCYCLE = () => {
        if (!inputText || !account || !AVAXRewardsContract) return;

        const amount = Web3.utils.toWei(inputText, 'ether');

        AVAXRewardsContract.methods
            .stake(amount)
            .send({ from: account })
            .on('sending', () => {
                setCycleButtonLoading(true);
            })
            .on('sent', () => {
                setCycleButtonLoading(true);
            })
            .on('receipt', async () => {
                setCycleButtonLoading(false);
                setAlertText("CYCLE Deposit Successful");
                setOpenSuccessAlert(true);
                setInputText("");
                await updateCycleStaked();
                await getCycleBalance();
            })
            .on('error', () => {
                setCycleButtonLoading(false);
                setAlertText("Unable to Deposit CYCLE");
                setOpenFailureAlert(true);
                setInputText("");
            });
    }

    const withdrawCYCLE = () => {
        if (!inputText || !account || !AVAXRewardsContract) return;

        const amount = Web3.utils.toWei(inputText, 'ether');

        AVAXRewardsContract.methods
            .withdraw(amount)
            .send({ from: account })
            .on('sending', () => {
                setCycleButtonLoading(true);
            })
            .on('sent', () => {
                setCycleButtonLoading(true);
            })
            .on('receipt', async () => {
                setCycleButtonLoading(false);
                setAlertText("CYCLE Withdraw Successful");
                setOpenSuccessAlert(true);
                setInputText("");
                await updateCycleStaked();
                await getCycleBalance();
            })
            .on('error', () => {
                setCycleButtonLoading(false);
                setAlertText("Unable to Withdraw CYCLE");
                setOpenFailureAlert(true);
                setInputText("");
            });
    }

    const approveCYCLEforDeposit = () => {
        if (!account && !CycleContract) return;

        CycleContract.methods
            .approve(addresses.avaxRewards, MaxUint256)
            .send({ from: account })
            .on('sending', () => {
                setCycleButtonLoading(true);
            })
            .on('sent', () => {
                setCycleButtonLoading(true);
            })
            .on('receipt', () => {
                setCycleButtonLoading(false);
                setAlertText("Approve Successful");
                setOpenSuccessAlert(true);
                setApproveCYCLE(false);
                setInputEnabled(true);
                setButtonEnabled(false);
                setButtonText(`Stake CYCLE`);
            })
            .on('error', () => {
                setCycleButtonLoading(false);
                setAlertText("Unable to Approve");
                setOpenFailureAlert(true);
            });
    }

    const executeTransaction = () => {
        if (action === 1) {
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
        if (action === 1) {
            setInputText(Web3.utils.fromWei(cycleBalance));
        } else {
            setInputText(Web3.utils.fromWei(cycleStaked));
        }
    }

    const claimCycle = () => {
        if (!account || !AVAXRewardsContract) return;

        AVAXRewardsContract.methods
            .getReward()
            .send({ from: account })
            .on('sending', () => {
                setClaimButtonLoading(true);
            })
            .on('sent', () => {
                setClaimButtonLoading(true);
            })
            .on('receipt', async () => {
                await getAVAXearned();
                setClaimButtonLoading(false);
                setAlertText("CYCLE Claim Successful");
                setOpenSuccessAlert(true);
            })
            .on('error', () => {
                setClaimButtonLoading(false);
                setAlertText("Unable to Claim");
                setOpenFailureAlert(true);
            })
    }

    const zeroStaked = !cycleStaked || cycleStaked === '0';

    return (
        <>
            <Container>
                {!zeroStaked && <CurrentValueCYCLE cycleStaked={cycleStaked} panelOpen={panelOpen} PriceHelperContract={PriceHelperContract} />}
                <div className="input-grid">
                    <div className="stake-options">
                        <SlideToggle 
                            option1="Stake"
                            option2="Withdraw"
                            option={action}
                            setOption={setAction}
                            zeroBalance={zeroStaked}
                            freezeToggles={toggleFrozen}
                        />
                        <div className="input-wrapper">
                            <input
                                type="number"
                                className="balance-input"
                                placeholder="Enter CYCLE"
                                value={inputText}
                                onChange={e => setInputText(e.target.value)}
                                style={{
                                    width: `${zeroStaked ? "207px" : ""}`
                                }}
                                disabled={!inputEnabled}
                            />
                            <div className="lp-balance">
                                CYCLE Balance: {formatTokenAmount(cycleBalance)}
                            </div>
                            {((action === 1 && cycleBalance !== '0') || (action === 2 && cycleStaked !== '0')) && 
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
                            loading={CycleButtonLoading}
                            disabled={!buttonEnabled}
                        />
                    </div>
                    <div className="cycle-claim">
                        <div className="claim-title-text">
                            AVAX Earned
                        </div>
                        <div className="cycle-amount">
                            {formatTokenAmount(cycleEarned, 5)}
                        </div>
                        <CycleButton
                            text={`Claim`}
                            customStyle={{
                                padding: '8px 16px'
                            }}
                            onClick={claimCycle}
                            loading={claimButtonLoading}
                            disabled={cycleEarned === '0'}
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

export default AVAXRewardsContent;
