const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema(
  {
    toDoName: {
      type: String,
      required: [true, "must provide ToDo name"],
      trim: true,
      maxlength: [20, "ToDo name can not be more than 50 characters"],
    },
    date: {
      type: String,
      required: [true, "must provide date"],
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
