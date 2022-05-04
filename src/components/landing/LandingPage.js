import React, { useState } from 'react';
import styled from 'styled-components';
import Divider from '@material-ui/core/Divider';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const Container = styled.div`
    .brand-img {
        animation: fade-in-move-down ease 1s;
        padding-top: 50px;
        width: 35%;
        padding-bottom: 50px;
    }

    .title {
        animation: fade-in ease 2s;
        font-size: 1.2em;
        color: white;
        padding-bottom: 50px;
    }   

    .details-title {
        font-size: 1.2em;
        color: white;
        font-weight: bold;
        margin-top: 5%;
    }  
    
    .cards-holder {
        display: flex;
        width: 50%;
        height: 150px;
        position: relative;
        margin: auto;
        border-radius: 25px;
        padding: 50px 0;
        justify-content: space-evenly;
        align-items: center;
    }

    .vault-card {
        animation: vault-card-anim ease 3s;
        display: inline-block;
        height: 100px;
        border-radius: 25px;
        cursor: pointer;
        background: rgba(0,255,0,.05);
        border: 2px #6f6 solid;
        box-shadow: 0 0 10px rgba(0,255,0,.6), inset 0 0 10px rgba(0,255,0,.4), 0 2px 0 #000;
        margin-right: 15px;
    }

    @keyframes vault-card-anim {
        0% {
            background: transparent;
            box-shadow: none;
            border: 2px white solid;
        }
        50% {
            background: transparent;
            box-shadow: none;
            border: 2px white solid;
        }
        100% {
            background: rgba(0,255,0,.05);
            box-shadow: 0 0 10px rgba(0,255,0,.6), inset 0 0 10px rgba(0,255,0,.4), 0 2px 0 #000;
        }
    }

    .vault-card:hover {
        transform: scale(1.05);
    }

    .stake-card {
        animation: stake-card-anim ease 3s;
        display: inline-block;
        height: 100px;
        border-radius: 25px;
        cursor: pointer;
        border: 2px #6670ff solid;
        background: rgba(0,0,255,.1);
        box-shadow: 0 0 20px rgba(0,0,200,1.0), inset 0 0 10px rgba(0,0,200,.8), 0 2px 0 #000;
        margin-left: 15px;
    }

    .nav-card {
        padding: 15px;
        box-sizing: border-box;
        width: 225px;
    }

    @keyframes stake-card-anim {
        0% {
            background: rgba(0,0,255,.1);
            box-shadow: none;
            border: 2px white solid;
        }
        50% {
            background: rgba(0,0,255,.1);
            box-shadow: none;
            border: 2px white solid;
        }
        100% {
            background: rgba(0,0,255,.1);
            box-shadow: 0 0 20px rgba(0,0,200,1.0), inset 0 0 10px rgba(0,0,200,.8), 0 2px 0 #000;
        }
    }

    .stake-card:hover {
        transform: scale(1.05);
    }

    .img {
        padding-top: 50px;
        width: 150px;
        margin-right: auto; 
    }

    .divider-style {
        animation: divider-fade 3s;
        background: linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(255,255,255,1) 50%,rgba(0,0,0,0) 100%);
        margin: auto;
        width: 30%;
    }

    .vertical-divider-style {
        background: linear-gradient(to top, rgba(0,0,0,0) 0%,rgba(255,255,255,1) 50%,rgba(0,0,0,0) 100%);
        height: 350px;
        margin-right: 50px;
        margin-left: 50px;
    }
 
    .card-title {
        font-size: 0.8em;
        color: white;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }

    .details {
        width: 33%;
    }

    .bottom-part {
        display: flex;
        width: 70%;
        height: 400px;
        position: relative;
        margin: auto;
        border-radius: 25px;
    }

    .description {
        font-size: 0.6em;
        color: white;
        font-weight: lighter;
        display: block;
        margin-top: 30px;
    }

    @keyframes fade-in-move-down {
        0% {
            opacity: 0;
            transform: translateY(-3rem);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes divider-fade {
        0% {
            width: 0%;
        }
        50% {
            width: 0%;
        }
        100% {
            width: 30%;
        }
    }

    // MOBILE

    @media screen and (max-width: 1000px) {
        .bottom-part {
            width: 90%;
        }
    }

    @media screen and (max-width: 650px) {

        .brand-img {
            width: 80%;
            padding-top: 50px;
            padding-bottom: 20px;
        }

        .cards-holder {
            width: 70%;
        }

        .bottom-part {
            display: block;
            width: 70%;
            height: auto;
            margin: auto;
        }
        
        .details {
            display: flex;
            width: 100%;
            justify-text: auto;
            margin-bottom: 50px;
        }   
    
        .description {
            font-size: 0.6em;
            color: white;
            font-weight: lighter;
            display: flex;
            position: absolute;
            margin-top: 50px;
            padding-top: 15px;
        }

        .details-title {
            font-size: 0.9em;
            color: white;
            font-weight: bold;
            display: flex;
            right: 50%;
            margin-top: 0%;   
        }  

        .vertical-divider-style {
            display: none;
        }

        .divider-style {
            width: 70%;
        }

        .divider-mobile-style {
            display: flex;
            background: linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(255,255,255,1) 50%,rgba(0,0,0,0) 100%);
            width: 100%;
            position: absolute;
            margin-top: -30px;
        }

        .img {
            padding-top: 0;
        }

        @keyframes divider-fade {
            0% {
                width: 0%;
              }
              50% {
                width: 0%;
              }
              100% {
                width: 70%;
              }
          }
    }

    @media screen and (max-width: 450px) {
        .bottom-part {
            width: 90%;
        }

        .details {
            margin-bottom: 90px;
        }
    }
`;

