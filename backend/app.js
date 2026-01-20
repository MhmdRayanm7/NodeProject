const express = require("express");
const session = require("express-session");
const path = require("path");

const authRouter = require("./routes/auth");
const levelsRouter = require("./routes/levels");
const itemsRouter = require("./routes/items");
const progressRouter = require("./routes/progress");

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());

app.use(
  session({
    secret: "light_of_vision_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
  })
);

// API routes
app.use("/auth", authRouter);
app.use("/levels", levelsRouter);
app.use("/items", itemsRouter);
app.use("/progress", progressRouter);

// Serve React build
app.use(express.static(path.join(__dirname, "build")));

// React fallback (LAST THING)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
