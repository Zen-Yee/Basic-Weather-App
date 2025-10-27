// Importing module
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Loading environment variables
const port = process.env.PORT;
const API_KEY = process.env.API_KEY;
const TARGET_URL = process.env.TARGET_URL;

app.use(express.json());

// Endpoint to add the API key to URL
app.use('/proxy/', async (req,res) => {
    try{

        const path = req.url;
        const target = `${TARGET_URL}/${path}`;

        const separator = target.includes("?") ? "&" : "?";
        const finalUrl = `${target}${separator}key=${API_KEY}`;

        const response = await axios.get(finalUrl);
        const result = response.data;
        res.json(result);

    }catch (error) {
        res.status(error.response?.status || 500).json({
        error: "Failed to fetch data from upstream API",
        details: error.message,
    });
    }
});

// Start server
app.listen(port,()=>{
    console.log(`Proxy server running on port ${port}.`);
})