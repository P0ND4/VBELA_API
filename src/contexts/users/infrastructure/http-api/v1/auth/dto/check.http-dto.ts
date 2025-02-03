import { IsNotEmpty, IsString } from 'class-validator';

export class CheckEmailHttpDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  code: string;
}

export class CheckPhoneHttpDto {
  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsString()
  code: string;
}
