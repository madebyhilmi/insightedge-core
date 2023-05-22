import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GameDataService } from './game-data.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class GamePollingService {
  constructor(
    private gameDataService: GameDataService,
    private httpService: HttpService
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron() {
    try {
      await this.gameDataService.updateGameData();
    } catch (error) {
      console.error(`Error polling game data: ${error}`);
    }
  }
}
