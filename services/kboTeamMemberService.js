const { BaseballTeamMember } = require('./models');

class BaseballTeamService {
    async createPlayer(playerData) {
        try {
            const player = await BaseballTeamMember.create(playerData);
            return player;
        } catch (error) {
            throw new Error('Error creating player');
        }
    }

    async getPlayer(id) {
        try {
            const player = await BaseballTeamMember.findByPk(id);
            if (!player) throw new Error('Player not found');
            return player;
        } catch (error) {
            throw new Error('Error fetching player');
        }
    }

    async getAllPlayers() {
        try {
            const players = await BaseballTeamMember.findAll();
            return players;
        } catch (error) {
            throw new Error('Error fetching players');
        }
    }
}

module.exports = new BaseballTeamService();