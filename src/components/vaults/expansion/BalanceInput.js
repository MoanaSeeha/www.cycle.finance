import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../../constants/colors';
import CycleButton from '../../common/CycleButton';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { MaxUint256 } from '@ethersproject/constants';
import { formatTokenAmount } from '../../../constants/format';
import BN from 'bn.js';
import { DEPOSIT, WITHDRAW, AVAX, LP } from '../../../constants/depositForm';

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding-top: 10px;
    padding-bottom: ${props => props.depositLPselected ? "12px" : ""};

    .input-wrapper {
        position: relative;

        .balance-input {
            border: 1px solid ${colors.slideToggle};
            font: inherit;
            padding: 10px;
            width: 208px;
            box-sizing: border-box;
            font-family: Ubuntu Mono;
            font-weight: 700;
            letter-spacing: 0.05em;
    
            &::placeholder {
                color: #bbbbbb;
            }
        }

        .token-amount-sub-text {
            position: absolute;
            font-size: 0.7em;
            top: 47px;
            left: 11px;
            width: fit-content;
        }

        .max-select {
            position: absolute;
            font-size: 0.7em;
            background: ${colors.slideToggle};
            color: black;
            padding: 3px 4px;
            top: 12px;
            right: 5px;
            cursor: pointer;
            font-family: Ubuntu Mono;
            font-weight: 700;
            letter-spacing: 0.05em;
        }
    }

    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
    }

    input[type=number] {
        -moz-appearance: textfield;
    }

    .deposit-button {
        color: white;
        background-color: ${colors.pallet.two};
        min-width: 202px !important;
    }

    .deposit-button:hover {
        background-color: ${colors.pallet.lightBlue};
    }

    // MOBILE

    @media screen and (max-width: 550px) {
        flex-direction: column;
        align-items: center;
        height: 100px;
        justify-content: space-between;

        .deposit-button {
            padding: 10px 0 !important;
            min-width: 206px !important;
        }

        .input-wrapper {
            .token-amount-sub-text {
                font-size: 0.6em;
                top: 45px;
            }
        }
    }
