import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class Movement {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  inventoryID: string;

  @IsString()
  @IsNotEmpty()
  stockID: string;

  @IsString()
  @IsOptional()
  supplierID?: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  currentValue: number;

  @IsNumber()
  date: number;

  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @IsNumber()
  creationDate: number;

  @IsNumber()
  modificationDate: number;
}

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
  unit: string;

  @IsBoolean()
  visible: boolean;

  @IsNumber()
  reorder: number;

  @IsString()
  reference: string;

  @IsString()
  brand: string;

  @IsNumber()
  currentValue: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Movement)
  movements: Movement[];

  @IsNumber()
  creationDate: number;

  @IsNumber()
  modificationDate: number;
}
