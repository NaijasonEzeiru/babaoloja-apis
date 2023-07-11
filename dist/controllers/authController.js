var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { eq } from 'drizzle-orm';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { users } from '../db/schema/schema.js';
import { db } from '../db/db.js';
// import { Client } from 'pg';
// const client = new Client({
// 	connectionString: 'postgres://user:password@host:port/db'
// });
// await client.connect();
// const db = drizzle(client)
config();
var registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, password, firstName, lastName, email, phone, existingUser, register, _b, passwordHash, rest, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, password = _a.password, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, phone = _a.phone;
                if (!(!password || !firstName || !lastName || !email || !phone)) return [3 /*break*/, 1];
                // if all fields are not provided, return a 409 response with an error message
                return [2 /*return*/, res.status(422).json({ message: 'All fields are required' })];
            case 1: return [4 /*yield*/, db
                    .select()
                    .from(users)
                    .where(eq(users.email, email))];
            case 2:
                existingUser = (_c.sent())[0];
                if (existingUser) {
                    // If a user with the same email exists, return a 409 response with an error message
                    return [2 /*return*/, res
                            .status(409)
                            .json({ message: 'This email address is already taken' })];
                }
                _c.label = 3;
            case 3:
                _c.trys.push([3, 5, , 6]);
                return [4 /*yield*/, db
                        .insert(users)
                        .values({
                        passwordHash: CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET).toString(),
                        email: email.toLowerCase(),
                        firstName: firstName,
                        lastName: lastName,
                        phone: phone
                    })
                        .returning()];
            case 4:
                register = _c.sent();
                _b = register[0], passwordHash = _b.passwordHash, rest = __rest(_b, ["passwordHash"]);
                res.status(201).json(__assign({}, rest));
                return [3 /*break*/, 6];
            case 5:
                error_1 = _c.sent();
                console.log(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, passwordHash, rest, unhashedPassword, accessToken, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db
                        .select()
                        .from(users)
                        .where(eq(users.email, email.toLowerCase()))];
            case 2:
                user = (_b.sent())[0];
                if (!user) {
                    return [2 /*return*/, res
                            .status(401)
                            .json({ emailError: 'This email address is not registered' })];
                }
                passwordHash = user.passwordHash, rest = __rest(user, ["passwordHash"]);
                unhashedPassword = CryptoJS.AES.decrypt(passwordHash, process.env.PASSWORD_SECRET).toString(CryptoJS.enc.Utf8);
                if (password !== unhashedPassword) {
                    return [2 /*return*/, res.status(401).json({
                            passwordError: 'This password is incorrect'
                        })];
                }
                else {
                    accessToken = jwt.sign({
                        id: rest.id,
                        role: rest.role
                    }, process.env.JWT_SECRET, { expiresIn: '3d' });
                    res.cookie('access_token', accessToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production'
                    })
                        .status(201)
                        .json(__assign(__assign({}, rest), { Message: 'logged in successfully' }));
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                console.error(err_1);
                res.status(500).json(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var me = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decodedToken, id, user, passwordHash, rest, accessToken, err_2;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                token = (_c = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.cookie) === null || _b === void 0 ? void 0 : _b.match(new RegExp('(^| )' + 'access_token' + '=([^;]+)'))) === null || _c === void 0 ? void 0 : _c[2];
                if (!token) return [3 /*break*/, 4];
                decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                id = decodedToken.id;
                if (!id) {
                    return [2 /*return*/, res
                            .status(200)
                            .json({ success: false, message: 'invalid token' })];
                }
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db
                        .select()
                        .from(users)
                        .where(eq(users.id, id))];
            case 2:
                user = (_d.sent())[0];
                // !user && res.status(401).json('Email address is not registered');
                if (!user) {
                    console.log('no user');
                    return [2 /*return*/, res
                            .status(401)
                            .json({ message: 'Email address is not registered' })];
                }
                passwordHash = user.passwordHash, rest = __rest(user, ["passwordHash"]);
                accessToken = jwt.sign({
                    id: rest.id,
                    role: rest.role
                }, process.env.JWT_SECRET, { expiresIn: '14d' });
                return [2 /*return*/, res
                        .cookie('access_token', accessToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production'
                    })
                        .status(201)
                        .json(__assign({}, rest))];
            case 3:
                err_2 = _d.sent();
                console.error(err_2);
                return [2 /*return*/, res.status(500).json(err_2)];
            case 4: return [2 /*return*/, res.status(200).json({
                    success: false,
                    message: 'Error! persist token was not provided'
                })];
        }
    });
}); };
var logoutUser = function (_req, res) {
    return res
        .clearCookie('access_token')
        .status(200)
        .json({ message: 'You have successfully logged out' });
};
export { registerUser, loginUser, me, logoutUser };
//# sourceMappingURL=authController.js.map