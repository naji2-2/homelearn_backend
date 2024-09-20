const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Calendar = sequelize.define('Calendar', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user_information',
                key: 'id'
            }
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        note: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    }, {
        tableName: 'calendar',
        timestamps: true,
        underscored: true,
    });
    return Calendar;
};
