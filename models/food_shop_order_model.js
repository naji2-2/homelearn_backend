const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const FoodShopOrder = sequelize.define('FoodShopOrder', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userId: {  // 유저 api 생성 후 포렌키 설정 필요
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        shopId: {  
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'food_shop',
                key: 'id'
            }
        },
        phoneNumber: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        detail: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'food_shop_order',
        timestamps: true,
        underscored: true,
    });
    return FoodShopOrder;
};
