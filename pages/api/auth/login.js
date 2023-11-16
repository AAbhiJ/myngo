import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import Ngo from "../../../models/Ngo";
const bcrypt = require("bcryptjs");
import jwt from "jsonwebtoken";
const KEY = process.env.JWT_KEY;

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { email, password } = req.body;

        /* Any how email or password is blank */
        if (!email || !password) {
          return res.status(400).json({
            status: "error",
            error: "Request missing username or password",
          });
        }
        /* Check user email in database */
        const user = await User.find({ email: email }).populate({
          path: "ngo",
          model: Ngo,
        });
        /* Check if exists */

        if (!user) {
          /* Send error with message */
          return res
            .status(400)
            .json({ status: "error", error: "User Not Found" });
        }
        // // /* Variables checking */

        if (user) {
          const userId = user[0]?.id,
            userEmail = user[0]?.email,
            userPassword = user[0]?.password,
            userType = user[0]?.userType,
            ngoUser = user[0]?.ngo?._id,
            ngoName = user[0]?.ngo?.name,
            userCreated = user[0]?.createdAt;
          /* Check and compare password */
          return bcrypt.compare(password, userPassword).then((isMatch) => {
            /* User matched */
            if (isMatch) {
              /* Create JWT Payload */
              const payload = {
                id: userId,
                email: userEmail,
                createdAt: userCreated,
                userType: userType,
                ngoUser: ngoUser,
                ngoName: ngoName,
              };
              /* Sign token */
              jwt.sign(
                payload,
                KEY,
                {
                  expiresIn: process.env.EXPIRES_IN, // 1 year in seconds
                },
                (err, token) => {
                  /* Send succes with token */
                  res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            } else {
              /* Send error with message */
              return res
                .status(400)
                .json({ status: "error", error: "Password incorrect" });
            }
          });
        }
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(405).json({ success: false });
      break;
  }
}
