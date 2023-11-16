import dbConnect from "../../../lib/dbConnect";
import Event from "../../../models/Event";
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
        const events = await Event.find({
          ngo: profile?.ngoUser,
        }); /* find all the data in our database */
        res
          .status(200)
          .json({
            success: true,
            previousEvent: events.reverse()[1],
            allEvents: events,
          });
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const handlerM = nc().use(initialize).post(requireJWT);
        await handlerM.run(req, res);
        const { token } = getAppCookies(req);
        const profile = token ? verifyToken(token.split(" ")[1]) : "";
        const events = await Event.create({
          name: req?.body?.name,
          venue: req?.body?.venue,
          date_from: req?.body?.dateFrom,
          date_to: req?.body?.dateTo,
          ngo: profile?.ngoUser,
        }); /* find all the data in our database */
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
