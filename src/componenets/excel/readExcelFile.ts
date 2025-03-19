import readXlsxFile from "read-excel-file/node"
import * as fs from "fs"

// функция считывания excel-файла
export default async function readExcelFile(filename: string, excludedLines: Set<number>) {

    const file = fs.readFileSync(filename)
    const rows = await readXlsxFile(file)

    // фильтруем ненужные строки
    return rows.filter((_, i) => !excludedLines.has(i))

}