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

export class StockDetailsDto extends DetailsDto {
  @IsString()
  @IsOptional()
  unit?: string;

  @IsNumber()
  currentValue: number;
}

export class MovementHttpDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsObject()
  @ValidateNested()
  @Type(() => DetailsDto)
  inventory: DetailsDto;

  @IsObject()
  @ValidateNested()
  @Type(() => StockDetailsDto)
  stock: StockDetailsDto;

  @ValidateIf((o) => o.supplier !== null)
  @IsObject()
  @ValidateNested()
  @Type(() => DetailsDto)
  @IsOptional()
  supplier: DetailsDto | null;

  @IsNumber()
  supplierValue: number;

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
