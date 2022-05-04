import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../constants/colors';
import Header from './common/Header/Header';
import Footer from './common/Footer';
import Vaults from './vaults/Vaults';
import Stake from './staking/Stake';
import Cycle from './cycle/Cycle';
import LandingPage from './landing/LandingPage';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowUp';
import Fab from '@material-ui/core/Fab';

const Container = styled.div`
    text-align: center;
    min-height: 100vh;
    background: rgb(41,55,81);
    background: ${colors.pallet.darkBlueGradient};
    font-size: 24px;

    .MuiFab-root {
        color: #1A202C;
        background-color: white;
        bottom: 3%;
        right: 2%;
        position: fixed;
        z-index: 1;
    }

    .mobile-message {
        font-family: Ubuntu Mono;
        font-weight: 700;
        letter-spacing: 0.05em;
        padding: 20px 10px 0;
        color: ${colors.borderGrey};
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .page-container {
        animation: fadeIn ease 0.5s;
    }

    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }

    @media screen and (prefers-reduced-motion: no-preference) {
        html {
            scroll-behavior: smooth;
        }
      }
`;

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

const ConnectedMain = () => {
    const [page, setPage] = useState('landing');

    return (
        <Container>
            <Header
                page={page}
                setPage={setPage}
                provider={true}
            />
            {page == "landing" && <div className="page-container">
                <LandingPage 
                    page = {page}
                    setPage = {setPage}
                />
            </div>}
            {page === 'vaults' &&
                <div className="page-container">
                    <Fab
                        color="primary"
                        aria-label="Add"
                        onClick={() => topFunction()}
                    >
                        <KeyboardArrowDown fontSize="large"/>
                    </Fab>
                    <Vaults/>
                </div>
            }
            {page === 'stake' && <div className="page-container">
                <Stake />
            </div>}
            {page === 'cycle' && <div className="page-container">
                <Cycle />
            </div>}
            <Footer/>         
        </Container>
    );
}

export default ConnectedMain;
