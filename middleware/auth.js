const passport = require("passport");
const JWT = require("jsonwebtoken");
const PassportJwt = require("passport-jwt");
import User from "../models/User";
const { default: dbConnect } = require("../lib/dbConnect");

var cookieExtractor = function (req) {
  var token = null;

  if (req && req.cookies) {
    token = req.cookies["token"]?.split(" ")[1];
  }
  return token;
};
var opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_KEY;
passport.use(
  new PassportJwt.Strategy(
    opts,
    // When we have a verified token
    async (payload, done) => {
      console.log("payload", payload);
      // Find the real user from our database using the `id` in the JWT
      await dbConnect();
      User.find({ _id: payload.id })
        .then((user) => {
          // If user was found with this id
          if (user) {
            done(null, user);
          } else {
            // If not user was found
            done(null, false);
          }
        })
        .catch((error) => {
          // If there was failure
          console.log(error);
          done(error, false);
        });
    }
  )
);

module.exports = {
  initialize: passport.initialize(),
  requireJWT: passport.authenticate("jwt", { session: false }),
};
