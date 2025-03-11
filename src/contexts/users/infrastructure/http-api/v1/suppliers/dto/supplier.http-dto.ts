import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SupplierHttpDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  identification: string;

  @IsString()
  description: string;

  @IsBoolean()
  highlight: boolean;

  @IsNumber()
  creationDate: number;

  @IsNumber()
  modificationDate: number;
}
