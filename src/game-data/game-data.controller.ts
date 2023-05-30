import { Controller, Get } from '@nestjs/common';
import { GameDataService } from './game-data.service';
import { AllPlayers } from '@insightedge/insightedge-common';

@Controller('game')
export class GameDataController {
  constructor(private gameDataService: GameDataService) {}

  @Get('latest')
  public async getLatest(): Promise<AllPlayers> {
    return this.gameDataService.getGameData();
  }
}
