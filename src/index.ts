import justBuy from "./componenets/strategies/just-buy.js";

import { xrp, dash, btc, ltc, eth } from "./componenets/store/store.js";
import generateResults from "./componenets/functions/generateResults.js";

const arr = [xrp, dash, btc, ltc, eth]
const pricesJust = [justBuy(xrp, 1000), justBuy(dash, 1000), justBuy(btc, 1000), justBuy(ltc, 1000), justBuy(eth, 1000)]
let sum_just_buy = 0

// получаем сумму активов по последней цене каждой монеты
pricesJust.forEach((item, i) => sum_just_buy += (item * +arr[i].at(-1)[1]))

generateResults(arr)
generateResults([xrp, dash, btc, ltc])
console.log(sum_just_buy)