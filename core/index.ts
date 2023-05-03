import { GoogleSpreadsheet } from "google-spreadsheet";

export async function fetchGoogleSheetDocWithAccessToken(
  sheetID: string,
  accessToken: string
) {
  const doc = new GoogleSpreadsheet(sheetID);
  doc.useRawAccessToken(accessToken);
  await doc.loadInfo(); // loads document properties and worksheets

  return doc;
}
