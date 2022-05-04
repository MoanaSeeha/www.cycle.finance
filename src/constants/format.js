import Web3 from 'web3';

export const formatTokenAmount = (weiString, decimals = 2) => {
    if (!weiString || weiString === '0') return '0';
    const fromWei = Web3.utils.fromWei(weiString);
    const parts = fromWei.split('.');
    let joined;
    if (parts[1]) {
        parts[1] = parts[1].substr(0, decimals);
        joined = Number(parts.join('.'));
    } else {
        joined = Number(parts[0]);
    }
    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: decimals
    }).format(joined);
}

export const formatUSDTeAmount = (weiString, decimals = 2) => {
    if (!weiString || weiString === '0') return '0';
    const fromWei = Web3.utils.fromWei(weiString, "mwei");
    const parts = fromWei.split('.');
    let joined;
    if (parts[1]) {
        parts[1] = parts[1].substr(0, decimals);
        joined = Number(parts.join('.'));
    } else {
        joined = Number(parts[0]);
    }
    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: decimals
    }).format(joined);
}

export const formatApyAmount = (apyString, decimals = 2) => {
    if (!apyString || apyString === '0') return '0';
    const parts = apyString.split('.');
    let joined;
    if (parts[1]) {
        parts[1] = parts[1].substr(0, decimals);
        joined = Number(parts.join('.'));
    } else {
        joined = Number(parts[0]);
    }
    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: decimals
    }).format(joined);
}
