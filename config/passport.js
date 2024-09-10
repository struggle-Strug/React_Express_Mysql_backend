const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require("../Models/UserModel")
const passport = require("passport");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken("Bearer");
opts.secretOrKey = "secret";

const jwtLogin = new JwtStrategy(opts, (payload, done) => {
    User.findById(payload.id, '', (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(false);
        }
    });
});

passport.use(jwtLogin);

