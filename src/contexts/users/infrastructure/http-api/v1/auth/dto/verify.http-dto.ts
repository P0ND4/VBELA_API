import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyEmailHttpDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}

export class VerifyPhoneHttpDto {
  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsString()
  channel: string;
}
