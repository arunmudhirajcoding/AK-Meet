import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt, { hash } from "bcrypt"

import crypto from "crypto"
import { Meeting } from "../models/meeting.model.js";
const login = async (req, res) => {

    const { username, password } = req.body;// client sends username, password as req in login

    if (!username || !password) {
        return res.status(400).json({ message: "Please Provide Username and Password" })//if username or password is missing at client side
    }

    try {
        const user = await User.findOne({ username });// check user exist with username
        if (!user) {// if not found
            return res.status(httpStatus.NOT_FOUND).json({ message: "User Not Found" })
        }


        let isPasswordCorrect = await bcrypt.compare(password, user.password);//check password is correct or not

        if (isPasswordCorrect) {// if correct passoword
            let token = crypto.randomBytes(20).toString("hex");// in db store token as hex string that is 

            user.token = token;// create a token and store in db for perticular user
            
            await user.save();
            return res.status(httpStatus.OK).json({ token: token })
        } else {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid Username or password" })
        }

    } catch (e) {
        return res.status(500).json({ message: `Something went wrong ${e}` })
    }
}


const register = async (req, res) => {
    const { name, username, password } = req.body;// client sends name, username, password as req


    try {
        const existingUser = await User.findOne({ username });//fetch user with username
        if (existingUser) {// user already exists 
            return res.status(httpStatus.FOUND).json({ message: "User already exists" });
        }
        // if not exist then create new user with username and password
        const hashedPassword = await bcrypt.hash(password, 10);// for password encryption

        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword
        });

        await newUser.save();// save new user to database

        res.status(httpStatus.CREATED).json({ message: "User Registered" })// send response to client

    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }

}


const getUserHistory = async (req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({ token: token });
        const meetings = await Meeting.find({ user_id: user.username })
        res.json(meetings)
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}

const addToHistory = async (req, res) => {
    const { token, meeting_code } = req.body;

    try {
        const user = await User.findOne({ token: token });

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code
        })

        await newMeeting.save();

        res.status(httpStatus.CREATED).json({ message: "Added code to history" })
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}


export { login, register, getUserHistory, addToHistory }