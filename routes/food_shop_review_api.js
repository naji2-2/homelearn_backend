const express = require('express');
const uuidAPIKey = require('uuid-apikey');
const sequelize = require('../config/db');
const FoodShopReview = require('../models/food_shop_review_model.js')(sequelize);
const FoodShop = require('../models/food_shop_model.js')(sequelize);

const router = express.Router();

const key = {
    apiKey: process.env.API_KEY,
    uuid: '36f77065-60fa-4b4a-90db-f2a02be13f34'
};
router.get('/:apikey', async (req, res) => {
    try {
        const { apikey, id } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const review = await FoodShopReview.findAll();

        if (review) {
            res.status(200).json(review);
        } else {
            res.status(404).json({ error: '리뷰를 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '리뷰 조회 중 오류가 발생했습니다.' });
    }
});


router.get('/:apikey/:id', async (req, res) => {
    try {
        const { apikey, id } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const review = await FoodShopReview.findAll({
            where: { shopId: id }
        });

        if (review) {
            res.status(200).json(review);
        } else {
            res.status(404).json({ error: '리뷰를 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '리뷰 조회 중 오류가 발생했습니다.' });
    }
});


// 리뷰 생성
router.post('/:apikey', async (req, res) => {
    try {
        let { apikey } = req.params;
        const { shopId, userId, content, rating, image_url } = req.body;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        // 필수 필드 확인
        if (!userId || !content || !rating || !shopId) {
            return res.status(400).json({ error: 'userId와 content는 필수 항목입니다.' });
        }

        // 리뷰 생성
        const review = await FoodShopReview.create({ userId, shopId, content, rating, image_url });


        // 모든 리뷰 가져오기
        const reviews = await FoodShopReview.findAll({ where: { shopId } });
        // 평균 별점 계산
        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
        const averageRating = totalRating / reviews.length;
        // FoodShop의 star 업데이트
        await FoodShop.update({ star: averageRating }, { where: { id: shopId } });

        

        // 생성된 리뷰 반환
        res.status(201).json(review);
    } catch (error) {
        console.log(error);
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

        const shopId = review.shopId;

        // 리뷰 삭제
        await review.destroy();

        // 남아 있는 리뷰로 별점 재계산
        const reviews = await FoodShopReview.findAll({ where: { shopId } });
        let averageRating = 0;

        if (reviews.length > 0) {
            const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
            averageRating = totalRating / reviews.length;
        }

        // 가게의 평균 별점 업데이트
        await FoodShop.update({ star: averageRating }, { where: { id: shopId } });


        res.status(204).send();  // 성공적으로 삭제되었음을 알리기 위해 204 상태 코드 반환
    } catch (error) {
        // 오류 처리
        res.status(500).json({ error: '리뷰 삭제에 실패했습니다.' });
    }
});

module.exports = router;