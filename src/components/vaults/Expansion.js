import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionContent from './ExpansionContent';
import colors from '../../constants/colors';
import { useWeb3React } from '@web3-react/core';
import { formatTokenAmount } from '../../constants/format';
import Skeleton from '@material-ui/lab/Skeleton';
import { InjectedContext } from '../../App';

const Container = styled.div`
    margin: 8px 4px;

    .MuiExpansionPanel-root {
        border-radius: 15px!important;
        // border: 2px solid ${colors.pallet.one};
        background-color: ${colors.pallet.lightGrey};

        &:before {
            background-color: unset;
        }

        &.Mui-expanded {
            margin: unset;
        }
    }

    .MuiExpansionPanelSummary-root {
        padding: 0 12px;
        // border: 2px solid ${colors.pallet.one};
        border-radius: 15px!important;

        .balance-info {
            padding-right: 10px;
            font-family: Ubuntu Mono;
            font-weight: 700;
            letter-spacing: 0.05em;
            color: ${colors.pallet.one};

            .balance-text {
                color: ${colors.lightGrey};
            }

            .shares-text {
                color: ${colors.vaultCardWhite};
            }
        }

        .MuiExpansionPanelSummary-content {
            &.Mui-expanded {
                margin: 12px 0;
            }
        }

        .MuiIconButton-root {
            color: ${colors.pallet.one};
            padding: 6px 12px;
        }

        .MuiIconButton-root:hover {
            transform: scale(1.5);
        }

        &.Mui-expanded {
            min-height: 48px;
        }
    }

    .MuiExpansionPanelDetails-root {
        padding: 6px 12px 12px;
    }

    .skeleton {
        background: ${colors.skeletonBackground};
    }

    // MOBILE

    @media screen and (max-width: 450px) {
        .balance-info {
            font-size: 0.9em;
        }
    }
`;

const Expansion = ({
    closeAllPanels,
    vault,
    refresh,
    setRefresh,
    PriceHelperContract,
    DistributorContract,
    LPBreakdownContract
}) => {
    const web3React = useWeb3React();

    const { account, active } = web3React;

    const { setConnectionDialogOpen } = useContext(InjectedContext);

    const [shares, setShares] = useState(null);
    const [panelOpen, setPanelOpen] = useState(false);

    const vaultRef = useRef(vault ? vault.addresses.vault : null);

    const updateShareBalance = async () => {
        account && await vault.contracts.vault.methods
            .accountShareBalance(account)
            .call()
            .then(bal => {
                setShares(bal);
            });
    }

    useEffect(() => {
        const updateShares = async () => {
            await updateShareBalance();
        }
        if (vaultRef.current !== vault.addresses.vault) {
            setPanelOpen(false);
            vaultRef.current = vault.addresses.vault;
        }
        updateShares();
    }, [account, vault]);

    return (
        <Container>
            <ExpansionPanel
                expanded={panelOpen && !closeAllPanels}
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
                        <span className="balance-text">Shares: </span>
                        <span className="shares-text">
                            {active && shares && formatTokenAmount(shares, vault.decimals)}
                        </span>
                        {active && !shares && 
                            <Skeleton
                                className="skeleton"
                                variant="text"
                                width={75}
                                style={{
                                    display: "inline-block"
                                }}
                            />
                        }
                        {!active && "-"}
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <ExpansionContent
                        updateShareBalance={updateShareBalance}
                        shares={shares}
                        vault={vault}
                        panelOpen={panelOpen}
                        refresh={refresh}
                        setRefresh={setRefresh}
                        PriceHelperContract={PriceHelperContract}
                        DistributorContract={DistributorContract}
                        LPBreakdownContract={LPBreakdownContract}
                    />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Container>
    );
}

export default Expansion;
