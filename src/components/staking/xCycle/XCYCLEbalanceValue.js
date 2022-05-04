import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { formatTokenAmount } from '../../../constants/format';
import colors from '../../../constants/colors';
import Skeleton from '@material-ui/lab/Skeleton';

const Container = styled.div`
    .balance-header {
        font-size: 0.9em;
        padding: 5px 0 20px 10px;
        display: inline-block;
        text-align: left;
        width: 100%;
        
        .lead-text {
            color: ${colors.lightGrey};
        }
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

const XCYCLEbalanceValue = ({ xCYCLEbalance, panelOpen, xCycleContract }) => {
    const [xCYCLEvalueCYCLE, setxCYCLEvalueCYCLE] = useState(null);

    useEffect(() => {
        const getxCYCLEvalueCYCLE = async () => {
            const valueCYCLE = await xCycleContract.methods.xCYCLEtoCYCLE(xCYCLEbalance).call();
            setxCYCLEvalueCYCLE(valueCYCLE);
        }
        xCYCLEbalance && panelOpen && xCycleContract && getxCYCLEvalueCYCLE();
    }, [xCYCLEbalance, panelOpen, xCycleContract]);

    return (
        <Container>
            <div className="balance-header">
                <span className="lead-text">Balance Value: </span> {xCYCLEvalueCYCLE ? `${formatTokenAmount(xCYCLEvalueCYCLE, 4)} CYCLE`: <Skeleton className="skeleton" variant="text" width={200} />}
            </div>
        </Container>
    );
}

export default XCYCLEbalanceValue;
