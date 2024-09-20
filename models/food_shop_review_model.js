const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const FoodShopReview = sequelize.define('FoodShopReview', {
        shopId: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'food_shop',
                key: 'id'
            }
        },
        userId: { 
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'user_information',
                key: 'id'
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 5
            }
        },
        image_url: {
            type: DataTypes.TEXT,
            allowNull: true, // 이미지가 필수 항목이 아니면 true로 설정
        }
    }, {
        tableName: 'food_shop_review',
        timestamps: true,
        underscored: true
    });


    return FoodShopReview;
}
