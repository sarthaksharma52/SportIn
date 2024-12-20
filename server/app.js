require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
let port = process.env.PORT || 3000;

const userroutes = require("./routes/user");

app.use(express.json());

// Enable CORS for all routes
app.use(cors()); // Allows all origins during development

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://your-production-domain.com' : 'http://localhost:5173'
}));

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodbConnected");

        app.use('/api', userroutes);

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } catch (error) {
        console.log('mongodb connection error:', error);
    }
};

startServer();
