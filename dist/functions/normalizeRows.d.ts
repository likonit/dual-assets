import { Row } from "read-excel-file";
export type normalizedRow = [number[], number];
export default function normalizeRows(rows: Row[]): normalizedRow[];
