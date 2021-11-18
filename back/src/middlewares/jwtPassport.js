const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const pathToKey = path.join(__dirname, "../../", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");
const JwtStrategy = require("passport-jwt").Strategy;

const cookieExtractor = (req) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies["token"];
  }

  return jwt;
};

const options = {
  jwtFromRequest: cookieExtractor, // Extrai o JWT do cookie
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"], // RSA
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      const { expired } = payload;

      if (Date.now() > expired) {
        return done("Unauthorized", false); // Desautoriza se o token estiver expirado
      }

      await User.findByPk(payload.sub) // Checa se o usuario existe
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => done(err, null));
    })
  );
};
