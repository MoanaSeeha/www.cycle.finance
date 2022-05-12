import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../../constants/colors';
import CycleButton from '../../common/CycleButton';
import { formatTokenAmount } from '../../../constants/format';
import CallFeeAmount from '../../../abis/CallFeeAmount.sol/CallFeeAmount.json';
import addresses from '../../../constants/addresses';
import IconButton from '@material-ui/core/IconButton';
import HelpCircleIcon from 'mdi-material-ui/HelpCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Skeleton from '@material-ui/lab/Skeleton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Web3 from 'web3';
import { DataStore } from 'aws-amplify';
import { Reinvest } from '../../../models';
import { CONNECTION_URL } from '../../../constants/connection';

const web3 = new Web3(new Web3.providers.HttpProvider(CONNECTION_URL));

const compoundingLink = "https://guide.cycle.finance/cycle-protocol/reinvest";

const Container = styled.div`
    .fade-text {
        color: #bbbbbb;
    }

    .cycle-earned {
        display: flex;
        justify-content: space-evenly;
    }

    .lower-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        border-top: 1px solid ${colors.borderLight};

        .section-text {
            padding: 10px 0 20px;

            .amount {
                padding-top: 20px;
                display: flex;
                justify-content: center;
                color: ${colors.vaultCardWhite};
            }
        }

        .cycle-claim {
            border-right: 1px solid ${colors.borderLight};
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .harvest {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;

            .action-info {
                display: flex;
                align-items: center;

                .MuiIconButton-root {
                    padding: 5px;
                    margin-left: 5px;
                    color: ${colors.slideToggle};
                }
            }

            .button-holder {
                position: absolute;
                bottom: 0;
                right: 0;

                .MuiIconButton-root {
                    padding: 5px;
                    color: ${colors.slideToggle};
                }
            }

            .button-holder:hover {
                transform: scale(1.2);
            }

            .info-display {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: white;
                padding-bottom: 0;
                box-sizing: border-box;
                
                .info-container {
                    height: 100%;
                    display: grid;
                    grid-template-rows: 1fr 1fr 1fr;
                    position: relative;
                    background-color: ${colors.pallet.lightGrey};

                    .info-header {
                        color: ${colors.slideToggle};
                        margin: auto;
                    }

                    .fee-text {
                        margin: auto;
                        color: ${colors.vaultCardWhite};
                    }

                    .info-link {
                        margin: auto;
                        color: ${colors.pallet.one};
                        cursor: pointer;
                        text-decoration: underline;
                        display: flex;
                        align-items: center;

                        .MuiSvgIcon-root {
                            margin-left: 3px;
                            font-size: 1em;
                        }
                    }

                    .info-link:hover {
                        color: ${colors.pallet.lightBlue};
                    }

                    .close-button {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                    }

                    .close-button:hover {
                        transform: scale(1.2);
                    }

                    .MuiIconButton-root {
                        padding: 5px;
                        color: ${colors.slideToggle};
                    }
                }
            }
        }
    }

    .skeleton {
        background: ${colors.skeletonBackground};
    }

    // MOBILE

    @media screen and (max-width: 450px) {
        .lower-section {
            font-size: 0.8em;
        }        
    }
`;

