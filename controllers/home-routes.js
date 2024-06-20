const router = require("express").Router();
const { Post, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username", "id"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("home", {
      posts,
      logged_in: req.session.logged_in,
      current_user_id: req.session.user_id,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;