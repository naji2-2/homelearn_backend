const express = require('express');
const multer = require('multer');
const path = require('path');
const uuidAPIKey = require('uuid-apikey');
const fs = require('fs'); // fs 모듈 추가

const router = express.Router();

const key = {
    apiKey: process.env.API_KEY,
    uuid: '36f77065-60fa-4b4a-90db-f2a02be13f34'
};

// 전광판 데이터 저장 변수
let billboard = {
    image: null,
    text: ''
};

// multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads')); // 이미지 저장 경로
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`); // 파일 이름 설정
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Error: File type not supported!'));
    },
});

// 전광판 업데이트 API (이미지 + 글)
router.post('/update/:apikey', upload.single('image'), (req, res) => {
    const { apikey } = req.params;

    // API 키 검증
    if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
        return res.status(401).send('apikey is not valid.');
    }

    const text = req.body.text;
    const image = req.file ? `../public/uploads/${req.file.filename}` : null;

    // 기존 이미지 삭제
    if (billboard.image) {
        const oldImagePath = path.join(__dirname, '../public', billboard.image);
        fs.unlink(oldImagePath, (err) => {
            if (err) {
                console.error('Error deleting old image:', err);
            }
        });
    }

    // 전광판 데이터 업데이트
    billboard = { image, text };

    // 모든 클라이언트에 업데이트된 전광판 데이터 전송
    if (io) {
        io.emit('update_billboard', billboard);
    }

    // 응답
    res.status(200).json({
        message: 'Billboard updated successfully',
        billboard,
    });
});

// 전광판 현재 상태 가져오기 API
router.get('/:apikey', (req, res) => {
    const { apikey } = req.params;

    // API 키 검증
    if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
        return res.status(401).send('apikey is not valid.');
    }

    res.status(200).json(billboard);
});

// Socket.IO 연결 설정
let io;

const setSocketIo = (socketIo) => {
    io = socketIo; // io 객체 저장

    io.on('connection', (socket) => {
        console.log('A user connected');
        socket.emit('update_billboard', billboard); // 현재 전광판 데이터 전송

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
};

// 모듈 내보내기
module.exports = { router, setSocketIo };
