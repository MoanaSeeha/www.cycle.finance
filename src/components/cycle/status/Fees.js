import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../../constants/colors';
import Web3 from 'web3';
import addresses from '../../../constants/addresses';
import Skeleton from '@material-ui/lab/Skeleton';
import StrategyVariablesABI from '../../../abis/vaults/StrategyVariables.sol/StrategyVariables.json';
import { CONNECTION_URL } from '../../../constants/connection';

const web3 = new Web3(new Web3.providers.HttpProvider(CONNECTION_URL));

const StrategyVariablesContract = new web3.eth.Contract(StrategyVariablesABI.abi, addresses.strategyVariables);

const Container = styled.div`
    // border-bottom: 1px solid ${colors.borderLight};
    padding: 40px;
    padding-bottom: 20px;
    
    .subfees {
        padding: 20px 10px;
        display: flex;
        justify-content: space-evenly;
        
        .text {
            color: ${colors.borderGrey};
        }
    }

    .help-button {
        padding-left: 15px;
    }

    .skeleton {
        display: inline-block;
        background: ${colors.skeletonBackground};
        margin-right: 10px;
    }

    // MOBILE

    @media screen and (max-width: 650px) {
        .subfees {
            flex-direction: column;
            height: 80px;
            padding: 10px;
        }
    }

    @media screen and (max-width: 450px) {
        font-size: 0.9em;
    }
`;

const Fees = () => {
    const [callFee, setCallFee] = useState(null);
    const [revenueFee, setRevenueFee] = useState(null);

    useEffect(() => {
        const getFees = async () => {
            const cFee = Number(await StrategyVariablesContract.methods.callFeeBasisPoints().call());
            const rFee = Number(await StrategyVariablesContract.methods.harvestFeeBasisPoints().call());
            setCallFee(cFee / 100);
            setRevenueFee(rFee / 100);
        }
        getFees();
    }, []);

    return (
        <Container>
            <div>
                Vault Reinvest Fees
            </div>
            <div className="subfees">
                <div><span className="text">Revenue: </span>{revenueFee ? `${revenueFee}` : <Skeleton className="skeleton" variant="text" width={40} />}{"%"}</div>
                <div><span className="text">Reinvest Rewards: </span>{callFee ? `${callFee}` : <Skeleton className="skeleton" variant="text" width={40} />}{"%"}</div>
            </div>
        </Container>
    );
}

export default Fees;
