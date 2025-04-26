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
        const { id } = req.params;           
        const ticketData = req.body;          

        const result = await ticket.update(id, ticketData);   
        res.status(200).json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error : error.message})
    }
}

export const getTicketsById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await ticket.getById(id);

        if (!result) {
            return res.status(404).json({ error: "Ticket not found." });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const deleteTickets = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ticket.delete(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        res.status(200).json({ message: "Ticket deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

