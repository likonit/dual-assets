import { Row } from "read-excel-file";
import normalizeRows from "../../functions/normalizeRows.js";

// функция стратегии "классического" долгосрочного инвестирования
// будем покупать монеты по рыночной цене, не учитывая комиссию брокера
// каждый месяц первого числа (кроме первого)
export default function justBuy(rows: Row[], budgetToBuy: number) {

    let coinsCount = 0
    const normalizedRows = normalizeRows(rows)
    let prevDate = normalizedRows[0][0]
    
    // количество монет - это фиксированный бюджет для покупки (на один месяц)
    // делённое на текущую цену монет
    coinsCount += budgetToBuy / normalizedRows[0][1]
    
    for (let i = 1; i < normalizedRows.length; i++) {
        let currDate = normalizedRows[i][0]

        // если месяц поменялся
        if (currDate[1] != prevDate[1]) 
            coinsCount += budgetToBuy / normalizedRows[i][1]

        prevDate = currDate
    }

    return coinsCount

}