import User from '../models/user.js';

export const getAllUsers = async (req, res) => {
    try 
    {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
    }   
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addUser = async (req, res) => {
    try 
    {
        const { name } = req.body;

        if (!name) 
        {
            return res.status(400).json({ success: false, message: "User name is required." });
        }

        let user = await User.findOne({ name });

        if (user) 
        {
            return res.status(400).json({ success: false, message: "User with this name already exists." });
        }

        user = new User({ name });
        await user.save();

        res.status(201).json({ success: true, data: user });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, message: error.message });
    }
};