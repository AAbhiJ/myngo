import dbConnect from "../../../lib/dbConnect";
import Donation from "../../../models/Donation";
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
        const donations = await Donation.find({
          ngo: profile?.ngoUser,
        });

        var group_to_values = donations.reduce(function (obj, item) {
          obj[item.donationMethod] = obj[item.donationMethod] || [];

            obj[item.donationMethod].push(item);

          return obj;
        }, {});

        var groups = Object.keys(group_to_values).map(function (key) {
          return { donationMethod: key, donations: group_to_values[key] };
        });

        res.status(200).json({
          success: true,
          donations: groups,
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

        const dontations =
          req?.body?.donationMethod == "amount"
            ? await Donation.create({
                name: req?.body?.name,
                contact: req?.body?.contact,
                email: req?.body?.email,
                donationMethod: req?.body?.donationMethod,
                amount: req?.body?.amount,
                ngo: profile?.ngoUser,
              })
            : await Donation.create({
                name: req?.body?.name,
                contact: req?.body?.contact,
                email: req?.body?.email,
                donationMethod: req?.body?.donationMethod,
                skillType: req?.body?.skillType,
                hrsPerDay: req?.body?.hrsPerDay,
                daysPerWeek: req?.body?.daysPerWeek,
                date_from: req?.body?.date_from,
                date_to: req?.body?.date_to,
                ngo: profile?.ngoUser,
              });
        /* find all the data in our database */
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
