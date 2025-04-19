import express from 'express';
import dotenv from 'dotenv'
dotenv.config();

import authRoutes from './routes/AuthRoutes.js';

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
const port = process.env.PORT || 4000
app.listen(port, ()=>{
    console.log(`Server is live on http://localhost:${port}`)
});