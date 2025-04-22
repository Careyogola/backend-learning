import connection from '../config/database.js';

const User = {
    
  create: (userData, callback) => {
    const { name, email, password } = userData;
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    connection.query(sql, [name, email, password], callback);
  },

  // Find user by email
  findByEmail: (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    connection.query(sql, [email], callback);
  },

  // Find user by ID
  findById: (id, callback) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    connection.query(sql, [id], callback);
  }
};

export default User;
