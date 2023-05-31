// Dependencies
const path = require("path");
const express = require("express");
const session = require("express-session");
const exhbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const hbs = exhbs.create({ helpers });
require("dotenv").config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3001;

// Initialize sequelize
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Initialize controller routes
const indexRoute = require("./controllers/index");

// Set up sessions
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Set up view engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "assets")));
app.use("/assets/css", express.static(path.join(__dirname, "assets/css")));
app.use("/assets/js", express.static(path.join(__dirname, "assets/js")));

// Routes
app.use("/", indexRoute);

// Route handler for the root path ("/")
app.get("/", async (req, res) => {
  try {
    // Fetch blog posts from the database
    const posts = await Post.findAll();

    res.render("layouts/main", { posts }); // Render the main layout with the blog posts
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is now listening on port ${PORT}`);
  sequelize.sync({ force: false });
});
