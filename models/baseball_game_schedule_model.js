const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const BaseballGameSchedule = sequelize.define('BaseballGameSchedule', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        game_date: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        team_home: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        team_away: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        game_time: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        tableName: 'baseball_game_schedule',
        timestamps: true,
        underscored: true // snake_case를 사용할 경우
    });
    
    return BaseballGameSchedule;
};