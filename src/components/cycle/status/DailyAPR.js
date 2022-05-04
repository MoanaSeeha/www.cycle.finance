import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Web3 from 'web3';
import CycleVaultV3ABI from '../../../abis/CycleVaultV3.json';
import vaults from '../../../constants/vaults';
import Skeleton from '@material-ui/lab/Skeleton';
import BN from 'bn.js';
import addresses from '../../../constants/addresses';
import DistributorABI from '../../../abis/DistributorV5.json';
import CYCLEtoAVAXABI from '../../../abis/CYCLEtoAVAX.json';
import colors from '../../../constants/colors';
import { CONNECTION_URL } from '../../../constants/connection';
import { useFindBlock } from '../../../constants/hooks';

const web3 = new Web3(new Web3.providers.HttpProvider(CONNECTION_URL));

const DistributorContract = new web3.eth.Contract(DistributorABI, addresses.distributor);
const CYCLEtoAVAXcontract = new web3.eth.Contract(CYCLEtoAVAXABI, addresses.cycleToAvax);

const vaultContracts = vaults.map(v => ({
    contracts: {
        vault: new web3.eth.Contract(CycleVaultV3ABI, v.addresses.vault)
    }
}));

const BP_DIV = 10000;

const Container = styled.div`
    padding: 20px;
    padding-top: 40px;
    border-bottom: 1px solid ${colors.borderLight};
    
    .apr-values {
        padding: 20px 10px;
        display: flex;
        justify-content: space-evenly;
        
        .text {
            color: ${colors.borderGrey};          
        }
    }

    .skeleton {
        display: inline-block;
        background: ${colors.skeletonBackground};
        margin-right: 10px;
    }

    // MOBILE

    @media screen and (max-width: 650px) {
        .apr-values {
            flex-direction: column;
            height: 100px;
            padding: 10px;
        }
    }

    @media screen and (max-width: 450px) {
        .apr-header {
            font-size: 0.9em;
        }

        .apr-values {
            font-size: 0.9em;
            
        }
    }
`;

const DailyAPR = () => {
    const [tvl, setTvl] = useState(null);
    const [dailyAPR, setDailyAPR] = useState(null);

    const blockNumberForEvents = useFindBlock(2, 10, 4);

    const getTVL = () => {
        Promise.all(vaultContracts.map(async v => {
            const bal = await v.contracts.vault.methods.balanceLPinSystem().call();
            return await v.contracts.vault.methods.getAVAXquoteForLPamount(bal).call();
        }))
        .then(async vaultAvaxTVLs => {
            let totalAvaxTVLbn = new BN('0', 10);

            vaultAvaxTVLs.forEach(t => {
                const tvlBN = new BN(t, 10);
                totalAvaxTVLbn.iadd(tvlBN);
            });

            setTvl(totalAvaxTVLbn.toString());
        });
    }

    const getDailyAPR = async () => {
        const events = await DistributorContract.getPastEvents("CycleDistributedTotal", { fromBlock: blockNumberForEvents, toBlock: 'latest' });
        const amountCYCLE = events[events.length - 1].returnValues.amount;

        const coreRewardsBP = Number(await DistributorContract.methods.coreRewardsBasisPoints().call());
        const vaultBP = BP_DIV - coreRewardsBP;
        const amountCYCLEtoVaults = (Number(amountCYCLE) / BP_DIV * vaultBP).toString();
        
        const amountAVAX = await CYCLEtoAVAXcontract.methods.getAVAXamountFromCYCLE(amountCYCLEtoVaults).call();
        const daily = Number(((Number(amountAVAX) / Number(tvl)) * 100).toFixed(2));
        setDailyAPR(daily);
    }

    useEffect(() => {
        getTVL();
    }, []);

    useEffect(() => {
        tvl && blockNumberForEvents && getDailyAPR();
    }, [tvl, blockNumberForEvents]);

    return (
        <Container>
            <div className="apr-header">
                Vault CYCLE Earning Average APR
            </div>
            <div className="apr-values">
                <div><span className="text">Daily: </span>{dailyAPR ? `${dailyAPR}` : <Skeleton className="skeleton" variant="text" width={40} />}{"%"}</div>
                <div><span className="text">Weekly: </span>{dailyAPR ? `${(dailyAPR * 7).toFixed(2)}` : <Skeleton className="skeleton" variant="text" width={40} />}{"%"}</div>
                <div><span className="text">Annual: </span>{dailyAPR ? `${(dailyAPR * 365).toFixed(2)}` : <Skeleton className="skeleton" variant="text" width={40} />}{"%"}</div>
            </div>
        </Container>
    );
}

export default DailyAPR;
