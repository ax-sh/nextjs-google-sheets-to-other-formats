import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { fetchGoogleSheetDocWithAccessToken } from "@/core";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const { accessToken } = session;
    console.log(accessToken, req, 7788);
    // await fetchGoogleSheetDocWithAccessToken();
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    });
  } else {
    res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
}
export default handler;
