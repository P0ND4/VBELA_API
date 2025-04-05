import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { MovementHttpDto } from './movement.http-dto';

export class PortionIngredients {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  quantity: number;
}

export class SubCategory {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  subcategory: string;
}

export class PortionHttpDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  inventoryID: string;

  @IsArray()
  categories: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubCategory)
  subcategories: SubCategory[];

  @IsArray()
  @ArrayNotEmpty()
  ingredients: PortionIngredients[];

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  visible: boolean;

  @IsNumber()
  quantity: number;

  @IsNumber()
  creationDate: number;

  @IsNumber()
  modificationDate: number;
}

export class PortionActivityHttpDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => PortionHttpDto)
  portion!: PortionHttpDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MovementHttpDto)
  movements: MovementHttpDto[];
}
