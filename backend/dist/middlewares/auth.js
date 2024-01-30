"use strict";
// auth.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = 'your_secret_key';
function createToken(data) {
    return jsonwebtoken_1.default.sign(data, SECRET_KEY, { expiresIn: '1h' });
}
exports.createToken = createToken;
function verifyToken(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    console.log(token);
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
    }
    else {
        jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'Token is not valid' });
            }
            else {
                // Token geçerli ise, kullanıcı bilgilerini request nesnesine ekle
                req.user = decoded;
                next(); // Middleware başarıyla tamamlandı, bir değer döndürmeye gerek yok.
            }
        });
    }
}
exports.verifyToken = verifyToken;
