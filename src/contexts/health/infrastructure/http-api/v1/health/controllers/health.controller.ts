import { Controller, Get, HttpStatus } from '@nestjs/common';
import { V1_HEALTH } from '../../../route.constants';
import { ApiResponse, Status } from 'src/contexts/shared/api.response';

@Controller(V1_HEALTH)
export class HealthController {
  constructor() {}

  @Get('')
  getConfig() {
    return new ApiResponse(
      Status.Success,
      HttpStatus.OK,
      'Funcionando correctamente',
      null,
    );
  }
}
