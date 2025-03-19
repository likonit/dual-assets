export default function normalizeRows(rows) {
    rows.sort((a, b) => {
        return +a[0].valueOf() - +b[0].valueOf();
    });
    return rows.map(item => {
        const date = item[0].toLocaleString().split(',')[0].split(".").map(item => +item);
        return [date, +item[1]];
    });
}
//# sourceMappingURL=normalizeRows.js.map