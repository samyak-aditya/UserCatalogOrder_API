import { User, Product, Catalog, Order } from '../models/models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    const { username, password, type } = req.body;
    const jwtsecret= process.env.JWT_SECRET
    try {
        // Check if the username is already in use
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 12); // Salt and hash the password

        const user = new User({ username, password: hashedPassword, type });
        await user.save();

        // Generate a JWT token for authentication
        const token = jwt.sign({ userId: user._id, username: user.username }, jwtsecret, { expiresIn: '6h' });

        res.status(201).json({ message: 'User registration Successful', token });
    } catch (error) {
        res.status(400).json({ error: "User registration Failed" });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    const jwtsecret=process.env.JWT_SECRET
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate a JWT token for authentication
        const token = jwt.sign({ userId: user._id, username: user.username },jwtsecret , { expiresIn: '6h' });

        res.status(200).json({ message: 'Login success ', token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};