`;

const BalanceInput = ({ action, token, updateShareBalance, vault, setTogglesFrozen, setOpenSuccessAlert, setOpenFailureAlert, setAlertText, showDepositForm, shares }) => {
    const web3React = useWeb3React();

    const { account } = web3React;

    const [placeholder, setPlaceholder] = useState(null);
    const [buttonText, setButtonText] = useState(null);
    const [inputText, setInputText] = useState("");
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [inputEnabled, setInputEnabled] = useState(true);
    const [approveLP, setApproveLP] = useState(false);
    const [lpBalance, setLpBalance] = useState('0');
    const [actionButtonLoading, setActionButtonLoading] = useState(false);
    const [expectedLP, setExpectedLP] = useState(null);
    const [approximateAVAX, setApproximateAVAX] = useState(null);
    const [showBalanceNotice, setShowBalanceNotice] = useState(false);

    useEffect(() => {
        // reset to handle flush miss
        setApproveLP(false);
    }, [account]);

    useEffect(() => {
        setInputText("");
        setInputEnabled(true);

        const approveTime = (action === DEPOSIT && token === LP && approveLP);
        setButtonEnabled(approveTime);

        if (action === DEPOSIT) {
            if (token === AVAX) {
                setPlaceholder("Enter AVAX");
                setButtonText("Deposit AVAX");
            } else {
                setPlaceholder(`Enter ${vault.nonGeneric ? vault.LPtoken : "LP"}`);
                setButtonText(' ');
                setInputEnabled(false);
                setTogglesFrozen(true);
                account && vault.contracts.pair.methods
                    .allowance(account, vault.addresses.vault)
                    .call()
                    .then(amount => {
                        setTogglesFrozen(false);
                        if (amount === '0') {
                            setButtonEnabled(true);
                            setApproveLP(true);
                            setButtonText('Approve');
                        } else {
                            setApproveLP(false);
                            setButtonText(`Deposit ${vault.nonGeneric ? vault.LPtoken : "LP"}`);
                            setInputEnabled(true);
                        }
                    });
            }
        } else {
            if (token === AVAX) {
                setPlaceholder("Enter shares");
                setButtonText("Withdraw AVAX");
            } else {
                setPlaceholder("Enter shares");
                setButtonText(`Withdraw ${vault.nonGeneric ? vault.LPtoken : "LP"}`);
            }
        }
    }, [action, token, account, approveLP]);

    useEffect(() => {
        const num = Number(inputText);
        const validInput = (num && num !== 0);
        setButtonEnabled(validInput);
    }, [inputText]);

    useEffect(() => {
        if (!inputText) setShowBalanceNotice(false);
    }, [inputText]);

    useEffect(() => {
        const getOutputInfo = async () => {
            if (showBalanceNotice) setShowBalanceNotice(false);
            const inputTextWei = Web3.utils.toWei(inputText);
            const inputTextWeiBN = new BN(inputTextWei);
            const sharesBN = new BN(shares);
            const compRes = inputTextWeiBN.ucmp(sharesBN);
            if (compRes === 1) {
                setShowBalanceNotice(true);
                return;
            }
            const outputLPwei = await vault.contracts.vault.methods.getLPamountForShares(inputTextWei).call();
            if (token === LP) {
                setExpectedLP(outputLPwei);
                return;
            }
            const outputAVAXwei = await vault.contracts.vault.methods.getAVAXamountForLPamount(outputLPwei).call();
            setApproximateAVAX(outputAVAXwei);
        }
        inputText && account && (action === WITHDRAW) && getOutputInfo();
    }, [inputText]);

    useEffect(() => {
        if (inputText && (action === DEPOSIT) && (token === LP) && lpBalance) {
            if (showBalanceNotice) setShowBalanceNotice(false);
            const inputTextWei = Web3.utils.toWei(inputText);
            const inputTextWeiBN = new BN(inputTextWei);
            const lpBalanceBN = new BN(lpBalance);
            const compRes = inputTextWeiBN.ucmp(lpBalanceBN);
            if (compRes === 1) {
                setShowBalanceNotice(true);
            }
        }
    }, [inputText]);

    const getLpBalance = async () => {
        const bal = await vault.contracts.pair.methods.balanceOf(account).call();
        setLpBalance(bal);
    }

    useEffect(() => {
        if (action === DEPOSIT && token === LP) {
            account && getLpBalance();
        }
    }, [action, token, vault]);

    useEffect(() => {
        if (!showDepositForm) {
            setInputText("");
        }
    }, [showDepositForm]);

    const depositAVAX = () => {
        if (!inputText || !account) return;

        const transactionValue = Web3.utils.toWei(inputText);

        vault.contracts.vault.methods
            .depositAVAX()
            .send({
                from: account,
                value: transactionValue
            })
            .on('sending', () => {
                setActionButtonLoading(true);
                setTogglesFrozen(true);
            })
            .on('sent', () => {
                setActionButtonLoading(true);
                setTogglesFrozen(true);
            })
            .on('receipt', async () => {
                setActionButtonLoading(false);
                setAlertText("AVAX Deposit Successful");
                setOpenSuccessAlert(true);
                setInputText("");
                setTogglesFrozen(false);
                await updateShareBalance();
            })
            .on('error', () => {
                setActionButtonLoading(false);
                setAlertText("Unable to Deposit AVAX");
                setOpenFailureAlert(true);
                setInputText("");
                setTogglesFrozen(false);
            })
    }

    const withdrawAVAX = () => {
        if (!inputText || !account) return;

        const shares = Web3.utils.toWei(inputText, 'ether');

        vault.contracts.vault.methods
            .withdrawAVAX(shares)
            .send({ from: account })
            .on('sending', () => {
                setActionButtonLoading(true);
                setTogglesFrozen(true);
            })
            .on('sent', () => {
                setActionButtonLoading(true);
                setTogglesFrozen(true);
            })
            .on('receipt', async () => {
                setActionButtonLoading(false);
                setAlertText("AVAX Withdraw Successful");
                setOpenSuccessAlert(true);
                setInputText("");
                setTogglesFrozen(false);
                await updateShareBalance();
            })
            .on('error', () => {
                setActionButtonLoading(false);
                setAlertText("Unable to Withdraw AVAX");
                setOpenFailureAlert(true);
                setInputText("");
                setTogglesFrozen(false);
            })
    }

    const approveLPforDeposit = () => {
        if (!account) return;

        vault.contracts.pair.methods
            .approve(vault.addresses.vault, MaxUint256)
            .send({ from: account })
            .on('sending', () => {
                setActionButtonLoading(true);
                setTogglesFrozen(true);
            })
            .on('sent', () => {
                setActionButtonLoading(true);
                setTogglesFrozen(true);
            })
            .on('receipt', () => {
                setActionButtonLoading(false);
                setAlertText("Approval Successful");
                setOpenSuccessAlert(true);
                setApproveLP(false);
                setInputEnabled(true);
                setButtonEnabled(false);
                setButtonText(`Deposit ${vault.nonGeneric ? vault.LPtoken : "LP"}`);
                setTogglesFrozen(false);
            })
            .on('error', () => {
                setActionButtonLoading(false);
                setAlertText("Unable to Approve");
                setOpenFailureAlert(true);
                setTogglesFrozen(false);
            });
    }

    const depositLP = () => {
        if (!inputText || !account) return;

        const lpAmount = Web3.utils.toWei(inputText, 'ether');

        vault.contracts.vault.methods
            .depositLP(lpAmount)
            .send({ from: account })
            .on('sending', () => {
                setActionButtonLoading(true);
                setTogglesFrozen(true);
            })
            .on('sent', () => {
                setActionButtonLoading(true);
                setTogglesFrozen(true);
            })
            .on('receipt', async () => {
                setActionButtonLoading(false);
                setAlertText(`${vault.nonGeneric ? vault.LPtoken : "LP"} Deposit Successful`);
                setOpenSuccessAlert(true);
                setInputText("");
                setTogglesFrozen(false);
                await updateShareBalance();
                await getLpBalance();
            })
            .on('error', () => {
                setActionButtonLoading(false);
                setAlertText(`Unable to Deposit ${vault.nonGeneric ? vault.LPtoken : "LP"}`);
                setOpenFailureAlert(true);
                setInputText("");
                setTogglesFrozen(false);
            });
    }

    const withdrawLP = () => {
        if (!inputText || !account) return;

        const shares = Web3.utils.toWei(inputText, 'ether');

        vault.contracts.vault.methods
            .withdrawLP(shares)
            .send({ from: account })
            .on('sending', () => {
                setActionButtonLoading(true);
                setTogglesFrozen(true);
            })
            .on('sent', () => {
                setActionButtonLoading(true);
                setTogglesFrozen(true);
            })
            .on('receipt', async () => {
                setActionButtonLoading(false);
                setAlertText(`${vault.nonGeneric ? vault.LPtoken : "LP"} Withdraw Successful`);
                setOpenSuccessAlert(true);
                setInputText("");
                setTogglesFrozen(false);
                await updateShareBalance();
            })
            .on('error', () => {
                setActionButtonLoading(false);
                setAlertText(`Unable to Withdraw ${vault.nonGeneric ? vault.LPtoken : "LP"}`);
                setOpenFailureAlert(true);
                setInputText("");
                setTogglesFrozen(false);
            });
    }

    const executeTransaction = () => {
        if (action === DEPOSIT) {
            if (token === AVAX) {
                depositAVAX();
            } else {
                if (approveLP) {
                    approveLPforDeposit();
                } else {
                    depositLP();
                }
            }
        } else {
            if (token === AVAX) {
                withdrawAVAX();
            } else {
                withdrawLP();
            }
        }
    }
    
    const getMaxValue = () => {
        if (action === WITHDRAW) {
            setTogglesFrozen(true);
            account && vault.contracts.vault.methods.accountShareBalance(account).call().then(bal => {
                setTogglesFrozen(false);
                const text = Web3.utils.fromWei(bal, 'ether');
                if (text === '0') return;
                setInputText(text);
            }); 
        } else {
            setInputText(Web3.utils.fromWei(lpBalance));
        }
    }

    const depositLPselected = (action === DEPOSIT && token === LP);
    const withdrawLPwithInput = (inputText && action === WITHDRAW && token === LP);
    const withdrawAVAXwithInput = (inputText && action === WITHDRAW && token === AVAX);

    const validateInput = value => {
        const [, fraction] = value.split('.');
        if (fraction && fraction.length > 18) {
            return;
        } else {
            setInputText(value);
        }
    }

    return (
        <>
            <Container depositLPselected={depositLPselected || withdrawLPwithInput || withdrawAVAXwithInput}>
                <div className="input-wrapper">
                    <input
                        type="number"
                        className="balance-input"
                        placeholder={placeholder}
                        value={inputText}
                        onChange={e => validateInput(e.target.value)}
                        disabled={!inputEnabled}
                    />
                    {depositLPselected && !showBalanceNotice && <div className="token-amount-sub-text">
                        {`${vault.nonGeneric ? vault.LPtoken : "LP"}`} Balance: {formatTokenAmount(lpBalance, vault.decimals)}
                    </div>}
                    {withdrawLPwithInput && !showBalanceNotice && <div className="token-amount-sub-text">
                        Receive ~{formatTokenAmount(expectedLP, vault.decimals)} {`${vault.nonGeneric ? vault.LPtoken : "LP"}`}
                    </div>}
                    {withdrawAVAXwithInput && !showBalanceNotice && <div className="token-amount-sub-text">
                        Receive ~{formatTokenAmount(approximateAVAX)} AVAX
                    </div>}
                    {inputText && showBalanceNotice && <div className="token-amount-sub-text">
                        Insufficient Balance
                    </div>}
                    {(action === WITHDRAW || (token === LP && lpBalance !== '0')) && 
                        <div
                            onClick={getMaxValue}
                            className="max-select"
                            style={{
                                display: `${(approveLP && action === DEPOSIT) ? "none" : "block"}`
                            }}
                        >
                            MAX
                        </div>
                    }
                </div>
                <CycleButton
                    className="deposit-button"
                    text={buttonText}
                    onClick={executeTransaction}
                    loading={actionButtonLoading}
                    disabled={!buttonEnabled || showBalanceNotice}
                />
            </Container>
        </>
    );
}

export default BalanceInput;