const Earnings = ({
    account,
    vault,
    panelOpen,
    setOpenSuccessAlert,
    setOpenFailureAlert,
    setAlertText,
    setRefresh,
    DistributorContract
}) => {

    const CallFeeAmountContract = new web3.eth.Contract(CallFeeAmount.abi, addresses.callFeeAmount[vault.rewardToken]);

    const [harvestButtonLoading, setHarvestButtonLoading] = useState(false);
    const [claimButtonLoading, setClaimButtonLoading] = useState(false);
    const [showCallFeeInfo, setShowCallFeeInfo] = useState(false);
    const [harvestAmount, setHarvestAmount] = useState(null);
    const [cycleEarned, setCycleEarned] = useState(null);
    const [callFee, setCallFee] = useState(null);
    const [weight, setWeight] = useState(null);

    const getHarvestAmount = async () => {
        const amount = await vault.contracts.strategy.methods.getRewardsEarned().call();
        setHarvestAmount(amount);
        getCallFee();
    }

    const getCycleEarned = async () => {
        if (account) {
            const amount = await vault.contracts.rewards.methods.earned(account).call();
            setCycleEarned(amount);
        }
    }

    const getCallFee = async () => {
        if (!vault.decomm) {
            const amount = await CallFeeAmountContract.methods.getCallFeeAmount(vault.addresses.strategy, addresses.strategyVariables).call();
            setCallFee(amount);
        } else {
            setCallFee("0");
        }
    }

    useEffect(() => {
        getHarvestAmount();
        // let interval;
        // if (panelOpen) {
        //     getHarvestAmount();
        //     interval = setInterval(getHarvestAmount, 20000);
        // } else {
        //     clearInterval(interval);
        // }
        // return () => {
        //     clearInterval(interval);
        // };
    }, [panelOpen, vault]);
    
    useEffect(() => {
        getCycleEarned();
        // let interval;
        // if (panelOpen) {
        //     getCycleEarned();
        //     interval = setInterval(getCycleEarned, 20000);
        // } else {
        //     clearInterval(interval);
        // }
        // return () => clearInterval(interval);
    }, [account, panelOpen, vault]);

    useEffect(() => {
        if (!panelOpen) setShowCallFeeInfo(false);
    }, [panelOpen]);

    useEffect(() => {
        const getWeight = async () => {
            await DistributorContract.methods.getRewardWeight(vault.addresses.rewards).call()
            .then(w => {
                const nw = Number(w) / 10;
                setWeight(nw);
            })
            .catch(() => setWeight(null))
        }
        DistributorContract && !vault.decomm && getWeight();
    }, [vault, DistributorContract]);

    const logReinvest = async blockNumber => {
        const block = await web3.eth.getBlock(blockNumber);
        const amountLP = await vault.contracts.vault.methods.getLPamountForShares(Web3.utils.toWei('1')).call();
        try {
            await DataStore.save(
                new Reinvest({
                    vault: vault.addresses.vault,
                    timestamp: block.timestamp,
                    amountLP: amountLP
                })
            );
        } catch {
            // Ideally this should be updated to notify me on failed writes
            console.log('Failed to write data');
        }
    }

    const runHarvest = () => {
        account && vault.contracts.strategy.methods
            .harvest()
            .send({ from: account })
            .on('sending', () => {
                setHarvestButtonLoading(true);
            })
            .on('sent', () => {
                setHarvestButtonLoading(true);
            })
            .on('receipt', async receipt => {
                setHarvestButtonLoading(false);
                setAlertText("Reinvest Successful");
                setOpenSuccessAlert(true);
                getHarvestAmount();
                await logReinvest(receipt.blockNumber);
                setRefresh(r => r + 1);
            })
            .on('error', () => {
                setHarvestButtonLoading(false);
                setAlertText("Unable to Reinvest");
                setOpenFailureAlert(true);
            });
    }

    const claimCycle = () => {
        account && vault.contracts.rewards.methods
            .getReward()
            .send({ from: account })
            .on('sending', () => {
                setClaimButtonLoading(true);
            })
            .on('sent', () => {
                setClaimButtonLoading(true);
            })
            .on('receipt', async () => {
                setClaimButtonLoading(false);
                setAlertText("CYCLE Claim Successful");
                setOpenSuccessAlert(true);
                await getCycleEarned();
            })
            .on('error', () => {
                setClaimButtonLoading(false);
                setAlertText("Unable to Claim");
                setOpenFailureAlert(true);
            });
    }

    return (
        <Container>
            <div className="lower-section">
                <div className="cycle-claim">
                    <div className="section-text">
                        <span className="fade-text">Earnings ({weight || "0"}x)</span>
                        <div className="amount">
                            {cycleEarned && formatTokenAmount(cycleEarned, 4) + " CYCLE"}
                            {!cycleEarned && <Skeleton variant="text" width={100} className="skeleton"/>}
                        </div>
                    </div>
                    <CycleButton
                        text="Claim"
                        customStyle={{
                            padding: '8px 16px',
                            color: colors.vaultCardWhite
                        }}
                        onClick={claimCycle}
                        loading={claimButtonLoading}
                        disabled={!cycleEarned || cycleEarned === '0'}
                    />
                </div>
                <div className="harvest">
                    <div className="section-text">
                        <span className="fade-text">Reinvest Rewards</span>
                        <div className="amount">
                            {callFee ? `${formatTokenAmount(callFee, 4)} WAVAX` : <Skeleton className="skeleton" variant="text" width={100} />}
                        </div>    
                    </div>
                    <div className="action-info">
                        <CycleButton
                            text="Reinvest"
                            customStyle={{
                                padding: '8px 16px',
                                color: colors.vaultCardWhite
                            }}
                            onClick={runHarvest}
                            loading={harvestButtonLoading}
                            disabled={!harvestAmount || harvestAmount === '0'}
                        />
                    </div>
                    <div className="button-holder">
                        <IconButton onClick={() => setShowCallFeeInfo(true)}>
                            <HelpCircleIcon />
                        </IconButton>
                    </div>
                    {showCallFeeInfo && <div className="info-display">
                        <div className="info-container">
                            <div className="info-header">Vault Rewards</div>
                            <div className="fee-text">{harvestAmount && formatTokenAmount(harvestAmount, 3) + " " + vault.rewardToken}
                            {!harvestAmount && <Skeleton variant="text" width={100} className="skeleton" />}</div>
                            <div
                                className="info-link"
                                onClick={() => window.open(compoundingLink, "_blank")}
                            >
                                Info
                                <OpenInNewIcon />
                            </div>
                            <div className="close-button">
                                <IconButton onClick={() => setShowCallFeeInfo(false)}>
                                    <CancelIcon />
                                </IconButton>
                            </div>
                        </div>
                        </div>} 
                </div>
            </div>
        </Container>
    );
}
export default Earnings;