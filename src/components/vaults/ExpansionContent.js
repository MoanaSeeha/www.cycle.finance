import React, { useState, useReducer } from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import CycleAlert from '../common/CycleAlert';
import ShareBalance from './expansion/ShareBalance';
import DepositForm from './expansion/DepositForm';
import Earnings from './expansion/Earnings';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-family: Ubuntu Mono;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: white;

    .content-row {
        padding: 5px 0;
    }
`;

const ExpansionContent = ({
    updateShareBalance,
    shares,
    vault,
    panelOpen,
    refresh,
    setRefresh,
    PriceHelperContract,
    DistributorContract,
    LPBreakdownContract
}) => {
    const web3React = useWeb3React();

    const { account } = web3React;

    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openFailureAlert, setOpenFailureAlert] = useState(false);
    const [alertText, setAlertText] = useState("");

    const zeroBalance = shares === '0';

    return (
        <>
            <Container>
                {
                    !zeroBalance && 
                    <ShareBalance
                        shares={shares}
                        panelOpen={panelOpen}
                        account={account}
                        vault={vault}
                        refresh={refresh}
                        PriceHelperContract={PriceHelperContract}
                        LPBreakdownContract={LPBreakdownContract}
                    />
                }
                <DepositForm
                    zeroBalance={zeroBalance}
                    vault={vault}
                    updateShareBalance={updateShareBalance}
                    setOpenSuccessAlert={setOpenSuccessAlert}
                    setOpenFailureAlert={setOpenFailureAlert}
                    setAlertText={setAlertText}
                    panelOpen={panelOpen}
                    shares={shares}
                />
                <Earnings
                    account={account}
                    vault={vault}
                    panelOpen={panelOpen}
                    setOpenSuccessAlert={setOpenSuccessAlert}
                    setOpenFailureAlert={setOpenFailureAlert}
                    setAlertText={setAlertText}
                    setRefresh={setRefresh}
                    DistributorContract={DistributorContract}
                />
            </Container>
            <CycleAlert
                openAlert={openSuccessAlert}
                setOpenAlert={setOpenSuccessAlert}
                type="success"
                text={alertText}
            />
            <CycleAlert
                openAlert={openFailureAlert}
                setOpenAlert={setOpenFailureAlert}
                type="error"
                text={alertText}
            />
        </>
    );
}

export default ExpansionContent;
