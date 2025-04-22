import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken'

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

    const JWT_SECRET = process.env.JWT_SECRET;
    try {
        const { email, password } = req.body;

        //validating inputs
        if(!email || !password) {
            return res.status(401).json({ error: "Email and Password is required."})
        }

          // Find user by email
  User.findByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error.' });
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const user = results[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Generate token (optional)
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email },
      token
    });
  });



    } catch (error) {
        
    }

}

export const logout =  async (req, res) => {

}
