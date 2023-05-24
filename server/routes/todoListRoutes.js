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

module.exports = router;
