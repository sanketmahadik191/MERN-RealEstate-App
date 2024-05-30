import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import userRouter from "./routes/user.route.js";

const app = express();

const PORT = process.env.PORT || 10000;

mongoose
.connect(process.env.MONGO_URL)
.then(()=>{console.log("server syatter")})
.catch((err)=>{console.log(err)});

app.get('/',(req,res)=>{
  res.send("hello")
})

app.use(userRouter)

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
