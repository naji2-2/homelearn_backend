const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const api = require('./api.js');
const cors = require('cors');
//설치한 미들웨어 및 모듈  불러오기
dotenv.config();

const app = express();

// routes 만든 라우터 불러오기
const BaseballTeamRouter = require('./routes/baseball_team_api');
const BaseballHomegroundInfoRouter = require('./routes/baseball_homeground_info_api');
const BaseballCommunityPostRouter = require('./routes/baseball_community_post_api');
const BaseballHomegroundParkingRouter = require('./routes/baseball_homeground_parking_api');

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


// app.use((req, res, next) => {
//     console.log('모든 요청에 다 실행됩니다.');
// });

app.use('/api/teams', BaseballTeamRouter);
app.use('/api/homegrounds', BaseballHomegroundInfoRouter);
app.use('/api/parking', BaseballHomegroundParkingRouter);
app.use('/api/posts', BaseballCommunityPostRouter);

app.get('/',(req,res)=>{
    res.send('Hello, Express');
});
/*app.get(주소, 라우터) : 주소에 대한 GET요청이 올 때 어떤 동작을 할지 적는 부분
ex) app.post, app.patch, app.put, app.delete, app.options
express에서는 http와 다르게 res.write, rew.end 대신 res.send 사용
**/


const port = app.get('port'); // 설정된 포트 가져오기
app.listen(port, () => {
    console.log(`${app.get('port')}번 포트에서 대기 중`);
});