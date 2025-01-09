import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Selection } from 'src/contexts/users/domain/types';

export class KitchenHttpDto {
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
  @IsNotEmpty()
  observation: string;

  @IsNumber()
  creationDate: number;

  @IsNumber()
  modificationDate: number;
}
