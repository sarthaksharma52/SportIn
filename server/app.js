require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Import Routes
const userroutes = require("./routes/user");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use(cors({ 
    origin: ['http://localhost:5173', 'https://your-production-domain.com'], 
    credentials: true 
}));

// **Logging Middleware (Placed before routes to log all requests)**
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
    next();
});

// **Mongoose Connection**
mongoose.set("strictQuery", false);
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is not defined in .env");
        }

        await mongoose.connect(process.env.MONGO_URL, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });

        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error(" MongoDB connection error:", error);
        setTimeout(connectDB, 5000); // Retry connection every 5 seconds
    }
};

// **Start Server**
const startServer = async () => {
    await connectDB(); // Connect to MongoDB

    // User routes
    app.use('/api', userroutes);

    // Global Error Handling Middleware
    app.use((err, req, res, next) => {
        console.error("Server Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startServer();
