const express = require("express");
const router = express.Router();

//controllers

const { getALLToDos, createToDo } = require("../controllers/toDoController");

router.route("/").get(getALLToDos).post(createToDo);
router.route("/:id").get().patch().delete();

module.exports = router;
