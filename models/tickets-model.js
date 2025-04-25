import db from '../config/database.js';

const ticket = {

    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM tickets ORDER BY created_at DESC');
        return rows;
      },
    
      getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM tickets WHERE id = ?', [id]);
        return rows[0]; 
      },
    
      create: async (ticketData) => {
        const { title, description, event_date, price, venue, user_id } = ticketData;
        const [result] = await db.query(
          'INSERT INTO tickets (title, description, event_date, price, venue, user_id) VALUES (?, ?, ?, ?, ?, ?)',
          [title, description, event_date, price, venue, user_id]
        );
        return result.insertId;
      },
    
      update: async (id, ticketData) => {
        const { title, description, event_date, price, venue } = ticketData;
        const [result] = await db.query(
          'UPDATE tickets SET title = ?, description = ?, event_date = ?, price = ?, venue = ? WHERE id = ?',
          [title, description, event_date, price, venue, id]
        );
        return result;
      },
    
      delete: async (id) => {
        const [result] = await db.query('DELETE FROM tickets WHERE id = ?', [id]);
        return result;
      }
}
export default ticket;