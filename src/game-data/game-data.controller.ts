import { Controller, Get } from '@nestjs/common';
import { GameDataService } from './game-data.service';
import { AllPlayers } from '@insightedge/insightedge-common';
import { PlayerGold } from '@insightedge/insightedge-common/lib/shared/models/player-gold';

@Controller('game')
export class GameDataController {
  constructor(private gameDataService: GameDataService) {}

  @Get('latest')
  public async getLatest(): Promise<AllPlayers> {
    return this.gameDataService.getGameData();
  }
  @Get('item-gold/all')
  public async getAllItemGold(): Promise<PlayerGold[]> {
    const allPlayerGold: PlayerGold[] = [];

    const allPlayerData = await this.gameDataService.getGameData();
    allPlayerData.players.forEach(player => {
      let totalPlayerGold = 0;
      player.items.forEach(item => {
        totalPlayerGold = totalPlayerGold + item.price * item.count;
      });
      const playerGold: PlayerGold = {
        championName: player.championName,
        team: player.team,
        itemGold: totalPlayerGold,
      };
      allPlayerGold.push(playerGold);
    });

    // for every player
    // sum all item gold
    return allPlayerGold;
  }
}
