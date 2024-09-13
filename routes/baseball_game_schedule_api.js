const express = require('express');
const uuidAPIKey = require('uuid-apikey');
const BaseballGameSchedule = require('../models/baseball_game_schedule_model')(require('../config/db'));
const { scrapeKBOGames } = require('../services/kboGameScraper');
const router = express.Router();

const key = {
    apiKey: process.env.API_KEY,
    uuid: '36f77065-60fa-4b4a-90db-f2a02be13f34'
};

// KBO 경기 데이터를 크롤링하고 DB에 저장하는 엔드포인트
router.get('/scrape/:apikey', async (req, res) => {
    try {
        const { apikey } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const games = await scrapeKBOGames();  // 크롤링 후 DB 저장
        res.json({
            message: `${games.length}개의 경기가 크롤링 및 DB에 저장되었습니다.`,
            games,
        });
    } catch (error) {
        console.error('크롤링 중 오류:', error);
        res.status(500).json({ error: '경기 데이터를 크롤링하는 중 오류가 발생했습니다.' });
    }
});

// DB에서 KBO 경기 데이터를 가져오는 엔드포인트
router.get('/:apikey', async (req, res) => {
    try {
        
        const { apikey } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const games = await BaseballGameSchedule.findAll({
            order: [['game_date', 'ASC']], // 경기 날짜 순으로 정렬
        });

        if (games.length === 0) {
            return res.status(404).json({ message: '저장된 경기 데이터가 없습니다.' });
        }

        res.json(games);
    } catch (error) {
        console.error('경기 데이터를 가져오는 중 오류:', error);
        res.status(500).json({ error: 'DB에서 경기 데이터를 가져오는 중 오류가 발생했습니다.' });
    }
});

module.exports = router;