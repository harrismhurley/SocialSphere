const router = require("express").Router();
const { User } = require("../../models");

// POST route for creating a new user
router.post('/signup', async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Logging the entire request body

    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    console.log('New User:', newUser); // Logging the new user object created

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    console.error('Error signing up:', err); // Logging any errors that occur
    res.status(500).json(err);
  }
});

// Logout route
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;
