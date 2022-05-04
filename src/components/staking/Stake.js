import React from 'react';
import styled from 'styled-components';
import CoreRewardsCard from './core-rewards/CoreRewardsCard';
import AVAXRewardsCard from './avax-rewards/AVAXRewardsCard';
import XCycleCard from './xCycle/XCycleCard';
import colors from '../../constants/colors';
import Divider from '@material-ui/core/Divider';
import { useFindBlock } from '../../constants/hooks';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Ubuntu Mono;
    font-weight: 700;
    letter-spacing: 0.05em;
    font-weight: bolder;
    display: inline-block;
    
    .core-farm {
        font-size: 1.6em;
        width: 100%;
        height: 50px;
        position: relative;
        color: ${colors.pallet.one};
        margin-top: 5%;
    }

    .divider {
        background: linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(255,255,255,1) 50%,rgba(0,0,0,0) 100%);
        width:70%;
        text-align: center;
        display: flex;
        margin: auto;
        margin-bottom: 5%;
    }
`;

const Stake = () => {
    const blockNumberForEvents = useFindBlock(4, 10, 4);

    console.log(blockNumberForEvents);

    return (
        <Container>
            <div className="core-farm">
                Core Farm
            </div>
            <Divider className="divider" variant='middle'/>
            <CoreRewardsCard
                blockNumberForEvents={blockNumberForEvents}
            />
            <div className="core-farm">
                Single Staking
            </div>
            <Divider className="divider" variant='middle'/>
            <AVAXRewardsCard
                blockNumberForEvents={blockNumberForEvents}
            />
            <XCycleCard
                blockNumberForEvents={blockNumberForEvents}
            />
        </Container>
    );
}

export default Stake;
