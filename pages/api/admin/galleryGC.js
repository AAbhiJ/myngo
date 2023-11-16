import nextConnect from "next-connect";
import multer from "multer";
import Gallery from "../../../models/Gallery";
import { initialize, requireJWT } from "../../../middleware/auth";
import { verifyToken, getAppCookies } from "../../../middleware/utils";
import fs from 'fs'
var fileName = "";
const upload = multer({
  storage: multer.diskStorage({
    destination: "public/static/uploads",
    filename: (req, file, cb) => {
      fileName =
        file.fieldname +
        "-" +
        Date.now() +
        file.originalname.match(/\.[0-9a-z]+$/i)[0];
      cb(null, fileName);
    },
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method Not Allowed` });
  },
});

apiRoute.use(upload.array("image"));

apiRoute.post(async (req, res) => {
  try {
    const handlerM = nextConnect().use(initialize).post(requireJWT);
    await handlerM.run(req, res);
    const { token } = getAppCookies(req);
    const profile = token ? verifyToken(token.split(" ")[1]) : "";
    const gall = await Gallery.create({
      photos: fileName,
      ngo: profile?.ngoUser,
    });

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});
apiRoute.delete(async (req, res) => {
  try {
    
    const handlerM = nextConnect().use(initialize).delete(requireJWT);
    await handlerM.run(req, res);
    const { token } = getAppCookies(req);
    const profile = token ? verifyToken(token.split(" ")[1]) : "";
    const gall = await Gallery.findOneAndDelete({
      _id: req?.query?.imageId,
    });
    fs.unlinkSync('public/static/uploads/'+gall?.photos);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});
apiRoute.get(async (req, res) => {
  try {
    const handlerM = nextConnect().use(initialize).get(requireJWT);
    await handlerM.run(req, res);
    const { token } = getAppCookies(req);
    const profile = token ? verifyToken(token.split(" ")[1]) : "";
    const gall = await Gallery.find({
      ngo: profile?.ngoUser,
    });
    var group_to_values = gall.reduce(function (obj, item) {
      obj[item.ngo] = obj[item.ngo] || [];

      obj[item.ngo].push({ id: item._id, imageName: item.photos });

      return obj;
    }, {});

    var groups = Object.keys(group_to_values).map(function (key) {
      return { ngo: key, images: group_to_values[key] };
    });

    res.status(200).json({ success: true, data: groups });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
