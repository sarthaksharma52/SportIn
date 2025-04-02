const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        console.log("Incoming Request Headers:", req.headers); // Debugging

        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Access Denied! Token Missing or Invalid Format" });
        }

        const token = authHeader.split(" ")[1];
        console.log("Extracted Token:", token); // Debugging

        const jwtSecret = process.env.JWT_SECRET_KEY;
        if (!jwtSecret) {
            console.error("JWT_SECRET_KEY is missing in environment variables");
            return res.status(500).json({ error: "Internal Server Error: JWT Secret Key Missing" });
        }

        // Verify JWT Token
        const decoded = jwt.verify(token, jwtSecret);
        console.log("Decoded JWT Payload:", decoded); // Debugging

        // Check for userId, id, or _id
        if (!decoded.userId && !decoded.id && !decoded._id) {
            return res.status(403).json({ error: "Invalid Token: User ID missing in payload" });
        }

        req.user = { _id: decoded.userId || decoded.id || decoded._id }; // Ensure correct user ID is passed
        next();
    } catch (error) {
        console.error("Token Verification Error:", error.message);

        if (error.name === "JsonWebTokenError") {
            return res.status(403).json({ error: "Invalid Token" });
        } else if (error.name === "TokenExpiredError") {
            return res.status(403).json({ error: "Token Expired, Please Sign In Again" });
        } else {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
};

module.exports = authMiddleware;
