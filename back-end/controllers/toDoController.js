const ToDo = require("../models/ToDo");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const { BadRequestError, NotFoundError } = require("../errors/index");

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
  const { search, sort, searchDate } = req.query;

  //query object
  const queryObject = {
    createdBy: req.user.userId,
  };

  //search condition
  if (search) {
    queryObject.toDoName = { $regex: search, $options: "i" };
  }

  //date
  if (searchDate) {
    queryObject.date = searchDate;
  }

  let result = ToDo.find(queryObject);

  if (sort === "latest") {
    result = result.sort("-date");
  }

  if (sort === "oldest") {
    result = result.sort("date");
  }

  if (sort === "a-z") {
    result = result.sort("toDoName");
  }

  if (sort === "z-a") {
    result = result.sort("-toDoName");
  }

  const toDo = await result;

  res.status(StatusCodes.OK).json({ toDo });
};

const updateToDo = async (req, res) => {
  const { id: ToDoId } = req.params;
  const { toDoName, date, isComplete } = req.body;

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

const deleteToDo = async (req, res) => {
  const { id: ToDoId } = req.params;

  const todo = await ToDo.findOne({ _id: ToDoId });

  if (!todo) {
    throw new NotFoundError(`No ToDo with id:${ToDoId}`);
  }

  await todo.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! ToDo removed" });
};

module.exports = { getALLToDos, createToDo, updateToDo, deleteToDo };
