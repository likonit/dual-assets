import readExcelFile from "./componenets/excel/readExcelFile.js";
import dualAssetsResults from "./componenets/functions/dualAssetsResults.js";
import dualCurrencyStrategy from "./componenets/strategies/dual-currency/dual-currency-strategy.js";
import justBuy from "./componenets/strategies/just-buy.js";

const xrp = await readExcelFile("data/currencies/xrp.xlsx", new Set([0]))
const dash = await readExcelFile("data/currencies/dash.xlsx", new Set([0]))
const btc = await readExcelFile("data/currencies/btc.xlsx", new Set([0]))
const ltc = await readExcelFile("data/currencies/ltc.xlsx", new Set([0]))
const eth = await readExcelFile("data/currencies/eth.xlsx", new Set([0]))

const APR_1day = await readExcelFile("data/APRs/APR_BTC_1day.xlsx", new Set([0]))
const APR_3days = await readExcelFile("data/APRs/APR_BTC_3days.xlsx", new Set([0]))
const APR_5days = await readExcelFile("data/APRs/APR_BTC_5days.xlsx", new Set([0]))
const APR_7days = await readExcelFile("data/APRs/APR_BTC_7days.xlsx", new Set([0]))

const arr = [xrp, dash, btc, ltc]

const pricesJust = [justBuy(xrp, 1000), justBuy(dash, 1000), justBuy(btc, 1000), justBuy(ltc, 1000)]
let sum_just_buy = 0

// получаем сумму активов по последней цене каждой монеты
pricesJust.forEach((item, i) => sum_just_buy += (item * +arr[i].at(-1)[1]))

console.log(sum_just_buy)

APR_3days.forEach((item) => {

    console.log(`APR: ${item[0]}, DOWN: ${item[1]}`)
    dualAssetsResults(arr, +item[0], +item[1], 3, sum_just_buy)

})