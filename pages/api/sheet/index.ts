import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import {
  fetchGoogleSheetDocWithAccessToken,
  parseUrlForSheetID,
  parseRowsAsList,
  parseGoogleSheet,
} from "@/core";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const { query } = req;
  const sheetURL = query["u"];
  if (session) {
    const { accessToken } = session;

    const sheetID = parseUrlForSheetID(sheetURL);
    if (!sheetID) throw Error("Erroe ");
    const doc = await fetchGoogleSheetDocWithAccessToken(sheetID, accessToken);
    const json = await parseGoogleSheet(doc);

    res.send(json);
  } else {
    res.status(401).send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
}
export default handler;
