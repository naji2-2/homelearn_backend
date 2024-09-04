const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const BaseballHomegroundInfo = sequelize.define('BaseballHomegroundInfo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        teamId: {  
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'baseball_team',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        homeground_station: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        homeground_location: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        homeground_seatingplan_image_url: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        parking: {
            type: DataTypes.STRING(255),
            allowNull: true,
        }
    }, {
        tableName: 'baseball_homeground_info',
        timestamps: true,
        underscored: true,
    });
    return BaseballHomegroundInfo;
};
