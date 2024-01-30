"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateUser = (req, res, next) => {
    // Kullanıcı kimliği doğrulama işlemleri burada yapılacak
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Yetkilendirme reddedildi. Token bulunamadı.' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, 'your_secret_key'); // Secret key'i güvenli bir şekilde saklamalısınız
        req.user = decoded.user; // Kullanıcı bilgisi req.user içinde tutulacak
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Geçersiz token.' });
    }
};
exports.default = authenticateUser;
