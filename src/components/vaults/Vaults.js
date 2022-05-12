import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import VaultCard from './VaultCard';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import CycleVaultV3 from '../../abis/Cycle.sol/Cycle.json';
import StakingRewardsStrategyV2 from '../../abis/vaults/strategies/StakingRewardsStrategyV2.sol/StakingRewardsStrategyV2.dbg.json';
import PangolinPair from '../../abis/DistributorV5.sol/PangolinLibrary.json';
import VaultRewards from '../../abis/vaults/VaultRewards.sol/VaultRewards.json';
import vaults from '../../constants/vaults';
import colors from '../../constants/colors';
import Skeleton from '@material-ui/lab/Skeleton';
import BN from 'bn.js';
import addresses from '../../constants/addresses';
import { formatUSDTeAmount } from '../../constants/format';
import Divider from '@material-ui/core/Divider';
import InfoIcon from '@material-ui/icons/HelpOutline';
import FilterBox from './FilterBox';
import { CONNECTION_URL } from '../../constants/connection';
import PriceHelperABI from '../../abis/PriceHelper.sol/PriceHelper.json';
import DistributorABI from '../../abis/DistributorV5.sol/DistributorV5.json';
import AVAXRewardsTVLABI from '../../abis/AVAXRewards.sol/ETHRewards.json';
// import CYCLEtoAvaxABI from '../../../abis/Cycle.sol/Cycle.json';
// import LPBreakdownABI from '../../abis//LPBreakdown.json';
import { useFindBlock } from '../../constants/hooks';

const CompoundingPage = "https://guide.cycle.finance/cycle-protocol/vault-compounding";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Ubuntu Mono;
    font-weight: 700;
    letter-spacing: 0.05em;

    .tvl-container {
        font-size: 1.6em;
        width: 100%;
        display: block;
        justify-content: center;
        align-items: center;
        position: relative;
        color: ${colors.backgroundTextWhite};
        background-color: transparent;
    }

    .title-container {
        font-size: 1.6em;
        width: fit-content;
        position: relative;
        color: ${colors.backgroundTextWhite};
        background-color: transparent;
    }

    .upper-page-container {
        padding: 30px 0;
        font-size: 1.4em;
    }

    .help-button {
        position: absolute;
        top: 53%;
        left: 83%;
        opacity: 0.5;
    }

    .help-button:hover {
        transform: scale(1.1);
        cursor: pointer;
    }

    .text-box {
        font-weight: bolder;
        font-size: 0.9em;
        display: flex;
    }

    .label-top-row {
        position: relative;
        color: white;
        left: 5%;
        padding-right: 10%;
    }

    .checkbox-style {
        color: white;
    } 

    .vaults {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;   
        justify-content: center;

        .child {
            box-sizing: border-box;
        }
    }
    
    .vaults-style-button {
        display: flex;
        position: relative;
        color: white;
        border: 2px white solid;
        margin-top: 2%;
        margin-right: 10%;
        text-align: center;
        padding: 10px;
    }

    .sort-button {
        display: flex;
        position: relative;
        color: white;
        margin-top: 2%;
        margin-right: 10%;
        text-align: center;
        padding: 10px;
    }

    .bottom-row {
        display: flex;
        item-aligns: center;
        justify-content: center;
    }

    .divider {
        background: linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(255,255,255,1) 50%,rgba(0,0,0,0) 100%);
        width:30%;
        text-align: center;
        display: flex;
    }

    .skeleton {
        background: ${colors.skeletonBackground};
        display: inline-block;
    }

    // MOBILE

    @media screen and (max-width: 650px) {
        align-items: unset;

        .tvl-container {
            font-size: 1.0em;
            margin-bottom: 5px;
        }

        .title-container {
            margin-top: 20px;
            font-size: 1.0em;
            justify-content: center;
            width: 100%;

            .text-box {
                font-size: 0.9em;
                justify-content: center;
            }
        }

        .vaults {
            display: flex;
            flex-direction: column;
        }

        .help-button {
            top: 50%;
        }

        .divider {
            width: 60%;
            margin:auto;
            margin-bottom: 10px;
        }

        .MuiIconButton-root {
            transform: scale(1.5);
        }
    }

    @media screen and (max-width: 420px) {
        .tvl-container {
            font-size: 0.9em;
        }
    }
