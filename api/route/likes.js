import express from 'express';

import { getAllLikes,getLikesForPost,postLike,deleteLike } from '../controller/like.js'; // Import the controller function

const router = express.Router();
router.get('/',getAllLikes);
router.get('/:post_id', getLikesForPost);
router.post('/', postLike);
router.delete('/:id', deleteLike);
export default router;
