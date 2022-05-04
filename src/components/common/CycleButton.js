import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import colors from '../../constants/colors';
import CircularProgress from '@material-ui/core/CircularProgress';

const StyledButton = styled(Button)`
    && {
        text-transform: unset;
        padding: 4px 8px;
        color: white;
        letter-spacing: 0.03em;
        font-weight: 600;
        border-radius: 0;
        background-color: ${colors.pallet.two};
        position: relative;
        font: inherit;
        font-family: Ubuntu Mono;
        font-weight: 700;
        letter-spacing: 0.05em;
        border-radius: 10px;
    }

    .spinner {
        position: absolute;
        display: flex;

        .MuiCircularProgress-root {
            color: ${colors.pallet.two};
        }
    }

    &.MuiButton-contained:hover {
        background-color: ${colors.pallet.lightBlue};
    }
`;

const CycleButton = ({
    onClick,
    customStyle,
    text,
    disabled,
    loading,
    className,
    ...otherProps
}) => {
    return (
        <StyledButton
            className={className}
            variant="contained"
            disableElevation
            onClick={onClick}
            style={customStyle}
            disabled={disabled || loading}
        >
            {loading && <div className="spinner">
                <CircularProgress
                    size="1.5em"
                    thickness={5.6}
                />
            </div>}
            {text}
        </StyledButton>
    );
}

export default CycleButton;
