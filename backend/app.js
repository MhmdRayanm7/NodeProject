const express = require("express");
const session = require("express-session");

const authRouter = require("./routes/auth");
const levelsRouter = require("./routes/levels");
const itemsRouter = require("./routes/items");
const progressRouter = require("./routes/progress");

const app = express();

// middleware
app.use(express.json());

app.use(
  session({
    secret: "light_of_vision_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
  })
);

// main test route
app.get("/", (req, res) => {
  res.send("Light of Vision API is running");
});

// routers
app.use("/auth", authRouter);
app.use("/levels", levelsRouter);
app.use("/items", itemsRouter);
app.use("/progress", progressRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
