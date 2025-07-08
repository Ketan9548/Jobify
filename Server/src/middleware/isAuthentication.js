import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const isAuthentication = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid Token", success: false });
        }
        req.id = decoded.Userid;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }
}

export default isAuthentication;