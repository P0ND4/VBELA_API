import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class DetailsDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class EconomyHttpDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @ValidateIf((o) => o.supplier !== null)
  @IsObject()
  @ValidateNested()
  @Type(() => DetailsDto)
  @IsOptional()
  supplier: DetailsDto | null;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsObject()
  @ValidateNested()
  @Type(() => DetailsDto)
  category: DetailsDto;

  @IsNumber()
  value: number;

  @IsNumber()
  quantity: number;

  @IsString()
  unit: string;

  @IsString()
  description: string;

  @IsNumber()
  date: number;

  @IsString()
  reference: string;

  @IsString()
  brand: string;

  @IsNumber()
  creationDate: number;

  @IsNumber()
  modificationDate: number;
}
