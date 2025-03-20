import { Row } from "read-excel-file"
import dualCurrencyStrategy from "../strategies/dual-currency/dual-currency-strategy.js"

export type strategies = 1 | 2 | 3 | 4

export default function calculateStrategyResult(
    strategy: strategies,
    coins: Row[][],
    APR: number, 
    percent: number,
    days: number
): number {

    const allCoinsCount = dualCurrencyStrategy(coins, 1000, APR, percent, days, strategy)
    let totalMarketPrice: number = 0
    
    allCoinsCount[0].forEach((item, i) => {

        const lastMarketPrice = +coins[i].at(-1)[1]
        totalMarketPrice += item * lastMarketPrice

    })

    return totalMarketPrice

}