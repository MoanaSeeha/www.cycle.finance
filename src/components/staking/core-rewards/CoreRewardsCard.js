import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import colors from '../../../constants/colors';
import CoreRewardsExpansion from './CoreRewardsExpansion';
import { formatUSDTeAmount } from '../../../constants/format';
import Web3 from 'web3';
import addresses from '../../../constants/addresses';
import Skeleton from '@material-ui/lab/Skeleton';
import { CONNECTION_URL } from '../../../constants/connection';
import { useWeb3React } from '@web3-react/core';
import { secondsInYear } from '../../../constants/apy';

import DistributorABI from '../../../abis/DistributorV5.sol/DistributorV5.json';
import PriceHelperABI from '../../../abis/PriceHelper.sol/PriceHelper.json';
import CoreRewardsTVLABI from '../../../abis/CoreRewards.sol/CoreRewards.json';
import CoreRewardsABI from '../../../abis/CoreRewards.sol/CoreRewards.json';

const web3 = new Web3(new Web3.providers.HttpProvider(CONNECTION_URL));

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    .MuiCard-root {
        width: 600px;
        padding: 10px;
        font-weight: 500;
        color: white;
        background-color: ${colors.pallet.lightBlack};
        font-size: 0.75em;
        font-family: Ubuntu Mono;
        font-weight: 700;
        letter-spacing: 0.05em;
        border: 2px solid ${colors.pallet.one};
        border-radius: 15px;
    }

    .head-text {
        padding: 10px 0 20px;
        font-size: 1.1em;
    }

    .sub-text {
        color: ${colors.borderGrey};
        padding: 10px 0 20px;
    }

    .stats-row {
        display: flex;
        justify-content: space-evenly;
        padding-bottom: 10px;
    }

    .skeleton {
        display: inline-block;
        background: ${colors.skeletonBackground};
        margin-right: 10px;
    }

    // MOBILE

    @media screen and (max-width: 650px) {
        padding-top: 20px;

        .MuiCard-root {
            width: 100%;
        }
    }

    @media screen and (max-width: 450px) {
        .sub-text, .stats-row {
            font-size: 0.9em;
        }
    }
`;

const CoreRewardsCard = ({ blockNumberForEvents }) => {
    const { active, library } = useWeb3React();

    const [coreRewardsTVL, setCoreRewardsTVL] = useState(null);
    const [coreRewardsAPR, setCoreRewardsAPR] = useState(null);

    const [DistributorContract, setDistributorContract] = useState(null);
    const [PriceHelperContract, setPriceHelperContract] = useState(null);
    const [CoreRewardsTVLcontract, setCoreRewardsTVLcontract] = useState(null);
    const [CoreRewardsContract, setCoreRewardsContract] = useState(null);

    useEffect(() => {
        let web3;
        if (library) {
            web3 = new Web3(library.givenProvider);
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider(CONNECTION_URL));
        }
        const _DistributorContract = new web3.eth.Contract(DistributorABI, addresses.distributor);
        const _PriceHelperContract = new web3.eth.Contract(PriceHelperABI, addresses.priceHelper);
        const _CoreRewardsTVLcontract = new web3.eth.Contract(CoreRewardsTVLABI, addresses.coreRewardsTVL);
        const _CoreRewardsContract = new web3.eth.Contract(CoreRewardsABI, addresses.coreRewards);
        setDistributorContract(_DistributorContract);
        setPriceHelperContract(_PriceHelperContract);
        setCoreRewardsTVLcontract(_CoreRewardsTVLcontract);
        setCoreRewardsContract(_CoreRewardsContract);
    }, [active]);

    const getCoreRewardsTVL = async () => {
        if (DistributorContract && PriceHelperContract) {
            const avaxTVL = await DistributorContract.methods.getCoreRewardsTVL().call();
            const usdTVL = await PriceHelperContract.methods.getAVAXtoUSD(avaxTVL).call();
            setCoreRewardsTVL(usdTVL);
        }
    }

    useEffect(() => {
        getCoreRewardsTVL();
        const interval = setInterval(getCoreRewardsTVL, 60000);
        return () => clearInterval(interval);
    }, [DistributorContract, PriceHelperContract]);

    useEffect(() => {
        const getAPR = async () => {
            const periods = 2;

            const cycleTVL = await CoreRewardsTVLcontract.methods.getCYCLEstaked().call();
            const cycleTVLnum = Number(cycleTVL);

            const events = await CoreRewardsContract.getPastEvents("RewardAdded", { fromBlock: blockNumberForEvents, toBlock: 'latest' });

            const distData = events.slice(events.length - periods).map(e => ({
                amount: e.returnValues.reward,
                block: e.blockNumber
            }));

            const [, ...rest] = distData;
            const totalAmount = rest.reduce((acc, curr) => acc + Number(curr.amount), 0);

            const time1 = (await web3.eth.getBlock(distData[0].block)).timestamp;
            const time2 = (await web3.eth.getBlock(distData[distData.length - 1].block)).timestamp;

            const APR = ((totalAmount / cycleTVLnum) * 100) * (secondsInYear / (time2 - time1));

            setCoreRewardsAPR(Math.round(APR));
        }
        CoreRewardsTVLcontract && CoreRewardsContract && blockNumberForEvents && getAPR();
    }, [CoreRewardsTVLcontract, CoreRewardsContract, blockNumberForEvents]);

    return (
        <Container>
            <Card>
                <div className="sub-text">Stake CYCLE/AVAX LP - Earn CYCLE 🌀</div>
                <div className="stats-row">
                    <div>
                        TVL: {coreRewardsTVL ? `$${formatUSDTeAmount(coreRewardsTVL, 0)}` : <Skeleton className="skeleton" variant="text" width={50} />}
                    </div>
                    <div>
                        APR: {coreRewardsAPR ? coreRewardsAPR: <Skeleton className="skeleton" variant="text" width={50} />}{"%"}
                    </div>
                </div>
                <CoreRewardsExpansion
                    CoreRewardsContract={CoreRewardsContract}
                    PriceHelperContract={PriceHelperContract}
                />
            </Card>
        </Container>
    );
}

export default CoreRewardsCard;
