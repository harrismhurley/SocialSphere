const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to create a post
router.post("/", withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update post
router.put("/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: "No post found with this id!" });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete post
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            res.status(404).json({ message: "No post found with this id!" });
            return;
        }

        await post.destroy();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;