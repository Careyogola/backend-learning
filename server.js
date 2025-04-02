import 'dotenv/config';
import express from 'express';
import connectDB from './config/mongodb.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();



app.get("/", (req, res)=>{
    res.send("Backend server is working!")
})
const port = process.env.PORT || 3003 ;
app.listen(port)
connectDB();