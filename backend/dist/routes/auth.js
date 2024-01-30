"use strict";
// src/routes/authRoute.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
// Kullanıcı kaydı
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Kullanıcı var mı kontrol et
        const existingUser = yield User_1.default.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ msg: 'Kullanıcı zaten var' });
        }
        // Şifre hashleme
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        // Yeni kullanıcı oluştur
        const newUser = new User_1.default({
            username,
            password: hashedPassword,
        });
        // Veritabanına kaydet
        yield newUser.save();
        // Token oluştur
        const token = jsonwebtoken_1.default.sign({ id: newUser.id }, 'your-secret-key', { expiresIn: 3600 });
        res.json({ token, user: { id: newUser.id, username: newUser.username } });
    }
    catch (error) {
        res.status(500).send('Server Error');
    }
}));
// Kullanıcı girişi
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Kullanıcı var mı kontrol et
        const user = yield User_1.default.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Kullanıcı bulunamadı' });
        }
        // Şifre kontrolü
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Hatalı şifre' });
        }
        // Token oluştur
        const token = jsonwebtoken_1.default.sign({ id: user.id }, 'your-secret-key', { expiresIn: 3600 });
        res.json({ token, user: { id: user.id, username: user.username } });
    }
    catch (error) {
        res.status(500).send('Server Error');
    }
}));
exports.default = router;
