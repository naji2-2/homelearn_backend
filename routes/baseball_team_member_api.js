const express = require('express');
const puppeteer = require('puppeteer');
const BaseballTeamService = require('../services/kboTeamMemberService'); // 서비스 불러오기
const uuidAPIKey = require('uuid-apikey');

const router = express.Router();

const key = {
    apiKey: process.env.API_KEY,
    uuid: '36f77065-60fa-4b4a-90db-f2a02be13f34'
};

// 선수 정보를 크롤링하는 함수
async function getPlayerInfo(req, res) {
    try {
        const { apikey } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('API key is not valid.');
        }

        // Puppeteer로 페이지 열기
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto('https://www.koreabaseball.com/Player/Search.aspx', { waitUntil: 'networkidle2' });

        // 페이지에서 선수 데이터 추출
        const players = await page.evaluate(() => {
            const playerList = [];
            document.querySelectorAll('.playerList .player').forEach(player => {
                playerList.push({
                    baseball_team_name: player.querySelector('.teamName') ? player.querySelector('.teamName').innerText.trim() : '',
                    class: 1,
                    back_number: player.querySelector('.backNumber') ? parseInt(player.querySelector('.backNumber').innerText.trim(), 10) : null,
                    name: player.querySelector('.name') ? player.querySelector('.name').innerText.trim() : '',
                    birth: player.querySelector('.birth') ? player.querySelector('.birth').innerText.trim() : '',
                    position: player.querySelector('.position') ? player.querySelector('.position').innerText.trim() : '',
                    join_date: player.querySelector('.joinDate') ? player.querySelector('.joinDate').innerText.trim() : '',
                    height: player.querySelector('.height') ? parseInt(player.querySelector('.height').innerText.trim(), 10) : null,
                    weight: player.querySelector('.weight') ? parseInt(player.querySelector('.weight').innerText.trim(), 10) : null,
                    instagram: '',  // 웹에서 제공되지 않는 정보
                    ceer_song: ''   // 웹에서 제공되지 않는 정보
                });
            });
            console.log('Extracted players:', playerList);
            return playerList;
        });

        await browser.close();

        // 서비스 계층을 통해 선수 정보 저장
        for (const playerData of players) {
            await BaseballTeamService.createOrUpdatePlayer(playerData);
        }

        return res.status(200).send('Player data successfully fetched and saved.');
    } catch (error) {
        console.error('Error while fetching player info:', error);
        return res.status(500).send('Error occurred while fetching player info.');
    }
}

router.get('/players/:apikey', getPlayerInfo);

module.exports = router;