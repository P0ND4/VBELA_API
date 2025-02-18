import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TableHttpDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  restaurantID: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  highlight: boolean;

  @IsNumber()
  creationDate: number;

  @IsNumber()
  modificationDate: number;
}
