import readExcelFile from "./componenets/excel/readExcelFile.js";
import dualCurrencyStrategy from "./componenets/strategies/dual-currency/dual-currency-strategy.js";
import justBuy from "./componenets/strategies/just-buy.js";

const xrp = await readExcelFile("data/xrp.xlsx", new Set([0]))
const dash = await readExcelFile("data/dash.xlsx", new Set([0]))
const btc = await readExcelFile("data/btc.xlsx", new Set([0]))
const ltc = await readExcelFile("data/ltc.xlsx", new Set([0]))
const eth = await readExcelFile("data/eth.xlsx", new Set([0]))

const arr = [xrp, dash, btc, ltc, eth]

const pricesJust = [justBuy(xrp, 1000), justBuy(dash, 1000), justBuy(btc, 1000), justBuy(ltc, 1000), justBuy(eth, 1000)]
const pricesSmart_0 = dualCurrencyStrategy(arr, 1000, 247.88, 1.44, 1, 1)
const pricesSmart_1 = dualCurrencyStrategy(arr, 1000, 247.88, 1.44, 1, 2)
// const pricesSmart_1 = dualCurrencyStrategy(arr, 1000, 0.999, 422, 2)

let sum_just_buy = 0
let sum_smart_buy_0 = 0
let sum_smart_buy_1 = 0

// получаем сумму активов по последней цене каждой монеты
pricesJust.forEach((item, i) => sum_just_buy += (item * +arr[i].at(-1)[1]))
pricesSmart_0[0].forEach((item, i) => sum_smart_buy_0 += (item * +arr[i].at(-1)[1]))
pricesSmart_1[0].forEach((item, i) => sum_smart_buy_1 += (item * +arr[i].at(-1)[1]))

console.log(sum_just_buy)
console.log(sum_smart_buy_0)
console.log(sum_smart_buy_1)