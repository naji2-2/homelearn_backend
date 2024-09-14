const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
//설치한 미들웨어 및 모듈  불러오기
dotenv.config();

const app = express();

// 라우터 설정
const BaseballTeam = require('./routes/baseball_team_api');
const BaseballHomegroundInfoRouter = require('./routes/baseball_homeground_info_api');
const BaseballCommunityPost = require('./routes/baseball_community_post_api');
const BaseballCommunityPostComment = require('./routes/baseball_community_post_comment_api');
const BaseballHomegroundParkingRouter = require('./routes/baseball_homeground_parking_api');
const FoodShop = require('./routes/food_shop_api');
const FoodShopOrder = require('./routes/food_shop_order_api');
const FoodShopReview = require('./routes/food_shop_review_api');
const CheerSong = require('./routes/cheer_song_api');
const BaseballDictionary = require('./routes/baseball_dictionary_api');
const BaseballGame = require('./routes/baseball_game_schedule_api');
const BaseballTeamMember = require('./routes/baseball_team_member_api');

app.use(cors());

app.set('port', process.env.PORT || 3000); // 3000 대신 3001

//app.set('port,포트) : 서버가 실행될 포트 설정

app.use(morgan('dev'));
app.use('/',express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));


// routes 만든 라우터 불러오기
app.use('/api/team', BaseballTeam);
app.use('/api/homeground', BaseballHomegroundInfoRouter);
app.use('/api/homegroundparking', BaseballHomegroundParkingRouter);
app.use('/api/post', BaseballCommunityPost);
app.use('/api/post/comment', BaseballCommunityPostComment);
app.use('/api/foodshop', FoodShop);
app.use('/api/foodshoporder', FoodShopOrder);
app.use('/api/foodshopreview', FoodShopReview);
app.use('/api/cheersong', CheerSong);
app.use('/api/dictionary', BaseballDictionary)
app.use('/api/game', BaseballGame);
app.use('/api/teammember', BaseballTeamMember);



app.get('/',(req,res)=>{
    res.send('Hello, Express');
});
/*app.get(주소, 라우터) : 주소에 대한 GET요청이 올 때 어떤 동작을 할지 적는 부분
ex) app.post, app.patch, app.put, app.delete, app.options
express에서는 http와 다르게 res.write, rew.end 대신 res.send 사용
**/


const port = app.get('port'); // 설정된 포트 가져오기

app.listen(port, async () => {
    try {
        //await initializeData(); // 데이터베이스 초기화
        //await syncDatabase(); // 수정: 데이터베이스 동기화 추가
        console.log(`${port}번 포트에서 대기 중`);
    } catch (error) {
        console.error('Error during initialization:', error);
        process.exit(1); // 초기화 실패 시 프로세스 종료
    }
});