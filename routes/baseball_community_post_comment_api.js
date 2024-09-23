const express = require('express');
const uuidAPIKey = require('uuid-apikey');
const BaseballCommunityPostComment = require('../models/baseball_community_post_comment_model.js')(require('../config/db'));
const BaseballCommunityPost = require('../models/baseball_community_post_model.js')(require('../config/db'));


const router = express.Router();

const key = {
    apiKey: process.env.API_KEY,
    uuid: '36f77065-60fa-4b4a-90db-f2a02be13f34'
};


router.get('/:apikey', async (req, res) => {
    try {
        
        const { apikey } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const comment = await BaseballCommunityPostComment.findAll();
        
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: '게시물 조회 중 오류가 발생했습니다.' });
    }
});

// 댓글 작성
router.post('/:apikey', async (req, res) => {
    try {
        const { apikey } = req.params;
        const { postId, userId, content } = req.body;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        // 필수 필드 확인
        if (!postId || !userId || !content) {
            return res.status(400).json({ error: 'postId, userId, content는 필수 항목입니다.' });
        }

        // 해당 게시물 및 사용자가 존재하는지 확인
        const post = await BaseballCommunityPost.findByPk(postId);
        //const user = await User.findByPk(userId);

        if (!post) {
            return res.status(404).json({ error: '해당 게시물을 찾을 수 없습니다.' });
        }

        // if (!user) {
        //     return res.status(404).json({ error: '해당 사용자를 찾을 수 없습니다.' });
        // }

        // 댓글 생성
        const comment = await Comment.create({ postId, userId, content });

        await post.increment('comments_num', { by: 1 });

        // 생성된 댓글 반환
        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '댓글 생성에 실패했습니다.' });
    }
});


router.get('/:apikey/:id', async (req, res) => {
    try {
        const { apikey } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const comment = await Comment.findAll({
            where: { postId: id }
        });

        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });
        }
    } catch (error) {
        res.status(500).json({ error: '게시물 조회 중 오류가 발생했습니다.' });
    }
});

router.delete('/:apikey/:id', async (req, res) => {
    try {
        const { apikey, id } = req.params;

        // API 키 검증
        if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
            return res.status(401).send('apikey is not valid.');
        }

        const comment = await Comment.findByPk(id);

        if (!comment) {
            return res.status(404).json({ error: '해당 댓글을 찾을 수 없습니다.' });
        }

        const postId = comment.postId;

        await comment.destroy();

        // 댓글이 삭제되면 해당 게시물의 댓글 수 감소
        const post = await Post.findByPk(postId);
        if (post) {
            await post.decrement('comments_num', { by: 1 });
        }

        res.status(200).json({ message: '댓글이 삭제되었습니다.', deletedCommentId: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '댓글 삭제에 실패했습니다.' });
    }
});

module.exports = router;