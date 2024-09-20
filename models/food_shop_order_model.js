const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const FoodShopOrder = sequelize.define('FoodShopOrder', {
        id: {
            type: DataTypes.INTEGER,
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
