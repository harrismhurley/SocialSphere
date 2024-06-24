const router = require("express").Router();
const { Post, Comment, User } = require('../models');

// Route to fetch and render posts with associated comments and authors
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User, // Include the User model to get author information
          attributes: ['username'],
        },
        {
          model: Comment, // Include comments for each post
          include: [{ model: User, attributes: ['username'] }], // Include User info for comments
        },
      ],
      order: [['createdAt', 'DESC']], // Example ordering
    });

    const posts = postData.map(post => post.get({ plain: true }));

    console.log('Fetched posts with comments:', posts); // Add console log here to inspect the structure

    res.render('home', { 
      posts,
      logged_in: req.session.logged_in, // Pass the logged_in state to the template
      current_user_id: req.session.user_id // Pass the current user ID to the template
    });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});


// Route for rendering the dashboard page
router.get("/dash", async (req, res) => {
  console.log("Inside /dash route");
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

    console.log(posts); // Log posts data to check in console

    res.render("dash", {
      posts,
      logged_in: req.session.logged_in,
      current_user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



// Example route handler to fetch posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User, // Include the User model to get author information
          attributes: ["username"], // Select the username attribute
        },
        {
          model: Comment, // Optionally include comments if needed
          include: [{ model: User, attributes: ["username"] }], // Include user info for comments
        },
      ],
      order: [["createdAt", "DESC"]], // Example ordering
    });

    res.render("home", { posts }); // Render the posts to your Handlebars template
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});




// route for logging in
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
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