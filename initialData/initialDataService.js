const chalk = require("chalk");
const normalizeCard = require("../cards/helpers/normalizeCard");
const { createCard } = require("../cards/models/cardsAccessDataService");
const { registerUser } = require("../users/models/usersAccessDataService");
const data = require("./initialData.json");
const normalizeUser = require("../users/helpers/normalizeUser");
const { generateUserPassword } = require("../users/helpers/bcrypt");

const generateInitialCards = async (userId = "6376274068d78742d84f31d2") => {
  const { cards } = data;
  cards.forEach(async (card) => {
    try {
      card = await normalizeCard(card, userId);
      await createCard(card);
      return;
    } catch (error) {
      return console.log(chalk.redBright(error.message));
    }
  });
};

const generateInitialUsers = () => {
  return new Promise(async (ok, not) => {
    const { users } = data;
    let bizId = "";
    try {
      for (let user of users) {
        user = await normalizeUser(user);
        user.password = generateUserPassword(user.password);
        let data = await registerUser(user);
        if (data && data._id && user.isBusiness && !user.isAdmin) {
          bizId = data._id;
        }
      }
    } catch (error) {
      // return console.log(chalk.redBright(error.message));
      not(error.message);
    }
    ok(bizId);
  });
};

exports.generateInitialCards = generateInitialCards;
exports.generateInitialUsers = generateInitialUsers;
