const express = require('express');
const uuidAPIKey = require('uuid-apikey');
const BaseballHomegroundParking = require('../models/baseball_homeground_parking_model.js')(require('../config/db'));


const router = express.Router();


const key = {
    apiKey: process.env.API_KEY,
    uuid: '36f77065-60fa-4b4a-90db-f2a02be13f34'
};

router.get('/:apikey/:id', async (req, res) => {
    try {
        const { apikey, id } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const homeground_id = id;
        const baseballHomegroundParking = await BaseballHomegroundParking.findAll({where: {homeground_id}});

        if (baseballHomegroundParking.length > 0) {
            res.status(200).json(baseballHomegroundParking);
        } else {
            res.status(404).send('No homeground parking found.');
        }
    } catch (error) {
        console.error('Error fetching homeground parking:', error);
        res.status(500).send('Failed to fetch homeground parking');
    }
});


router.get('/:apikey/:id', async (req, res) => {
    try {
        const { apikey, id } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const baseballHomegroundParking = await BaseballHomegroundParking.findByPk(id);
        const homeground_id = id;

        if (baseballHomeground) {
            res.status(200).json(baseballHomeground);
            
        } else {
            res.status(404).send('homeground not found.');
        }
    } catch (error) {
        console.error('Error fetching homeground:', error);
        res.status(500).send('Failed to fetch homeground');
    }
});


// app.js에서 사용할 수 있도록 내보냄
module.exports = router;