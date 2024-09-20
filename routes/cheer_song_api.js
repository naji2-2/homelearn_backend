const express = require('express');
const uuidAPIKey = require('uuid-apikey');
const CheerSong = require('../models/cheer_song_model.js')(require('../config/db'));


const router = express.Router();


const key = {
    apiKey: process.env.API_KEY,
    uuid: '36f77065-60fa-4b4a-90db-f2a02be13f34'
};

router.get('/:apikey', async (req, res) => {
    try {
        const { apikey } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const cheerSong = await CheerSong.findAll();

        if (cheerSong.length > 0) {
            res.status(200).json(cheerSong);
        } else {
            res.status(404).send('No homegrounds found.');
        }
    } catch (error) {
        console.error('Error fetching homegrounds:', error);
        res.status(500).send('Failed to fetch homegrounds');
    }
});

module.exports = router;