import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HandlerHttpDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  start: number;

  @IsNumber()
  end: number;

  @IsNumber()
  creationDate: number;

  @IsNumber()
  modificationDate: number;
}
