import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class SubCategory {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class GroupHttpDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  locationID: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubCategory)
  subcategories: SubCategory[];

  @IsNumber()
  creationDate: number;

  @IsNumber()
  modificationDate: number;
}
