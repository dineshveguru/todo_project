const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const Task = require("../model/model");

router.use(express.json());

router.get("/", (req, res) => {
  res.send("Welcome to portal.... You can add tasks here");
});

router.get("/get", (req, res) => {
  Task.find()
    .then((tasks) => res.send(tasks))
    .catch((err) => console.log(err));
});

router.get("/get/:id", (req, res) => {
  Task.findById(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

router.route("/create").post((req, res) => {
  const newTask = new Task({
    name: req.body.name,
    description: req.body.description,
    isFinished: req.body.isFinished,
  });

  newTask
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Task.deleteOne({ _id: id })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, isFinished } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.send(`No post with the given id: ${id}`);
  const updatedTask = { name, description, isFinished, _id: id };
  await Task.findByIdAndUpdate(id, updatedTask, { new: true });
  res.json(updatedTask);
});

module.exports = router;
