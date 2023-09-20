const ENVIRONMENT = process.env.NODE_ENV;

const connectToDb = () => {
  if (ENVIRONMENT === "development")
    require("./mongodb/connectToMongodbLocally");
  if (ENVIRONMENT === "production") require("./mongodb/connectToAtlas");
};

module.exports = connectToDb;
