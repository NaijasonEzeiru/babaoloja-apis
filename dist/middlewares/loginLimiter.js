const rateLimit = require('express-rate-limit');
const loginLmiter = rateLimit({
    // windowMs: 1000 * 60 * 60, // 1 hour
    windowMs: 60 * 1000,
    max: 5,
    massage: {
        message: 'Too many login attempts. Please try again later after 60 seconds.'
    },
    stadardHeaders: true,
    lagacyHeaders: false // Disable the 'X-RateLimit-*' headers
});
module.exports = loginLmiter;
export {};
//# sourceMappingURL=loginLimiter.js.map