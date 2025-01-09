import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Selection, PaymentMethod } from 'src/contexts/users/domain/types';

export class OrderHttpDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  invoice: string;

  @IsString()
  @IsNotEmpty()
  locationID: string;

  @IsString()
  @IsNotEmpty()
  tableID?: string;

  @IsString()
  @IsNotEmpty()
  order: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsArray()
  @ArrayNotEmpty()
  selection: Selection[];

  @IsNumber()
  discount: number;

  @IsNumber()
  paid: number;

  @IsNumber()
  total: number;

  @IsNumber()
  change: number;

  @IsArray()
  @ArrayNotEmpty()
  paymentMethods: PaymentMethod[];

  @IsString()
  @IsNotEmpty()
  observation: string;

  @IsNumber()
  creationDate: number;

  @IsNumber()
  modificationDate: number;
}
