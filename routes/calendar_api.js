/* 캘린더 api */
const express = require('express');
const uuidAPIKey = require('uuid-apikey');
const Calendar = require('../models/calendar_model.js')(require('../config/db'));

const router = express.Router();

const key = {
    apiKey: process.env.API_KEY,
    uuid: '36f77065-60fa-4b4a-90db-f2a02be13f34'
};

// API 키 검증 미들웨어
const apiKeyValidationMiddleware = (req, res, next) => {
    const { apikey } = req.params;
 
    // API 키 검증
    if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
      return res.status(401).send('API key is not valid.');
    }
 
    // 검증 통과 시 다음 미들웨어로 이동
    next();
  };


// 날짜와 메모를 추가
router.post('/:apikey/calendar', async (req, res) => {
  const { date, note } = req.body;
  try {
    const newEntry = await Calendar.create({ date, note });
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: 'Error creating entry' });
  }
});


// 특정 날짜의 메모 조회
router.get('/:apikey/calendar/:date', apiKeyValidationMiddleware, async (req, res) => {
  const { date } = req.params;
  try {
    const entry = await Calendar.findOne({ where: { date } });
    if (entry) {
      res.json(entry);
    } else {
      res.status(404).json({ error: 'Entry not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching entry' });
  }
});


// 특정 날짜의 메모 업데이트
router.put('/:apikey/calendar/:date', apiKeyValidationMiddleware, async (req, res) => {
  const { date } = req.params;
  const { note } = req.body;
  try {
    const entry = await Calendar.findOne({ where: { date } });
    if (entry) {
      entry.note = note;
      await entry.save();
      res.json(entry);
    } else {
      res.status(404).json({ error: 'Entry not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating entry' });
  }
});


// 특정 날짜의 메모 삭제
router.delete('/:apikey/calendar/:date', apiKeyValidationMiddleware, async (req, res) => {
  const { date } = req.params;
  try {
    const deleted = await Calendar.destroy({ where: { date } });
    if (deleted) {
      res.json({ message: 'Entry deleted' });
    } else {
      res.status(404).json({ error: 'Entry not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting entry' });
  }
});


// app.js에서 사용할 수 있도록 내보냄
module.exports = router;

