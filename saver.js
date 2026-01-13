const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/deploy', async (req, res) => {
    const { apiKey, sessionId, serviceId } = req.body;

    if (!apiKey || !sessionId || !serviceId) {
        return res.status(400).json({ message: "Tafadhali jaza nafasi zote!" });
    }

    try {
        // 1. Update Session ID kwenye Render
        await axios.patch(`https://api.render.com/v1/services/${serviceId}/env-vars`, 
        [
            { "key": "SESSION_ID", "value": sessionId }
        ], 
        {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        // 2. Trigger Deployment mpya
        await axios.post(`https://api.render.com/v1/services/${serviceId}/deploys`, {}, {
            headers: { 'Authorization': `Bearer ${apiKey}` }
        });

        res.json({ message: "🚀 Hongera! Bot inaanza ku-deploy sasa hivi." });
    } catch (error) {
        console.error("Error details:", error.response ? error.response.data : error.message);
        res.status(500).json({ message: "Imeshindikana! Hakikisha API Key na Service ID ni sahihi." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server inayoyoma kwenye port ${PORT}`));
                      
