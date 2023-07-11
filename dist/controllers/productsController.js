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
import { eq } from 'drizzle-orm';
import { unlink } from 'fs';
import { promisify } from 'util';
import cloudinary from '../utils/cloudinary.js';
import { products } from '../db/schema/schema.js';
import { db } from '../db/db.js';
var unlinAsync = promisify(unlink);
export var getAllProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allProducts, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('getAllProducts');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.query.products.findMany()];
            case 2:
                allProducts = _a.sent();
                res.status(201).json(allProducts);
                console.log(allProducts);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(500).json(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var addNewProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, category, subCategory, state, city, dynamic, userName, desc, phone, price, negotiable, userId, images, i, result, product, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, category = _a.category, subCategory = _a.subCategory, state = _a.state, city = _a.city, dynamic = _a.dynamic, userName = _a.userName, desc = _a.desc, phone = _a.phone, price = _a.price, negotiable = _a.negotiable, userId = _a.userId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                // console.log({ files: req.files });
                console.log({ body: req.body });
                // console.log(images[0]);
                if (!category ||
                    !subCategory ||
                    !state ||
                    !city ||
                    !dynamic ||
                    !userName ||
                    !desc ||
                    !phone ||
                    !price ||
                    !negotiable ||
                    !userId ||
                    !req.files) {
                    res.status(400).json({ message: 'All fields are required' });
                }
                images = [];
                i = 0;
                _b.label = 2;
            case 2:
                if (!(i < +req.files.length)) return [3 /*break*/, 6];
                return [4 /*yield*/, cloudinary.uploader.upload(req.files[i].path, {
                        upload_preset: 'ecomm'
                    })];
            case 3:
                result = _b.sent();
                return [4 /*yield*/, unlinAsync(req.files[i].path)];
            case 4:
                _b.sent();
                images.push(result.secure_url);
                _b.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 2];
            case 6: return [4 /*yield*/, db
                    .insert(products)
                    .values({
                    phone: phone,
                    city: city,
                    category: category,
                    state: state,
                    subCategory: subCategory,
                    negotiable: negotiable,
                    userId: userId,
                    price: +price,
                    specifications: dynamic,
                    description: desc,
                    cloudinary_ids: images
                })
                    .returning()];
            case 7:
                product = _b.sent();
                return [2 /*return*/, res.status(201).json({ message: product })];
            case 8:
                error_2 = _b.sent();
                console.log(error_2);
                return [2 /*return*/, res.status(500).json({ message: error_2 })];
            case 9: return [2 /*return*/];
        }
    });
}); };
// exports.updateProduct = async (req: Request, res: Response) => {
// 	try {
// 		await prisma.product.update({
// 			where: {
// 				id: req.body.id
// 			},
// 			data: {}
// 		});
// 	} catch (error) {
// 		res.status(500).json({ message: 'Internal server error' });
// 	}
// };
export var deleteProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product, i, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, db
                        .delete(products)
                        .where(eq(products.id, req.body.id))
                        .returning()];
            case 1:
                product = (_a.sent())[0];
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < product.cloudinary_ids.length)) return [3 /*break*/, 5];
                return [4 /*yield*/, cloudinary.uploader.destroy('user.cloudinary_id{imageName}')];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/, res
                    .status(200)
                    .json({ message: 'The product has been deleted successfully' })];
            case 6:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, res.status(500).json({ message: error_3 })];
            case 7: return [2 /*return*/];
        }
    });
}); };
export var getProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db
                        .select()
                        .from(products)
                        .where(eq(products.id, req.params.id))];
            case 1:
                product = (_a.sent())[0];
                if (!product) {
                    return [2 /*return*/, res.status(400).json({ message: 'Product does not exist' })];
                }
                res.json(product);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.log(error_4);
                return [2 /*return*/, res.status(500).json({ message: 'Error: ' + (error_4 === null || error_4 === void 0 ? void 0 : error_4.message) })];
            case 3: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=productsController.js.map