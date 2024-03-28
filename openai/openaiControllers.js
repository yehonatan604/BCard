const axios = require('axios');
const jwt = require('jsonwebtoken');
const { toEpoch } = require('../utils/timeService')

const keygen = (req, res) => {
  const { password, start, end } = req.body;
  if (!password || password === "")
    return res.json({ error: "Password cannot be empty." });
  if (password !== process.env.KEYGEN_PASSWORD)
    return res.json({ error: "Incorrect password." });

  let errorString = "";
  if (!start || !end)
    errorString += "-Both 'start' and 'end' time must be supplied.\n";
  const epochStart = toEpoch(start);
  const epochEnd = toEpoch(end);
  if (epochStart >= epochEnd)
    errorString += "Error: start time must be prior to end time.";
  if (errorString) return res.json({ error: errorString });

  const payload = {
    description: "Time limited token for OpenAI API proxy.",
    iat: Math.floor(Date.now() / 1000),
    nbf: epochStart,
    exp: epochEnd,
  };

  const token = jwt.sign(payload, process.env.PROXY_JWT_SECRET);
  return res.status(201).json({ token });
};

const proxy = async (req, res) => {
  const openAiUrl = `https://api.openai.com${req.originalUrl.replace('/elran/openai', '')}`;
  if (req.body.model !=== 'dall-e-3') {
    const { token, ...forwardBody } = { ...req.body, max_tokens: parseInt(process.env.MAX_TOKENS) || 250 };
  } else {
    const { token, ...forwardBody } = { ...req.body, size: "1024x1024" };
  } 
  try {
    const response = await axios({
      method: req.method,
      url: openAiUrl,
      headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      data: forwardBody
    });
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error forwarding request to OpenAI:', error.message);
    if (error.response) {
      return res.status(error.response.status).send(error.response.data);
    } else {
      return res.status(500).json('Error processing request.');
    }
  }
};

module.exports = { keygen, proxy };
