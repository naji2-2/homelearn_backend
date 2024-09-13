/* 단어 사전 api */
const express = require('express');
const uuidAPIKey = require('uuid-apikey');
const { Op } = require('sequelize');
const Dictionary = require('../models/baseball_dictionary_model.js')(require('../config/db'));

const router = express.Router();

const key = {
    apiKey: process.env.API_KEY,
    uuid: '36f77065-60fa-4b4a-90db-f2a02be13f34'
};

// 단어 검색
router.get('/:apikey/search/:word', async (req, res) => {
    try {
        const { apikey, search } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const whereClause = search
        ? { word: { [Op.like]: `%${search}%` } }  // 검색어가 있을 경우 like 검색
        : {};  // 검색어가 없을 경우 모든 단어 반환
   
        const words = await Dictionary.findAll({ where: whereClause });
        res.json(words);
    } catch (err) {
    res.status(500).json({ error: '데이터 조회 중 오류가 발생했습니다.' });
    }
});

// 카테고리별 조회
router.get('/:apikey/category/:category', async (req, res) => {
    try {
        const { apikey, category } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const words = await Dictionary.findAll({ where: { category } });
        res.json(words);
    } catch (err) {
        res.status(500).json({ error: '카테고리 조회 중 오류가 발생했습니다.' });
    }
});

// 단어 상세 정보
router.get('/:apikey/word/:id', async (req, res) => {
    try {
        const { apikey, id } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const wordDetail = await Dictionary.findByPk(id);
        if (wordDetail) {
            res.json(wordDetail);
        } else {
            res.status(404).json({ error: '단어를 찾을 수 없습니다.' });
        }
    } catch (err) {
        res.status(500).json({ error: '단어 조회 중 오류가 발생했습니다.' });
    }
});

// app.js에서 사용할 수 있도록 내보냄
module.exports = router;