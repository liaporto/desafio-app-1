const { Sequelize } = require("sequelize");

const sequelize =
  process.env.DB_CONNECTION === "sqlite"
    ? new Sequelize({
        dialect: "sqlite",
        storage: process.env.DB_HOST + process.env.DB_DATABASE,
      })
    : new Sequelize(process.env.DATABASE_URL);
module.exports = sequelize;

require("../models/User");

for (mod in sequelize.models) {
  if (sequelize.models[mod].associate instanceof Function) {
    sequelize.models[mod].associate(sequelize.models);
  }
}
