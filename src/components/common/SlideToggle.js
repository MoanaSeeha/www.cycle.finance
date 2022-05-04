import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../constants/colors';

const Container = styled.div`
    // border: 1px solid ${colors.slideToggle};
    width: fit-content;
    display: flex;
    user-select: none;
    cursor: ${props => props.zeroBalance ? "default" : "pointer"};
    background-color: white;
    font-family: Ubuntu Mono;
    font-weight: 700;
    letter-spacing: 0.05em;
    

    .option {
        padding: 10px;
        color: black;
        min-width: 80px;
        width: ${props => props.zeroBalance ? "185px" : ""};
    }

    .selected {
        background-color: ${colors.pallet.two};
        color: white;
        transition: 1s ease;
    }

    .unselected {
        display: ${props => props.zeroBalance ? "none" : "block"};
    }

    .hide {
        display: none;
    }

    .wide {
        width: 180px;
    }

    // MOBILE

    @media screen and (max-width: 650px) {
        .wide {
            width: 186px;
        }
    }
`;

const SlideToggle = ({ option1, option2, option, setOption, zeroBalance, freezeToggles, className, onlyOption1 }) => {
    const [optionSelected, setOptionSelected] = useState(option);

    useEffect(() => {
        if (zeroBalance) {
            setOptionSelected(1);
            setOption(1);
        }
    }, [zeroBalance]);

    useEffect(() => {
        if (onlyOption1) {
            setOption(1);
        }
    }, [onlyOption1]);

    useEffect(() => {
        setOptionSelected(option);
    }, [option]);

    return (
        <Container
            className={className}
            zeroBalance={zeroBalance}
        >
            <div
                className={`option ${optionSelected == 1 ? "selected" : ""} ${onlyOption1 ? "wide" : ""}`}
                onClick={() => !freezeToggles && setOption(1)}
            >
                {option1}
            </div>
            <div
                className={`option ${optionSelected == 2 ? "selected" : "unselected"} ${onlyOption1 ? "hide" : ""}`}
                onClick={() => !freezeToggles && setOption(2)}
            >
                {option2}
            </div>
        </Container>
    );
}

export default SlideToggle;
