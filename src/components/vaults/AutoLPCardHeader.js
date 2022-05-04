import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../constants/colors';
import { formatApyAmount, formatUSDTeAmount } from '../../constants/format';
import Skeleton from '@material-ui/lab/Skeleton';
import { calculateAPY } from '../../constants/apy';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Web3 from 'web3';
import VaultRewards from '../../abis/VaultRewards.json';
import { CONNECTION_URL } from '../../constants/connection';

const web3 = new Web3(new Web3.providers.HttpProvider(CONNECTION_URL));

const Container = styled.div`
    font-family: Ubuntu Mono;
    font-weight: 700;
    letter-spacing: 0.05em;

    .top-row {
        display: grid;
        grid-template-columns: 5fr 12fr;

        .logo {
            border-radius: 50%;
            width: 75px;
        }

        .vault-info {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: flex-start;

            .sub-text {
                font-size: 0.9em;
                color: ${colors.lightGrey};
            }
        }
    }

    .lower-row {
        display: flex;
        justify-content: space-evenly;
        padding: 10px 0;

        .lead-text {
            display: inline-block;
            color: ${colors.lightGrey};
        }
    }

    .closed {
        padding: 10px 0;
        color: ${colors.lightGrey};
    }

    .link-to-farm {
        font-size: 0.8em;
        cursor: pointer;
        color: ${colors.pallet.lightBlue};
        text-decoration: underline;

        .MuiSvgIcon-root {
            margin-left: 3px;
            font-size: 0.8em;
        }
    }

    .skeleton {
        background: ${colors.skeletonBackground};
        display: inline-block;
    }

    // MOBILE

    @media screen and (max-width: 550px) {
        .lower-row {
            flex-direction: column;
            justify-content: space-around;
            height: 70px;
            padding: 0;
            align-items: center;
        }

        .closed {
            font-size: 0.8em;
            padding: 10px 20px;
        }
    }

    @media screen and (max-width: 450px) {
        .top-row {
            .logo {
                width: 55px;
            }
    
            .vault-info {
                .lp-info {
                    font-size: 0.9em;
                }

                .sub-text {
                    font-size: 0.8em;
                }
            }
        }

        .lower-row {
            font-size: 0.9em;
        }
    }
`;

const AutoLPCardHeader = ({
    vault,
    refresh,
    PriceHelperContract,
    CycleToAvaxContract,
    blockNumberForRewardEvent
}) => {
    const [usdTVL, setUsdTVL] = useState(null);
    const [apy, setApy] = useState(null);
    const [cycleAPR, setCycleAPR] = useState(null);

    useEffect(() => {
        if (vault.avaxTVL && PriceHelperContract && !vault.decomm) {
            const getUsdTVL = async () => {
                await PriceHelperContract.methods.getAVAXtoUSD(vault.avaxTVL).call()
                .then(amount => setUsdTVL(amount))
                .catch(() => setUsdTVL(usdTVL || "N/A"));
            }
            getUsdTVL();
        }
    }, [vault, refresh, PriceHelperContract]);

    useEffect(() => {
        const getApy = async () => {
            const _apy = await calculateAPY(vault.addresses.vault);
            setApy(_apy);
        }
        !vault.decomm && getApy();
    }, [vault, refresh]);

    useEffect(() => {
        if (vault.avaxTVL && CycleToAvaxContract && blockNumberForRewardEvent && !vault.decomm) {
            const getCycleAPR = async () => {
                const rewardContract = new web3.eth.Contract(VaultRewards, vault.addresses.rewards);
                const events = await rewardContract.getPastEvents("RewardAdded", { fromBlock: blockNumberForRewardEvent, toBlock: 'latest' });
                // if events empty, it's new vault w no distribution so return N/A or show nothing
                if (events.length === 0) {
                    setCycleAPR("N/A ");
                    return;
                }
                const { reward } = events[events.length - 1].returnValues;
                const rewardAvaxEquivalent = Number(await CycleToAvaxContract.methods.getAVAXamountFromCYCLE(reward).call());
                const annualizedRewardAmount = rewardAvaxEquivalent * 365;
                const vaultAvaxTVL = Number(vault.avaxTVL);
                const APR = Math.round((annualizedRewardAmount / vaultAvaxTVL) * 100);
                if (APR === 0) {
                    setCycleAPR("N/A");
                } else {
                    setCycleAPR(APR);
                }
            }
            getCycleAPR();
        }
    }, [vault, CycleToAvaxContract, blockNumberForRewardEvent]);

    return (
        <Container>
            <div className="top-row">
                <div>
                    <img
                        className="logo"
                        src={vault.logo}
                    />
                </div>
                <div className="vault-info">
                    <div className="lp-info">
                        {vault.vaultName}
                    </div>
                    <div className="sub-text">
                        Auto-Compounding {vault.LPtoken}
                    </div>
                    <div
                        className="link-to-farm"
                        onClick={() => window.open(vault.farmLink, "_blank")}
                    >
                        Farm page
                        <OpenInNewIcon />
                    </div>
                </div>
            </div>
            {!vault.decomm && <div className="lower-row">
                {!usdTVL && <div > 
                    <span className="lead-text">TVL:</span>
                    <Skeleton variant="text" width={150} className="skeleton"/>
                </div>}
                {usdTVL && <div>
                    <span className="lead-text">TVL:</span> ${formatUSDTeAmount(usdTVL, 0)}
                </div>}
                <div>
                    {!apy &&
                        <>
                            <span className="lead-text">APY: </span>{" "}<Skeleton variant="text" width={20} className="skeleton"/>{" %"}
                        </>
                    }
                    {apy &&
                        <>
                            <span className="lead-text">APY: </span> 
                            {(() => {
                                if (apy === '0' || vault.apyDown || (Number(apy) < 0)) {
                                    return " N/A";
                                } else if (apy === 'max') {
                                    return " >10,000%";
                                } else if (vault.tempZeroAPY) {
                                    return " 0%";
                                } else {
                                    return ` ${formatApyAmount(apy, 0)}%`;
                                }
                            })()}
                        </>
                    }
                    {!cycleAPR &&
                        <>
                            {" "}<span className="lead-text">+ CYCLE:</span>{" "}<Skeleton variant="text" width={20} className="skeleton"/>{" %"}
                        </>
                    }
                    {cycleAPR &&
                        <>
                            {" "}<span className="lead-text">+ CYCLE:</span> {cycleAPR}{"%"}
                        </>
                    }
                </div>
            </div>}
            {vault.decomm && <div className="closed">
                <div>Decommissioned - Claim Rewards and Withdraw</div>
            </div>}
        </Container>
    );
}

export default AutoLPCardHeader;
