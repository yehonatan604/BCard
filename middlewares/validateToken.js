const jwt = require("jsonwebtoken");

const validateToken = (req,res,next) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: "Token required." });
  jwt.verify(token, process.env.PROXY_JWT_SECRET, function (err) {
    if (err) {
      if (err.name === "NotBeforeError") return res.status(400).json({ error: "Token not yet active." });
      if (err.name === "TokenExpiredError") return res.status(400).json({ error: "Token expired." });
      return res.status(400).json({ error: "Invalid token." });
    } else {
      delete req.body.token;
      return next();
    }
  });
};

module.exports = validateToken;
