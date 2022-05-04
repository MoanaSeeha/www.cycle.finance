import { DataStore, SortDirection } from 'aws-amplify';
import { Reinvest } from '../models';

export const secondsInYear = 31536000;

export const calculateAPY = async vaultAddress => {
    const reinvests = await DataStore.query(Reinvest, r => r.vault("eq", vaultAddress), {
        sort: s => s.timestamp(SortDirection.DESCENDING),
        limit: 2
    });

    if (reinvests.length === 2) {
        const recent = reinvests[0];
        const previous = reinvests[1];
        const secondsElapsed = recent.timestamp - previous.timestamp;
        const numberOfCompounds = Math.floor(secondsInYear / secondsElapsed);
        const divAmount = Number(recent.amountLP) / Number(previous.amountLP);
        const apyNum = (Math.pow(divAmount, numberOfCompounds) - 1) * 100;
        if (apyNum > 9999) {
            return 'max';
        } else {
            return apyNum.toString();
        }
    } else {
        return '0';
    }
}