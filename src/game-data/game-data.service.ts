import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AllPlayersDto } from './dto/all-players.dto';

@Injectable()
export class GameDataService {
  private allPlayersDto: AllPlayersDto;

  async getGameData() {
    // This function can be called from anywhere in your code to get the latest AllPlayers data
    if (this.allPlayersDto !== null) {
      return this.allPlayersDto;
    } else {
      throw new Error('No data available yet');
    }
  }

  async updateGameData() {
    try {
      const response = await axios.get(
        'https://127.0.0.1:2999/liveclientdata/allgamedata'
      );
      const playerData = response.data.allPlayers;
      this.allPlayersDto = this.transformToAllPlayersDto(playerData);
    } catch (error) {
      console.error(`Error occurred while fetching game data: ${error}`);
      throw error;
    }
  }

  transformToAllPlayersDto(playerData: Player[]): AllPlayersDto {
    return {
      players: playerData.map(player => ({
        championName: player.championName,
        isBot: player.isBot,
        isDead: player.isDead,
        items: player.items,
        level: player.level,
        position: player.position,
        rawChampionName: player.rawChampionName,
        summonerName: player.summonerName,
        team: player.team,
      })),
    };
  }
}
