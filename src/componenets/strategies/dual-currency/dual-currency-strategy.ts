import { Row } from "read-excel-file";
import normalizeRows, { normalizedRow } from "../../../functions/normalizeRows.js";

// функция реализации стратегии бивалютного инвестирования
// описание стратегии приведено в README.md
export default function dualCurrencyStrategy(
    coins: Row[][], 
    budgetToBuy: number, 
    APR: number,
    percentDown: number, // на сколько % опустится цена
    days: number, //  дни ожидания целевой цены
    strategy: 1 | 2
) {

    const goalPrice = 1 - percentDown / 100
    const coinsCount = [] // итоговое количество каждой из переданных монет

    let localBuy = 1 // индекс той монеты, которую будем покупать, 
                     // если целевая цена не достигнута и мы получили доп. USDT

    let normizedMatrix: normalizedRow[][] = []

    for (const coin of coins) {

        normizedMatrix.push(normalizeRows(coin))
        coinsCount.push(0)
        
    }

    let canBuy = coins.length
    let bought = 0
    let currBudget = budgetToBuy // текущий бюджет с учётом возможного APR 
    let prevRow = normizedMatrix[0][0]

    for (let i = 1; i < normizedMatrix[0].length; i += days) {

        const currRow = normizedMatrix[(localBuy-1) % coins.length][i]

        // месяц обновился
        if (currRow[0][1] != prevRow[0][1]) canBuy += coins.length

        if (canBuy <= bought) continue
        // целевая цена не достигнута. получаем обратно USDT + APR
        if (currRow[1] >= prevRow[1]*goalPrice) {

            currBudget *= 1 + (APR / 365 / 100 * days)
            if (strategy == 2) {

                localBuy++
                // реализуем стратегию 2
                let nextRow = normizedMatrix[(localBuy-1) % coins.length][i]
                
                coinsCount[(localBuy-1) % coins.length] += currBudget / nextRow[1]
                bought++
                currBudget = budgetToBuy

            }

        } else {

            // целевая цена достингута. покупаем монету по этой цене и получаем бонус APR 
            const cointGet = currBudget / (prevRow[1]*goalPrice)
            coinsCount[(localBuy-1) % coins.length] += cointGet * (1 + (APR / 365 / 100 * days))

            bought++
            currBudget = budgetToBuy

        }

        prevRow = normizedMatrix[localBuy % coins.length][i]
        localBuy++
        
    }

    return [coinsCount]

}