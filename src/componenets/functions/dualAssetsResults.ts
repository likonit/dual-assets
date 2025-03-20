import { Row } from "read-excel-file"
import dualCurrencyStrategy from "../strategies/dual-currency/dual-currency-strategy.js"
import calculateStrategyResult from "./calculateStrategyResult.js"

export default function dualAssetsResults(
    coins: Row[][], 
    APR: number, 
    percent: number, 
    days: number,
    commonResult: number = 0
) {

    const res1 = calculateStrategyResult(1, coins, APR, percent, days)
    const res2 = calculateStrategyResult(2, coins, APR, percent, days)
    const res3 = calculateStrategyResult(3, coins, APR, percent, days)
    const res4 = calculateStrategyResult(4, coins, APR, percent, days)

    console.log(res1, res1-commonResult)
    console.log(res2, res2-commonResult)
    console.log(res3, res3-commonResult)
    console.log(res4, res4-commonResult)

}