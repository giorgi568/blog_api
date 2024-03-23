const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user');
const opts: any = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

module.exports = new JwtStrategy(opts, async (jwt_payload: any, done: any) => {
  const user = await User.findOne({
    username: jwt_payload.username,
    password: jwt_payload.password,
  }).exec();
  if (user) {
    return done(null, true);
  }
  return done(null, false);
});
