const rateLimit = require('express-rate-limit');
const requestIp = require('request-ip')

const hourlyLimit = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 25, // per windowMs
    message: 'Hourly limit reached',
    keyGenerator: (req,res) => {
        return requestIp.getClientIp(req)
    },
});

const dailyLimit = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 1 day
    max: 70, // per windowMs
    message: 'Daily limit reached',
    keyGenerator: (req, res) => {
      return requestIp.getClientIp(req)
    },
});

module.exports = { hourlyLimit, dailyLimit };