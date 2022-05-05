import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import colors from '../../../constants/colors';
import AVAXRewardsExpansion from './AVAXRewardsExpansion';
import { formatUSDTeAmount } from '../../../constants/format';
import Web3 from 'web3';
import addresses from '../../../constants/addresses';
import Skeleton from '@material-ui/lab/Skeleton';
import { CONNECTION_URL } from '../../../constants/connection';
import { useWeb3React } from '@web3-react/core';
import { secondsInYear } from '../../../constants/apy';
import PriceHelperABI from '../../../abis/PriceHelper.sol/PriceHelper.json';
import AVAXRewardsTVLABI from '../../../abis/AVAXRewardsTVL.json';
import AVAXRewardsABI from '../../../abis/AVAXRewards.json';

const web3 = new Web3(new Web3.providers.HttpProvider(CONNECTION_URL));

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    .MuiCard-root {
        color: white;
        width: 600px;
        padding: 10px;
        font-weight: 500;
        background-color: ${colors.pallet.lightBlack};
        font-size: 0.75em;
        border-radius: 0;
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
        padding-top: 0;

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

const AVAXRewardsCard = ({ blockNumberForEvents }) => {
    const { active, library } = useWeb3React();

    const [avaxRewardsTVL, setAvaxRewardsTVL] = useState(null);
    const [avaxRewardsAPR, setAvaxRewardsAPR] = useState(null);

    const [PriceHelperContract, setPriceHelperContract] = useState(null);
    const [AVAXRewardsTVLcontract, setAVAXRewardsTVLcontract] = useState(null);
    const [AVAXRewardsContract, setAVAXRewardsContract] = useState(null);

    useEffect(() => {
        let web3;
        if (library) {
            web3 = new Web3(library.givenProvider);
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider(CONNECTION_URL));
        }
        const _PriceHelperContract = new web3.eth.Contract(PriceHelperABI, addresses.priceHelper);
        const _AVAXRewardsTVLcontract = new web3.eth.Contract(AVAXRewardsTVLABI, addresses.avaxRewardsTVL);
        const _AVAXRewardsContract = new web3.eth.Contract(AVAXRewardsABI, addresses.avaxRewards);
        setPriceHelperContract(_PriceHelperContract);
        setAVAXRewardsTVLcontract(_AVAXRewardsTVLcontract);
        setAVAXRewardsContract(_AVAXRewardsContract);
    }, [active]);

    const getAvaxRewardsTVL = async () => {
        if (AVAXRewardsTVLcontract && PriceHelperContract) {
            const avaxTVL = await AVAXRewardsTVLcontract.methods.getAVAXamountStaked().call();
            const usdTVL = await PriceHelperContract.methods.getAVAXtoUSD(avaxTVL).call();
            setAvaxRewardsTVL(usdTVL);
        }
    }

    useEffect(() => {
        getAvaxRewardsTVL();
        const interval = setInterval(getAvaxRewardsTVL, 60000);
        return () => clearInterval(interval);
    }, [AVAXRewardsTVLcontract, PriceHelperContract]);

    useEffect(() => {
        const getAPR = async () => {
            const periods = 3;

            const avaxTVL = await AVAXRewardsTVLcontract.methods.getAVAXamountStaked().call();
            const avaxTVLnum = Number(avaxTVL);

            const events = await AVAXRewardsContract.getPastEvents("RewardAdded", { fromBlock: blockNumberForEvents, toBlock: 'latest' });

            const distData = events.slice(events.length - periods).map(e => ({
                amount: e.returnValues.reward,
                block: e.blockNumber
            }));

            const [, ...rest] = distData;
            const totalAmount = rest.reduce((acc, curr) => acc + Number(curr.amount), 0);

            const time1 = (await web3.eth.getBlock(distData[0].block)).timestamp;
            const time2 = (await web3.eth.getBlock(distData[distData.length - 1].block)).timestamp;

            const APR = ((totalAmount / avaxTVLnum) * 100) * (secondsInYear / (time2 - time1));

            setAvaxRewardsAPR(Math.round(APR));
        }
        AVAXRewardsTVLcontract && AVAXRewardsContract && blockNumberForEvents && getAPR();
    }, [AVAXRewardsTVLcontract, AVAXRewardsContract, blockNumberForEvents]);

    return (
        <Container>
            <Card>
                <div className="sub-text">Stake CYCLE - Earn AVAX 🔺</div>
                <div className="stats-row">
                    <div>
                        TVL: {avaxRewardsTVL ? `$${formatUSDTeAmount(avaxRewardsTVL, 0)}` : <Skeleton className="skeleton" variant="text" width={50} />}
                    </div>
                    <div>
                        APR: {avaxRewardsAPR ? avaxRewardsAPR : <Skeleton className="skeleton" variant="text" width={50} />}{"%"}
                    </div>
                </div>
                <AVAXRewardsExpansion
                    PriceHelperContract={PriceHelperContract}
                    AVAXRewardsContract={AVAXRewardsContract}
                />
            </Card>
        </Container>
    );
}

export default AVAXRewardsCard;
