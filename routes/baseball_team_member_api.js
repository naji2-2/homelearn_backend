const express = require('express');
const uuidAPIKey = require('uuid-apikey');
const BaseballTeamMember = require('../models/baseball_team_member_model.js')(require('../config/db'));
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

        const players = await BaseballTeamMember.findAll();  // 크롤링 후 DB 저장

        res.status(200).json(players);

    } catch (error) {
        console.error( error);
        res.status(500).json({ error: '선수 정보를 불러오는 중 오류가 발생했습니다.' });
    }
});

module.exports = router;
