import readExcelFile from "./componenets/excel/readExcelFile.js";
import dualCurrencyStrategy from "./componenets/strategies/dual-currency/dual-currency-strategy.js";
import justBuy from "./componenets/strategies/just-buy.js";
const xrp = await readExcelFile("data/xrp.xlsx", new Set([0]));
const dash = await readExcelFile("data/dash.xlsx", new Set([0]));
const btc = await readExcelFile("data/btc.xlsx", new Set([0]));
const ltc = await readExcelFile("data/ltc.xlsx", new Set([0]));
const eth = await readExcelFile("data/eth.xlsx", new Set([0]));
const arr = [xrp, dash, btc, ltc, eth];
const pricesJust = [justBuy(xrp, 1000), justBuy(dash, 1000), justBuy(btc, 1000), justBuy(ltc, 1000), justBuy(eth, 1000)];
const pricesSmart = dualCurrencyStrategy(arr, 1000, 700);
let sum1 = 0;
let sum2 = 0;
pricesJust.forEach((item, i) => {
    sum1 += (item * +arr[i].at(-1)[1]);
});
pricesSmart[0].forEach((item, i) => {
    sum2 += (item * +arr[i].at(-1)[1]);
});
console.log(sum1);
console.log(((sum2 - sum1) / sum1) * 100);
//# sourceMappingURL=index.js.map