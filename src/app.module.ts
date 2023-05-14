import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { ProductionAuthGuard } from './auth/production-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    CatsModule,
    TerminusModule,
    PassportModule,
  ],
  providers: [JwtStrategy, ProductionAuthGuard],
  controllers: [HealthController],
  exports: [JwtStrategy, ProductionAuthGuard, PassportModule],
})
export class AppModule {}
