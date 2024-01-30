"use strict";
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
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Connect to MongoDB
mongoose_1.default.connect('mongodb+srv://admin:mert1616@cluster0.drhejl8.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose_1.default.connection.on('connected', () => {
    console.log('MongoDB connection successful');
});
// Define a Mongoose schema for your blog model
const blogSchema = new mongoose_1.default.Schema({
    title: String,
});
// Create a Mongoose model based on the schema
const Blog = mongoose_1.default.model('Blog', blogSchema);
app.get('/api/blogs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield Blog.find();
        res.json(blogs);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.post('/api/blogs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    try {
        const newBlog = yield Blog.create({ title });
        res.json(newBlog);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.delete('/api/blogs/:_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params._id;
    try {
        yield Blog.findByIdAndRemove(id);
        res.sendStatus(204);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.put('/api/blogs/:_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params._id;
    const { title } = req.body;
    try {
        const updatedBlog = yield Blog.findByIdAndUpdate(id, { title }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(updatedBlog);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
