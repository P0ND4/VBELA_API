import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class InventoryHttpDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  visible: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  highlight: boolean;

  @IsNumber()
  creationDate: number;

  @IsNumber()
  modificationDate: number;
}
