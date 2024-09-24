const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const FoodShop = sequelize.define('FoodShop', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        homeground: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        menu: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        image_url: {
            type: DataTypes.TEXT,
            allowNull: true, // 이미지가 필수 항목이 아니면 true로 설정
        },
        category: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        today_order: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        star: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    }, {
        tableName: 'food_shop',
        timestamps: true,
        underscored: true,
    });
    return FoodShop;
};
