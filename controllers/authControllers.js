import bcrypt from "bcrypt";
import JsonWebToken from "jsonwebtoken";
import userModel from "../models/userModel.js";
const register = async(req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.json({ success: "false", message: "All fields are required" })
    }

    try {

        const existingUser = await userModel.findOne({ email });

        if(existingUser) {
            return res.json({ success: "false", message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
        res.json({ success: "false", message: error.message })
    }

}