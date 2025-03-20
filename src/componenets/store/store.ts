import readExcelFile from "../excel/readExcelFile.js"

export const xrp = await readExcelFile("data/currencies/xrp.xlsx", new Set([0]))
export const dash = await readExcelFile("data/currencies/dash.xlsx", new Set([0]))
export const btc = await readExcelFile("data/currencies/btc.xlsx", new Set([0]))
export const ltc = await readExcelFile("data/currencies/ltc.xlsx", new Set([0]))
export const eth = await readExcelFile("data/currencies/eth.xlsx", new Set([0]))

export const APR_1 = await readExcelFile("data/APRs/APR_BTC_1day.xlsx", new Set([0]))
export const APR_3 = await readExcelFile("data/APRs/APR_BTC_3days.xlsx", new Set([0]))
export const APR_5 = await readExcelFile("data/APRs/APR_BTC_5days.xlsx", new Set([0]))
export const APR_7 = await readExcelFile("data/APRs/APR_BTC_7days.xlsx", new Set([0]))