import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import colors from '../../../constants/colors';
import Distribution from './Distribution';
import Fees from './Fees';
import DailyAPR from './DailyAPR';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    padding-top: 40px;
    

    .MuiCard-root {
        color: white;
        width: 600px;
        padding: 10px;
        font-weight: 500;
        background-color: ${colors.pallet.lightBlack};
        font-size: 0.75em;
        font-family: Ubuntu Mono;
        border: 2px solid ${colors.pallet.lightBlue};
        border-radius: 15px;
        box-shadow: 0 5px 15px ${colors.pallet.lightBlue};
        font-weight: 700;
        letter-spacing: 0.05em;
    }

    .head-text {
        padding: 10px 0 20px;
        font-size: 1.1em;
    }

    .sub-text {
        color: ${colors.borderGrey};
        padding-bottom: 10px;
    }

    // MOBILE

    @media screen and (max-width: 650px) {
        padding-top: 20px;

        .MuiCard-root {
            width: 100%;
        }
    }
`;

const OperationsCard = () => {
    return (
        <Container>
            <Card>
                <Distribution />
                <DailyAPR />
                <Fees />
            </Card>
        </Container>
    );
}

export default OperationsCard;
