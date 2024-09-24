const express = require('express');
const uuidAPIKey = require('uuid-apikey');
const FoodShop = require('../models/food_shop_model.js')(require('../config/db'));
const FoodShopMenu = require('../models/food_shop_menu_model.js')(require('../config/db'));

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

        const menu = await FoodShopMenu.findAll({});

        if (menu.length > 0) {
            res.status(200).json(menu);
        } else {
            res.status(404).send('No food shops found.');
        }
    } catch (error) {
        console.error('Error fetching food shops:', error);
        res.status(500).send('Failed to fetch food shops');
    }
});


// 특정 음식점 모든 메뉴 조회
router.get('/:apikey/:id', async (req, res) => {
    try {
        const { apikey, id } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const menu = await FoodShopMenu.findAll({
            where: { shopId: id }
        });

        if (menu.length > 0) {
            res.status(200).json(menu);
        } else {
            res.status(404).send('No food shops found.');
        }
    } catch (error) {
        console.error('Error fetching food shops:', error);
        res.status(500).send('Failed to fetch food shops');
    }
});

// 특정 음식점 카테고리별 메뉴 조회
router.get('/:apikey/:id/:cate', async (req, res) => {
    try {
        const { apikey, id, cate } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const menus = await FoodShopMenu.findAll({
            where: { shopId: id }
        });
        
        const menu = menus.filter(menu => menu.category === cate);

        if (menu) {
            res.status(200).json(menu);
            
        } else {
            res.status(404).send('Food shop not found.');
        }
    } catch (error) {
        console.error('Error fetching food shop:', error);
        res.status(500).send('Failed to fetch food shop');
    }
});

module.exports = router;
