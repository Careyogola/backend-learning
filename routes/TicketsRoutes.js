import express, { Router } from 'express';
import { createTickets, getTickets, getTicketsById, updateTickets } from '../controllers/Tickets-Controller.js'

const router = express.Router();

router.get('/', getTickets);
router.get('/:id', getTicketsById);
router.post('/:id', async (req, res)=> {

});
router.put('/:id', updateTickets);
router.post('/', createTickets);
router.delete('/:id', async (req, res)=> {

});

export default router;