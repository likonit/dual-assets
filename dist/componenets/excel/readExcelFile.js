import readXlsxFile from "read-excel-file/node";
import * as fs from "fs";
export default async function readExcelFile(filename, excludeLines) {
    const file = fs.readFileSync(filename);
    const rows = await readXlsxFile(file);
    return rows.filter((_, i) => !excludeLines.has(i));
}
//# sourceMappingURL=readExcelFile.js.map