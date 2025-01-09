import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomStrategy } from '../strategies/custom.strategy';

@Injectable()
export class CustomAuthGuard extends AuthGuard(CustomStrategy.key) {}
