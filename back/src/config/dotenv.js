module.exports = function configDotenv() {
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }
};
