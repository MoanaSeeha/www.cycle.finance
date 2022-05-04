import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import colors from '../../../constants/colors';
import CoreRewardsContent from './CoreRewardsContent';
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
            border-radius: 15px;
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
            color: white;
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

const CoreRewardsExpansion = ({ CoreRewardsContract, PriceHelperContract }) => {
    const web3React = useWeb3React();

    const { account, active } = web3React;

    const { setConnectionDialogOpen } = useContext(InjectedContext);

    const [lpStaked, setLpStaked] = useState(null);
    const [panelOpen, setPanelOpen] = useState(false);

    const updateLpStaked = async () => {
        if (account && CoreRewardsContract) {
            const balance = await CoreRewardsContract.methods.balanceOf(account).call();
            setLpStaked(balance);
        }
    }

    useEffect(() => {
        updateLpStaked();
        const interval = setInterval(updateLpStaked, 20000);
        return () => clearInterval(interval);
    }, [account, CoreRewardsContract]);

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
                        <span className="balance-text">LP Staked: </span>
                        {active && lpStaked && formatTokenAmount(lpStaked)}
                        {active && !lpStaked && <Skeleton className="skeleton" variant="text" width={50} />}
                        {!active && "-"}
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <CoreRewardsContent
                        lpStaked={lpStaked}
                        updateLpStaked={updateLpStaked}
                        panelOpen={panelOpen}
                        CoreRewardsContract={CoreRewardsContract}
                        PriceHelperContract={PriceHelperContract}
                    />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Container>
    );
}

export default CoreRewardsExpansion;
