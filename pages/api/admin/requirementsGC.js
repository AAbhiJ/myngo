import dbConnect from "../../../lib/dbConnect";
import Requirement from "../../../models/Requirement";
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

        const requi = await Requirement.find({
          ngo: profile?.ngoUser,
        });
        var group_to_values = requi.reduce(function (obj, item) {
          obj[item.ngo] = obj[item.ngo] || [];
          if (
            new Date(item.createdAt).getMonth() + 1 ===
            new Date().getMonth() + 1
          ) {
            obj[item.ngo].push({ id: item._id, requirement: item.name });
          }

          return obj;
        }, {});

        var groups = Object.keys(group_to_values).map(function (key) {
          return { ngo: key, name: group_to_values[key] };
        });

        res.status(200).json({
          success: true,
          allRequirements: groups,
        });
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
        const requi = await Requirement.create({
          name: req?.body?.name,
          ngo: profile?.ngoUser,
        });
        res.status(201).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
