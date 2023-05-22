import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { ProductionAuthGuard } from './auth/production-auth.guard';
import { GameDataModule } from './game-data/game-data.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    GameDataModule,
    TerminusModule,
    PassportModule,
  ],
  providers: [JwtStrategy, ProductionAuthGuard],
  controllers: [HealthController],
  exports: [JwtStrategy, ProductionAuthGuard, PassportModule],
})
export class AppModule {}
