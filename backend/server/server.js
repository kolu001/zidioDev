import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from './config/mongodb.js';

const authRoutes = require('./routes/authRoutes.js');
const dashboardRoutes = require("./routes/dashboardRoutes.js");

const app = express();
const port = process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}))

app.get('/', (req, res) => res.send("API is working properly"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.listen(port, ()=> console.log(`server running on PORT:${port}`));