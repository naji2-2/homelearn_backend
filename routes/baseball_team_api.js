/* 구단 정보 api */
const express = require('express');
const uuidAPIKey = require('uuid-apikey');

const router = express.Router();

//console.log(uuidAPIKey.create());

const key = {
    apiKey: process.env.API_KEY,
    uuid: '36f77065-60fa-4b4a-90db-f2a02be13f34'
}

router.get('/:apikey/:type', async(req, res) =>{
    console.log('Received request with:', req.params);
    let {apikey, type} = req.params;
    if(!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
        res.send('apikey is not valid.');
    }else {
        if(type == '삼성 라이온즈'){     
            let data = [
                {image_url : "https://vo.la/fYOHAQ", foundation_date : "1982.03.02", hometown : "대구광역시", homeground : "대구 삼성 라이온즈파크"}
            ];
            res.send(data);
        }else if(type == '한화 이글스'){
            let data = [
                {image_url : "https://vo.la/YLVXGi", foundation_date : "1986.03.08", hometown : "대전광역시", homeground : "대전 한화생명 이글스파크"}
            ];
            res.send(data);
        }else if(type == '두산 베어스'){
            let data = [
                {image_url : "https://vo.la/EdIdiK", foundation_date : "1982.01.15", hometown : "서울특별시", homeground : "서울종합운동장 야구장"}
            ];
            res.send(data);
        }else if(type == 'LG 트윈스'){
            let data = [
                {image_url : "https://vo.la/HtUIYQ", foundation_date : "1982.01.26", hometown : "서울특별시", homeground : "서울종합운동장 야구장"}
            ];
            res.send(data);
        }else if(type == 'KIA 타이거즈'){
            let data = [
                {image_url : "https://vo.la/PFlcvv", foundation_date : "1982.01.30", hometown : "광주광역시", homeground : "광주 기아 챔피언스 필드"}
            ];
            res.send(data);
        }else if(type == '롯데 자이언츠'){
            let data = [
                {image_url : "https://vo.la/HUwkJY", foundation_date : "1975.05.06", hometown : "부산광역시", homeground : "사직 야구장"}
            ];
            res.send(data);
        }else if(type == '키움 히어로즈'){
            let data = [
                {image_url : "https://vo.la/vkPkZq", foundation_date : "2008.03.04", hometown : "서울특별시", homeground : "고척 스카이돔"}
            ];
            res.send(data);
        }else if(type == 'SSG 랜더스'){
            let data = [
                {image_url : "https://vo.la/JLgSPh", foundation_date : "2000.03.31", hometown : "인천광역시", homeground : "인천 SSG 랜더스 필드"}
            ];
            res.send(data);
        }else if(type == 'NC 다이노스'){
            let data = [
                {image_url : "https://vo.la/fCNSdY", foundation_date : "2011.03.31", hometown : "경상남도 창원시", homeground : "창원 NC 파크"}
            ];
            res.send(data);
        }else if(type == 'kt wiz'){
            let data = [
                {image_url : "https://vo.la/ByOOYL", foundation_date : "2013.01.17", hometown : "경기도 수원시", homeground : "수원 케이티 위즈 파크"}
            ];
            res.send(data);
        }else{
            res.send('Type is not correct.');
        }
    }
});

// app.js에서 사용할 수 있도록 내보냄
module.exports = router;