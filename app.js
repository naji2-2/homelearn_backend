const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

// dotenv 설정
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

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
const { router: billboardRoutes, setSocketIo } = require('./routes/baseball_community_billboard_api.js'); // 전광판 라우터 불러오기
const Calendar = require('./routes/calendar_api');

// CORS 설정
app.use(cors());
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
app.use('/api/postcomment', BaseballCommunityPostComment);
app.use('/api/foodshop', FoodShop);
app.use('/api/foodshoporder', FoodShopOrder);
app.use('/api/foodshopreview', FoodShopReview);
app.use('/api/cheersong', CheerSong);
app.use('/api/dictionary', BaseballDictionary);
app.use('/api/game', BaseballGame);
app.use('/api/teammember', BaseballTeamMember);
app.use('/api/billboard', billboardRoutes); // 전광판 라우터 연결
app.use('/api/calendar', Calendar);

// Socket.IO 설정
setSocketIo(io); // Socket.IO와 전광판 라우터 연결

// 기본 라우터
app.get('/', (req, res) => {
    res.send('Hello, Express');
});

// 서버 실행
const port = app.get('port');

server.listen(port, async () => {
    try {
        console.log(`${port}번 포트에서 대기 중`);
    } catch (error) {
        console.error('Error during initialization:', error);
        process.exit(1);
    }
});
