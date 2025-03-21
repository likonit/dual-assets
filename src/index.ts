import justBuy from "./componenets/strategies/just-buy.js";

import { xrp, dash, btc, ltc, eth } from "./componenets/store/store.js";
import generateResults from "./componenets/functions/generateResults.js";

const arr = [xrp, dash, btc, ltc, eth]
const pricesJust5 = [justBuy(xrp, 1000), justBuy(dash, 1000), justBuy(btc, 1000), justBuy(ltc, 1000), justBuy(eth, 1000)]
const pricesJust4 = [justBuy(xrp, 1000), justBuy(dash, 1000), justBuy(btc, 1000), justBuy(ltc, 1000)]
const pricesJust3 = [justBuy(xrp, 1000), justBuy(dash, 1000), justBuy(btc, 1000)]
let sum_just_buy5 = 0
let sum_just_buy4 = 0
let sum_just_buy3 = 0

// получаем сумму активов по последней цене каждой монеты
pricesJust5.forEach((item, i) => sum_just_buy5 += (item * +arr[i].at(-1)[1]))
pricesJust4.forEach((item, i) => sum_just_buy4 += (item * +arr[i].at(-1)[1]))
pricesJust3.forEach((item, i) => sum_just_buy3 += (item * +arr[i].at(-1)[1]))

generateResults(arr, sum_just_buy5)
generateResults([xrp, dash, btc, ltc], sum_just_buy4)
generateResults([xrp, dash, btc], sum_just_buy3)