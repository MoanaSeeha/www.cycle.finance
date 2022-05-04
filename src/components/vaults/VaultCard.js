import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import Expansion from './Expansion';
import colors from '../../constants/colors';
import AutoLPCardHeader from './AutoLPCardHeader';

const Container = styled.div`
    .MuiCard-root {
        color: ${colors.vaultCardWhite};
        width: 600px;
        margin-bottom: 20px;
        margin: 20px;
        padding: 10px;
        font-weight: 500;
        background-color: ${colors.pallet.darkGrey};
        
        font-size: 0.8em;
        // border: 2px solid ${colors.pallet.one};
        border: 2px solid ${colors.vaultCardWhite};
        border-radius: 15px;
    }

    // MOBILE

    @media screen and (max-width: 650px) {
        .MuiCard-root {
            width: 95%;
            margin: 0 auto 20px;
            box-sizing: border-box;
        }
    }
`;

const VaultCard = ({
    closeAllPanels,
    vault,
    PriceHelperContract,
    DistributorContract,
    CycleToAvaxContract,
    LPBreakdownContract,
    blockNumberForRewardEvent
}) => {
    const [refresh, setRefresh] = useState(1);

    return (
        <Container>
            <Card>
                <AutoLPCardHeader
                    vault={vault}
                    refresh={refresh}
                    PriceHelperContract={PriceHelperContract}
                    CycleToAvaxContract={CycleToAvaxContract}
                    blockNumberForRewardEvent={blockNumberForRewardEvent}
                />
                <div className="expansion-container">
                    <Expansion
                        vault={vault}
                        closeAllPanels={closeAllPanels}
                        refresh={refresh}
                        setRefresh={setRefresh}
                        PriceHelperContract={PriceHelperContract}
                        DistributorContract={DistributorContract}
                        LPBreakdownContract={LPBreakdownContract}
                    />
                </div>
            </Card>
        </Container>
    );
}

export default VaultCard;
