import { PrimitiveUser } from '../../user.entity';

export interface ValidateDto {
  identifier: string;
  expoID: string | null;
}

export abstract class AuthRepositoryEntity {
  abstract validate(dto: ValidateDto): Promise<PrimitiveUser>;
}
