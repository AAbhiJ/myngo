import dbConnect from "../../../lib/dbConnect";
import { initialize, requireJWT } from "../../../middleware/auth";
import User from "../../../models/User";
import Ngo from "../../../models/Ngo";
import nc from "next-connect";

import { getAppCookies, verifyToken } from "../../../middleware/utils";

async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const handlerM = nc().use(initialize).post(requireJWT);
        await handlerM.run(req, res);
        const { token } = getAppCookies(req);
        const profile = token ? verifyToken(token.split(" ")[1]) : "";
        if (profile?.userType === "SUPER_ADMIN") {
          const ngo = await Ngo.findOneAndDelete({ email: req?.body?.email });
          return res.status(200).json({ success: true });
        }
        return res.status(401).json({ success: false });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(405).json({ success: false });
      break;
  }
}

export default handler;
