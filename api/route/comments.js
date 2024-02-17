import express from 'express';
import {
    getAllCommentsForPost,
    getAllComments,
    getAllCommentsForUser,
    addCommentToPost,
    updateComment,
    deleteComment,
} from '../controller/comment.js'; // Import the comment controller functions

const router = express.Router();

// Get all comments for a specific post
router.get('/post/:post_id', getAllCommentsForPost);

// Get all comments for all posts
router.get('/', getAllComments);

// Get all comments for a specific user
router.get('/user/:user_id', getAllCommentsForUser);

// Add a comment to a post
router.post('/', addCommentToPost);

// Update a comment
router.put('/', updateComment);

// Delete a comment
router.delete('/', deleteComment);

export default router;
