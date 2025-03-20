import { Row } from "read-excel-file"
import dualCurrencyStrategy from "../strategies/dual-currency/dual-currency-strategy.js"
import calculateStrategyResult from "./calculateStrategyResult.js"

export default function dualAssetsResults(coins: Row[][], APR: number, percent: number) {

    console.log(calculateStrategyResult(1, coins, APR, percent, 1))
    console.log(calculateStrategyResult(2, coins, APR, percent, 1))
    console.log(calculateStrategyResult(3, coins, APR, percent, 1))

}