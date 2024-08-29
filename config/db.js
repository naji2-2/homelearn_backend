require('dotenv').config();

const { Sequelize } = require('sequelize');

// Sequelize 인스턴스 생성 (MySQL 연결 설정)
const sequelize = new Sequelize('homelearn', 'root', process.env.MYSQL_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // SQL 쿼리 로그를 보려면 true로 설정
});

// 모델 가져오기
const BaseballCommunityPost = require('../models/baseball_community_post_model.js')(sequelize);
const FoodShop = require('../models/food_shop_model.js')(sequelize);

const syncModels = async () => {
    try {
        await sequelize.authenticate(); // 데이터베이스 연결 확인
        console.log('데이터베이스 연결 성공');

        // 테이블이 없으면 새로 생성하고, 있으면 삭제하고 새로 생성
        await sequelize.sync({ alter: true });
        console.log('모델 동기화 성공');
    } catch (err) {
        console.error('모델 동기화 실패:', err);
    }
};
syncModels();

module.exports = sequelize;