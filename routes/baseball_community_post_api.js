const express = require('express');
const uuidAPIKey = require('uuid-apikey');
const BaseballCommunityPost = require('../models/baseball_community_post_model.js')(require('../config/db'));
const router = express.Router();


const key = {
    apiKey: process.env.API_KEY,
    uuid: '36f77065-60fa-4b4a-90db-f2a02be13f34'
}


// router.use('/:apikey', (req, res, next) => {
//     const { apikey } = req.params;
//     if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
//         console.warn(`Invalid API key`);
//     }
//     next();
// });


// POST /posts - 새로운 게시물 작성
router.post('/:apikey', async (req, res) => {
    try {
        const { apikey } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const { user_id, baseball_community_id, title, content, image_url } = req.body;
        const newPost = await BaseballCommunityPost.create({
            user_id,
            baseball_community_id,
            title,
            content,
            image_url
        });
        res.status(201).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: '게시물 생성 중 오류가 발생했습니다.' });
    }
});

// GET /posts - 모든 게시물 조회
router.get('/:apikey', async (req, res) => {
    try {
        const { apikey } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const posts = await BaseballCommunityPost.findAll();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: '게시물 조회 중 오류가 발생했습니다.' });
    }
});

// GET /posts/:id - 특정 게시물 조회
router.get('/:apikey/:id', async (req, res) => {
    try {
        const { apikey } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const post = await BaseballCommunityPost.findByPk(req.params.id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });
        }
    } catch (error) {
        res.status(500).json({ error: '게시물 조회 중 오류가 발생했습니다.' });
    }
});

// PUT /posts/:id - 게시물 수정
router.put('/:apikey/:id', async (req, res) => {
    try {
        
        const { apikey } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }


        const { title, content, image_url } = req.body;
        const post = await BaseballCommunityPost.findByPk(req.params.id);

        if (post) {
            post.title = title || post.title;
            post.content = content || post.content;
            post.image_url = image_url || post.image_url;
            post.updated_at = new Date();
            await post.save();

            res.status(200).json(post);
        } else {
            res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });
        }
    } catch (error) {
        res.status(500).json({ error: '게시물 수정 중 오류가 발생했습니다.' });
    }
});

// DELETE /posts/:id - 게시물 삭제
router.delete('/:apikey/:id', async (req, res) => {
    try {
        const { apikey } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }


        const post = await BaseballCommunityPost.findByPk(req.params.id);

        if (post) {
            await post.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });
        }
    } catch (error) {
        res.status(500).json({ error: '게시물 삭제 중 오류가 발생했습니다.' });
    }
});

module.exports = router;