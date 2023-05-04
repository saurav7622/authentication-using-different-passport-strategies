const GoogleStrategy = require("passport-google-oauth20").Strategy;

const GOOGLE_CLIENT_ID =
  "700162464276-5eof551uavp9tc86h05do251e0bgn284.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);
