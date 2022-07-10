const express = require("express");
const router = express.Router();

//controllers
const {
  getALLToDos,
  createToDo,
  updateToDo,
} = require("../controllers/toDoController");

router.route("/").get(getALLToDos).post(createToDo);
router.route("/:id").patch(updateToDo).delete();

module.exports = router;
