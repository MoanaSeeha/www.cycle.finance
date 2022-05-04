import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { formatTokenAmount, formatUSDTeAmount } from '../../../constants/format';
import colors from '../../../constants/colors';
import Skeleton from '@material-ui/lab/Skeleton';

const Container = styled.div`
    .balance-header {
        font-size: 0.9em;
        padding: 5px 0 10px 10px;
        color: ${colors.lightGrey};
        display: flex;
        justify-content: flex-start;
    }

    .balances {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 5px 0 20px 10px;
        font-size: 0.9em;
        color: ${colors.vaultCardWhite};
        
        .seperator {
            padding: 0 10px;
            color: ${colors.lightGrey};
        }

        .balance-text {
            color: ${colors.lightGrey};
        }

        .token-balances {
            .avax {
            }
            
            .breakdown {
                margin-top: 5px;
                font-size: 0.75em;
                color: ${colors.lightGrey};
            }
        }
    }

    .skeleton {
        background: ${colors.skeletonBackground};
    }

    // MOBILE

    @media screen and (max-width: 650px) {
        .balances {
            .token-balances {
                .breakdown {
                    .part {
                        display: none;
                    }
                    
                    .bal {
                        display: block;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 450px) {
        .balances {
            font-size: ${props => props.longDecimals ? '0.7em' : '0.8em'};
        }
    }
`;

const ShareBalance = ({
    shares,
    panelOpen,
    account,
    vault,
    refresh,
    PriceHelperContract,
    LPBreakdownContract
}) => {
    const [shareAmountInAVAX, setShareAmountInAVAX] = useState(null);
    const [shareAmountInLP, setShareAmountInLP] = useState(null);
    const [shareAmountInUSD, setShareAmountInUSD] = useState(null);
    const [tokenInfo, setTokenInfo] = useState(null);

    useEffect(() => {
        const v = vault.contracts.vault;
        const getShareInfo = async () => {
            const shareAmount = await v.methods.accountShareBalance(account).call();
            const lpAmount = await v.methods.getLPamountForShares(shareAmount).call();
            const avaxAmount = await v.methods.getAVAXquoteForLPamount(lpAmount).call();
            const usdAmount = await PriceHelperContract.methods.getAVAXtoUSD(avaxAmount).call();
            setShareAmountInLP(lpAmount);
            setShareAmountInAVAX(avaxAmount);
            setShareAmountInUSD(usdAmount);

            if (!vault.nonGeneric) {
                const { amount0, amount1 } = await LPBreakdownContract.methods.getTokenAmounts(vault.addresses.pair, lpAmount).call();
                const { symbol0, decimals0, symbol1, decimals1 } = await LPBreakdownContract.methods.getDetails(vault.addresses.pair).call();
                setTokenInfo({
                    amount0,
                    amount1,
                    symbol0,
                    symbol1,
                    decimals0,
                    decimals1
                });
            }
        }
        account && panelOpen && PriceHelperContract && LPBreakdownContract && getShareInfo();
    }, [shares, panelOpen, account, vault, refresh]);

    const longDecimals = vault.decimals > 5;

    return (
        <Container longDecimals={longDecimals}>
            <div className="balance-header">
                Your share value
            </div>
            <div className="balances">
                {!shareAmountInLP && <Skeleton className="skeleton" variant="text" width={200} />}
                {shareAmountInLP && <div>
                    {formatTokenAmount(shareAmountInLP, vault.decimals)} {`${vault.nonGeneric ? vault.LPtoken : "LP"}`}
                </div>}
                {shareAmountInAVAX && <>
                    <div className="seperator">|</div>
                    <div className="token-balances">
                        {!vault.hideAvaxDisplay && <div className="avax">
                            {formatTokenAmount(shareAmountInAVAX)} AVAX
                        </div>}
                        {
                            tokenInfo && tokenInfo.amount0 && tokenInfo.decimals0 && tokenInfo.symbol0 && 
                            tokenInfo.amount1 && tokenInfo.decimals1 && tokenInfo.symbol1 && 
                        <div className="breakdown">
                            <span className="part">(</span>
                            <span className="bal">{formatTokenAmount(tokenInfo.amount0 + "0".repeat(18 - Number(tokenInfo.decimals0)))} {tokenInfo.symbol0}</span>
                            <span className="part">{" - "}</span>
                            <span className="bal">{formatTokenAmount(tokenInfo.amount1 + "0".repeat(18 - Number(tokenInfo.decimals1)))} {tokenInfo.symbol1}</span>
                            <span className="part">)</span>
                        </div>}
                    </div>
                </>}
                {shareAmountInUSD && <>
                    <div className="seperator">|</div>
                    <div>
                        ${formatUSDTeAmount(shareAmountInUSD, 0)}
                    </div>
                </>}
            </div>
        </Container>
    );
}

export default ShareBalance;
