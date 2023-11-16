import dbConnect from "../../../lib/dbConnect";
import SiteVisits from "../../../models/SiteVisits";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const visits = await SiteVisits.aggregate([
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
        res.status(200).json({ success: true, data: visits });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const visits = await SiteVisits.find({ ip: req?.body?.ip });
        if (visits.length) return res.status(200).json({ success: true });
        const visit = await SiteVisits.create({ ip: req?.body?.ip });
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
