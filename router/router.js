const express = require("express");
const router = express.Router();
const cardsRestController = require("../cards/routes/cardsRestController");
const usersRestController = require("../users/routes/usersRestController");
const openaiRoutes = require('../openai/openaiRoutes');
const { handleError } = require("../utils/handleErrors");

router.use("/cards", cardsRestController);
router.use("/users", usersRestController);
router.use('/elran/openai', openaiRoutes);

router.use((req, res) => {
  handleError(res, 404, "Page not found!");
});

module.exports = router;
