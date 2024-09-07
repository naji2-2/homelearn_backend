const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const FoodShopOrderDetail = sequelize.define('FoodShopOrderDetail', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        foodOrderId: {  
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'food_shop_order',
                key: 'id'
            }
        },
        menu_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'food_shop_order_detail',
        timestamps: true,
        underscored: true,
    });
    return FoodShopOrderDetail;
};