`;

const openLink = link => window.open(link, "_blank");

const Vaults = () => {
    const web3React = useWeb3React();

    const { active, account, library } = web3React;

    const [closeAllPanels, setCloseAllPanels] = useState(false);
    const [vaultData, setVaultData] = useState(null);
    const [vaultTVLbn, setVaultTVLbn] = useState(null);
    const [totalTVL, setTotalTVL] = useState(null);
    const [showVaults, setShowVaults] = useState('all');
    const [sortTVL, setTVLSorting] = useState(true);
    const [vaultType, setVaultType] = useState("all");
    const [protocolSelected, setProtocolSelected] = useState(["All"]);
    const [searchValue, setSearchValue] = useState("");
    const [vaultDataWithBalances, setVaultDataWithBalances] = useState(null);
    const blockNumberForRewardEvent = useFindBlock(3, 10, 4);

    const [vaultsWithContracts, setVaultsWithContracts] = useState(null);
    const [PriceHelperContract, setPriceHelperContract] = useState(null);
    const [DistributorContract, setDistributorContract] = useState(null);
    const [AVAXRewardsTVLcontract, setAVAXRewardsTVLcontract] = useState(null);
    const [CycleToAvaxContract, setCycleToAvaxContract] = useState(null);
    const [LPBreakdownContract, setLPBreakdownContract] = useState(null);
    
    const [filters, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'reset':
                return [];
            case 'include':
                return [...state, action.name];
            case 'remove':
                return state.filter(n => n != action.name);
            default:
                return state;
        }
    }, []);

    useEffect(() => {
        let web3;
        if (library) {
            web3 = new Web3(library.givenProvider);
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider(CONNECTION_URL));
        }
        const _vaultsWithContracts = vaults.map(v => ({
            contracts: {
                vault: new web3.eth.Contract(CycleVaultV3.abi, v.addresses.vault),
                strategy: new web3.eth.Contract(StakingRewardsStrategyV2.abi, v.addresses.strategy),
                pair: new web3.eth.Contract(PangolinPair.abi, v.addresses.pair),
                rewards: new web3.eth.Contract(VaultRewards.abi, v.addresses.rewards)
            },
            ...v
        }));
        const _PriceHelperContract = new web3.eth.Contract(PriceHelperABI.abi, addresses.priceHelper);
        const _DistributorContract = new web3.eth.Contract(DistributorABI.abi, addresses.distributor);
        const _AVAXRewardsTVLcontract = new web3.eth.Contract(AVAXRewardsTVLABI.abi, addresses.avaxRewardsTVL);
        // const _CycleToAvaxContract = new web3.eth.Contract(CycleToAvaxABI, addresses.cycleToAvax);
        // const _LPBreakdownContract = new web3.eth.Contract(LPBreakdownABI, addresses.lpBreakdown);
        setVaultsWithContracts(_vaultsWithContracts);
        setPriceHelperContract(_PriceHelperContract);
        setDistributorContract(_DistributorContract);
        setAVAXRewardsTVLcontract(_AVAXRewardsTVLcontract);
        // setCycleToAvaxContract(_CycleToAvaxContract);
        // setLPBreakdownContract(_LPBreakdownContract);
    }, [active]);

    useEffect(() => {
        setCloseAllPanels(!active);
    }, [active]);

    const getTotalTVL = async () => {
        const coreTVL = await DistributorContract.methods.getCoreRewardsTVL().call();
        const coreTVLbn = new BN(coreTVL, 10);
        vaultTVLbn.iadd(coreTVLbn);

        const avaxTVL = await AVAXRewardsTVLcontract.methods.getAVAXamountStaked().call();
        const avaxTVLbn = new BN(avaxTVL, 10);
        vaultTVLbn.iadd(avaxTVLbn);

        const totalUSD = await PriceHelperContract.methods.getAVAXtoUSD(vaultTVLbn.toString(10)).call();
        setTotalTVL(totalUSD);
    }

    useEffect(() => {
        vaultTVLbn && DistributorContract && AVAXRewardsTVLcontract && PriceHelperContract && getTotalTVL();
    }, [vaultTVLbn]);

    const getTVLdata = async () => {
        vaultsWithContracts && await Promise.all(vaultsWithContracts.map(async v => {
            const bal = await v.contracts.vault.methods.balanceLPinSystem().call();
            return await v.contracts.vault.methods.getAVAXquoteForLPamount(bal).call();
        }))
        .then(vaultAvaxTVLs => {
            const vaultsWithAVAX = vaultsWithContracts.map((v, i) => ({
                avaxTVL: vaultAvaxTVLs[i],
                ...v
            }));

            let totalAvaxTVLbn = new BN('0', 10);
            vaultAvaxTVLs.forEach(t => {
                const tvlBN = new BN(t, 10);
                totalAvaxTVLbn.iadd(tvlBN);
            });

            setVaultTVLbn(totalAvaxTVLbn);

            const tvlSort = ((a, b) => {
                if (a.avaxTVL.length == b.avaxTVL.length) {
                    if (a.avaxTVL < b.avaxTVL) {
                        return 1;
                    }
                    if (a.avaxTVL > b.avaxTVL) {
                        return -1;
                    }
                    return 0;
                } else if (a.avaxTVL.length < b.avaxTVL.length) {
                    return 1;
                } else {
                    return -1;
                }
            });
            
            vaultsWithAVAX.sort((a, b) => {
                if (a.decomm || b.decomm) {
                    if (a.decomm && !b.decomm) {
                        return 1;
                    } else if (!a.decomm && b.decomm) {
                        return -1;
                    } else if (a.decomm && b.decomm) {
                        return tvlSort(a, b);
                    } else {
                        return 0;
                    }
                } else {
                    return tvlSort(a, b);
                }
                // if (a.avaxTVL.length == b.avaxTVL.length) {
                //     if (a.avaxTVL < b.avaxTVL) {
                //         return 1;
                //     }
                //     if (a.avaxTVL > b.avaxTVL) {
                //         return -1;
                //     }
                //     return 0;
                // } else if (a.avaxTVL.length < b.avaxTVL.length) {
                //     return 1;
                // } else {
                //     return -1;
                // }
            })

            //setVaultData(vaultsWithAVAX);
            sortTVL ? setVaultData(vaultsWithAVAX) : setVaultData(vaultsWithAVAX.reverse());
        });
    }

    useEffect(() => {
        getTVLdata();
    }, [sortTVL]);

    useEffect(() => {
        getTVLdata();
        // const interval = setInterval(getTVLdata, 60000);
        // return () => clearInterval(interval);
    }, [vaultsWithContracts]);

    useEffect(() => {
        if (vaultData && account) {
            Promise.all(vaultData.map(async v => {
                return await v.contracts.vault.methods.accountShareBalance(account).call();
            }))
            .then(balances => {
                const vaultsWithBalance = vaultData.map((v, i) => ({
                    accountBalance: balances[i],
                    ...v
                }));
                setVaultDataWithBalances(vaultsWithBalance);
            });
        }
    }, [vaultData, account]);

    useEffect(() => {
        setTVLSorting(true);
        setProtocolSelected(["All"]);
        setVaultType("all");
    }, [showVaults]);

    return (
        <Container>
            <div className="title-container upper-page-container">
                <div className="text-box">
                    Auto-compound LP tokens<br />+ earn $CYCLE  
                    <InfoIcon
                        className="help-button"
                        onClick={() => openLink(CompoundingPage)}
                    />
                </div>
            </div>
            <Divider className="divider" variant='middle'/>
            <div className="tvl-container upper-page-container">
                {totalTVL && "TVL: $" + formatUSDTeAmount(totalTVL, 0)}
                {!totalTVL && <Skeleton variant="text" width={200} className="skeleton"/>}
            </div>
            <FilterBox 
                dispatch={dispatch}
                filters={filters}
                setSearchValue={setSearchValue} 
                searchValue={searchValue} 
                setTVLSorting={setTVLSorting} 
                sortTVL={sortTVL} 
                setVaultType={setVaultType}
                vaultType={vaultType} 
                showVaults={showVaults}
                setShowVaults={setShowVaults}
                protocolSelected={protocolSelected}
                setProtocolSelected={setProtocolSelected}
            />
            <div className="vaults">
            {showVaults === 'all' && vaultData && vaultData.map(vault => {
                if(vault.vaultName.toLowerCase().includes(searchValue.toLowerCase())){
                    if(vaultType == 'all') {
                        if (filters.length === 0 || filters.includes(vault.protocol)) {
                                return (
                                    <VaultCard
                                        closeAllPanels={closeAllPanels}
                                        vault={vault}
                                        PriceHelperContract={PriceHelperContract}
                                        DistributorContract={DistributorContract}
                                        CycleToAvaxContract={CycleToAvaxContract}
                                        LPBreakdownContract={LPBreakdownContract}
                                        blockNumberForRewardEvent={blockNumberForRewardEvent}
                                    />
                                );
                        } 
                    }
                    else {
                        if ((filters.length === 0 || filters.includes(vault.protocol)) && vault.type.includes(vaultType)) {
                            return (
                                <VaultCard
                                    closeAllPanels={closeAllPanels}
                                    vault={vault}
                                    PriceHelperContract={PriceHelperContract}
                                    DistributorContract={DistributorContract}
                                    CycleToAvaxContract={CycleToAvaxContract}
                                    LPBreakdownContract={LPBreakdownContract}
                                    blockNumberForRewardEvent={blockNumberForRewardEvent}
                                />
                            );
                        } 
                    }
                }
            })}
            {showVaults === 'mine' && vaultDataWithBalances && vaultDataWithBalances.map(vault => {
                if(vault.vaultName.toLowerCase().includes(searchValue.toLowerCase())){
                    if(vaultType == 'all') {
                        if (vault.accountBalance !== '0' && (filters.length === 0 || filters.includes(vault.protocol))) {
                            return (
                                <VaultCard
                                    closeAllPanels={closeAllPanels}
                                    vault={vault}
                                    PriceHelperContract={PriceHelperContract}
                                    DistributorContract={DistributorContract}
                                    CycleToAvaxContract={CycleToAvaxContract}
                                    LPBreakdownContract={LPBreakdownContract}
                                    blockNumberForRewardEvent={blockNumberForRewardEvent}
                                />
                            );
                        } 
                    }
                    else {
                        if (vault.accountBalance !== '0' && (filters.length === 0 || filters.includes(vault.protocol)) && vault.type.includes(vaultType)) {
                            return (
                                <VaultCard
                                    closeAllPanels={closeAllPanels}
                                    vault={vault}
                                    PriceHelperContract={PriceHelperContract}
                                    DistributorContract={DistributorContract}
                                    CycleToAvaxContract={CycleToAvaxContract}
                                    LPBreakdownContract={LPBreakdownContract}
                                    blockNumberForRewardEvent={blockNumberForRewardEvent}
                                />
                            );
                        } 
                    }
                }
            })}  
            {!vaultData && vaults.map((v, i) => {
                return (
                    <Skeleton
                        key={i}
                        className="skeleton"
                        variant="rect"
                        width={600}
                        height={180}
                        style={{
                            marginBottom: 20
                        }}
                    />
                );
            })}
            </div>
        </Container>
    );
}

export default Vaults;
