const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

module.exports = new JwtStrategy(opts, async (jwt_payload, done) => {
  const user = await User.findOne({
    username: jwt_payload.username,
    password: jwt_payload.password,
  }).exec();
  if (user) {
    return done(null, true);
  }
  return done(null, false);
});
