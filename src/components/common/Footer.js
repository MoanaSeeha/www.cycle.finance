import React from 'react';
import styled from 'styled-components';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import colors from '../../constants/colors';
import Slide from '@material-ui/core/Slide';

const StyledHeader = styled.div`
    .MuiToolbar-regular {
        min-height: 100px;
        background-color: ${colors.pallet.two};
        display: flex;
        justify-content: space-between;
        max-width: 100vw;
        box-sizing: border-box;
        margin-top: 50px;
        padding-bottom: 50px;

        .center-logo {
            margin: 0 auto;
            cursor: pointer;
            padding-top: 20px;
        }  
    }

    .logo {
        height: 75px;    
    }

    // MOBILE

    @media screen and (max-width: 665px) {
        .button-container {
            display: none;
        }

        .header-link {
            display: none;
        }

        .MuiToolbar-regular {
            justify-content: space-between;
            position: relative;
        }
    }
`;

const openLink = link => window.open(link, "_blank");

const Footer = () => {
    return (
        <>
            <StyledHeader>          
                <Toolbar style={{background:"transparent"}} elevation={0}>
                    <div className="center-logo">
                        <img 
                            onClick={() => openLink("https://www.avax.network/")}
                            className="logo"
                            src="powByAva.png"
                            alt="logo"
                        />
                    </div>
                </Toolbar>
            </StyledHeader>
        </>
    )
}

export default Footer;
