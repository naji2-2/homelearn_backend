const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const BaseballDictionary = sequelize.define('BaseballDictionary', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        word: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        explantion: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        video_url: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'baseball_dictionary',
        timestamps: true,
        underscored: true,
    });
    return BaseballDictionary;
};
