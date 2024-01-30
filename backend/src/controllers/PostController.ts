import { Request, Response } from 'express';
import PostModel from '../models/Post';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  try {
    const preview = content.substring(0, 100);
    const newPost = await PostModel.create({ title, content, preview });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, content } = req.body;

  try {
    const updatedData = { title, content };

    const updatedPost = await PostModel.findByIdAndUpdate(id, updatedData, { new: true });

    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const deletedPost = await PostModel.findByIdAndDelete(id);
    if (deletedPost) {
      res.status(200).json(deletedPost);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
