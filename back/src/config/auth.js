const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const PRIV_KEY = fs.readFileSync(
  path.join(__dirname, "..", "..", "id_rsa_priv.pem"),
  "utf-8"
);

const checkPassword = (password, hash, salt) => {
  const hashFromReq = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hashFromReq === hash;
};

const generatePassword = (password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return {
    salt: salt,
    hash: hash,
  };
};

const generateJWT = (user) => {
  try {
    console.log(user);
    const sub = user.id;
    const payload = {
      sub: sub,
      iat: Date.now(),
      expiration: Date.now() + parseInt(604800000),
    };
    const jwt = jsonwebtoken.sign(payload, PRIV_KEY, {
      expiresIn: "7d",
      algorithm: "RS256",
    });
    return jwt;
  } catch (err) {
    console.log(err);
    return;
  }
};

const decodeJwt = (token) => {
  const payload = token.split(".")[1];
  const encodedPayload = Buffer.from(payload, "base64");
  const decodedPayload = encodedPayload.toString("utf-8");
  return JSON.parse(decodedPayload);
};

const getToken = (req) => {
  const token = req.cookies["token"];
  if (!token) return;
  return token;
};

module.exports = {
  checkPassword,
  generatePassword,
  generateJWT,
  decodeJwt,
  getToken,
};
