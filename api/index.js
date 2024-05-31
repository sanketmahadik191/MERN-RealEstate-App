import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import "dotenv/config";
import userRouter from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js"

const app = express();

const PORT = process.env.PORT || 10000;

mongoose
.connect(process.env.MONGO_URL)
.then(()=>{console.log("Conneted To mongoDB")})
.catch((err)=>{console.log(err)});

app.get('/',(req,res)=>{
  res.send("hello")
})

app.use(cors());
app.use(express.json())
app.use('/api/auth',authRoute)
app.use('/api/v1',userRouter)

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err|| 'Internal server error';
  return res.status(statusCode).json({
    success:false,
    statusCode: statusCode,
    message:message
  });
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
