const express = require('express');
const uuidAPIKey = require('uuid-apikey');
const sequelize = require('../config/db');
const FoodShopReview = require('../models/food_shop_review_model.js')(sequelize);
const FoodShop = require('../models/food_shop_model.js')(sequelize);
const multer = require('multer'); // multer 추가
const path = require('path');  // 경로 조작을 위해 추가

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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 파일 저장 폴더 설정
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // 고유 파일명 생성
    }
});

const upload = multer({ storage });

// 리뷰 생성
router.post('/:apikey', upload.single('image'), async (req, res) => {
    const { apikey } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }
        
    try {
        const { userId, shopId, content, rating } = req.body;
        const imageUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null; // 이미지 URL 생성

        // 데이터베이스에 리뷰 저장하는 로직 추가 (예: Sequelize 사용)
        const review = await FoodShopReview.create({ userId, shopId, content, rating, image_url: imageUrl });

        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create review.' });
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