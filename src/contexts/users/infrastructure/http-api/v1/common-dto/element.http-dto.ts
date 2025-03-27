import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class SubCategory {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  subcategory: string;
}

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
  cost: number;

  @IsNumber()
  promotion: number;

  @IsArray()
  categories: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubCategory)
  subcategories: SubCategory[];

  @IsString()
  description: string;

  @IsString()
  code: string;

  @IsString()
  unit: string;

  @IsBoolean()
  highlight: boolean;

  @IsBoolean()
  activeStock: boolean;

  @IsNumber()
  stock: number;

  @IsNumber()
  minStock: number;

  @IsArray()
  stockIDS: string[];

  @IsArray()
  packageIDS: string[];

  @IsNumber()
  creationDate: number;

  @IsNumber()
  modificationDate: number;
}
