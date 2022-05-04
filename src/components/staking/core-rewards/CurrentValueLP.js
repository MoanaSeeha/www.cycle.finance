import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { formatTokenAmount, formatUSDTeAmount } from '../../../constants/format';
import colors from '../../../constants/colors';
import Skeleton from '@material-ui/lab/Skeleton';
import Web3 from 'web3';
import addresses from '../../../constants/addresses';
import CoreRewardsLPtoAvaxABI from '../../../abis/CoreRewardsLPtoAVAX.json';
import { useWeb3React } from '@web3-react/core';

const Container = styled.div`
    .balance-header {
        font-size: 0.9em;
        padding: 5px 0 10px 10px;
        color: ${colors.lightGrey};
        display: flex;
        justify-content: flex-start;
    }

    .balances {
        display: flex;
        justify-content: flex-start;
        padding: 5px 0 20px 10px;

        div:nth-child(2n) {
            padding: 0 10px;
            color: ${colors.lightGrey};
        }

        .balance-text {
            color: ${colors.lightGrey};
        }
    }

    .skeleton {
        background: ${colors.skeletonBackground};
    }
`;

const CurrentValueLP = ({ lpStaked, panelOpen, PriceHelperContract }) => {
    const web3React = useWeb3React();

    const { active, library } = web3React;

    const [LPamountInAVAX, setLPamountInAVAX] = useState(null);
    const [LPamountInUSD, setLPamountInUSD] = useState(null);

    const [CoreRewardsLPtoAvaxContract, setCoreRewardsLPtoAvaxContract] = useState(null);

    useEffect(() => {
        if (active && library) {
            const web3 = new Web3(library.givenProvider);
            const _CoreRewardsLPtoAvaxContract = new web3.eth.Contract(CoreRewardsLPtoAvaxABI, addresses.coreRewardsLPtoAVAX);
            setCoreRewardsLPtoAvaxContract(_CoreRewardsLPtoAvaxContract);
        }
    }, [active]);

    useEffect(() => {
        const getLPinfo = async () => {
            const avaxAmount = await CoreRewardsLPtoAvaxContract.methods.getAVAXamountFromLPamount(lpStaked).call();
            const usdAmount = await PriceHelperContract.methods.getAVAXtoUSD(avaxAmount).call();
            setLPamountInAVAX(avaxAmount);
            setLPamountInUSD(usdAmount);
        }
        lpStaked && panelOpen && PriceHelperContract && CoreRewardsLPtoAvaxContract && getLPinfo();
    }, [lpStaked, panelOpen, PriceHelperContract, CoreRewardsLPtoAvaxContract]);

    return (
        <Container>
            <div className="balance-header">
                Staked LP Value
            </div>
            <div className="balances">
                {!LPamountInAVAX && <Skeleton className="skeleton" variant="text" width={200} />}
                {LPamountInAVAX && <div>
                    {formatTokenAmount(LPamountInAVAX)} AVAX
                </div>}
                {LPamountInUSD && <>
                    <div>|</div>
                    <div>
                        ${formatUSDTeAmount(LPamountInUSD, 0)}
                    </div>
                </>}
            </div>
        </Container>
    );
}

export default CurrentValueLP;
