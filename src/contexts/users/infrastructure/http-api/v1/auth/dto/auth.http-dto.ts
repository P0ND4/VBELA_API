import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LogoutHttpDto {
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
export class GetSessionsHttpDto {
  @IsNotEmpty()
  @IsString()
  identifier: string;

  @IsString()
  @IsNotEmpty()
  hash: string;

  @IsNumber()
  timestamp: number;
}

export class LoginHttpDto {
  @IsNotEmpty()
  @IsString()
  identifier: string;

  @IsString()
  @IsNotEmpty()
  selected: string;

  @IsString()
  @IsNotEmpty()
  token: string;

  constructor(partial: Partial<LoginHttpDto>) {
    Object.assign(this, partial);
  }
}