import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ElementHttpDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  locationID: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  cost?: number;

  @IsNumber()
  promotion?: number;

  @IsArray()
  category?: string[];

  @IsArray()
  subcategory?: string[];

  @IsString()
  description?: string;

  @IsString()
  code?: string;

  @IsString()
  unit?: string;

  @IsBoolean()
  highlight?: boolean;

  @IsBoolean()
  activeStock?: boolean;

  @IsNumber()
  stock?: number;

  @IsNumber()
  minStock?: number;

  @IsArray()
  stockIDS?: string[];

  @IsArray()
  packageIDS?: string[];

  @IsNumber()
  creationDate: number;

  @IsNumber()
  modificationDate: number;
}
