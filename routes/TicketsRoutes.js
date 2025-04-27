import express, { Router } from 'express';
import { 
    createTickets, 
    deleteTickets, 
    getTickets, 
    getTicketsById, 
    updateTickets,
    postTicketById
} from '../controllers/Tickets-Controller.js'

const router = express.Router();

router.get('/', getTickets);
router.get('/:id', getTicketsById);
router.put('/:id', updateTickets);
router.post('/', createTickets);
router.post('/:id', postTicketById);
router.delete('/:id', deleteTickets);

export default router;