import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class PaymentMethodsHttpDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsNumber()
  creationDate: number;

  @IsNumber()
  modificationDate: number;
}

export class DarkModeHttpDto {
  @IsBoolean()
  darkMode: boolean;
}

export class ColorHttpDto {
  @IsNumber()
  color: number;
}

export class CoinHttpDto {
  @IsString()
  coin: string;
}

export class InvoiceInformationHttpDto {
  @IsString()
  company: string;

  @IsString()
  business: string;

  @IsString()
  address: string;

  @IsString()
  identification: string;

  @IsNumber()
  countryCode: number;

  @IsString()
  phoneNumber: string;

  @IsString()
  complement: string;
}
