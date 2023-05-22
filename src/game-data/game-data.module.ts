import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { GameDataService } from './game-data.service';
import { GamePollingService } from './game-polling.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot()],
  providers: [GameDataService, GamePollingService],
  exports: [GameDataService],
})
export class GameDataModule {}
