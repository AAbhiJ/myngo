import dbConnect from "../../../lib/dbConnect";
import Drive from "../../../models/Drive";
import Ngo from "../../../models/Ngo";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const drives = await Drive.find(
          {}
        ).populate({ path: 'ngo', model: Ngo} ); /* find all the data in our database */
        console.log(drives)
        res.status(200).json({ success: true, data: drives });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
