import readXlsxFile from "read-excel-file/node"
import * as fs from "fs"

export default async function readExcelFile(filename: string, excludeLines: Set<number>) {

    const file = fs.readFileSync(filename)
    const rows = await readXlsxFile(file)

    return rows.filter((_, i) => !excludeLines.has(i))

}