require('dotenv').config();

const { Sequelize } = require('sequelize');

// Sequelize 인스턴스 생성 (MySQL 연결 설정)
const sequelize = new Sequelize('homelearn', 'root', process.env.MYSQL_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // SQL 쿼리 로그를 보려면 true로 설정
});

// 데이터베이스 연결 확인
sequelize.authenticate()
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch(err => {
        console.error('데이터베이스 연결 실패:', err);
    });

// 모델 가져오기
const BaseballCommunityPost = require('./baseball_community_post_db.js')(sequelize);

// 모델 동기화
sequelize.sync({ alter: true }) 
    .then(() => {
        console.log('모델 동기화 성공');
    })
    .catch(err => {
        console.error('모델 동기화 실패:', err);
    });


module.exports = {
    sequelize,
    BaseballCommunityPost
};