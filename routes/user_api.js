/* 사용자 api */
const express = require('express');
const uuidAPIKey = require('uuid-apikey');
const User = require('../models/user_model')(require('../config/db.js'));

const router = express.Router();

const key = {
    apiKey: process.env.API_KEY,
    uuid: '36f77065-60fa-4b4a-90db-f2a02be13f34'
};

// 사용자 생성 (POST /users)
router.post('/:apikey/users', async (req, res) => {
    try {
        const { apikey } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const { name, baseball_team_name, image_url, kakao_id } = req.body;
        const user = await User.create({ name, baseball_team_name, image_url, kakao_id });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        //res.status(400).json({ error: error.message });
    }
});

// 모든 사용자 조회 (GET /users)
router.get('/:apikey/users', async (req, res) => {
    try {
        const { apikey } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 사용자 업데이트 (PUT /users/:id)
router.put('/:apikey/users/:id', async (req, res) => {
    try {
        const { apikey } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const { name, baseball_team_name, image_url, kakao_id } = req.body;
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.update({ name, baseball_team_name, image_url, kakao_id });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 사용자 삭제 (DELETE /users/:id)
router.delete('/:apikey/users/:id', async (req, res) => {
    try {
        const { apikey } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// app.js에서 사용할 수 있도록 내보냄
module.exports = router;