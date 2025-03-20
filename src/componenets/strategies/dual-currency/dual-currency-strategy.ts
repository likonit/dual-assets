import { Row } from "read-excel-file";
import normalizeRows, { normalizedRow } from "../../../functions/normalizeRows.js";
import { strategies } from "src/componenets/functions/calculateStrategyResult.js";

// функция реализации стратегии бивалютного инвестирования
// описание стратегии приведено в README.md
export default function dualCurrencyStrategy(
    coins: Row[][], 
    budgetToBuy: number, 
    APR: number,
    percentDown: number, // на сколько % опустится цена
    days: number, //  дни ожидания целевой цены
    strategy: strategies
) {

    const goalPrice = 1 - percentDown / 100
    const coinsCount = [] // итоговое количество каждой из переданных монет

    let currentCoin = 1 // индекс той монеты, которую будем покупать, 
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

        // текущая цена для предыдущей монеты
        const currRow = normizedMatrix[(currentCoin-1) % coins.length][i]

        // месяц обновился
        if (currRow[0][1] != prevRow[0][1]) canBuy += coins.length

        if (canBuy <= bought) continue
        // целевая цена не достигнута. получаем обратно USDT + APR
        if (currRow[1] >= prevRow[1]*goalPrice) {

            currBudget *= 1 + (APR / 365 / 100 * days)
            if (strategy == 2) {

                // покупаем текущую монету по рыночной цене
                let nextRow = normizedMatrix[currentCoin % coins.length][i]
                coinsCount[currentCoin % coins.length] += currBudget / nextRow[1]
                
                // эту монету уже нельзя бивалютно инвестировать
                currentCoin++
                bought++
                currBudget = budgetToBuy

            }

            if (strategy == 3 || strategy == 4) {

                bought++
                currBudget += budgetToBuy
                if (strategy == 4) {

                    // если это последняя монета, которую мы можем купить в этом месяце - покупаем
                    if (bought == canBuy) {

                        let nextRow = normizedMatrix[currentCoin % coins.length][i]
                        coinsCount[currentCoin % coins.length] += currBudget / nextRow[1]
                        currBudget = budgetToBuy
                        currentCoin++

                    }

                }

            }

        } else {

            // целевая цена достингута. покупаем монету по этой цене и получаем бонус APR 
            const cointGet = currBudget / (prevRow[1]*goalPrice)
            coinsCount[(currentCoin-1) % coins.length] += cointGet * (1 + (APR / 365 / 100 * days))

            bought++
            currBudget = budgetToBuy

        }

        prevRow = normizedMatrix[currentCoin % coins.length][i]
        currentCoin++
        
    }

    return [coinsCount]

}