import dbConnect from "../../../lib/dbConnect";
import Drive from "../../../models/Drive";
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
        const drives = await Drive.find({
          ngo: profile?.ngoUser,
        });
        const drivesCount = await Drive.aggregate([
          {
            $match: {
              $and: [
                { ngo: mongoose.Types.ObjectId(profile?.ngoUser) },
                {
                  $expr: {
                    $or: [
                      {
                        $eq: [
                          { $month: "$date_from" },
                          new Date().getMonth() + 1,
                        ],
                      },
                      {
                        $eq: [
                          { $month: "$date_to" },
                          new Date().getMonth() + 1,
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            $project: {
              createdAtWeek: { $week: "$createdAt" },
              createdAtMonth: { $month: "$createdAt" },
            },
          },
          {
            $group: {
              _id: "$createdAtMonth",
              week: { $first: "$createdAtWeek" },
              _id: "$createdAtWeek",
              month: { $first: "$createdAtMonth" },
              count: { $sum: 1 },
            },
          },
        ]);

        res.status(200).json({
          success: true,
          nextDrive: drives.reverse()[0],
          drivesCount: drivesCount,
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
        const drives = await Drive.create({
          name: req?.body?.name,
          team_leader: req?.body?.teamLeader,
          extra_information: req?.body?.extraInformation,
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
