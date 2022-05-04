import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SlideToggle from '../../common/SlideToggle';
import CycleButton from '../../common/CycleButton';
import colors from '../../../constants/colors';
import { formatTokenAmount } from '../../../constants/format';
import PangolinPair from '../../../abis/PangolinPair.json';
import Web3 from 'web3';
import addresses from '../../../constants/addresses';
import { useWeb3React } from '@web3-react/core';
import CycleAlert from '../../common/CycleAlert';
import { MaxUint256 } from '@ethersproject/constants';
import CurrentValueLP from './CurrentValueLP';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const cycleSwapLink = "https://app.pangolin.exchange/#/swap?outputCurrency=0x81440c939f2c1e34fc7048e518a637205a632a74";
const cycleAddLink = "https://app.pangolin.exchange/#/add/AVAX/0x81440C939f2C1E34fc7048E518a637205A632a74";

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
                    color: ${colors.pallet.lightBlue};

                    .MuiSvgIcon-root {
                        margin-left: 1px;
                        font-size: 1em;
                    }
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

const CoreRewardsContent = ({ lpStaked, updateLpStaked, panelOpen, CoreRewardsContract, PriceHelperContract }) => {
    const web3React = useWeb3React();

    const { account, active, library } = web3React;

    // 1 - Stake, 2 - Withdraw
    const [action, setAction] = useState(1);
    const [inputText, setInputText] = useState("");
    const [lpBalance, setLpBalance] = useState('0');
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openFailureAlert, setOpenFailureAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [approveLP, setApproveLP] = useState(false);
    const [buttonText, setButtonText] = useState("");
    const [inputEnabled, setInputEnabled] = useState(false);
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [cycleEarned, setCycleEarned] = useState('0');
    const [claimButtonLoading, setClaimButtonLoading] = useState(false);
    const [lpButtonLoading, setLpButtonLoading] = useState(false);
    const [toggleFrozen, setToggleFrozen] = useState(false);

    const [CycleLPcontract, setCycleLPcontract] = useState(null);

    useEffect(() => {
        if (active && library) {
            const web3 = new Web3(library.givenProvider);
            const _CycleLPcontract = new web3.eth.Contract(PangolinPair, addresses.cycleLP);
            setCycleLPcontract(_CycleLPcontract);
        }
    }, [active]);

    const getLpBalance = async () => {
        account && CycleLPcontract && await CycleLPcontract.methods
            .balanceOf(account)
            .call()
            .then(bal => setLpBalance(bal));
    }

    useEffect(() => {
        getLpBalance();
        const interval = setInterval(getLpBalance, 20000);
        return () => clearInterval(interval);
    }, [account, CycleLPcontract]);

    const getCycleEarned =  async () => {
        account && CoreRewardsContract && await CoreRewardsContract.methods
            .earned(account)
            .call()
            .then(amount => {
                setCycleEarned(amount);
            });
    }

    useEffect(() => {
        getCycleEarned();
        const interval = setInterval(getCycleEarned, 20000);
        return () => clearInterval(interval);
    }, [account, CoreRewardsContract]);

    useEffect(() => {
        setInputText("");
        if (panelOpen) {
            if (action === 1) {
                setButtonText('Stake LP');
                setInputEnabled(false);
                setToggleFrozen(true);
                account && CycleLPcontract && CycleLPcontract.methods
                    .allowance(account, addresses.coreRewards)
                    .call()
                    .then(amount => {
                        setToggleFrozen(false);
                        if (amount === '0') {
                            setButtonEnabled(true);
                            setApproveLP(true);
                            setButtonText('Approve');
                        } else {
                            setApproveLP(false);
                            setButtonText(`Stake LP`);
                            setInputEnabled(true);
                        }
                    });
            } else {
                setButtonText("Withdraw LP");
            }
        }
    }, [action, panelOpen, account, CycleLPcontract]);

    useEffect(() => {
        if (inputText || (action === 1 && approveLP)) {
            setButtonEnabled(true);
        } else {
            setButtonEnabled(false);
        }
    }, [inputText, action, approveLP]);

    const depositLP = () => {
        if (!inputText || !account || !CoreRewardsContract) return;

        const amount = Web3.utils.toWei(inputText, 'ether');

        CoreRewardsContract.methods
            .stake(amount)
            .send({ from: account })
            .on('sending', () => {
                setLpButtonLoading(true);
            })
            .on('sent', () => {
                setLpButtonLoading(true);
            })
            .on('receipt', async () => {
                setLpButtonLoading(false);
                setAlertText("LP Deposit Successful");
                setOpenSuccessAlert(true);
                setInputText("");
                await updateLpStaked();
                await getLpBalance();
            })
            .on('error', () => {
                setLpButtonLoading(false);
                setAlertText("Unable to Deposit LP");
                setOpenFailureAlert(true);
                setInputText("");
            });
    }

    const withdrawLP = () => {
        if (!inputText || !account || !CoreRewardsContract) return;

        const amount = Web3.utils.toWei(inputText, 'ether');

        CoreRewardsContract.methods
            .withdraw(amount)
            .send({ from: account })
            .on('sending', () => {
                setLpButtonLoading(true);
            })
            .on('sent', () => {
                setLpButtonLoading(true);
            })
            .on('receipt', async () => {
                setLpButtonLoading(false);
                setAlertText("LP Withdraw Successful");
                setOpenSuccessAlert(true);
                setInputText("");
                await updateLpStaked();
                await getLpBalance();
            })
            .on('error', () => {
                setLpButtonLoading(false);
                setAlertText("Unable to Withdraw LP");
                setOpenFailureAlert(true);
                setInputText("");
            });
    }

    const approveLPforDeposit = () => {
        if (!account || !CycleLPcontract) return;

        CycleLPcontract.methods
            .approve(addresses.coreRewards, MaxUint256)
            .send({ from: account })
            .on('sending', () => {
                setLpButtonLoading(true);
            })
            .on('sent', () => {
                setLpButtonLoading(true);
            })
            .on('receipt', () => {
                setLpButtonLoading(false);
                setAlertText("Approve Successful");
                setOpenSuccessAlert(true);
                setApproveLP(false);
                setInputEnabled(true);
                setButtonEnabled(false);
                setButtonText(`Stake LP`);
            })
            .on('error', () => {
                setLpButtonLoading(false);
                setAlertText("Unable to Approve");
                setOpenFailureAlert(true);
            });
    }

    const executeTransaction = () => {
        if (action === 1) {
            if (approveLP) {
                approveLPforDeposit();
            } else {
                depositLP();
            }
        } else {
            withdrawLP();
        }
    }

    const getMaxValue = () => {
        if (action === 1) {
            setInputText(Web3.utils.fromWei(lpBalance));
        } else {
            setInputText(Web3.utils.fromWei(lpStaked));
        }
    }

    const claimCycle = () => {
        if (!account || !CoreRewardsContract) return;

        CoreRewardsContract.methods
            .getReward()
            .send({ from: account })
            .on('sending', () => {
                setClaimButtonLoading(true);
            })
            .on('sent', () => {
                setClaimButtonLoading(true);
            })
            .on('receipt', async () => {
                await getCycleEarned();
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

    const zeroStaked = !lpStaked || lpStaked === '0';

    return (
        <>
            <Container>
                {!zeroStaked && <CurrentValueLP lpStaked={lpStaked} panelOpen={panelOpen} PriceHelperContract={PriceHelperContract} />}
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
                                placeholder="Enter LP"
                                value={inputText}
                                onChange={e => setInputText(e.target.value)}
                                style={{
                                    width: `${zeroStaked ? "207px" : ""}`
                                }}
                                disabled={!inputEnabled}
                            />
                            <div className="lp-balance">
                                LP Balance: {formatTokenAmount(lpBalance)}
                            </div>
                            {((action === 1 && lpBalance !== '0') || (action === 2 && lpStaked !== '0')) && 
                            <div 
                                className="max-select"
                                onClick={getMaxValue}
                                style={{
                                    display: `${approveLP ? "none" : "block"}`
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
                            loading={lpButtonLoading}
                            disabled={!buttonEnabled}
                        />
                        <div className="swap-links">
                            <a href={cycleSwapLink} target="_blank" className="cycle-link">Get CYCLE <OpenInNewIcon /></a>
                            <a href={cycleAddLink} target="_blank" className="cycle-link">Get LP <OpenInNewIcon /> </a> 
                        </div>
                    </div>
                    <div className="cycle-claim">
                        <div className="claim-title-text">
                            CYCLE Earned
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

export default CoreRewardsContent;
