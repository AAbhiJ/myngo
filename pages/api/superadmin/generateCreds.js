import dbConnect from "../../../lib/dbConnect";
import { initialize, requireJWT } from "../../../middleware/auth";
import User from "../../../models/User";
import Ngo from "../../../models/Ngo";
import nc from "next-connect";
import nodemailer from "nodemailer";
import { getAppCookies, verifyToken } from "../../../middleware/utils";

const bcrypt = require("bcryptjs");

function generatePassword() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}
async function handler(req, res) {
  await dbConnect();
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.USER, // generated ethereal user
      pass: process.env.PASS, // generated ethereal password
    },
  });
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const handlerM = nc().use(initialize).post(requireJWT);
        await handlerM.run(req, res);
        const { token } = getAppCookies(req);
        const profile = token ? verifyToken(token.split(" ")[1]) : "";
        if (profile?.userType === "SUPER_ADMIN") {
          const ngo = await Ngo.findOne({ email: req?.body?.email });
          ngo.verified = true;
          await ngo.save();
          console.log(ngo);
          if (ngo) {
            return bcrypt.genSalt(10, function (err, Salt) {
              // The bcrypt is used for encrypting password.
              const randomPassword = generatePassword();
              console.log("password generated is", randomPassword);

              return bcrypt.hash(
                randomPassword,
                Salt,
                async function (err, hash) {
                  if (err) {
                    return console.log("Cannot encrypt");
                  }
                  const data = {
                    email: ngo.email,
                    password: hash,
                    username: ngo.email,
                    userType: "NGO",
                    ngo: ngo._id,
                  };
                  const user = await User.create(data);

                  //mailer
                  let info = await transporter.sendMail({
                    from: `Fortunate Folks(Super Admin) <${process.env.USER}>`, // sender address
                    to: `${ngo.email}`, // list of receivers
                    subject: "Login Credentials", // Subject line
                    html: ` 
                    <div style="font-family:consolas">
                    <p> Congratulations you are verified.</p>
                    <p> Here are your login credentials:- </p>
                    <span>Email:- ${ngo.email} </span><br />
                    <span> Password:- ${randomPassword} </span>
                    <p>You can now login to your account and if you want to change your password then follow below steps:-</p>
                    <ol>
                        <li>Login To Your Account</li>
                        <li>Go To Settings</li>
                        <li>Then Go To Profile</li>
                        <li>Then Click On Reset Password</li>
                        <li>Then Enter Current Password,New password,Confirm Password and click Reset Password. That's It You are done.
                        </li>
                    </ol>
                </div>         
                  `, // html body
                  });
                  //randomPassword

                  return res.status(201).json({ success: true });
                }
              );
            });
          }
        }
        return res.status(401).json({ success: false });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(405).json({ success: false });
      break;
  }
}

export default handler;
