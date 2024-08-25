/* 홈구장 정보 api */
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
        if(type == '삼성 라이온즈'){     
            let data = [
                {name : "대구 삼성 라이온즈파크", homeground_station : "대공원역 5번 출구", homeground_location : "대구 수성구", homeground_seatingplan_image_url : ""}
            ];
            res.send(data);
        }else if(type == '한화 이글스'){
            let data = [
                {name : "대전 한화생명 이글스파크", homeground_station : "보문오거리 정류장", homeground_location : "대전 중구", homeground_seatingplan_image_url : ""}
            ];
            res.send(data);
        }else if(type == '두산 베어스'){
            let data = [
                {name : "서울종합운동장 야구장", homeground_station : "종합운동작역 5번 출구", homeground_location : "서울 송파구", homeground_seatingplan_image_url : ""}
            ];
            res.send(data);
        }else if(type == 'LG 트윈스'){
            let data = [
                {name : "서울종합운동장 야구장", homeground_station : "종합운동작역 5번 출구", homeground_location : "서울 송파구", homeground_seatingplan_image_url : ""}
            ];
            res.send(data);
        }else if(type == 'KIA 타이거즈'){
            let data = [
                {name : "광주 기아 챔피언스 필드", homeground_station : "광주기아챔피언스필드 정류장", homeground_location : "광주 북구", homeground_seatingplan_image_url : ""}
            ];
            res.send(data);
        }else if(type == '롯데 자이언츠'){
            let data = [
                {name : "사직 야구장", homeground_station : "종합운동장역 9번 출구", homeground_location : "부산 동래구", homeground_seatingplan_image_url : ""}
            ];
            res.send(data);
        }else if(type == '키움 히어로즈'){
            let data = [
                {name : "고척 스카이돔", homeground_station : "구일역 2번 출구", homeground_location : "서울 구로구", homeground_seatingplan_image_url : ""}
            ];
            res.send(data);
        }else if(type == 'SSG 랜더스'){
            let data = [
                {name : "인천 SSG 랜더스 필드", homeground_station : "문학경기장역 1번 출구", homeground_location : "인천 미추홀구", homeground_seatingplan_image_url : ""}
            ];
            res.send(data);
        }else if(type == 'NC 다이노스'){
            let data = [
                {name : "창원 NC 파크", homeground_station : "문화방송 정류장", homeground_location : "경남 창원시 마산", homeground_seatingplan_image_url : ""}
            ];
            res.send(data);
        }else if(type == 'kt wiz'){
            let data = [
                {name : "수원 케이티 위즈 파크", homeground_station : "수원KT위즈파크.경기도청소년활동진흥상담복지센터 정류장", homeground_location : "경기 수원시 장안구", homeground_seatingplan_image_url : ""}
            ];
            res.send(data);
        }else{
            res.send('Type is not correct.');
        }
    }
});

// app.js에서 사용할 수 있도록 내보냄
module.exports = router;