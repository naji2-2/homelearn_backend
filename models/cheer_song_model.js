const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const CheerSong = sequelize.define('CheerSong', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        TeamId: {  
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
        lyrics: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        like: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        video_url: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'cheer_song',
        timestamps: true,
        underscored: true,
    });
    return CheerSong;
};
