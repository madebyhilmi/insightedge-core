import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';
import * as fs from 'fs';
import { AllPlayers } from '@insightedge/insightedge-common';

@Injectable()
export class GameDataService {
  private allPlayers: AllPlayers;

  async getGameData() {
    // This function can be called from anywhere in your code to get the latest AllPlayers data
    if (this.allPlayers !== null) {
      return this.allPlayers;
    } else {
      throw new Error('No data available yet');
    }
  }

  async updateGameData() {
    try {
      const riotGamesCert = fs.readFileSync('./configuration/riotgames.pem');
      const httpsAgent = new https.Agent({
        ca: riotGamesCert,
      });
      const response = await axios.get(
        'https://127.0.0.1:2999/liveclientdata/allgamedata',
        { httpsAgent: httpsAgent }
      );
      const playerData = response.data.allPlayers;
      this.allPlayers = this.transformToAllPlayersDto(playerData);
    } catch (error) {
      console.error(`Error occurred while fetching game data: ${error}`);
      throw error;
    }
  }

  transformToAllPlayersDto(playerData: Player[]): AllPlayers {
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
