import React, { useState } from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import DiscordIcon from 'mdi-material-ui/Discord';
import GithubIcon from 'mdi-material-ui/Github';
import TwitterIcon from 'mdi-material-ui/Twitter';
import BookOpenPageVariantIcon from 'mdi-material-ui/BookOpenPageVariant';
// import TelegramIcon from 'mdi-material-ui/Telegram';
// import { ReactComponent as MediumIcon } from './medium.svg';
import Wallet from './Wallet';
import colors from '../../../constants/colors';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Button from '@material-ui/core/Button';


const GitBookLink = "https://guide.cycle.finance/";
const MediumLink = "https://medium.com/@cycleprotocol";
const DiscordLink = "https://discord.gg/uxWH3k8XTd";
const TwitterLink = "https://twitter.com/CycleProtocol";
const GithubLink = "https://github.com/CycleProtocol";
const TelegramLink = "https://t.me/CycleProtocol";
const tradeLink = "https://app.pangolin.exchange/#/swap?inputCurrency=avax&outputCurrency=0x81440c939f2c1e34fc7048e518a637205a632a74";
const CMCLink = "https://coinmarketcap.com/currencies/cycle-finance/";
const CGLink = "https://www.coingecko.com/en/coins/cycle-token";
const analyticsLink = "https://info.pangolin.exchange/#/token/0x81440c939f2c1e34fc7048e518a637205a632a74";

const StyledHeader = styled.div`
    .MuiToolbar-regular {
        position: sticky;
        min-height: 100px;
        max-height: 100px;
        display: flex;
        justify-content: space-between;
        max-width: 100vw;
        box-sizing: border-box;
        @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
              background-color: transparent;
              -webkit-backdrop-filter: blur(15px);
              backdrop-filter: blur(15px);
            }
        background-color: rgba(0, 0, 0, .9);
    }

    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: ${colors.pallet.two};
        min-width: 160px;
        border-radius: 15px;
        z-index: 1;
        right: 1px;
        left: auto;
        border: 2px white solid;
    }

    /* Links inside the dropdown */
    .dropdown-content a {
        font-size: large;
        border-radius: 15px;
        color: ${colors.pallet.one};
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        text-align: left;
    }

    /* Change color of dropdown links on hover */
    .dropdown-content a:hover {
        background-color: ${colors.pallet.lightBlack};
    }

    /* Show the dropdown menu on hover */
    .dropdown:hover .dropdown-content {
        display: block;
        cursor: pointer;
    }

    .dropdown:focus .dropdown-content {
        display: block;
        cursor: pointer;
    }

    /* Change the background color of the dropdown button when the dropdown content is shown */
    .dropdown:hover .dropbtn {
        background-color: #3e8e41;
    }

    .MuiIconButton-root {
        color: ${colors.pallet.one};
        // color: inherit;
    }

    .logo {
        height: 75px;
        padding-right: 10px;
        transition-duration: 0.5s;
        transition-property: transform;
    }

    .logo:hover {
        transform: rotate(-15deg);
    }

    .header-left-content {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .header-center{
        display: flex;
        text-align: center;
        width:0%;
        margin: auto;
    
        .header-link {
            display: flex;
            justify-content: center;
            text-align: center;
            padding-right: 50px;
            color: grey;
            font-weight: 500;
            user-select: none;
            cursor: pointer;
            z-index: 1;
            
            &.selected {
                color: ${colors.pallet.one};
                text-decoration: underline;
            } 
        }

        .header-link:hover {
            color: ${colors.pallet.one};
            text-decoration: underline;
        }
    }

    .button-container {
        display: grid;
        grid-template-rows: 1fr 1fr;
        transition: transform .2s;

        .bottom-row {
            display: flex;
            justify-content: flex-end;
        }
    }

    .more-button {
        color: white;
        align-items: center;
        text-transform: initial;
        font-weight: bold;
        font-size: 25px;
        margin-left: 3px;
    }

    .more-button:hover {
        transform: scale(1.25);
    }

    .zoom:hover {
        transform: scale(1.25);
    }

    .medium-svg {
        path:last-child {
            color: transparent;
        }
    }

    .menu-icon-container {
        display: none;
    }

    .mobile-wallet {
        display: none;
    }

    .extra-links-mobile {
        text-align: center;
    }

    // MOBILE

    @media screen and (max-width: 665px) {
        .button-container {
            display: none;
        }

        .header-center {
            display: none;
        }

        .MuiToolbar-regular {
            justify-content: space-between;
            position: relative;

            .menu-icon-container {
                display: block;

                .MuiSvgIcon-root {
                    font-size: 2rem;
                    color:  ${colors.pallet.one};
                }
            }

            .mobile-wallet {
                display: block;
            }
        }

        .list {
            width: 250px;
        }

        .logo {
            height: 75px;
            margin-left: auto;
            margin-right: auto;
        }
    }

`;

const MenuList = styled.div`
    width: 250px;
    height: 100%;
    background-color: ${colors.pallet.two};
    
    .drawer {
        background-color: ${colors.pallet.two};
    }

    .drawer-link {
        font-size: 24px;
        font-weight: 500;
        text-align: center;
        margin: 20px 0;
        color: ${colors.pallet.one};
        cursor: pointer;
        

        &.selected {
            color: ${colors.pallet.lightBlue};  
            text-decoration: underline;     
        }        
    }

    .drawer-link:hover {
        color: ${colors.pallet.lightBlue};
    }

    .mobile-social-links {
        padding-top: 15px;
        
        .MuiIconButton-root {
            color: ${colors.pallet.one};        
        }

        .upper-links {
            display: flex;
            justify-content: space-evenly;
        }

        .lower-links {
            display: flex;
            justify-content: space-evenly;
            padding-top: 5px;
        }

        .medium-svg {
            path:last-child {
                color: transparent;
            }
        }
    }
`;

function HideOnScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({ 
        threshold: 300
    });
  
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}


const openLink = link => window.open(link, "_blank");

const Header = ({ page, setPage, provider }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <StyledHeader>
                <HideOnScroll>
                    <AppBar style={{background:"transparent"}} elevation={0}>
                        <Toolbar>
                            <div className="menu-icon-container">
                                <IconButton>
                                    <MenuIcon
                                        onClick={() => setMenuOpen(true)}
                                    />
                                </IconButton>
                                <Drawer
                                    anchor="left"
                                    open={menuOpen}
                                    onClose={() => setMenuOpen(false)}
                                    className="drawer"
                                >
                                    <MenuList>
                                        {provider && ['vaults', 'stake', 'cycle'].map(p => (
                                            <div
                                                className={`drawer-link ${page === p && "selected"}`}
                                                onClick={() => {
                                                    setPage(p);
                                                    setMenuOpen(false);
                                                }}
                                            >
                                                {p.charAt(0).toUpperCase() + p.slice(1)}
                                            </div>
                                        ))}
                                        <Divider style={{backgroundColor:'white'}}/>
                                        <div className="mobile-social-links">
                                            <div className="upper-links">
                                                <IconButton onClick={() => openLink(GithubLink)}>
                                                    <GithubIcon />
                                                </IconButton>
                                                <IconButton onClick={() => openLink(DiscordLink)}>
                                                    <DiscordIcon />
                                                </IconButton>
                                                <IconButton onClick={() => openLink(TwitterLink)}>
                                                    <TwitterIcon />
                                                </IconButton>
                                            </div>
                                            <div className="lower-links">
                                                <IconButton onClick={() => openLink(TelegramLink)}>
                                                    {/* <TelegramIcon /> */}
                                                </IconButton>
                                                <IconButton onClick={() => openLink(MediumLink)}>
                                                    {/* <SvgIcon
                                                        className="medium-svg"
                                                        component={MediumIcon}
                                                    /> */}
                                                </IconButton>
                                                <IconButton onClick={() => openLink(GitBookLink)}>
                                                    <BookOpenPageVariantIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                        <div className="drawer-link" style={{fontSize: "medium"}}>
                                            <a onClick={() => openLink(tradeLink)}>Get $CYCLE</a>
                                        </div>
                                        <div className="drawer-link" style={{fontSize: "medium"}}>
                                            <a onClick={() => openLink(analyticsLink)}>Analytics page</a>
                                        </div>
                                        <div className="drawer-link" style={{fontSize: "medium"}}>
                                            <a onClick={() => openLink(CMCLink)}>CoinMarketCap</a>
                                        </div>
                                        <div className="drawer-link" style={{fontSize: "medium"}}>
                                            <a onClick={() => openLink(CGLink)}>CoinGecko</a> 
                                        </div>
                                    </MenuList>
                                </Drawer>
                            </div>
                            <div className="header-left-content" onClick={() => setPage('landing')}>
                                <img 
                                    className="logo"
                                    src="cycleLogo.png"
                                    alt="logo"  
                                />
                            </div>
                            <div className="header-center">
                                {provider && ['vaults', 'stake', 'cycle'].map(p => (
                                    <div
                                        className={`header-link ${page === p && "selected"}`}
                                        onClick={() => setPage(p)}
                                    >
                                        {p.charAt(0).toUpperCase() + p.slice(1)}
                                    </div>
                                ))} 
                            </div>
                            <div className="mobile-wallet">
                                {provider && <Wallet />}
                            </div>
                            <div className="button-container">
                                <div className="top-row">
                                    <IconButton onClick={() => openLink(GithubLink)} className="zoom">
                                        <GithubIcon />
                                    </IconButton>
                                    <IconButton onClick={() => openLink(DiscordLink)} className="zoom">
                                        <DiscordIcon />
                                    </IconButton>
                                    <IconButton onClick={() => openLink(TwitterLink)} className="zoom">
                                        <TwitterIcon />
                                    </IconButton>
                                    <IconButton onClick={() => openLink(TelegramLink)} className="zoom">
                                        {/* <TelegramIcon /> */}
                                    </IconButton>
                                    <IconButton onClick={() => openLink(MediumLink)} className="zoom">
                                        {/* <SvgIcon
                                            className="medium-svg"
                                            component={MediumIcon}
                                        /> */}
                                    </IconButton>
                                    <IconButton onClick={() => openLink(GitBookLink)} className="zoom">
                                        <BookOpenPageVariantIcon />
                                    </IconButton>
                                    <div class="dropdown">
                                        <Button className="more-button">
                                            ...
                                            <ArrowDropDownIcon fontSize="small"/>
                                        </Button>
                                        <div class="dropdown-content">
                                            <a onClick={() => openLink(tradeLink)}>Get $CYCLE</a>
                                            <a onClick={() => openLink(analyticsLink)}>Analytics page</a>
                                            <a onClick={() => openLink(CMCLink)}>CoinMarketCap</a>
                                            <a onClick={() => openLink(CGLink)}>CoinGecko</a>  
                                        </div>
                                    </div>
                                </div>
                                {provider && <div className="bottom-row">
                                    <Wallet />
                                </div>}
                            </div>
                        </Toolbar>
                        <Divider style={{background:"white"}}/>
                    </AppBar>
                </HideOnScroll>
                <Toolbar />
            </StyledHeader>
        </>
    )
}

export default Header;
