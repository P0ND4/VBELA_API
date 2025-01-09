import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Movement } from 'src/contexts/users/domain/types';

export class StockHttpDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  inventoryID: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsBoolean()
  visible: boolean;

  @IsNumber()
  reorder: number;

  @IsString()
  @IsNotEmpty()
  reference: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsNumber()
  currentValue: number;

  @IsArray()
  movement: Movement[];

  @IsNumber()
  creationDate: number;

  @IsNumber()
  modificationDate: number;
}
