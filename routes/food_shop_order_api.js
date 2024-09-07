const express = require('express');
const uuidAPIKey = require('uuid-apikey');
const sequelize = require('../config/db');
const FoodShopOrder = require('../models/food_shop_order_model')(sequelize);
const FoodShopOrderDetail = require('../models/food_shop_order_detail_model')(sequelize);

const router = express.Router();

const key = {
    apiKey: process.env.API_KEY,
    uuid: '36f77065-60fa-4b4a-90db-f2a02be13f34'
};

// 주문 생성 API
router.post('/:apikey', async (req, res) => {
    try {

        let { apikey } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const { userId, shopId, phoneNumber, detail } = req.body;

        const orderDetails = detail;

        // 1. totalPrice 계산 (각 메뉴의 가격 * 수량의 합)
        const totalPrice = orderDetails.reduce((total, item) => {
            return total + (item.price * item.amount);
        }, 0);

        // 2. FoodShopOrder에 먼저 데이터를 저장
        const newOrder = await FoodShopOrder.create({
            userId,
            shopId,
            phoneNumber,
            detail,
            totalPrice,
        });

        // 3. FoodShopOrderDetail에 각 메뉴별로 데이터를 저장
        const orderDetailPromises = orderDetails.map(item => {
            return FoodShopOrderDetail.create({
                foodOrderId: newOrder.id, // 방금 생성된 주문의 ID를 참조
                menu_name: item.menu_name,
                amount: item.amount,
                price: item.price,
            });
        });

        // 모든 FoodShopOrderDetail 저장이 완료될 때까지 대기
        await Promise.all(orderDetailPromises);

        res.status(201).json({ message: 'Order created successfully', orderId: newOrder.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create order' });
    }
});

// 주문 삭제 API
router.delete('/:apikey/:id', async (req, res) => {

    try {

        let { apikey } = req.params;
        const orderId = req.params.id;
        
        // 1. 해당 주문이 존재하는지 확인
        const order = await FoodShopOrder.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // 2. 관련된 FoodShopOrderDetail 삭제
        await FoodShopOrderDetail.destroy({
            where: { foodOrderId: orderId }
        });

        // 3. FoodShopOrder 삭제
        await FoodShopOrder.destroy({
            where: { id: orderId }
        });

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete order' });
    }
});


module.exports = router;
