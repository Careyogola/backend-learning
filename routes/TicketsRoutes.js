import express, { Router } from 'express';
import { 
    createTickets, 
    deleteTickets, 
    getTickets, 
    getTicketsById, 
    updateTickets 
} from '../controllers/Tickets-Controller.js'

const router = express.Router();

router.get('/', getTickets);
router.get('/:id', getTicketsById);
router.put('/:id', updateTickets);
router.post('/', createTickets);
router.delete('/:id', deleteTickets);

export default router;