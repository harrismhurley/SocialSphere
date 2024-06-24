const express = require('express');
const router = express.Router();
const { Comment } = require('../../models'); // Adjust based on your model setup
const withAuth = require('../../utils/auth'); // Ensure this path is correct

// Create comment
router.post("/", withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        console.error('Error adding comment:', err);
        res.status(500).json({ message: 'Failed to add comment' });
    }
});

module.exports = router;
