const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const keys = require("../config/keys");
const User = require("../models/User");

// TODO -- OAUTH
passport.serializeUser((user, done) => {
    const token = user.generateAuthToken();
    done(null, token);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: "/api/auth/google/callback",
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });
            if (existingUser) {
                return done(null, existingUser);
            }
            //console.log("profile:", profile);
            const user = await new User({
                googleId: profile.id,
                profileImageUrl: profile._json.picture,
                email: profile._json.email
            }).save();
            done(null, user);
        }
    )
);
