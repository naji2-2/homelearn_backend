const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const BaseballTeamMember = sequelize.define('BaseballTeamMember', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        teamId: {  
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'baseball_team',
                key: 'id'
            }
        },
        baseball_team_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        back_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        birth: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        instagram: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        ceer_song: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        image_url: {
            type: DataTypes.TEXT        }
    }, {
        tableName: 'baseball_team_member',
        timestamps: true,
        underscored: true,
    });
    return BaseballTeamMember;
};
