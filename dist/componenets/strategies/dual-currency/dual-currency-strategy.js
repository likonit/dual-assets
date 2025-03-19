import normalizeRows from "../../../functions/normalizeRows.js";
export default function dualCurrencyStrategy(coins, budgetToBuy, APR) {
    const goalPrice = 0.9997;
    const coinsCount = [];
    const coinsPlus = [];
    let globalBuy = 0;
    let localBuy = 0;
    let normizedMatrix = [];
    for (const coin of coins) {
        normizedMatrix.push(normalizeRows(coin));
        coinsCount.push(0);
        coinsPlus.push(0);
    }
    let needBuy = true;
    let currBudget = budgetToBuy;
    let res = "";
    let prevRow = normizedMatrix[0][0];
    for (let i = 1; i < normizedMatrix[0].length; i++) {
        const currRow = normizedMatrix[localBuy % coins.length][i];
        if (currRow[0][1] != prevRow[0][1]) {
            if (globalBuy % coins.length != 0)
                currBudget += budgetToBuy;
            else {
                currBudget = budgetToBuy;
                needBuy = true;
                prevRow = currRow;
                continue;
            }
        }
        if (!needBuy) {
            continue;
        }
        if (currRow[1] >= prevRow[1] * goalPrice) {
            currBudget *= 1 + (APR / 365 / 100);
            localBuy++;
            res = "GET USDT";
        }
        else {
            const cointGet = currBudget / (prevRow[1] * goalPrice);
            coinsCount[localBuy % coins.length] += cointGet + cointGet * (APR / 365 / 100);
            coinsPlus[localBuy % coins.length]++;
            res = `GET COIN (${localBuy % coins.length}, ${globalBuy})`;
            globalBuy++;
            localBuy = globalBuy;
            currBudget = budgetToBuy;
            if (globalBuy % coins.length == 0)
                needBuy = false;
        }
        console.log(prevRow, currRow, res, currBudget);
        prevRow = normizedMatrix[localBuy % coins.length][i];
    }
    return [coinsCount];
}
//# sourceMappingURL=dual-currency-strategy.js.map