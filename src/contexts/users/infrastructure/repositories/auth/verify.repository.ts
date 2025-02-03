import { HttpStatus, Injectable } from '@nestjs/common';
import { VerifyRepositoryEntity } from 'src/contexts/users/domain/repositories/auth/verify.repository.entity';
import { Code } from '../../schema/code/code.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiResponse, Status } from 'src/contexts/shared/api.response';

@Injectable()
export class VerifyRepository extends VerifyRepositoryEntity {
  constructor(@InjectModel(Code.name) public codeModel: Model<Code>) {
    super();
  }

  async verifyEmail(
    email: string,
    code: string,
  ): Promise<ApiResponse<{ expires_in: number; recipient: string }>> {
    const newCode = new this.codeModel({ email, code });
    await newCode.save();

    return new ApiResponse(
      Status.Success,
      HttpStatus.CREATED,
      'Código de verificación enviado exitosamente',
      {
        expires_in: 300000,
        recipient: email,
      },
    );
  }
}
