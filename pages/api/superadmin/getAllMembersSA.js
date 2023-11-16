import dbConnect from "../../../lib/dbConnect";
import Member from "../../../models/Member";
import Ngo from "../../../models/Ngo";
import { initialize, requireJWT } from "../../../middleware/auth";
import { verifyToken, getAppCookies } from "../../../middleware/utils";

import nc from "next-connect";
import mongoose from "mongoose";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const handlerM = nc().use(initialize).get(requireJWT);
        await handlerM.run(req, res);
        const { token } = getAppCookies(req);
        const profile = token ? verifyToken(token.split(" ")[1]) : "";
        if (profile?.userType === "SUPER_ADMIN") {
          const members = await Member.find({}).populate({path:"ngo",model:Ngo});
          return res.status(200).json({
            success: true,
            members: members,
          });
        }
        return res.status(401).json({ success: false });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
