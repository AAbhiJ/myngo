import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect";
import { initialize, requireJWT } from "../../../middleware/auth";
import Ngo from "../../../models/Ngo";


const register = async (req, res) => {
  const { method } = req;
  
  await dbConnect();
  
  switch (method) {
    case "POST":
      try {
        // const handlerM = nc().use(initialize).post(requireJWT);
        // await handlerM.run(req, res);
        console.log(req.body)
        const ngo = await Ngo.create({
          name: req.body.name,
          address: req.body.address,
          contact: req.body.phoneNumber,
          email: req.body.email,
          registration_number: req.body.regNumber,
          verified:false
        }); /* create a new model in the database */
        res.status(201).json({ success: true, data: ngo });
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(405).json({ success: false });
      break;
  }
};
export default register;
