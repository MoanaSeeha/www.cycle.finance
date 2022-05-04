import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import colors from '../../../constants/colors';
import AVAXRewardsContent from './AVAXRewardsContent';
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

const AVAXRewardsExpansion = ({ AVAXRewardsContract, PriceHelperContract }) => {
    const web3React = useWeb3React();

    const { account, active } = web3React;

    const { setConnectionDialogOpen } = useContext(InjectedContext);

    const [cycleStaked, setCycleStaked] = useState(null);
    const [panelOpen, setPanelOpen] = useState(false);

    const updateCycleStaked = async () => {
        if (account && AVAXRewardsContract) {
            const balance = await AVAXRewardsContract.methods.balanceOf(account).call();
            setCycleStaked(balance);
        }
    }

    useEffect(() => {
        updateCycleStaked();
        const interval = setInterval(updateCycleStaked, 20000);
        return () => clearInterval(interval);
    }, [account, AVAXRewardsContract]);

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
                        <span className="balance-text">CYCLE Staked: </span>
                        {active && cycleStaked && formatTokenAmount(cycleStaked)}
                        {active && !cycleStaked && <Skeleton className="skeleton" variant="text" width={50} />}
                        {!active && "-"}
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <AVAXRewardsContent
                        cycleStaked={cycleStaked}
                        updateCycleStaked={updateCycleStaked}
                        panelOpen={panelOpen}
                        AVAXRewardsContract={AVAXRewardsContract}
                        PriceHelperContract={PriceHelperContract}
                    />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Container>
    );
}

export default AVAXRewardsExpansion;
