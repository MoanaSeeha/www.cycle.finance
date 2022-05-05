import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import colors from '../../../constants/colors';
import LinearProgress from '@material-ui/core/LinearProgress';
import Cycle from '../../../abis/Cycle.sol/Cycle.json';
import Web3 from 'web3';
import addresses from '../../../constants/addresses';
import Skeleton from '@material-ui/lab/Skeleton';
import { formatTokenAmount } from '../../../constants/format';
import { CONNECTION_URL } from '../../../constants/connection';

const web3 = new Web3(new Web3.providers.HttpProvider(CONNECTION_URL));

const CycleContract = new web3.eth.Contract(Cycle, addresses.cycle);

const Container = styled.div`
    border-bottom: 1px solid ${colors.borderLight};
    // margin-top: 10px;
    padding: 20px 0;

    .distribution-font {
        padding: 20px 0 20px;

        &.circulating {
            padding: 10px 0;
        }
    }

    .MuiLinearProgress-root {
        margin: 10px 20px 20px;
        height: 10px;
        border-radius: 5px;
        background-color: ${colors.pallet.one};
        border: 2px ${colors.pallet.two} solid;
    }

    .MuiLinearProgress-bar {
        background-color: ${colors.pallet.lightBlue};
    }

    .skeleton {
        display: inline-block;
    }

    // MOBILE

    @media screen and (max-width: 450px) {
        .distribution-font {
            font-size: 0.9em;
        }
    }
`;

const Distribution = () => {
    const [balance, setBalance] = useState(null);
    const [percent, setPercent] = useState(null);
    const [circulating, setCirculating] = useState(null);

    useEffect(() => {
        const getCirculatingSupply = async () => {
            const contractBalanceWei = await CycleContract.methods.balanceOf(addresses.cycle).call();
            const contractBalance = Web3.utils.fromWei(contractBalanceWei);
            // hardcoding total supply minus team lock
            let [tokens, fraction] = (300000 - Number(contractBalance)).toString().split('.');
            fraction = fraction + "0".repeat(18 - fraction.length);
            const fullWeiString = Web3.utils.toWei(`${tokens}.${fraction}`);
            setCirculating(fullWeiString);
        }
        getCirculatingSupply();
    }, [])

    useEffect(() => {
        CycleContract.methods
            .balanceOf(addresses.cycle)
            .call()
            .then(bal => setBalance(bal))
    }, []);

    useEffect(() => {
        if (balance) {
            const units = Web3.utils.fromWei(balance).split('.')[0];
            const per = ((270000 - Number(units)) / 2700).toFixed(2);
            setPercent(per);
        }
    }, [balance]);

    return (
        <Container>
            <div className="distribution-font">
                Distribution Progress: {percent ? `${percent}%` : <Skeleton className="skeleton" variant="text" width={60} />}
            </div>
            <LinearProgress
                variant="determinate"
                value={percent ? percent : "0"}
            />
            <div className="distribution-font circulating">
                Circulating Supply: {circulating ? formatTokenAmount(circulating) : <Skeleton className="skeleton" variant="text" width={60} />}
            </div>
        </Container>
    );
}

export default Distribution;
