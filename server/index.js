const mongoose = require("mongoose");
const express = require("express");
const app = express();
const task = require("./routers/task");
const cors = require("cors");

mongoose
  .connect("mongodb connection string")
  .then(() => console.log("connected to host: http://localhost:3001"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use("/api/todo", task);

app.get("/", (req, res) => {
  res.send("welcome to Todo list...");
});

app.listen(3001, () => console.log("connected..."));
