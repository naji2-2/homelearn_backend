const express = require('express');
const uuidAPIKey = require('uuid-apikey');
const FoodShopReview = require('../models/food_shop_review_model.js')(require('../config/db'));

const router = express.Router();

const key = {
    apiKey: process.env.API_KEY,
    uuid: '36f77065-60fa-4b4a-90db-f2a02be13f34'
};


// 리뷰 생성
router.post('/:apikey', async (req, res) => {
    try {
        let { apikey } = req.params;
        const { userId, content, rating, image_url } = req.body;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        // 필수 필드 확인
        if (!userId || !content || !rating) {
            return res.status(400).json({ error: 'userId와 content는 필수 항목입니다.' });
        }

        // 리뷰 생성
        const review = await FoodShopReview.create({ userId, content, rating, image_url });

        // 생성된 리뷰 반환
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: '리뷰 생성에 실패했습니다.' });
    }
});

// 리뷰 삭제
router.delete('/:apikey/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // 리뷰 검색
        const review = await FoodShopReview.findByPk(id);

        if (!review) {
            return res.status(404).json({ error: '리뷰를 찾을 수 없습니다.' });
        }

        // 리뷰 삭제
        await review.destroy();
        res.status(204).send();  // 성공적으로 삭제되었음을 알리기 위해 204 상태 코드 반환
    } catch (error) {
        // 오류 처리
        res.status(500).json({ error: '리뷰 삭제에 실패했습니다.' });
    }
});

module.exports = router;