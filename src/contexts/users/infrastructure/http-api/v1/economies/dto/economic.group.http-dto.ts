import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { SubCategory } from '../../common-dto/group.http-dto';
import { Type } from 'class-transformer';

export class EconomicGroupHttpDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubCategory)
  subcategories: SubCategory[];

  @IsString()
  @IsNotEmpty()
  visible: string;

  @IsNumber()
  creationDate: number;

  @IsNumber()
  modificationDate: number;
}
