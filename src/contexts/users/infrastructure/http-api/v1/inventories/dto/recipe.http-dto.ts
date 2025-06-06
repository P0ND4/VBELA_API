import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class RecipeIngredients {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  type: string;
}

export class SubCategory {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  subcategory: string;
}

export class RecipeHttpDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  inventoryID: string;

  @IsNumber()
  value: number;

  @IsArray()
  categories: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubCategory)
  subcategories: SubCategory[];

  @IsArray()
  @ArrayNotEmpty()
  ingredients: RecipeIngredients[];

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  visible: boolean;

  @IsNumber()
  creationDate: number;

  @IsNumber()
  modificationDate: number;
}
