const express = require('express');
const uuidAPIKey = require('uuid-apikey');

const router = express.Router();

const key = {
    apiKey: process.env.API_KEY,
    uuid: '36f77065-60fa-4b4a-90db-f2a02be13f34'
};

const { FoodShop } = require('C:/homelearn_backend/models/food_shop_db.js');

router.use('/:apikey', (req, res, next) => {
    const { apikey } = req.params;
    if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
        console.warn(`Invalid API key`);
    }
    next();
});


// CREATE: 새로운 음식점 추가
router.post('/:apikey', async (req, res) => {
    try {
        const foodShop = await FoodShop.create(req.body);
        res.status(201).json(foodShop);
    } catch (error) {
        console.error('음식점 생성 오류:', error);
        res.status(400).json({ error: '음식점 생성 중 오류가 발생했습니다.' });
    }
});

// READ: 모든 음식점 조회
router.get('/:apikey', async (req, res) => {
    try {
        const foodShops = await FoodShop.findAll();
        res.status(200).json(foodShops);
    } catch (error) {
        console.error('음식점 조회 오류:', error);
        res.status(500).json({ error: '음식점 조회 중 오류가 발생했습니다.' });
    }
});

// READ: 특정 음식점 조회 (ID 기준)
router.get('/:apikey/:id', async (req, res) => {
    try {
        const foodShop = await FoodShop.findByPk(req.params.id);
        if (foodShop) {
            res.status(200).json(foodShop);
        } else {
            res.status(404).json({ error: '음식점을 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error('음식점 조회 오류:', error);
        res.status(500).json({ error: '음식점 조회 중 오류가 발생했습니다.' });
    }
});

// UPDATE: 특정 음식점 정보 업데이트
router.put('/:apikey/:id', async (req, res) => {
    try {
        const foodShop = await FoodShop.findByPk(req.params.id);
        if (foodShop) {
            await foodShop.update(req.body);
            res.status(200).json(foodShop);
        } else {
            res.status(404).json({ error: '음식점을 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error('음식점 수정 오류:', error);
        res.status(400).json({ error: '음식점 수정 중 오류가 발생했습니다.' });
    }
});

// DELETE: 특정 음식점 삭제
router.delete('/:apikey/:id', async (req, res) => {
    try {
        const foodShop = await FoodShop.findByPk(req.params.id);
        if (foodShop) {
            await foodShop.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: '음식점을 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error('음식점 삭제 오류:', error);
        res.status(500).json({ error: '음식점 삭제 중 오류가 발생했습니다.' });
    }
});

module.exports = router;
