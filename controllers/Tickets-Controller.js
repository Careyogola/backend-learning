import ticket from "../models/tickets-model.js";
export const getTickets = async (req, res) => {
    try {
        const tickets = await ticket.getAll();
        res.status(200).json(tickets);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

export const createTickets = async (req, res) => {
    try {
        const ticketData = req.body;
        const tickets = await ticket.create(ticketData);
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error : error.message})
    }
}

export const updateTickets = async (req, res) => {
    try {
        const tickets = await ticket.update();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error : error.message})
    }
}