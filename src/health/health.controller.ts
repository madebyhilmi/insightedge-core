import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';

@Controller('health')
export class HealthController {
  private readonly cacheDuration = 60 * 60 * 1000; // 1 hour in milliseconds
  private lastCheck: number;
  private lastResult: HealthCheckResult;
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private configService: ConfigService
  ) {
    this.lastCheck = Date.now() - this.cacheDuration; // Initialize lastCheck to be cacheDuration ago
  }

  @Get()
  @HealthCheck()
  async check() {
    const currentTime = Date.now();

    if (currentTime - this.lastCheck > this.cacheDuration) {
      this.lastResult = await this.health.check([
        async () =>
          this.http.pingCheck(
            'riot-api',
            'https://na1.api.riotgames.com/lol/status/v4/platform-data',
            {
              headers: {
                'X-Riot-Token': this.configService.get<string>('riotApiKey'),
              },
              timeout: 1000,
            }
          ),
      ]);
      this.lastCheck = currentTime;
    }

    return {
      ...this.lastResult,
      lastChecked: new Date(this.lastCheck).toISOString(),
    };
  }
}
