import { Row } from "read-excel-file";
import { APR_1, APR_3, APR_5, APR_7 } from "../store/store.js";
import calculateStrategyResult, { strategies } from "./calculateStrategyResult.js";
import * as fs from "fs"
import { configDotenv } from "dotenv";

configDotenv()
const outputDir = process.env.RESULT_FOLDER

export default async function generateResults(coins: Row[][], nicePrice: number) {

    function str(line: any) {

        return line.toString().replaceAll('.', '.')

    }

    let resultTextTable = `COMMON EARN: ${nicePrice.toFixed(2)}\n${coins.length} COINS TABLE\n`

    for (const i of [1, 2, 3, 4]) {

        resultTextTable += `STRATEGY ${i}\n`
        let days = 1
        for (const apr of [APR_1, APR_3, APR_5, APR_7]) {

            resultTextTable += `DAY ${days}\n`

            apr.forEach(item => {

                const res = calculateStrategyResult((i as strategies), coins, +item[0], +item[1], days)
                resultTextTable += `${str(item[0])} ${str(((res-nicePrice) / nicePrice * 100).toFixed(2))}\n`

            })

            days += 2

        }

    }

    fs.writeFileSync(`${outputDir}${coins.length}coins.txt`, resultTextTable)
    
}