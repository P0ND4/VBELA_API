import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class AuthValidationGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
  ) {}

  private validateHash(
    identifier: string,
    hash: string,
    timestamp: number,
  ): boolean {
    const secret = this.configService.get<string>('LOGIN_SECRET');
    const currentTime = Math.floor(Date.now() / 1000);

    if (Math.abs(currentTime - timestamp) > 60) return false;

    const expectedHash = CryptoJS.HmacSHA256(
      `${identifier}:${timestamp}`,
      secret,
    ).toString();
    return expectedHash === hash;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { identifier, hash, timestamp } = request.body;

    return this.validateHash(identifier, hash, timestamp);
  }
}
