import express from 'express';
import * as postController from '../controllers/PostController';

const router = express.Router();

router.get('/', postController.getPosts);
router.get('/:_id', postController.getPostById);
router.post('/', postController.createPost);
router.put('/:_id', postController.updatePost);
router.delete('/:_id', postController.deletePost);

export default router;
