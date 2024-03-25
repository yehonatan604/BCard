const express = require("express");
const router = express.Router();
const cardsRestController = require("../cards/routes/cardsRestController");
const usersRestController = require("../users/routes/usersRestController");
const openaiRoutes = require('../openai/openaiRoutes');
const { dailyLimit, hourlyLimit } = require("../middlewares/rateLimiters");

const { handleError } = require("../utils/handleErrors");

router.use("/cards", cardsRestController);
router.use("/users", usersRestController);

openaiRoutes.use(hourlyLimit);
openaiRoutes.use(dailyLimit);
router.use('/elran/openai', openaiRoutes);

router.use((req, res) => {
  handleError(res, 404, "Page not found!");
});

module.exports = router;
