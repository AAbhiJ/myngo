import dbConnect from "../../../lib/dbConnect";
import Ngo from "../../../models/Ngo";
import { initialize, requireJWT } from "../../../middleware/auth";
import { verifyToken, getAppCookies } from "../../../middleware/utils";

import nc from "next-connect";

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
        const ngos = await Ngo.findOne({
          _id: profile?.ngoUser,
        }); 
        
        res.status(200).json({ success: true,ngos:ngos });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const handlerM = nc().use(initialize).post(requireJWT);
        await handlerM.run(req, res);
        const { token } = getAppCookies(req);
        const profile = token ? verifyToken(token.split(" ")[1]) : "";
        const ngos = await Ngo.findOne({
          _id: profile?.ngoUser,
        }); 
        ngos.about = req?.body?.about;
        await ngos.save();
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
