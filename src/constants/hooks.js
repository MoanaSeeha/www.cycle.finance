import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector';
import { AVAX_MAINNET } from './chain';
import { findBlock } from './findBlock';

const injected = new InjectedConnector({ supportedChainIds: [AVAX_MAINNET] });

export function useEagerConnect() {
    const { activate, active } = useWeb3React()

    const [tried, setTried] = useState(false)

    useEffect(() => {
        injected.isAuthorized().then((isAuthorized) => {
            if (isAuthorized) {
                activate(injected, undefined, true).catch(() => {
                    setTried(true)
                })
            } else {
                setTried(true)
            }
        })
    }, []) // intentionally only running on mount (make sure it's only mounted once :))

// if the connection worked, wait until we get confirmation of that to flip the flag
useEffect(() => {
    if (!tried && active) {
        setTried(true)
    }
}, [tried, active])

return tried
}

export const useFindBlock = (days, blockScanPercent, segmentPercent) => {
    const [blockNumber, setBlockNumber] = useState(null);

    useEffect(() => {
        const findBlockNumber = async () => {
            const blockNumber = await findBlock(days, blockScanPercent, segmentPercent);
            setBlockNumber(blockNumber);
        }
        findBlockNumber();
    }, []);

    return blockNumber;
}
