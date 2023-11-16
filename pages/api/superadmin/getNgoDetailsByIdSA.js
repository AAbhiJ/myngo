import dbConnect from "../../../lib/dbConnect";
import Ngo from "../../../models/Ngo";
import Drive from "../../../models/Drive";
import Event from "../../../models/Event";
import Requirement from "../../../models/Requirement";
import Member from "../../../models/Member";
import Donation from "../../../models/Donation";
import { initialize, requireJWT } from "../../../middleware/auth";
import { verifyToken, getAppCookies } from "../../../middleware/utils";

import nc from "next-connect";
import mongoose from "mongoose";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
         const {id:ngoID} =req?.body
        const handlerM = nc().use(initialize).post(requireJWT);
        await handlerM.run(req, res);
        const { token } = getAppCookies(req);
        const profile = token ? verifyToken(token.split(" ")[1]) : "";
        if (profile?.userType === "SUPER_ADMIN") {
          // const ngo = await Ngo.findOne({ _id: ngoID });
          const monthlyDrives = await Drive.aggregate([
            {
              $match: {
                $and: [
                  { ngo: mongoose.Types.ObjectId(ngoID) },
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
          const drives = await Drive.find({
            ngo: ngoID,
          });
          var group_to_drives = drives.reduce(function (obj, item) {
            obj[item.ngo] = obj[item.ngo] || [];
            if (
              new Date(item.createdAt).getMonth() + 1 ===
              new Date().getMonth() + 1
            ) {
              obj[item.ngo].push({ id: item._id, drive: item.name });
            }
  
            return obj;
          }, {});
  
          var drivesG = Object.keys(group_to_drives).map(function (key) {
            return { ngo: key, drives: group_to_drives[key] };
          });
          const members = await Member.find({
            ngo: ngoID,
          });
          const requi = await Requirement.find({
            ngo: ngoID,
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
          const events = await Event.find({
            ngo: ngoID,
          });
          var group_to_events = events.reduce(function (obj, item) {
            obj[item.ngo] = obj[item.ngo] || [];
            if (
              new Date(item.createdAt).getMonth() + 1 ===
              new Date().getMonth() + 1
            ) {
              obj[item.ngo].push({ id: item._id, event: item.name });
            }
  
            return obj;
          }, {});
  
          var eventsG = Object.keys(group_to_events).map(function (key) {
            return { ngo: key, events: group_to_events[key] };
          });



          const donations = await Donation.find({
            ngo: ngoID,
          });
  
          var group_to_donations = donations.reduce(function (obj, item) {
            obj[item.donationMethod] = obj[item.donationMethod] || [];
  
              obj[item.donationMethod].push(item);
  
            return obj;
          }, {});
  
          var groupsDonations = Object.keys(group_to_donations).map(function (key) {
            return { donationMethod: key, donations: group_to_donations[key] };
          });
         



          groupsDonations?.sort((a, b) => {
            if (a?.donationMethod < b?.donationMethod) {
              return -1;
            }
            if (a?.donationMethod > b?.donationMethod) {
              return 1;
            }
            return 0;
          });
      
          let totalAmount = (() => {
            let amtDonations = groupsDonations[0]?.donations;
            return amtDonations?.reduce((total, amt) => total + amt?.amount, 0);
          })();
      
          let totalHrs = (() => {
            let skillDonations = groupsDonations[1]?.donations;
      
            const getTotalHrForSkill = (skill) => {
              let perdayhr,
                daysperweek,
                fromdate,
                todate,
                totalDays,
                totalweeks,
                daysAfterWeek,
                afterweektotalwork;
              perdayhr = parseInt(skill?.hrsPerDay);
              daysperweek = parseInt(skill?.daysPerWeek);
              fromdate = new Date(skill?.date_from);
              todate = new Date(skill?.date_to);
      
              totalDays =
                parseInt(Math.abs((todate - fromdate) / (1000 * 60 * 60 * 24))) + 1;
              totalweeks = parseInt(Math.abs(totalDays / 7));
              daysAfterWeek = parseInt(Math.floor(totalDays % 7));
              afterweektotalwork = Math.min(daysperweek, daysAfterWeek);
              // console.log(`totalhr : ${totalweeks * Math.min(daysperweek,totalDays) * perdayhr + (afterweektotalwork * perdayhr)}, totalweeks : ${totalweeks},daysafterweek : ${daysAfterWeek}, afterweektotalwork : ${afterweektotalwork} mindaysperweek-totaldays : ${Math.min(daysperweek,totalDays)}, totaldays : ${totalDays}, perhr : ${perdayhr}` );
              return (
                totalweeks * Math.min(daysperweek, totalDays) * perdayhr +
                afterweektotalwork * perdayhr
              );
            };
            return skillDonations?.reduce((total, skill) => {
              let totalhr = getTotalHrForSkill(skill);
              return total + totalhr;
            }, 0);
          })();

          

          return res.status(200).json({
            success: true,
            // ngo: ngo,
            monthlyDrives: monthlyDrives,
            monthlyDrivesData: drivesG,
            members: members,
            monthlyRequirements: groups,
            events: eventsG,
            donations : {totalAmount,totalHrs},

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
