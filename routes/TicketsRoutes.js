import express, { Router } from 'express';
import { createTickets, getTickets } from '../controllers/Tickets-Controller.js'

const router = express.Router();

router.get('/', getTickets);
router.get('/:id', async (req, res)=> {

});
router.post('/:id', async (req, res)=> {

});
router.put('/:id', async (req, res)=> {

});
router.post('/', createTickets);
router.delete('/:id', async (req, res)=> {

});

export default router;