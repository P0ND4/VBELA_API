import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class PermissionsDto {
  @IsBoolean()
  admin: boolean;

  @IsBoolean()
  accessToStatistics: boolean;

  @IsBoolean()
  accessToStore: boolean;

  @IsBoolean()
  accessToRestaurant: boolean;

  @IsBoolean()
  accessToKitchen: boolean;

  @IsBoolean()
  accessToEconomy: boolean;

  @IsBoolean()
  accessToSupplier: boolean;

  @IsBoolean()
  accessToCollaborator: boolean;

  @IsBoolean()
  accessToInventory: boolean;
}

export class CollaboratorHttpDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  identifier: string;

  @IsString()
  lastName: string;

  @IsOptional()
  permissions: PermissionsDto | null;
}