import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class LoginHttpDto {
  @IsNotEmpty()
  @IsString()
  identifier: string;

  @IsOptional()
  @IsString()
  collaborator?: string | null;

  @IsOptional()
  @IsString()
  expoID?: string | null;

  @IsString()
  @IsNotEmpty()
  hash: string;

  @IsNumber()
  timestamp: number;

  constructor(partial: Partial<LoginHttpDto>) {
    Object.assign(this, partial);
  }
}
