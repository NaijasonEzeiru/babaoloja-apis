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
import express from 'express';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
var app = express();
// const corsOptions = require("./config/corsOptions")
var PORT = process.env.PORT || 4000;
import cors from 'cors';
import productRouter from './routes/productsRouter.js';
import authRouter from './routes/authRouter.js';
import adminRouter from './routes/adminRouter.js';
// import userRouter from './routes/userRouter.js'
import { db } from './db/db.js';
var allowedOrigins = [
    'https://portfolio-project-tau-eight.vercel.app',
    'http://localhost:3000'
];
// const corsOptions = {
// 	origin: function (origin, callback) {
// 		if (allowedOrigins.indexOf(origin) !== -1) {
// 			callback(null, true);
// 		} else {
// 			callback(new Error('Not allowed by CORS'));
// 		}
// 	},
// 	credentials: true,
// 	headers: ['Content-Type']
// };
// app.use(cors(corsOptions));
// app.options('*', cors());
app.use(cors({
    origin: [
        'https://portfolio-project-tau-eight.vercel.app',
        'http://localhost:3000'
    ],
    credentials: true
}));
var corsConfig = {
    origin: true,
    credentials: true
};
app.options(['https://portfolio-project-tau-eight.vercel.app', 'http://localhost:3000'], cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', function (_req, res) {
    res.send('Up and running');
});
app.use('/products', productRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
// app.use('/user', userRouter);
app.listen(PORT, function () { return console.log('server running on port: ' + PORT); });
// await migrate(db, { migrationsFolder: 'drizzle' });
var mig = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        migrate(db, { migrationsFolder: 'drizzle' });
        return [2 /*return*/];
    });
}); };
mig();
export default app;
//# sourceMappingURL=index.js.map