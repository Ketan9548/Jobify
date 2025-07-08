import { User } from "../Models/User.Model";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

const registration = async (req, res) => {
    try {

        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        })
        return res.status(200).json({ message: "Account created successfully", success: true });

    } catch (error) {
        return res.status(500).json({ message: "Error occurred registration", success: false });
    }
}

const login = async (req, res) => {
    try {

        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist", success: false });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password", success: false });
        }

        if (user.role !== role) {
            return res.status(400).json({ message: "Role mismatch", success: false });
        }

        const tokenData = {
            Userid: user._id,
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1h' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true }).json({ message: `Welcome back ${user.fullname}`, user, success: true });

    } catch (error) {
        return res.status(500).json({ message: "Error occurred during login", success: false });
    }
}


const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout successful", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Error occurred during logout", success: false });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        if (!fullname || !email || !phoneNumber || !bio || !skills) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        // cloudinary or any other file storage service can be used to handle file uploads

        const skillsArray = skills.split(',').map(skill => skill.trim());

        const userId = req.id;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User does not Found", success: false });
        }

        // updating user profile
        user.fullname = fullname;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.profile.bio = bio;
        user.profile.skills = skillsArray;

        // resume implementation can be added here using cloudinary or any other file storage service

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: {
                bio: user.profile.bio,
                skills: user.profile.skills,
                resume: user.profile.resume, // URL to resume file
                resumeOriginalName: user.profile.resumeOriginalName, // Original name of the resume file
                profilePhoto: user.profile.profilePhoto // URL to profile photo
            }
        }
        return res.status(200).json({ message: "Profile updated successfully", success: true, user });
    } catch (error) {
        return res.status(500).json({ message: "Error occurred during profile update", success: false });
    }
}


export { registration, login, logout, updateProfile };