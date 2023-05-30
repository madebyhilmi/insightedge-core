import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';
import * as jsonwebtoken from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Constants } from '../config/constants';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const authDomain = configService.get<string>(Constants.authDomain);
    const authAudience = configService.get<string>(Constants.authApiAudience);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: (req: any, rawJwtToken: any, done: any) => {
        const jwksClient = jwksRsa({
          jwksUri: `https://${authDomain}/.well-known/jwks.json`,
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
        });
        const decoded = jsonwebtoken.decode(rawJwtToken, { complete: true });
        if (!decoded) {
          return done(new Error('Unable to decode JWT token.'));
        }
        jwksClient.getSigningKey(decoded.header.kid, (err, key) => {
          if (err) {
            return done(err);
          }
          const signingKey = key?.getPublicKey();
          return done(null, signingKey);
        });
      },
      audience: authAudience,
      issuer: `https://${authDomain}/`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    try {
      if (!payload || !payload.sub) {
        return done(new UnauthorizedException(), false);
      }

      const user = {
        userId: payload.sub,
        email: payload.email,
      };
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}
