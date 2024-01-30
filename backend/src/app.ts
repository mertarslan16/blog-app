import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = 5000;

declare module 'express' {
  interface Request {
    user?: any;
  }
}

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:mert1616@cluster0.drhejl8.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
    console.log('MongoDB connection successful');
});

// Define a Mongoose schema for your blog model
const blogSchema = new mongoose.Schema({
  title: String,
});

// Create a Mongoose model based on the schema
const Blog = mongoose.model('Blog', blogSchema);

app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/blogs', async (req, res) => {
  const { title } = req.body;
  try {
    const newBlog = await Blog.create({ title });
    res.json(newBlog);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/blogs/:_id', async (req, res) => {
  const id = req.params._id;
  try {
    await Blog.findByIdAndRemove(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/blogs/:_id', async (req, res) => {
  const id = req.params._id;
  const { title } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, { title }, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

