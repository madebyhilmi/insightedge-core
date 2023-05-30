import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Constants } from '../config/constants';

@Injectable()
export class ProductionAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService
  ) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const appEnv = this.configService.get<string>(Constants.appEnv);
    if (appEnv === 'development') {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any
  ): TUser {
    if (process.env.APP_ENV === 'development') {
      return user || { userId: 'dev-user' };
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
