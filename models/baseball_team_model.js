const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const BaseballTeam = sequelize.define('BaseballTeam', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        image_url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        foundation_date: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        hometown: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        homeground: {
            type: DataTypes.STRING(255),
            allowNull: true,
        }
    }, {
        tableName: 'baseball_team',
        timestamps: true,
        underscored: true,
    });
    return BaseballTeam;
};
