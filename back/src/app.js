const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
require("./config/sequelize");

const app = express();
const port = process.env.PORT;
const cors = require("cors");
const routes = require("./routes/routes");

const passport = require("passport");
require("./middlewares/jwtPassport")(passport);
app.use(passport.initialize());

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Serve React files
app.use(express.static(path.resolve(__dirname, "../../front/build")));

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

// Qualquer request que não seja para api vai renderizar o app React
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../front/build", "index.html"));
});

app.listen(port, () => {
  console.log(
    `${process.env.APP_NAME} app listening at ${process.env.APP_URL}`
  );
});
