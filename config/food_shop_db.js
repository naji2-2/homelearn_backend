// initializeFoodShops.js
const sequelize = require('./db');
const defineFoodShop = require('../models/food_shop_model'); // FoodShop 모델

const initializeFoodShops = async () => {
    try {
        const FoodShop = defineFoodShop(sequelize);

        // 현재 테이블의 데이터 row 수 가져오기
        var existingShopCount = await FoodShop.count();

        const foodShopData = [
            {
                name: 'Pizza Palace',
                homeground: '서울종합운동장 야구장',
                category: 'Pizza',
                menu: JSON.stringify([
                    { item_name: 'Pepperoni Pizza', price: 12.99, description: 'A classic pizza topped with pepperoni.' },
                    { item_name: 'Veggie Pizza', price: 10.99, description: 'A healthy pizza loaded with fresh vegetables.' }
                ]),
                today_order: 0,
                star: 0,
                location: '123 Pizza Street'
            },
            {
                name: 'Burger Haven',
                homeground: '대전 한화생명 이글스파크',
                category: 'Burgers',
                menu: JSON.stringify([
                    { item_name: 'Cheeseburger', price: 8.99, description: 'A juicy cheeseburger with all the fixings.' },
                    { item_name: 'Veggie Burger', price: 7.99, description: 'A delicious vegetarian burger alternative.' }
                ]),
                today_order: 0,
                star: 0,
                location: '456 Burger Avenue'
            }
        ];

        console.log("테이블 내 데이터 : ", existingShopCount);
        console.log("현재 데이터 : ",  foodShopData.length);

        if (existingShopCount == foodShopData.length) {
            console.log('FoodShops already initialized.');
            return; // 추가된 데이터가 없으면 초기화하지 않기
        }

        await FoodShop.destroy({ where: {}, delete: true }); // 테이블 데이터 초기화
        await FoodShop.bulkCreate(foodShopData);    // 데이터 삽입

        existingShopCount = await FoodShop.count();
        console.log("초기화 후 테이블 내 데이터 : ", existingShopCount);
    } catch (error) {
        console.error('Error initializing FoodShops data:', error);
        throw error;
    }
}

module.exports = initializeFoodShops;
