import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { formatTokenAmount, formatUSDTeAmount } from '../../../constants/format';
import colors from '../../../constants/colors';
import Skeleton from '@material-ui/lab/Skeleton';
import Web3 from 'web3';
import addresses from '../../../constants/addresses';
import CYCLEtoAvaxABI from '../../../abis/Cycle.sol/Cycle.json';
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

const CurrentValueCYCLE = ({ cycleStaked, panelOpen, PriceHelperContract }) => {
    const web3React = useWeb3React();

    const { active, library } = web3React;

    const [CYCLEamountInAVAX, setCYCLEamountInAVAX] = useState(null);
    const [CYCLEamountInUSD, setCYCLEamountInUSD] = useState(null);

    const [CYCLEtoAvaxContract, setCYCLEtoAvaxContract] = useState(null);

    useEffect(() => {
        if (active && library) {
            const web3 = new Web3(library.givenProvider);
            const _CYCLEtoAvaxContract = new web3.eth.Contract(CYCLEtoAvaxABI, addresses.cycleToAvax);
            setCYCLEtoAvaxContract(_CYCLEtoAvaxContract);
        }
    }, [active]);

    useEffect(() => {
        const getCYCLEinfo = async () => {
            const avaxAmount = await CYCLEtoAvaxContract.methods.getAVAXamountFromCYCLE(cycleStaked).call();
            const usdAmount = await PriceHelperContract.methods.getAVAXtoUSD(avaxAmount).call();
            setCYCLEamountInAVAX(avaxAmount);
            setCYCLEamountInUSD(usdAmount);
        }
        cycleStaked && panelOpen && CYCLEtoAvaxContract && PriceHelperContract && getCYCLEinfo();
    }, [cycleStaked, panelOpen, CYCLEtoAvaxContract, PriceHelperContract]);

    return (
        <Container>
            <div className="balance-header">
                Staked CYCLE Value
            </div>
            <div className="balances">
                {!CYCLEamountInAVAX && <Skeleton className="skeleton" variant="text" width={200} />}
                {CYCLEamountInAVAX && <div>
                    {formatTokenAmount(CYCLEamountInAVAX)} AVAX
                </div>}
                {CYCLEamountInUSD && <>
                    <div>|</div>
                    <div>
                        ${formatUSDTeAmount(CYCLEamountInUSD, 0)}
                    </div>
                </>}
            </div>
        </Container>
    );
}

export default CurrentValueCYCLE;
