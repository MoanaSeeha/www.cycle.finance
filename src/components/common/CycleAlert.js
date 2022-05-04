import React from 'react';
import styled from 'styled-components';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const Container = styled.div`
    .MuiAlert-root {
        border-radius: 0;
        font-family: Ubuntu Mono;
        font-weight: 400;
        letter-spacing: 0.05em;
        font-size: 1em;

        .MuiAlert-icon {
            align-items: center;
        }
    }
`;

const CycleAlert = ({ openAlert, setOpenAlert, type, text }) => {

    const handleClose = () => setOpenAlert(false);

    return (
        <Container>
            <Snackbar
                open={openAlert}
                autoHideDuration={10000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={type}
                    elevation={6}
                    variant="filled"
                >
                    {text}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default CycleAlert;
