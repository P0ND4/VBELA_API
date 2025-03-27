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

  @IsArray()
  categories: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubCategory)
  subcategories: SubCategory[];

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

  @IsNumber()
  creationDate: number;

  @IsNumber()
  modificationDate: number;
}
