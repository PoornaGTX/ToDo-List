const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// db
const connectDB = require("./db/connect.js");

//middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Welcome" });
});

// server port
const port = process.env.PORT || 5000;

//routes
const toDORoutes = require("./routes/toDoRoutes");

//middleware
app.use("/api/V1/todos", toDORoutes);

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
