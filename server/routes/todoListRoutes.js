const router = require("express").Router();
const todoListModel = require("../models/todoList");

router.post("/api/list", async (req, res) => {
  try {
    const newList = new todoListModel({
      list: req.body.list,
    });
    const saveList = await newList.save();
    res.status(200).json("List added");
  } catch (err) {
    res.json(err);
  }
});

router.get("/api/lists", async (req, res) => {
  try {
    const allTodoList = await todoListModel.find({});
    res.status(200).json(allTodoList);
  } catch (err) {
    res.json(err);
  }
});

router.put("/api/list/:id", async (req, res) => {
  try {
    const updateList = await todoListModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Task Updated");
  } catch (err) {
    res.json(err);
  }
});

router.delete("/api/list/:id", async (req, res) => {
  try {
    const DeleteList = await todoListModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Task Deleted");
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
