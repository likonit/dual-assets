import { Row } from "read-excel-file";

export type normalizedRow = [number[], number]

// функция, которая приводит данные из excel в нужный формат
export default function normalizeRows(rows: Row[]): normalizedRow[] {

    rows.sort((a, b) => {

        return +a[0].valueOf() - +b[0].valueOf()

    })
    
    return rows.map(item => {

        const date = item[0].toLocaleString().split(',')[0].split(".").map(item => +item)
        return [date, +item[1]]

    })

}