const LandingPage = ({ page, setPage}) => {

    return (
        <Container>
            <img className="brand-img"
                src="cycleFont.png"
                alt="logo"  
            />
            <div className="title"> 
                Compound - Earn - Cycle 
            </div>
            <Divider className="divider-style" variant="middle"/>
            <div className="cards-holder">
                <div className="vault-card nav-card" 
                    onClick={() => {
                            setPage('vaults');
                        }}
                > 
                        <div className="card-title">Explore vault selection</div>
                </div>
                <div className="stake-card nav-card"
                    onClick={() => {
                        setPage('stake');
                    }}
                >  
                        <div className="card-title">Stake your $CYCLE</div>
                </div>
            </div>
            <div className="bottom-part">
                <div className="details">
                    <img className="img" data-aos="fade-right"
                        src="zap.png"
                        alt="logo"  
                    />
                    <div className="details-title" data-aos="fade-up"> 
                        Easy on-boarding<br/>
                            <div className="description"> One-click deposit into our vaults with our ZAP function.</div>
                    </div>
                </div>
                <Divider className="vertical-divider-style" orientation="vertical"/>
                <Divider className="divider-mobile-style"/>
                <div className="details">
                    <img className="img" data-aos="fade-down"
                        src="vault.png"
                        alt="logo"  
                    />
                    <div className="details-title" data-aos="fade-up"> 
                        Compound rewards <br/>
                            <div className="description"> Optimize your yields by automatically compounding rewards. We offer vaults for a variety of Avalanche projects.</div>
                    </div>
                </div>
                <Divider className="vertical-divider-style" orientation="vertical"/>
                <Divider className="divider-mobile-style" />
                <div className="details">
                    <img className="img" data-aos="fade-left"
                        src="cycleToken.png"
                        alt="logo"  
                        />
                    <div className="details-title" data-aos="fade-up">  
                        Lucrative staking<br/>
                            <div className="description"> xCycle single staking buys back $CYCLE tokens using protocol revenues</div>
                    </div>
            </div>
            </div>
        </Container>
    );
}

export default LandingPage;
