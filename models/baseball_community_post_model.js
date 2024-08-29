const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const BaseballCommunityPost = sequelize.define('FoodShop', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        baseball_community_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.TEXT,
            allowNull: true, // 이미지가 필수 항목이 아니면 true로 설정
        },
        like_num: {
            type: DataTypes.INTEGER,
            defaultValue: 0, // 기본값을 0으로 설정
            allowNull: false,
        },
        comments_num: {
            type: DataTypes.INTEGER,
            defaultValue: 0, // 기본값을 0으로 설정
            allowNull: false,
        }
    }, {
        tableName: 'baseball_community_post',
        timestamps: true,
        underscored: true // snake_case를 사용할 경우
    });
    
    return BaseballCommunityPost;
};