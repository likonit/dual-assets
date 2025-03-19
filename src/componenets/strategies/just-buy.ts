import { Row } from "read-excel-file";
import normalizeRows from "../../functions/normalizeRows.js";

export default function justBuy(rows: Row[], budgetToBuy: number) {

    let coinsCount = 0
    const normalizedRows = normalizeRows(rows)
    let prevDate = normalizedRows[0][0]
    
    coinsCount += budgetToBuy / normalizedRows[0][1]

    let buycnt = 1
    for (let i = 1; i < normalizedRows.length; i++) {
        let currDate = normalizedRows[i][0]

        if (currDate[1] != prevDate[1]) {
            
            // месяц поменялся
            buycnt++
            coinsCount += budgetToBuy / normalizedRows[i][1]

        }
        prevDate = currDate
    }

    console.log(buycnt)
    return coinsCount

}