import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsBoolean,
  ValidateNested,
  IsObject,
  IsDefined,
} from 'class-validator';
import { MovementHttpDto } from '../inventories/dto/movement.http-dto';
import { PortionHttpDto } from '../inventories/dto/portion.http-dto';

class Selection {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  unit: string;

  @IsBoolean()
  registered: boolean;

  @IsBoolean()
  activeStock: boolean;

  @IsArray()
  @IsString({ each: true })
  packageIDS: string[];

  @IsArray()
  @IsString({ each: true })
  stockIDS: string[];

  @IsNumber()
  discount: number;

  @IsNumber()
  total: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  value: number;
}

class PaymentMethod {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  method: string;

  @IsNumber()
  amount: number;

  @IsString()
  icon: string;
}

export class Order {
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
  @IsOptional()
  tableID: string | null;

  @IsString()
  @IsNotEmpty()
  order: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Selection)
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
  @ValidateNested({ each: true })
  @Type(() => PaymentMethod)
  paymentMethods: PaymentMethod[];

  @IsString()
  @IsOptional()
  observation: string;

  @IsNumber()
  creationDate: number;

  @IsNumber()
  modificationDate: number;
}

class Discount {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  quantity: number;
}

export class OrderHttpDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => Order)
  order!: Order;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Discount)
  discounts: Discount[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MovementHttpDto)
  movements: MovementHttpDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PortionHttpDto)
  portions: PortionHttpDto[];
}
