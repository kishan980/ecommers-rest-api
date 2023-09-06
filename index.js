// console.log("hello")
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./router/user");
const authRouter =require("./router/auth")
const productRouter=require("./router/product")
const cartRouter =require("./router/cart")
const orderRouter =require("./router/order")
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
app.use("/api/product/",productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/orders",orderRouter)
app.listen(port, () => {
  console.log(`Backend server is running! ${port}`);
});
