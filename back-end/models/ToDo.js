const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema(
  {
    toDoName: {
      type: String,
      required: [true, "must provide name"],
      trim: true,
      maxlength: [50, "name can not be more than 50 characters"],
    },
    date: {
      type: String,
      required: [true, "must provide name"],
      default: "none",
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: String,
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ToDo", ToDoSchema);
