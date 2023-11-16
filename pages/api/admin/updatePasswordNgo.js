import dbConnect from "../../../lib/dbConnect";
import { initialize, requireJWT } from "../../../middleware/auth";
import User from "../../../models/User";
import Ngo from "../../../models/Ngo";
import nc from "next-connect";
import { getAppCookies, verifyToken } from "../../../middleware/utils";

const bcrypt = require("bcryptjs");

async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const handlerM = nc().use(initialize).post(requireJWT);
        await handlerM.run(req, res);
        const { token } = getAppCookies(req);
        const profile = token ? verifyToken(token.split(" ")[1]) : "";
        const { currentPassword, newPassword, confirmNewPassword } = req?.body;
        if (!newPassword || !confirmNewPassword) {
          return res.status(400).json({
            success: false,
            error: "new password and confirm password missing",
          });
        }
        const user = await User.findOne({ _id: profile?.id });
        /* Check if exists */

        if (!user) {
          /* Send error with message */
          return res
            .status(400)
            .json({ success: false, error: "User Not Found" });
        }
        return bcrypt
          .compare(currentPassword, user.password)
          .then((isMatch) => {
            /* User matched */
            if (isMatch) {
              if (newPassword === confirmNewPassword) {
                bcrypt.genSalt(10, function (err, Salt) {
                  bcrypt.hash(newPassword, Salt, async function (err, hash) {
                    if (err) {
                      return console.log("Cannot encrypt");
                    }

                    user.password = hash;
                    await user.save();
                    //mailer
                    //randomPassword

                    res.status(201).json({ success: true });
                  });
                });
              } else {
                /* Send error with message */
                return res
                  .status(400)
                  .json({
                    success: false,
                    error: "new password and confirm password are not matching",
                  });
              }
            } else {
              /* Send error with message */
              return res
                .status(400)
                .json({ success: false, error: "Current Password Incorrect" });
            }
          });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(405).json({ success: false });
      break;
  }
}

export default handler;
