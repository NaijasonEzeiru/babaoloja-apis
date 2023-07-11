var jwt = require('jsonwebtoken');
export var verifyToken = function (req, res, next) {
    var _a, _b, _c;
    var token = (_c = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.cookie) === null || _b === void 0 ? void 0 : _b.match(new RegExp('(^| )' + 'access_token' + '=([^;]+)'))) === null || _c === void 0 ? void 0 : _c[2];
    console.log(token);
    if (!token) {
        return res.json({
            message: 'No token found',
            isLoggedIn: false
        });
    }
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err)
            res.status(403).json('failed to authenticate');
        req.user = user;
        next();
    });
};
export var verifyTokenAndAuth = function (req, res, next) {
    verifyToken(req, res, function () {
        if (req.user.id == req.params.id || req.user.role === 'admin') {
            next();
        }
        else {
            res.status(403).json('You are not authorised for this action');
        }
    });
};
export var verifyAdmin = function (req, res, next) {
    verifyToken(req, res, function () {
        if (req.user.role === 'admin') {
            next();
        }
        else {
            res.status(403).json('You are not authorised for this action');
        }
    });
};
//# sourceMappingURL=verifyJWT.js.map