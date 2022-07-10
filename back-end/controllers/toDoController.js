const ToDo = require("../models/ToDo");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const createToDo = async (req, res) => {
  const { toDoName, date } = req.body;

  const createdBy = req.user.userId;

  if (!toDoName || !date) {
    res.json({ msg: "please provide values" });
  }

  const toDo = await ToDo.create({ toDoName, date, createdBy });
  res.status(StatusCodes.CREATED).json({ toDo });
};

//controller for get all toDos
const getALLToDos = async (req, res) => {
  const { search, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  //search condition
  if (search) {
    queryObject.toDoName = { $regex: search, $options: "i" };
  }

  let result = ToDo.find(queryObject);

  const toDo = await result;

  res.status(StatusCodes.OK).json({ toDo });
};

const updateToDo = async (req, res) => {
  const { id: ToDoId } = req.params;
  const { toDoName, date } = req.body;

  if (!toDoName || !date) {
    throw new BadRequestError("Please provide all values");
  }

  const todo = await ToDo.findOne({ _id: ToDoId });

  if (!todo) {
    throw new NotFoundError(`No ToDo with id:${ToDoId}`);
  }

  const updatedToDo = await ToDo.findOneAndUpdate({ _id: ToDoId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedToDo });
};

module.exports = { getALLToDos, createToDo, updateToDo };
