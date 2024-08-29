//const FoodShop = require('../models/food_shop_model'); // FoodShop 모델 불러오기
const initializeFoodShops = require('./food_shop_db');

const initializeData = async () => {
    try {
        // Initialize FoodShops
        await initializeFoodShops(); 
    } catch (error) {
        console.error('Error initializing data:', error);
    }
};

module.exports = initializeData;
