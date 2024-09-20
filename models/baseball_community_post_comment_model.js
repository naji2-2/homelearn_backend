const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const BaseballCommunityPostComment = sequelize.define('BaseballCommunityPostComment', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userId: { 
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'user_information',
                key: 'id'
            }
        },
        postId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'baseball_community_post',
                key: 'id'
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        like_num: {
            type: DataTypes.INTEGER,
            defaultValue: 0, // 기본값을 0으로 설정
            allowNull: false,
        }
    }, {
        tableName: 'baseball_community_post_comment',
        timestamps: true,
        underscored: true // snake_case를 사용할 경우
    });
    
    return BaseballCommunityPostComment;
};