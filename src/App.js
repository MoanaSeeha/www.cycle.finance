import React, { useState, createContext } from 'react';
import ConnectedMain from './components/ConnectedMain';
import { useEagerConnect } from './constants/hooks';
// import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import ConnectionDialog from './components/common/ConnectionDialog';

// Amplify.configure(awsconfig);

export const InjectedContext = createContext({
    setConnectionDialogOpen: null
});

const App = () => {
    const [connectionDialogOpen, setConnectionDialogOpen] = useState(false);

    useEagerConnect();

    return (
        <InjectedContext.Provider value={{ setConnectionDialogOpen }}>
            <ConnectedMain />
            <ConnectionDialog open={connectionDialogOpen} setOpen={setConnectionDialogOpen} />
        </InjectedContext.Provider>
    );
}

export default App;
