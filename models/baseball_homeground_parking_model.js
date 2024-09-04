const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const BaseballHomegroundParking = sequelize.define('BaseballHomegroundParking', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        homegroundId: {  
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'baseball_homeground_info',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        parkingTime:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        parkingCharge: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        tableName: 'baseball_homeground_parking',
        timestamps: true,
        underscored: true,
    });
    return BaseballHomegroundParking;
};
