import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Ingredients } from 'src/contexts/users/domain/types';

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
  @ArrayNotEmpty()
  ingredients: Ingredients[];

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  visible: boolean;

  @IsNumber()
  creationDate: number;

  @IsNumber()
  modificationDate: number;
}
