import { Row } from "read-excel-file"
import dualCurrencyStrategy from "../strategies/dual-currency/dual-currency-strategy.js"

export default function dualAssetsResults(arr: Row[][], APR: number, percent: number) {

    const pricesSmart_0 = dualCurrencyStrategy(arr, 1000, APR, percent, 1, 1)
    const pricesSmart_1 = dualCurrencyStrategy(arr, 1000, APR, percent, 1, 2)

    let sum_smart_buy_0 = 0
    let sum_smart_buy_1 = 0

    // получаем сумму активов по последней цене каждой монеты
    pricesSmart_0[0].forEach((item, i) => sum_smart_buy_0 += (item * +arr[i].at(-1)[1]))
    pricesSmart_1[0].forEach((item, i) => sum_smart_buy_1 += (item * +arr[i].at(-1)[1]))

    console.log(sum_smart_buy_0)
    console.log(sum_smart_buy_1)

}