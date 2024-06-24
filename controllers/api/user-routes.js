const router = require("express").Router();
const { User } = require("../../models");

// POST route for creating a new user
router.post('/signup', async (req, res) => {
  try {
    console.log('Request Body:', req.body);

    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    console.log('New User:', newUser);

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      console.log('Session Data:', req.session); // Log session data
      res.status(200).json(newUser);
    });
  } catch (err) {
    console.error('Error signing up:', err);
    res.status(500).json(err);
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res.status(400).json({ message: "Incorrect username or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect username or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log('Session Data:', req.session); // Log session data
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout route
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end(); // Respond with 404 if not logged in
  }
});

module.exports = router;
