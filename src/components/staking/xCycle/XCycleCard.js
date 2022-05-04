import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import colors from '../../../constants/colors';
import XCycleExpansion from './XCycleExpansion';
import { formatTokenAmount } from '../../../constants/format';
import Web3 from 'web3';
import addresses from '../../../constants/addresses';
import Skeleton from '@material-ui/lab/Skeleton';
import { CONNECTION_URL } from '../../../constants/connection';
import { useWeb3React } from '@web3-react/core';
import { secondsInYear } from '../../../constants/apy';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { useFindBlock } from '../../../constants/hooks';

import xCycleABI from '../../../abis/xCycle.json';

const xCYCLELink = "https://guide.cycle.finance/token/xcycle";

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
        border: 2px solid ${colors.pallet.lightBlue};
        border-radius: 15px;
        box-shadow: 0 5px 15px ${colors.pallet.lightBlue};
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

    .explain-row {
        padding-bottom: 10px;
        font-size: 1em;
        align-items: center;
        padding: 20px;
        color: ${colors.pallet.lightBlue};

        .MuiSvgIcon-root {
            margin-left: 3px;
            font-size: 0.8em;
        }
    }

    .explain-row:hover {
        text-decoration: underline;
        cursor: pointer;
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

const XCycleCard = () => {
    const { active, library } = useWeb3React();

    const [xCYCLEvalue, setxCYCLEvalue] = useState(null);
    const [xCycleAPY, setxCycleAPY] = useState(null);

    const [xCycleContract, setxCycleContract] = useState(null);

    const blockNumberForScan = useFindBlock(10, 10, 4);

    useEffect(() => {
        let web3;
        if (library) {
            web3 = new Web3(library.givenProvider);
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider(CONNECTION_URL));
        }
        const _xCycleContract = new web3.eth.Contract(xCycleABI, addresses.xCycle);
        setxCycleContract(_xCycleContract);
    }, [active]);

    const getxCycleValue = async () => {
        const value = await xCycleContract.methods.xCYCLEtoCYCLE(Web3.utils.toWei('1')).call();
        setxCYCLEvalue(value);
    }

    useEffect(() => {
        xCycleContract && getxCycleValue();
    }, [xCycleContract]);

    // CAGR
    const getxCycleAPY = async () => {
        if (xCycleContract) {
            const reinvestEvents = await xCycleContract.getPastEvents('Reinvest', { fromBlock: blockNumberForScan, toBlock: 'latest' });
    
            const reinvestData = reinvestEvents.map(re => ({
                xCYCLEvalue: re.returnValues.xCYCLEvalue,
                timestamp: re.returnValues.timestamp
            }));
        
            const recent = reinvestData[reinvestData.length - 1];
            const previous = reinvestData[reinvestData.length - 2];
            const secondsElapsed = Number(recent.timestamp) - Number(previous.timestamp);
            const numberOfCompounds = Math.floor(secondsInYear / secondsElapsed);
            const divAmount = Number(recent.xCYCLEvalue) / Number(previous.xCYCLEvalue);
            const APY = (Math.pow(divAmount, numberOfCompounds) - 1) * 100;
            setxCycleAPY(Math.round(APY));
        }
    }

    useEffect(() => {
        const asyncGet = async () => {
            await getxCycleAPY();
        }
        xCycleContract && blockNumberForScan && asyncGet();
    }, [xCycleContract, blockNumberForScan]);

    return (
        <Container>
            <Card>
                <div className="sub-text">xCYCLE</div>
                <div className="stats-row">
                    <div>
                        1 xCYCLE = {xCYCLEvalue ? `${formatTokenAmount(xCYCLEvalue, 4)}` : <Skeleton className="skeleton" variant="text" width={50} />}{" CYCLE"}
                    </div>
                    <div>
                        APY: {xCycleAPY ? xCycleAPY  : <Skeleton className="skeleton" variant="text" width={50} />}{"%"}
                    </div>
                </div>
                <div className="explain-row" onClick={() => window.open(xCYCLELink, "_blank")}>
                    What is xCYCLE? 
                    <OpenInNewIcon />
                </div>
                <XCycleExpansion
                    getxCycleValue={getxCycleValue}
                    getxCycleAPY={getxCycleAPY}
                    xCycleContract={xCycleContract}
                />
            </Card>
        </Container>
    );
}

export default XCycleCard;
