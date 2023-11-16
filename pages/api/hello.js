import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import nodemailer from "nodemailer";

const bcrypt = require("bcryptjs");
export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const pets = await User.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: pets });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        // return bcrypt.genSalt(10, function (err, Salt) {
        //   // The bcrypt is used for encrypting password.
        //   return bcrypt.hash(
        //     '123',
        //     Salt,
        //     async function (err, hash) {
        //       if (err) {
        //         return console.log("Cannot encrypt");
        //       }
        //       const data = {
        //         email: 'admin@gmail.com',
        //         password: hash,
        //         username: 'admin@gmail.com',
        //         userType: "SUPER_ADMIN",
        //         ngo: '6555ae77808d5c46d6d6353b',
        //       };
        //       const user = await User.create(data);

        //       //randomPassword

        //       return res.status(201).json({ success: true });
        //     }
        //   );
        // });

        // bcrypt.genSalt(10, function (err, Salt) {
        // The bcrypt is used for encrypting password.
        // bcrypt.hash(req?.body?.password, Salt, async function (err, hash) {
        //   if (err) {
        //     return console.log("Cannot encrypt");
        //   }
        //   const data = {
        //     email: req?.body?.email,
        //     password: hash,
        //     username: req?.body?.username,
        //     userType: req?.body?.userType,
        //   };
        //   const pet = await User.create(data);
        //   res.status(201).json({ success: true, data: pet });
        // });

        // });

      //   let transporter = nodemailer.createTransport({
      //     host: "smtp.gmail.com",
      //     port: 587,
      //     secure: false, // true for 465, false for other ports
      //     auth: {
      //       user: process.env.USER, // generated ethereal user
      //       pass: process.env.PASS, // generated ethereal password
      //     },
      //   });
        
      //   console.log(process.env.USER, process.env.PASS);

      //   await transporter.sendMail({
      //     from: `Fortunate Folks(Super Admin) <${process.env.USER}>`, // sender address
      //     to: `abhiasawale510@gmail.com`, // list of receivers
      //     subject: "Login Credentials", // Subject line
      //     html: ` 
      //     <div style="font-family:consolas">
      //     <p> Congratulations you are verified.</p>
      //     <p> Here are your login credentials:- </p>
      //     <span>Email:- abhiasawale510@gmail.com </span><br />
      //     <span> Password:- 123 </span>
      //     <p>You can now login to your account and if you want to change your password then follow below steps:-</p>
      //     <ol>
      //         <li>Login To Your Account</li>
      //         <li>Go To Settings</li>
      //         <li>Then Go To Profile</li>
      //         <li>Then Click On Reset Password</li>
      //         <li>Then Enter Current Password,New password,Confirm Password and click Reset Password. That's It You are done.
      //         </li>
      //     </ol>
      // </div>         
      //   `, // html body
      //   });

        return res.status(201);
      } catch (error) {
        res.status(400).json({ success: false, err : error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
