const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const FoodShopMenu = sequelize.define('FoodShopMenu', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        price:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'food_shop_menu',
        timestamps: true,
        underscored: true,
    });
    return FoodShopMenu;
};
