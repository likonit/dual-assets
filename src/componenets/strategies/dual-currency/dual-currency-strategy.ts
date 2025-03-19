import { Row } from "read-excel-file";
import normalizeRows, { normalizedRow } from "../../../functions/normalizeRows.js";

export default function dualCurrencyStrategy(coins: Row[][], budgetToBuy: number, APR: number) {

    // console.log(coins[0][0], coins[1][0], coins[2][0], coins[3][0], coins[4][0])
    const goalPrice = 0.9997 // множитель целевой цены
    const coinsCount = []
    const coinsPlus = []

    let globalBuy = 0 // индекс той монеты, которую глобально будем покупать
    let localBuy = 0 // индекс той монеты, которую будем покупать, 
                     // если целевая цена не достигнута и мы получили доп. USDT

    let normizedMatrix: normalizedRow[][] = []

    for (const coin of coins) {
        normizedMatrix.push(normalizeRows(coin))
        coinsCount.push(0)
        coinsPlus.push(0)
    }

    let needBuy = true
    let currBudget = budgetToBuy // текущий бюджет с учётом возможного APR 
    let res = ""
    let prevRow = normizedMatrix[0][0]

    for (let i = 1; i < normizedMatrix[0].length; i++) {

        const currRow = normizedMatrix[localBuy % coins.length][i]

        if (currRow[0][1] != prevRow[0][1]) {

            // месяц обновился
            if (globalBuy % coins.length != 0) currBudget += budgetToBuy
            else {
                
                currBudget = budgetToBuy
                needBuy = true
                prevRow = currRow
                continue

            }

        }

        if (!needBuy) {continue}

        if (currRow[1] >= prevRow[1]*goalPrice) {

            // целевая цена не достигнута. получаем обратно USDT + APR
            // это значит, что мы идём к следующей монете

            currBudget *= 1 + (APR / 365 / 100)
            localBuy++
            res = "GET USDT"

            // if (localBuy % coins.length == globalBuy % coins.length) {

            //     // мы прошлись по всем монетам, и не одна нам не вернулась с бонусом.
            //     // значит покупаем ту монету, с которой начали по рыночной цене
                
            //     const coinGet = currBudget / normizedMatrix[localBuy % coins.length][i][1]
            //     coinsCount[localBuy % coins.length] += coinGet
            //     coinsPlus[localBuy % coins.length]++
            //     res = `END (${localBuy % coins.length}, ${globalBuy})`
            //     globalBuy++
            //     localBuy = globalBuy
            //     currBudget = budgetToBuy
            //     if (globalBuy % coins.length == 0) needBuy = false

            // }

        } else {

            // целевая цена достингута. покупаем монету по этой цене и получаем бонус APR 
            const cointGet = currBudget / (prevRow[1]*goalPrice)
            coinsCount[localBuy % coins.length] += cointGet + cointGet * (APR / 365 / 100)
            coinsPlus[localBuy % coins.length]++
            res = `GET COIN (${localBuy % coins.length}, ${globalBuy})`
            globalBuy++
            localBuy = globalBuy
            currBudget = budgetToBuy
            if (globalBuy % coins.length == 0) needBuy = false

        }

        console.log(prevRow, currRow, res, currBudget)

        prevRow = normizedMatrix[localBuy % coins.length][i]
        
    }

    return [coinsCount]

}