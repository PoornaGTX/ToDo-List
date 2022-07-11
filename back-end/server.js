const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// server port
const port = process.env.PORT || 5000;

//error handler
require("express-async-errors");

// db
const connectDB = require("./db/connect");

//routes
const toDoRoutes = require("./routes/toDoRoutes");
const userRoutes = require("./routes/userRoutes");

//middleware
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const userAuthMiddleware = require("./middleware/userAuthMiddleware");

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Welcome" });
});

//base routes
app.use("/api/V1/todos", userAuthMiddleware, toDoRoutes);
app.use("/api/V1/users", userRoutes);

//middlware for invalid routes
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listing on port : ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
