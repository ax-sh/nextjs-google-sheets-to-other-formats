import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";

export function parseUrlForSheetID(str?: NonNullable<string>) {
  return str?.match(/spreadsheets\/d\/([^/]+)/)?.[1];
}

export async function downloadSheetAsCSVString(
  sheet: GoogleSpreadsheetWorksheet & { downloadAsCSV: () => Buffer }
) {
  const buffer = await sheet.downloadAsCSV();
  return buffer.toString();
}

export async function parseRowsAsList(sheet: GoogleSpreadsheetWorksheet) {
  const rows = await sheet.getRows();
  await sheet.loadCells();

  return rows.map((i) => i._rawData.join(" | "));
}
async function parseSheet(
  sheet: GoogleSpreadsheetWorksheet,
  type: "list" | "json"
) {
  switch (type) {
    default:
      return parseRowsAsList(sheet);
  }
}

export async function parseGoogleSheet(doc: GoogleSpreadsheet) {
  const sheet = await parseSheet(doc.sheetsByIndex[0], "list");
  console.log(sheet, 88);
  return {
    sheet_title: doc.title,
    sheet_id: doc.spreadsheetId,
    data: sheet,
  };
}
export async function fetchGoogleSheetDocWithAccessToken(
  sheetID: string,
  accessToken: string
) {
  const doc = new GoogleSpreadsheet(sheetID);
  doc.useRawAccessToken(accessToken);
  await doc.loadInfo(); // loads document properties and worksheets

  return doc;
}
