require('dotenv').config();

const { Sequelize } = require('sequelize');

// Sequelize 인스턴스 생성 (MySQL 연결 설정)
const sequelize = new Sequelize('homelearn', 'root', process.env.MYSQL_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // SQL 쿼리 로그를 보려면 true로 설정
});

// 모델 가져오기
const FoodShop = require('../models/food_shop_model.js')(sequelize);
const BaseballHomegroundInfo = require('../models/baseball_homeground_info_model.js')(sequelize);
const BaseballTeam = require('../models/baseball_team_model.js')(sequelize);
const BaseballCommunityPost = require('../models/baseball_community_post_model.js')(sequelize);
const BaseballCommunityPostComment = require('../models/baseball_community_post_comment_model.js')(sequelize);
const FoodShopMenu = require('../models/food_shop_menu_model.js')(sequelize);
const FoodShopReview = require('../models/food_shop_review_model.js')(sequelize);
const FoodShopOrder = require('../models/food_shop_order_model.js')(sequelize);
const FoodShopOrderDetail = require('../models/food_shop_order_detail_model.js')(sequelize);
const BaseballHomegroundParking = require('../models/baseball_homeground_parking_model.js')(sequelize);
const CheerSong = require('../models/cheer_song_model.js')(sequelize);
const User = require('../models/user_model.js')(sequelize);
const BaseballGameSchedule = require('../models/baseball_game_schedule_model.js')(sequelize);
const BaseballTeamMember = require('../models/baseball_team_member_model.js')(sequelize);
const BaseballDictionary = require('../models/baseball_dictionary_model.js')(sequelize);

const syncModels = async () => {
    try {
        await sequelize.authenticate(); // 데이터베이스 연결 확인
        console.log('데이터베이스 연결 성공');

        // 모델 순서대로 동기화
        await BaseballTeam.sync({ alter: true });
        await User.sync({ alter: true });
        await FoodShop.sync({ alter: true });
        await BaseballHomegroundInfo.sync({ alter: true });
        await BaseballCommunityPost.sync({ alter: true });
        await BaseballCommunityPostComment.sync({ alter: true });
        await FoodShopMenu.sync({ alter: true });
        await FoodShopReview.sync({ alter: true });
        await FoodShopOrder.sync({ alter: true });
        await FoodShopOrderDetail.sync({ alter: true });
        await BaseballHomegroundParking.sync({ alter: true });
        await CheerSong.sync({ alter: true });
        await BaseballGameSchedule.sync({ alter: true });
        await BaseballTeamMember.sync({ alter: true });
        await BaseballDictionary.sync({ alter: true });

        console.log('모델 동기화 성공');
    } catch (err) {
        console.error('모델 동기화 실패:', err);
    }
};
syncModels();


module.exports = sequelize;