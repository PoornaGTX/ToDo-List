const ToDo = require("../models/ToDo");
const { StatusCodes } = require("http-status-codes");

const createToDo = async (req, res) => {
  const { toDoName, createdBy } = req.body;

  if (!toDoName || !createdBy) {
    res.json({ msg: "please provide values" });
  }

  const toDo = await ToDo.create(req.body);
  res.status(StatusCodes.CREATED).json({ toDo });
};

//controller for get all toDos
const getALLToDos = async (req, res) => {
  const { createdBy } = req.body;

  const toDo = await ToDo.find({ createdBy: createdBy });
  res.status(StatusCodes.OK).json({ toDo });
};

const updateToDo = async (req, res) => {
  const { id: ToDOId } = req.params;
};

module.exports = { getALLToDos, createToDo };
