import { Controller, UseGuards, Get, HttpStatus } from '@nestjs/common';
import { V1_CONFIG } from '../../../route.constants';
import { AccessTokenGuard } from '../../../../../../shared/guards/access-token.guard';
import { ApiResponse, Status } from 'src/contexts/shared/api.response';
import * as config from '../../../../../config.json';

@Controller(V1_CONFIG)
@UseGuards(AccessTokenGuard)
export class ConfigController {
  constructor() {}

  @Get('')
  getConfig() {
    return new ApiResponse(
      Status.Success,
      HttpStatus.OK,
      'Configuración obtenida satisfactoriamente.',
      config,
    );
  }
}
