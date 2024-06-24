const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require("path"); // Ensure path module is imported
const http = require("http");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

// Session configuration
const sess = {
  secret: process.env.SECRET,
  maxAge: 100,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Handlebars setup
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes setup
app.use(routes);

// Database synchronization
sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    )
  );
});
