const ToDo = require("../models/ToDo");

const createToDo = async (req, res) => {
  const { toDoName, createdBy } = req.body;

  if (!toDoName || !createdBy) {
    res.json({ msg: "please provide values" });
  }

  const toDo = await ToDo.create(req.body);
  res.status(201).json({ toDo });
};

//controller for get all toDos
const getALLToDos = async (req, res) => {
  const { createdBy } = req.body;

  const toDo = await ToDo.find({ createdBy: createdBy });
  res.status(200).json({ toDo });
};

const updateToDo = async (req, res) => {
  const { id: ToDOId } = req.params;
};

module.exports = { getALLToDos, createToDo };
