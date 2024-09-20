const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
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
        name: { 
            type: DataTypes.STRING(255),
            required: true 
        },
        baseball_team_name: {
            type: DataTypes.INTEGER
        },
        image_url: {
            type: DataTypes.TEXT
        },
        kakao_id: {
            type: DataTypes.INTEGER,
            required: true,
            unique: true
        }
    }, {
        tableName: 'user_information',
        timestamps: true,
        underscored: true,
    });
    return User;
};
