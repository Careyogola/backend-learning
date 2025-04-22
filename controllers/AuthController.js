import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

export const signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
      }
  
      // Check if user already exists
      User.findByEmail(email, async (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error.' });
        if (results.length > 0) {
          return res.status(400).json({ error: 'Email already exists.' });
        }
  
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
  
        // Create the user
        User.create({ name, email, password: hashPassword }, (err, result) => {
          if (err) return res.status(500).json({ error: 'Failed to create user.' });
  
          res.status(201).json({ User,message: 'User created successfully!' });
        });
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong.' });
    }
  };
  

export const signin = async (req, res) => {

}

export const logout =  async (req, res) => {

}
