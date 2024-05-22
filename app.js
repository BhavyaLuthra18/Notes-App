require("dotenv").config();
const path = require("path");
// Routes
const baseRouter = require("./server/routes/index");
const dashboardRouter = require("./server/routes/dashboard");
const authRouter = require("./server/routes/auth");
const express = require("express");

// creates different layouts for the page
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const connectDB = require("./server/config/db");
const session = require("express-session"); // to store sessions in our database if user logged in it will be kept logged in
const passport = require("passport");
const MongoStore = require("connect-mongo");

const app = express();

const port = 5001 || process.env.PORT;

// allows data to pass through page to page
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "Keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    // cookie: { maxAge: new Date(Date.now() + 3600000) }, // hour //7 days 604800000 // 30day  days 30*24*60*60*1000
  })
);

// flash messages
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// login sessions
app.use(passport.initialize());
app.use(passport.session());

// Connect to Database
connectDB();

// Static Files
app.use(express.static("public"));

// Templating Engines
app.use(expressLayouts);

// default layout / base layout
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Routes
app.use("/", baseRouter);
app.use("/", authRouter);
app.use("/", dashboardRouter);

// Handle 404
app.get("*", function (req, res) {
  res.status(404).render("404");
});

// Port
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
