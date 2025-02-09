const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        console.log("Auth Header:", authHeader); // Debugging

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

        const decoded = jwt.verify(token, jwtSecret);
        console.log("Decoded Token:", decoded); // Debugging

        req.user = decoded;
        next(); // Proceed to the next middleware
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
