const Web3 = require('web3');
const { CONNECTION_URL } = require('./connection');

const web3 = new Web3(new Web3.providers.HttpProvider(CONNECTION_URL));

const secondsInDay = 60 * 60 * 24;

/**
 * Utility for finding a close block outside of a recent day range
 * Will move back in time based on input configuration 
 * 
 * @param {Number} days - number of days to find block outside of
 * @param {Number} blockScanPercent - percent of the chain height
 * @param {Number} segmentPercent - percent chunks of blockScanPercent to move back in time through
 * @returns block number
 */
export const findBlock = async (days, blockScanPercent, segmentPercent) => {
    let winner;

    const seconds = secondsInDay * days;

    const { timestamp: currentTimestamp, number: currentBlockNumber } = await web3.eth.getBlock("latest");

    const targetBlockNumber = Math.floor(currentBlockNumber * ((100 - blockScanPercent) * 0.01));

    const blockDistanceSegment = Math.floor((currentBlockNumber - targetBlockNumber) * (segmentPercent * 0.01));

    for (let i = 1;; i++) {
        const testBlockNumber = currentBlockNumber - (blockDistanceSegment * i);

        const { timestamp: resultTimeStamp } = await web3.eth.getBlock(testBlockNumber);
        
        const timeDifference = currentTimestamp - resultTimeStamp;
        
        if (timeDifference > seconds) {
            winner = testBlockNumber;
            break;
        }
    }

    return winner;
}
