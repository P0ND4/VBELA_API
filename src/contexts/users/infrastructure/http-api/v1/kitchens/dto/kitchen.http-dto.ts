import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Selection } from 'src/contexts/users/domain/types';
import { Order } from '../../common-dto/order.http-dto';
import { Type } from 'class-transformer';

export class Kitchen {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  restaurantID: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  order: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsArray()
  @ArrayNotEmpty()
  selection: Selection[];

  @IsString()
  observation: string;

  @IsNumber()
  creationDate: number;

  @IsNumber()
  modificationDate: number;
}

export class KitchenHttpDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => Order)
  order!: Order;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => Kitchen)
  kitchen!: Kitchen;
}
