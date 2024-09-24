// routes/food_shop_api.js

const express = require('express');
const uuidAPIKey = require('uuid-apikey');
const FoodShop = require('../models/food_shop_model.js')(require('../config/db'));
const FoodShopMenu = require('../models/food_shop_menu_model.js')(require('../config/db'));
const FoodShopReview = require('../models/food_shop_review_model.js')(require('../config/db'));

const router = express.Router();

const key = {
    apiKey: process.env.API_KEY,
    uuid: '36f77065-60fa-4b4a-90db-f2a02be13f34'
};

// 모든 음식점을 조회하는 API
router.get('/:apikey', async (req, res) => {
    try {
        const { apikey } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        // 모든 음식점 정보 조회
        const foodShops = await FoodShop.findAll();

        for (const foodShop of foodShops) {
            const foodShopMenuList = await FoodShopMenu.findAll({ where: { shop_id: foodShop.id } });
            foodShop.menu = foodShopMenuList;

            // 리뷰 평균 계산
            const reviews = await FoodShopReview.findAll({ where: { shopId: foodShop.id } });
            if (reviews.length > 0) {
                const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
                const averageRating = totalRating / reviews.length;
                foodShop.star = averageRating; // 평균 평점을 star 컬럼에 설정
            } else {
                foodShop.star = 0; // 리뷰가 없으면 0으로 설정
            }
        }

        if (foodShops.length > 0) {
            res.status(200).json(foodShops);
        } else {
            res.status(404).send('No food shops found.');
        }
    } catch (error) {
        console.error('Error fetching food shops:', error);
        res.status(500).send('Failed to fetch food shops');
    }
});

// 특정 음식점을 ID로 조회하는 API
router.get('/:apikey/:id', async (req, res) => {
    try {
        const { apikey, id } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        // 특정 음식점 정보 조회
        const foodShop = await FoodShop.findByPk(id);
        const shop_id = id;
        const foodShopMenuList = await FoodShopMenu.findAll({where: {shop_id}});

        // 리뷰 평균 계산
        const reviews = await FoodShopReview.findAll({ where: { shop_id } });
        if (reviews.length > 0) {
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = totalRating / reviews.length;
            foodShop.star = averageRating; // 평균 평점을 star 컬럼에 설정
        } else {
            foodShop.star = 0; // 리뷰가 없으면 0으로 설정
        }

        if (foodShop) {
            foodShop.menu = foodShopMenuList;
            res.status(200).json(foodShop);
        } else {
            res.status(404).send('Food shop not found.');
        }
    } catch (error) {
        console.error('Error fetching food shop:', error);
        res.status(500).send('Failed to fetch food shop');
    }
});

// 특정 홈구장에 속한 음식점을 조회하는 API
router.get('/:apikey/homeground/:homeground', async (req, res) => {
    try {
        const { apikey, homeground } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        // 특정 홈구장에 속한 음식점 정보 조회
        const foodShops = await FoodShop.findAll({
            where: { homeground: homeground }
        });

        for (const foodShop of foodShops) {
            const foodShopMenuList = await FoodShopMenu.findAll({ where: { shop_id: foodShop.id } });
            foodShop.menu = foodShopMenuList;

            // 리뷰 평균 계산
            const reviews = await FoodShopReview.findAll({ where: { shop_id: foodShop.id } });
            if (reviews.length > 0) {
                const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
                const averageRating = totalRating / reviews.length;
                foodShop.star = averageRating; // 평균 평점을 star 컬럼에 설정
            } else {
                foodShop.star = 0; // 리뷰가 없으면 0으로 설정
            }
        }

        if (foodShops.length > 0) {
            res.status(200).json(foodShops);
        } else {
            res.status(404).send('No food shops found for the specified homeground.');
        }
    } catch (error) {
        console.error('Error fetching food shops by homeground:', error);
        res.status(500).send('Failed to fetch food shops by homeground');
    }
});

module.exports = router;
