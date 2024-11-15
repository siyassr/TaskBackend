
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";


import router from "./Routes/TaskRoute.js"
import connectDb from "./Config/DbCnnt.js";
import UserRouter from "./Routes/UserRoute.js";

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true,              
  };
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(router);
app.use(UserRouter)

// app.use(userRoutes);
connectDb();


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
