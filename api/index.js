import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 10000;

mongoose
.connect(process.env.MONGO_URL)
.then(()=>{console.log("server syatter")})
.catch((err)=>{console.log(err)});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
