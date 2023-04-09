const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookiePraser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

//set up the server
const app = express();
const Port = process.env.PORT || 8080;
app.listen(Port, () => {
  console.log(`Server started on port ${Port}`);
});

app.use(express.json());
app.use(cookiePraser());
app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    credentials: true,
  })
);

//connect to the server
mongoose
  .connect(process.env.MDB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Successfull to the DB"))
  .catch((err) => console.log(err));

//setup routes

app.use("/auth", require("./routers/userRouter.js"));
