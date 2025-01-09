import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginHttpDto {
  @IsNotEmpty()
  @IsString()
  identifier: string;

  @IsOptional()
  @IsString()
  expoID?: string | null;

  constructor(partial: Partial<LoginHttpDto>) {
    Object.assign(this, partial);
  }
}
