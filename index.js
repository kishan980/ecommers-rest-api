// console.log("hello")
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./router/user");
const authRouter =require("./router/auth")

dotenv.config({});
mongoose
  .connect(process.env.MONGO_DB_URL, {})
  .then(() => console.log(`Database conection successFully`))
  .catch((error) => console.log(error));
const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());

app.get("/hello", () => {
  console.log("project are rinning...");
});

app.use("/api/user", userRouter);
app.use("/api/auth/", authRouter)
app.listen(port, () => {
  console.log(`Backend server is running! ${port}`);
});
