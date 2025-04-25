import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import authRoutes from './routes/AuthRoutes.js';
import ticketRoutes from './routes/TicketsRoutes.js'
import connection from './config/database.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));


app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });
const port = process.env.PORT || 4000
app.listen(port, ()=>{
    console.log(`Server is live on http://localhost:${port}`);
});