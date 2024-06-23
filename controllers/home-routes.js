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

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// Route for rendering the dashboard page
router.get("/dash", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }

  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id // Filter posts by logged-in user's ID
      },
      include: [
        {
          model: User,
          attributes: ["username", "id"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("dash", {
      posts,
      logged_in: req.session.logged_in,
      current_user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Route for rendering the signup page
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});
module.exports = router;