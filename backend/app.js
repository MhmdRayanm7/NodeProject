const express = require("express");

const authRouter = require("./routes/auth");
const levelsRouter = require("./routes/levels");
const itemsRouter = require("./routes/items");
const progressRouter = require("./routes/progress");

const app = express();

app.use(express.json());

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
