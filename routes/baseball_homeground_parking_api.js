/* 홈구장 주차장 정보 api */
const express = require('express');
const uuidAPIKey = require('uuid-apikey');

const router = express.Router();


//console.log(uuidAPIKey.create());

const key = {
    apiKey: process.env.API_KEY,
    uuid: '36f77065-60fa-4b4a-90db-f2a02be13f34'
}

router.get('/:apikey/:type', async(req, res) =>{
    let {apikey, type} = req.params;
    if(!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
        res.send('apikey is not valid.');
    }else {
        if(type == '대구 삼성라이온즈 파크'){     
            let data = [
                {name : "달구벌시즌권전용주차장", parking_operating : "09시 ~ 경기 종료 후 2시간", parking_charge : "2000원/일"},
                {name : "전설로주차장", parking_operating : "09시 ~ 경기 종료 후 2시간", parking_charge : "2000원/일"}
            ];
            res.send(data);
        }else if(type == '대전 한화생명 이글스파크'){
            let data = [
                {name : "대전문창초등학교 운동장", parking_operating : "주말 및 공휴일 경기 기간 경기 시작 1시간 전 ~ ", parking_charge : "무료"},
                {name : "우리들 공원 지하주차장", parking_operating : "24시간 운영", parking_charge : "15000원/일"}
            ];
            res.send(data);
        }else if(type == '서울종합운동장 야구장'){
            let data = [
                {name : "잠실종합운동장 1·2·4·5 주차장", parking_operating : "24시간 운영", parking_charge : "200원/5분"},
                {name : "한강시민공원 잠실지구 주차장", parking_operating : "09시 ~ 21시", parking_charge : "3000원/일"}
            ];
            res.send(data);
        }else if(type == '광주 기아 챔피언스 필드'){
            let data = [
                {name : "광주 기아 챔피언스 필드 주차장", parking_operating : "24시간 운영", parking_charge : "무료"},
                {name : "임동 공영 주차장", parking_operating : "24시간 운영", parking_charge : "무료"}
            ];
            res.send(data);
        }else if(type == '사직 야구장'){
            let data = [
                {name : "부산 사직야구장 주차장", parking_operating : "0시 ~ 24시", parking_charge : "200/10분"},
            ];
            res.send(data);
        }else if(type == '고척 스카이돔'){
            let data = [
                {name : "동양미래대학교", parking_operating : "평일 08:00~23:00 주말 및 공휴일 08:00~행사종료후 모든차량 출차완료시까지", parking_charge : "500원/10분"},
                {name : "중앙유통단지", parking_operating : "24시간 운영", parking_charge : "1000원/30분"}
            ];
            res.send(data);
        }else if(type == '인천 SSG 랜더스필드'){
            let data = [
                {name : "인천 SSG 랜더스필드 주차장", parking_operating : "24시간 운영", parking_charge : "2000원/일"}
            ];
            res.send(data);
        }else if(type == '창원 NC 파크'){
            let data = [
                {name : "창원 NC 파크 & 마산 야구 센터 주차장", parking_operating : "경기 시작 전 1시간 ~ 경기 종료 후 1시간 ", parking_charge : "무료"},
                {name : "양덕 공영 주차장", parking_operating : "24시간 운영", parking_charge : "무료"}
            ];
            res.send(data);
        }else if(type == '수원 케이티 위즈 파크'){
            let data = [
                {name : " 수원 종합 운동장 부설 주차장", parking_operating : "024시간 운영", parking_charge : "3500/일"}
            ];
            res.send(data);
        }else{
            res.send('Type is not correct.');
        }
    }
});

// app.js에서 사용할 수 있도록 내보냄
module.exports = router;