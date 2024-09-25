const express = require('express');
const uuidAPIKey = require('uuid-apikey');
const User = require('../models/user_model')(require('../config/db.js'));
const jwt = require('jsonwebtoken');
const axios = require('axios'); // axios 추가
const router = express.Router();

const key = {
    apiKey: process.env.API_KEY,
    uuid: '36f77065-60fa-4b4a-90db-f2a02be13f34'
};

router.post('/api/kakao/:apikey', async (req, res) => {
    const { code } = req.body;

    try {
        const { apikey } = req.params;
        // 카카오 Access Token 요청
        const tokenResponse = await axios.post(`https://kauth.kakao.com/oauth/token`, null, {
            params: {
                grant_type: 'authorization_code',
                client_id: '93513cf3a9d97f46448330edfe47e62e', // REST API KEY
                redirect_uri: 'http://localhost:3000/auth/call',
                code: code
            }
        });

        const accessToken = tokenResponse.data.access_token;

        // 사용자 정보 요청
        const userInfoResponse = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        res.json(userInfoResponse.data); // 사용자 정보 응답
    } catch (error) {
        console.error('Error getting user info from Kakao:', error);
        res.status(500).json({ error: 'Failed to get user info' });
    }
});

// 사용자 생성 (POST /users)
router.post('/:apikey', async (req, res) => {
    try {
        const { apikey } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const { name, baseball_team_name, image_url } = req.body;
        const user = await User.create({ name, baseball_team_name, image_url });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

// 로그인 (POST /login)
router.post('/login', async (req, res) => {
    const { name } = req.body;

    try {
        const user = await User.findOne({ where: { name } });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // JWT 발급
        const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 모든 사용자 조회 (GET /users)
router.get('/:apikey', async (req, res) => {
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

router.get('/:apikey/:id', async (req, res) => {
    try {
        const { apikey, id } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }
        const users = await User.findByPk(req.params.id);

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 사용자 업데이트 (PUT /users/:id)
router.put('/:apikey/:id', async (req, res) => {
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
router.delete('/:apikey/:id', async (req, res) => {
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
