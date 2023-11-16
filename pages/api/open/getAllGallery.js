import dbConnect from "../../../lib/dbConnect";
import Gallery from "../../../models/Gallery";
import Ngo from "../../../models/Ngo";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const gallaris = await Gallery.find({}).populate({
          path: "ngo",
          model: Ngo,
        });
        var group_to_values = gallaris.reduce(function (obj, item) {
          // obj[item.ngo] = obj[item.ngo] || [];
          // if (
          //   new Date(item.createdAt).getMonth() + 1 ===
          //   new Date().getMonth() + 1
          // ) {
          //   obj[item.ngo].push({ id: item._id, requirement: item.name });
          // }
          // return obj;
          obj[item.ngo._id] = obj[item.ngo._id] || {
            details: { name: item.ngo.name, contact: item.ngo.contact },
            data: [],
          };

          obj[item.ngo._id].data.push({
            id: item._id,
            image: item.photos,
          });

          return obj;
        }, {});
        console.log("GROUP", group_to_values);
        var groups = Object.keys(group_to_values).map(function (key) {
          console.log("key", key);
          return {
            ngoId: key,
            ngoDetails: group_to_values[key].details,
            photos: group_to_values[key].data,
          };
        });
        console.log(groups);
        res.status(200).json({ success: true, data: groups });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
