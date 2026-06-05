import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import genToken from "./genToken.js";
export const signup = async (req, res) => {
    try {

        const {userName, email, password, role} = req.body;
        if (await User.findOne({userName}) || await User.findOne({email})) {
            return res.status(400).json({message: 'Bad request, User already exists'})
        }
        const hashedpassword = await bcrypt.hash(password, 10)
        const user = await User.create({userName, email, password: hashedpassword, role : role ? role : "admin"})
        const token = genToken(user)
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: none,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        const userResponse = {
            _id: user._id,
            userName: user.userName,
            email: user.email,
            role: user.role
        };
        return res.status(200).json({message: "Signup successful", userResponse})
    } catch (error) {
        res.status(500).json({"message":`Error while signing up... ${error}`})
    }
}
export const signin = async (req, res) => {
    try {
        const {userName, email, password} = req.body;
        if (!password || (!email && !userName)) {
            return res.status(400).json({message: `Username or email and password are required`})
        }
        if (userName) {
            const user = await User.findOne({userName})
            if (!user) {
                return res.status(400).json({message: `User doesn't exist`})
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(400).json({message: `Incorrect password`})
            }
            const token = genToken(user)
            res.cookie("token", token, {
                sameSite: "none",
                secure: true,
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            const userResponse = {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                role: user.role
            };
            return res.status(201).json({message: `Signin successful...`, userResponse})
        } else {
            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({message: `User doesn't exist`})
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(400).json({message: `Incorrect password`})
            }
            const token = genToken(user)
            res.cookie("token", token, {
                sameSite: "none",
                secure: true,
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            const userResponse = {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                role: user.role
            };  
            return res.status(200).json({message: `Signin successful...`})
        }
    }  catch (error) {
        res.status(500).json({"message":`Error while signing in... ${error}`})
    }
}
export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
};