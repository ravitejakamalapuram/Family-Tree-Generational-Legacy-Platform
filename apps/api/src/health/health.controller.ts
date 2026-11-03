import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller('health')
export class HealthController {
  @Get('live')
  live() {
    return { status: 'ok' };
  }

  @Get('ready')
  ready(@Res() response: Response) {
    // FL-003 will replace this fail-closed placeholder with a real database probe.
    return response.status(503).json({
      status: 'not_ready',
      dependencies: ['database'],
    });
  }
}
