import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import colors from '../../../constants/colors';
import XCycleContent from './XCycleContent';
import { useWeb3React } from '@web3-react/core';
import { formatTokenAmount } from '../../../constants/format';
import Skeleton from '@material-ui/lab/Skeleton';
import { InjectedContext } from '../../../App';

const Container = styled.div`
    margin: 8px 4px;

    .MuiExpansionPanel-root {
        border: 2px solid ${colors.pallet.one};
        background-color: ${colors.pallet.lightGrey};
        color: white;        

        &:before {
            background-color: unset;
        }

        &.Mui-expanded {
            margin: unset;
        }
    }

    .MuiExpansionPanelSummary-root {
        padding: 0 12px;

        .balance-info {
            padding-right: 10px;

            .balance-text {
                color: ${colors.lightGrey};
            }

            .skeleton {
                display: inline-block;
                background: ${colors.skeletonBackground};
            }
        }

        .MuiExpansionPanelSummary-content {
            &.Mui-expanded {
                margin: 12px 0;
            }
        }

        .MuiIconButton-root {
            padding: 6px 12px;
        }

        &.Mui-expanded {
            min-height: 48px;
        }
    }

    .MuiExpansionPanelDetails-root {
        padding: 6px 12px 12px;
    }

`;

const XCycleRewardsExpansion = ({ getxCycleValue, getxCycleAPY, xCycleContract }) => {
    const web3React = useWeb3React();

    const { account, active } = web3React;

    const { setConnectionDialogOpen } = useContext(InjectedContext);

    const [xCYCLEbalance, setxCYCLEbalance] = useState(null);
    const [panelOpen, setPanelOpen] = useState(false);

    const updatexCYCLEbalance = async () => {
        if (account && xCycleContract) {
            const balance = await xCycleContract.methods.balanceOf(account).call();
            setxCYCLEbalance(balance);
        }
    }

    useEffect(() => {
        updatexCYCLEbalance();
        const interval = setInterval(updatexCYCLEbalance, 20000);
        return () => clearInterval(interval);
    }, [account, xCycleContract]);

    return (
        <Container>
            <ExpansionPanel style={{borderRadius: '15px'}}
                expanded={panelOpen && active}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    onClick={() => {
                        if (!active) {
                            setConnectionDialogOpen(true);
                        } else {
                            setPanelOpen(p => !p);
                        }
                    }}
                >
                    <div className="balance-info">
                        <span className="balance-text">xCYCLE Balance: </span>
                        {active && xCYCLEbalance && formatTokenAmount(xCYCLEbalance, 4)}
                        {active && !xCYCLEbalance && <Skeleton className="skeleton" variant="text" width={50} />}
                        {!active && "-"}
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <XCycleContent
                        xCYCLEbalance={xCYCLEbalance}
                        updatexCYCLEbalance={updatexCYCLEbalance}
                        panelOpen={panelOpen}
                        getxCycleValue={getxCycleValue}
                        getxCycleAPY={getxCycleAPY}
                        xCycleContract={xCycleContract}
                    />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Container>
    );
}

export default XCycleRewardsExpansion;
