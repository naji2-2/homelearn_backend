const puppeteer = require('puppeteer');
const BaseballGameSchedule = require('../models/baseball_game_schedule_model')(require('../config/db'));

// 팀 이름과 점수를 추출하는 함수
// KBO 경기 크롤링 함수
async function scrapeKBOGames() {
    // 브라우저를 헤드리스 모드로 실행
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // KBO 경기 일정 페이지로 이동
    await page.goto('https://www.koreabaseball.com/Schedule/Schedule.aspx', {
        waitUntil: 'domcontentloaded',
    });

    // DOM이 로드될 때까지 기다림
    await page.waitForSelector('table tbody tr');

    // 데이터 추출
    const games = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('table tbody tr'));
        let currentDay = ''; // 현재 날짜를 저장할 변수

        return rows.map(row => {
            // 각 요소에 대해 null 체크 후 데이터 추출
            const dateElement = row.querySelector('td.day');
            const teamsElement = row.querySelector('td.play');
            const timeElement = row.querySelector('td.time');

            // 날짜 셀이 있으면 현재 날짜를 업데이트
            if (dateElement) {
                currentDay = dateElement.innerText.trim();
            }

            // 날짜가 없는 경우, 마지막으로 저장된 날짜를 사용
            const date = currentDay;
            const time = timeElement ? timeElement.innerText.trim() : 'N/A';

            let team_home = 'N/A';
            let team_away = 'N/A';

            if (teamsElement) {
                const teamNames = Array.from(teamsElement.querySelectorAll('span'))
                    .filter(span => !span.classList.contains('win') && !span.classList.contains('lose'))
                    .map(span => span.innerText.trim());
                
                team_away = teamNames[0]; // 첫 번째 팀 (홈팀)
                for(i=1; i<teamNames.length; i++){
                    if(teamNames[i]==='vs') continue;
                    team_home = teamNames[i];
                }
            }

            return { date, time, team_home, team_away };
        });
    });

    await browser.close();

    // 추출한 게임 데이터를 DB에 저장
    for (const game of games) {
        await saveKBOGameToDB(game);
    }

    return games;
}

// DB에 저장하는 함수
async function saveKBOGameToDB(game) {
    const { date, team_home, team_away, time } = game;

    if (!team_home || !team_away) {
        console.error('팀 정보가 잘못되었습니다:', { team_home, team_away });
        return;
    }

    try {
        await BaseballGameSchedule.create({
            game_date: date,
            team_home: team_home.trim(),
            team_away: team_away.trim(),
            game_time: time || 'N/A',
        });
        console.log(`경기 저장 완료: ${team_home.trim()} vs ${team_away.trim()}`);
    } catch (error) {
        console.error('경기 저장 중 오류:', error);
    }
}

module.exports = {
    scrapeKBOGames,
};
