import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CheckRepositoryEntity } from 'src/contexts/users/domain/repositories/auth/check.repository.entity';
import { Code } from '../../schema/code/code.schema';
import { Model } from 'mongoose';
import { ApiResponse, Status } from 'src/contexts/shared/api.response';

@Injectable()
export class CheckRepository extends CheckRepositoryEntity {
  constructor(@InjectModel(Code.name) public codeModel: Model<Code>) {
    super();
  }

  async checkEmail(email: string, code: string): Promise<ApiResponse<null>> {
    const codeFound = await this.codeModel.findOneAndDelete({ email, code });

    return new ApiResponse(
      codeFound ? Status.Success : Status.Denied,
      codeFound ? HttpStatus.OK : HttpStatus.NO_CONTENT,
      codeFound ? 'Verificación exitosa.' : 'Código no encontrado.',
      null,
    );
  }
}
